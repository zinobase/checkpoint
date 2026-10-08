// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from 'vitest';
import { GateDomain, type GatePolicy } from '../../contract/src/domain/gate.js';
import { MembershipDomain } from '../../contract/src/domain/membership.js';

describe('Gate Domain', () => {
  const orgA = new Uint8Array(32);
  orgA[0] = 0xaa;
  const orgB = new Uint8Array(32);
  orgB[0] = 0xbb;

  const standardPolicy: GatePolicy = {
    orgId: orgA,
    minTier: 2n,
    requireActive: true,
    checkExpiry: true,
    referenceTime: 1000n,
  };

  it('satisfies policy when all conditions are met', () => {
    const cred = MembershipDomain.createCredential(orgA, 2n, 0n, 2000n, true);
    expect(GateDomain.satisfiesGate(cred, standardPolicy)).toBe(true);
  });

  it('fails when organization mismatches', () => {
    const cred = MembershipDomain.createCredential(orgB, 2n, 0n, 2000n, true);
    expect(GateDomain.satisfiesGate(cred, standardPolicy)).toBe(false);
  });

  it('fails when tier is insufficient', () => {
    const cred = MembershipDomain.createCredential(orgA, 1n, 0n, 2000n, true);
    expect(GateDomain.satisfiesGate(cred, standardPolicy)).toBe(false);
  });

  it('fails when inactive and policy requires active', () => {
    const cred = MembershipDomain.createCredential(orgA, 2n, 0n, 2000n, false);
    expect(GateDomain.satisfiesGate(cred, standardPolicy)).toBe(false);
  });

  it('fails when expired and policy checks expiry', () => {
    const cred = MembershipDomain.createCredential(orgA, 2n, 0n, 900n, true);
    expect(GateDomain.satisfiesGate(cred, standardPolicy)).toBe(false);
  });
});
