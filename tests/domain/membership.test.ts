// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from 'vitest';
import { MembershipDomain } from '../../contract/src/domain/membership.js';

describe('Membership Domain', () => {
  it('creates member credential with default properties', () => {
    const orgId = new Uint8Array(32);
    orgId[0] = 1;
    const cred = MembershipDomain.createCredential(orgId, 2n);
    expect(cred.orgId).toEqual(orgId);
    expect(cred.tier).toBe(2n);
    expect(cred.active).toBe(true);
    expect(cred.renewalCount).toBe(0n);
  });

  it('validates active status and expiry time', () => {
    const orgId = new Uint8Array(32);
    const cred = MembershipDomain.createCredential(orgId, 1n, 0n, 1000n, true);
    expect(MembershipDomain.isValid(cred, 500n)).toBe(true);
    expect(MembershipDomain.isValid(cred, 1000n)).toBe(false);
    expect(MembershipDomain.isValid(cred, 1500n)).toBe(false);

    const inactiveCred = MembershipDomain.createCredential(orgId, 1n, 0n, 1000n, false);
    expect(MembershipDomain.isValid(inactiveCred, 500n)).toBe(false);
  });
});
