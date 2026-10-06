// SPDX-License-Identifier: Apache-2.0
//
// Off-chain witness suppliers for checkpoint.compact.
//
// Hold secrets, badge structures, and Merkle inclusion paths strictly inside
// the local proving boundary. Only circuit-disclosed values ever reach the
// shared Midnight ledger state.

import type { WitnessContext } from '@midnight-ntwrk/compact-runtime';
import type {
  Ledger,
  MemberCredential,
  Witnesses,
} from './managed/checkpoint/contract/index.js';

export type { MemberCredential };

export class WitnessError extends Error {
  override readonly name = 'WitnessError';
  constructor(reason: string) {
    super(reason);
  }
}

/** Off-chain proving state held locally by an authority or badge holder. */
export interface CheckpointPrivateState {
  readonly secretKey: Uint8Array;
  readonly credential?: MemberCredential;
  readonly salt?: Uint8Array;
}

type ProvingCtx = WitnessContext<Ledger, CheckpointPrivateState>;

function requireDefined<T>(val: T | undefined, errText: string): T {
  if (val === undefined) {
    throw new WitnessError(errText);
  }
  return val;
}

export function privateStateFor(
  secretKey: Uint8Array,
  credential?: MemberCredential,
  salt?: Uint8Array,
): CheckpointPrivateState {
  return {
    secretKey,
    ...(credential !== undefined ? { credential } : {}),
    ...(salt !== undefined ? { salt } : {}),
  };
}

export const witnesses: Witnesses<CheckpointPrivateState> = {
  privateKey(ctx: ProvingCtx): [CheckpointPrivateState, Uint8Array] {
    return [ctx.privateState, ctx.privateState.secretKey];
  },

  heldCredential(ctx: ProvingCtx): [CheckpointPrivateState, MemberCredential] {
    const badge = requireDefined(
      ctx.privateState.credential,
      'no credential held in private state',
    );
    return [ctx.privateState, badge];
  },

  credentialSalt(ctx: ProvingCtx): [CheckpointPrivateState, Uint8Array] {
    const blindingSalt = requireDefined(
      ctx.privateState.salt,
      'no credential salt held in private state',
    );
    return [ctx.privateState, blindingSalt];
  },

  credentialPath(ctx: ProvingCtx, leafCommitment: Uint8Array) {
    const merklePath = requireDefined(
      ctx.ledger.members.findPathForLeaf(leafCommitment),
      'credential commitment is not in the member tree',
    );
    return [ctx.privateState, merklePath as any];
  },
};
