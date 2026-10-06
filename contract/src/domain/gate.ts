// SPDX-License-Identifier: Apache-2.0

import type { MemberCredential } from './membership.js';

export interface GatePolicy {
  orgId: Uint8Array;
  minTier: bigint;
  requireActive: boolean;
  checkExpiry: boolean;
  referenceTime: bigint;
}

export class GateDomain {
  static satisfiesGate(cred: MemberCredential, policy: GatePolicy): boolean {
    const orgMatch =
      cred.orgId.length === policy.orgId.length &&
      cred.orgId.every((b, i) => b === policy.orgId[i]);
    const tierOk = cred.tier >= policy.minTier;
    const activeOk = !policy.requireActive || cred.active;
    const expiryOk = !policy.checkExpiry || cred.expiresAt > policy.referenceTime;
    return orgMatch && tierOk && activeOk && expiryOk;
  }
}
