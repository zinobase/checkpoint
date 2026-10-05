import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum CredentialState { valid = 0, suspended = 1, revoked = 2 }

export type MemberCredential = { tier: bigint;
                                 joinedAt: bigint;
                                 expiresAt: bigint;
                                 orgId: Uint8Array;
                                 active: boolean;
                                 renewalCount: bigint
                               };

export type GatePolicy = { orgId: Uint8Array;
                           minTier: bigint;
                           requireActive: boolean;
                           checkExpiry: boolean;
                           referenceTime: bigint
                         };

export type Witnesses<PS> = {
  privateKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  heldCredential(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, MemberCredential];
  credentialSalt(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  credentialPath(context: __compactRuntime.WitnessContext<Ledger, PS>,
                 commitment_0: Uint8Array): [PS, { leaf: Uint8Array,
                                                   path: { sibling: { field: bigint
                                                                    },
                                                           goes_left: boolean
                                                         }[]
                                                 }];
}

export type ImpureCircuits<PS> = {
  issueCredential(context: __compactRuntime.CircuitContext<PS>,
                  commitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  registerGate(context: __compactRuntime.CircuitContext<PS>,
               gateId_0: Uint8Array,
               policy_0: GatePolicy): Promise<__compactRuntime.CircuitResults<PS, []>>;
  verifyAccess(context: __compactRuntime.CircuitContext<PS>,
               gateId_0: Uint8Array,
               timestamp_0: bigint): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  suspendCredential(context: __compactRuntime.CircuitContext<PS>,
                    credCommitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  reactivateCredential(context: __compactRuntime.CircuitContext<PS>,
                       credCommitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  revokeCredential(context: __compactRuntime.CircuitContext<PS>,
                   credCommitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  updateGate(context: __compactRuntime.CircuitContext<PS>,
             gateId_0: Uint8Array,
             policy_0: GatePolicy): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type ProvableCircuits<PS> = {
  issueCredential(context: __compactRuntime.CircuitContext<PS>,
                  commitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  registerGate(context: __compactRuntime.CircuitContext<PS>,
               gateId_0: Uint8Array,
               policy_0: GatePolicy): Promise<__compactRuntime.CircuitResults<PS, []>>;
  verifyAccess(context: __compactRuntime.CircuitContext<PS>,
               gateId_0: Uint8Array,
               timestamp_0: bigint): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  suspendCredential(context: __compactRuntime.CircuitContext<PS>,
                    credCommitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  reactivateCredential(context: __compactRuntime.CircuitContext<PS>,
                       credCommitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  revokeCredential(context: __compactRuntime.CircuitContext<PS>,
                   credCommitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  updateGate(context: __compactRuntime.CircuitContext<PS>,
             gateId_0: Uint8Array,
             policy_0: GatePolicy): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type PureCircuits = {
  authorityKey(sk_0: Uint8Array): Uint8Array;
  verifierKey(sk_0: Uint8Array): Uint8Array;
  memberKey(sk_0: Uint8Array): Uint8Array;
  credentialCommitment(cred_0: MemberCredential,
                       holder_0: Uint8Array,
                       salt_0: Uint8Array): Uint8Array;
  gatePassFor(gateId_0: Uint8Array, memberSk_0: Uint8Array): Uint8Array;
  revocationHash(commitment_0: Uint8Array): Uint8Array;
  satisfiesGate(cred_0: MemberCredential, policy_0: GatePolicy): boolean;
}

export type Circuits<PS> = {
  authorityKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  verifierKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  memberKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  credentialCommitment(context: __compactRuntime.CircuitContext<PS>,
                       cred_0: MemberCredential,
                       holder_0: Uint8Array,
                       salt_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  gatePassFor(context: __compactRuntime.CircuitContext<PS>,
              gateId_0: Uint8Array,
              memberSk_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  revocationHash(context: __compactRuntime.CircuitContext<PS>,
                 commitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  satisfiesGate(context: __compactRuntime.CircuitContext<PS>,
                cred_0: MemberCredential,
                policy_0: GatePolicy): Promise<__compactRuntime.CircuitResults<PS, boolean>>;
  issueCredential(context: __compactRuntime.CircuitContext<PS>,
                  commitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  registerGate(context: __compactRuntime.CircuitContext<PS>,
               gateId_0: Uint8Array,
               policy_0: GatePolicy): Promise<__compactRuntime.CircuitResults<PS, []>>;
  verifyAccess(context: __compactRuntime.CircuitContext<PS>,
               gateId_0: Uint8Array,
               timestamp_0: bigint): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  suspendCredential(context: __compactRuntime.CircuitContext<PS>,
                    credCommitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  reactivateCredential(context: __compactRuntime.CircuitContext<PS>,
                       credCommitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  revokeCredential(context: __compactRuntime.CircuitContext<PS>,
                   credCommitment_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  updateGate(context: __compactRuntime.CircuitContext<PS>,
             gateId_0: Uint8Array,
             policy_0: GatePolicy): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type Ledger = {
  readonly authority: Uint8Array;
  members: {
    isFull(): boolean;
    checkRoot(rt_0: { field: bigint }): boolean;
    root(): __compactRuntime.MerkleTreeDigest;
    firstFree(): bigint;
    pathForLeaf(index_0: bigint, leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array>;
    findPathForLeaf(leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array> | undefined;
    history(): Iterator<__compactRuntime.MerkleTreeDigest>
  };
  readonly memberCount: bigint;
  gates: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): GatePolicy;
    [Symbol.iterator](): Iterator<[Uint8Array, GatePolicy]>
  };
  accessLog: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: Uint8Array): boolean;
      lookup(key_1: Uint8Array): bigint;
      [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
    }
  };
  accessCount: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): { read(): bigint }
  };
  revocations: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): CredentialState;
    [Symbol.iterator](): Iterator<[Uint8Array, CredentialState]>
  };
}

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): Promise<__compactRuntime.ConstructorResult<PS>>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
export declare const expectedVk: Record<string, string>;
export declare const circuitSignatures: __compactRuntime.CircuitSignatures;
export declare const declaredInterfaces: __compactRuntime.DeclaredInterfaces;
