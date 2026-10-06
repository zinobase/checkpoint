// SPDX-License-Identifier: Apache-2.0

export interface MemberCredential {
  tier: bigint;
  joinedAt: bigint;
  expiresAt: bigint;
  orgId: Uint8Array;
  active: boolean;
  renewalCount: bigint;
}

export class MembershipDomain {
  static createCredential(
    orgId: Uint8Array,
    tier: bigint = 1n,
    joinedAt: bigint = 0n,
    expiresAt: bigint = 10000n,
    active: boolean = true,
    renewalCount: bigint = 0n,
  ): MemberCredential {
    return {
      orgId,
      tier,
      joinedAt,
      expiresAt,
      active,
      renewalCount,
    };
  }

  static isValid(cred: MemberCredential, referenceTime: bigint): boolean {
    return cred.active && cred.expiresAt > referenceTime;
  }
}
