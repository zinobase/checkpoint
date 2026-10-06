// SPDX-License-Identifier: Apache-2.0
//
// Deterministic in-memory execution harness for the Checkpoint perimeter
// access contract. Evaluates real compiled circuits against isolated local
// witness states and a single shared public ledger.

import {
  createCircuitContext,
  createConstructorContext,
  sampleContractAddress,
  type CircuitContext,
  type CircuitResults,
} from '@midnight-ntwrk/compact-runtime';
import {
  Contract,
  ledger as projectPublicLedger,
  type GatePolicy,
  type Ledger,
  type MemberCredential,
  type Witnesses,
} from './managed/checkpoint/contract/index.js';
import {
  privateStateFor,
  witnesses,
  type CheckpointPrivateState,
} from './witnesses.js';

type LocalVault = CheckpointPrivateState;
type OnChainData = Parameters<typeof createCircuitContext<LocalVault>>[0]['contractState'];

const ZERO_ZSWAP_COIN_PK = '00'.repeat(32);

export interface WitnessCall {
  readonly witness: string;
  readonly value: unknown;
}

function instrumentWitnessTable(
  baseTable: Witnesses<LocalVault>,
  sink: WitnessCall[],
): Witnesses<LocalVault> {
  const instrumented: Record<string, (...params: unknown[]) => [LocalVault, unknown]> = {};
  for (const [hookName, hookFn] of Object.entries(baseTable)) {
    instrumented[hookName] = (...params: unknown[]) => {
      const tuple = (hookFn as (...args: unknown[]) => [LocalVault, unknown])(...params);
      sink.push({ witness: hookName, value: tuple[1] });
      return tuple;
    };
  }
  return instrumented as unknown as Witnesses<LocalVault>;
}

export class Ledgerbook {
  readonly address: string = sampleContractAddress();
  readonly witnessLog: WitnessCall[] = [];

  private constructor(public contractState: OnChainData) {}

  static async deploy(authoritySecret: Uint8Array): Promise<Ledgerbook> {
    const instance = new Contract<LocalVault>(witnesses);
    const ctorCtx = createConstructorContext<LocalVault>(
      privateStateFor(authoritySecret),
      ZERO_ZSWAP_COIN_PK,
    );
    const boot = await instance.initialState(ctorCtx);
    return new Ledgerbook(boot.currentContractState.data);
  }

  ledger(): Ledger {
    return projectPublicLedger(
      this.contractState as Parameters<typeof projectPublicLedger>[0],
    );
  }

  join(
    secretKey: Uint8Array,
    credential?: MemberCredential,
    salt?: Uint8Array,
  ): Participant {
    return new Participant(this, privateStateFor(secretKey, credential, salt));
  }

  async call<Out>(
    actor: Participant,
    circuitId: string,
    invoke: (
      instance: Contract<LocalVault>,
      ctx: CircuitContext<LocalVault>,
    ) => Promise<CircuitResults<LocalVault, Out>>,
  ): Promise<Out> {
    const execCtx = createCircuitContext<LocalVault>({
      circuitId,
      contractAddress: this.address,
      coinPublicKeyOrZswapState: ZERO_ZSWAP_COIN_PK,
      contractState: this.contractState,
      privateState: actor.state,
    });

    const contractWithTelemetry = new Contract<LocalVault>(
      instrumentWitnessTable(witnesses, this.witnessLog),
    );
    const outcome = await invoke(contractWithTelemetry, execCtx);

    this.contractState = outcome.context.callContext.currentQueryContext.state;
    const updatedPrivate = outcome.context.callContext.currentPrivateState;
    if (updatedPrivate !== undefined) {
      actor.state = updatedPrivate;
    }
    return outcome.result;
  }
}

export class Participant {
  constructor(
    private readonly harness: Ledgerbook,
    public state: LocalVault,
  ) {}

  registerGate(gateId: Uint8Array, policy: GatePolicy) {
    return this.harness.call(this, 'registerGate', (inst, ctx) =>
      inst.impureCircuits.registerGate(ctx, gateId, policy),
    );
  }

  updateGate(gateId: Uint8Array, policy: GatePolicy) {
    return this.harness.call(this, 'updateGate', (inst, ctx) =>
      inst.impureCircuits.updateGate(ctx, gateId, policy),
    );
  }

  issueCredential(commitment: Uint8Array) {
    return this.harness.call(this, 'issueCredential', (inst, ctx) =>
      inst.impureCircuits.issueCredential(ctx, commitment),
    );
  }

  verifyAccess(gateId: Uint8Array, timestamp: bigint) {
    return this.harness.call(this, 'verifyAccess', (inst, ctx) =>
      inst.impureCircuits.verifyAccess(ctx, gateId, timestamp),
    );
  }

  suspendCredential(credCommitment: Uint8Array) {
    return this.harness.call(this, 'suspendCredential', (inst, ctx) =>
      inst.impureCircuits.suspendCredential(ctx, credCommitment),
    );
  }

  reactivateCredential(credCommitment: Uint8Array) {
    return this.harness.call(this, 'reactivateCredential', (inst, ctx) =>
      inst.impureCircuits.reactivateCredential(ctx, credCommitment),
    );
  }

  revokeCredential(credCommitment: Uint8Array) {
    return this.harness.call(this, 'revokeCredential', (inst, ctx) =>
      inst.impureCircuits.revokeCredential(ctx, credCommitment),
    );
  }
}
