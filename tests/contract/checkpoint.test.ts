// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from 'vitest';
import {
  CredentialState,
  pureCircuits,
  type GatePolicy,
  type MemberCredential,
} from '../../contract/src/managed/checkpoint/contract/index.js';
import { Ledgerbook } from '../../contract/src/simulator.js';
import { GateDomain } from '../../contract/src/domain/gate.js';

function randomBytes(length: number = 32): Uint8Array {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

function makeCredential(
  orgId: Uint8Array,
  tier: bigint = 2n,
  joinedAt: bigint = 100n,
  expiresAt: bigint = 5000n,
  active: boolean = true,
  renewalCount: bigint = 0n,
): MemberCredential {
  return {
    tier,
    joinedAt,
    expiresAt,
    orgId,
    active,
    renewalCount,
  };
}

function makePolicy(
  orgId: Uint8Array,
  minTier: bigint = 2n,
  requireActive: boolean = true,
  checkExpiry: boolean = true,
  referenceTime: bigint = 1000n,
): GatePolicy {
  return {
    orgId,
    minTier,
    requireActive,
    checkExpiry,
    referenceTime,
  };
}

describe('Checkpoint Contract Execution', () => {
  describe('Pure Circuits & Cryptographic Primitives', () => {
    it('derives deterministic, domain-separated role keys for the same secret', () => {
      const sk = randomBytes(32);
      const authKey = pureCircuits.authorityKey(sk);
      const verKey = pureCircuits.verifierKey(sk);
      const memKey = pureCircuits.memberKey(sk);

      expect(authKey).toHaveLength(32);
      expect(verKey).toHaveLength(32);
      expect(memKey).toHaveLength(32);

      // Distinct role domain tags prevent cross-role impersonation
      expect(authKey).not.toEqual(verKey);
      expect(authKey).not.toEqual(memKey);
      expect(verKey).not.toEqual(memKey);

      // Determinism
      expect(pureCircuits.authorityKey(sk)).toEqual(authKey);
      expect(pureCircuits.verifierKey(sk)).toEqual(verKey);
      expect(pureCircuits.memberKey(sk)).toEqual(memKey);
    });

    it('generates hiding, binding credential commitments blinded by salt', () => {
      const orgId = randomBytes(32);
      const cred = makeCredential(orgId, 3n);
      const holder = randomBytes(32);
      const salt1 = randomBytes(32);
      const salt2 = randomBytes(32);

      const commit1 = pureCircuits.credentialCommitment(cred, holder, salt1);
      const commit2 = pureCircuits.credentialCommitment(cred, holder, salt2);

      expect(commit1).toHaveLength(32);
      expect(commit2).toHaveLength(32);
      expect(commit1).not.toEqual(commit2);
      expect(pureCircuits.credentialCommitment(cred, holder, salt1)).toEqual(commit1);
    });

    it('derives gate passes that are pseudonymous and unlinkable across gates', () => {
      const memberSk = randomBytes(32);
      const gateA = randomBytes(32);
      const gateB = randomBytes(32);

      const passA = pureCircuits.gatePassFor(gateA, memberSk);
      const passB = pureCircuits.gatePassFor(gateB, memberSk);

      expect(passA).toHaveLength(32);
      expect(passB).toHaveLength(32);

      // Passes at different gates are unlinkable
      expect(passA).not.toEqual(passB);

      // Pass at the same gate is deterministic (pseudonymous per gate)
      expect(pureCircuits.gatePassFor(gateA, memberSk)).toEqual(passA);
    });

    it('derives domain-separated revocation hashes from credential commitments', () => {
      const commit = randomBytes(32);
      const rHash = pureCircuits.revocationHash(commit);

      expect(rHash).toHaveLength(32);
      expect(rHash).not.toEqual(commit);
      expect(pureCircuits.revocationHash(commit)).toEqual(rHash);
    });

    it('differential fuzzing: pureCircuits.satisfiesGate matches GateDomain', () => {
      const orgA = randomBytes(32);
      const orgB = randomBytes(32);

      for (let i = 0; i < 100; i++) {
        const credOrg = Math.random() > 0.5 ? orgA : orgB;
        const tier = BigInt(Math.floor(Math.random() * 5));
        const active = Math.random() > 0.3;
        const expiresAt = BigInt(Math.floor(Math.random() * 10000));

        const cred = makeCredential(credOrg, tier, 0n, expiresAt, active);

        const polMinTier = BigInt(Math.floor(Math.random() * 5));
        const polRequireActive = Math.random() > 0.5;
        const polCheckExpiry = Math.random() > 0.5;
        const polRefTime = BigInt(Math.floor(Math.random() * 10000));

        const policy = makePolicy(
          orgA,
          polMinTier,
          polRequireActive,
          polCheckExpiry,
          polRefTime,
        );

        const tsResult = GateDomain.satisfiesGate(cred, policy);
        const circuitResult = pureCircuits.satisfiesGate(cred, policy);
        expect(circuitResult).toBe(tsResult);
      }
    });
  });

  describe('Contract Constructor & Initialization', () => {
    it('deploys contract setting authority key correctly', async () => {
      const authSk = randomBytes(32);
      const expectedAuth = pureCircuits.authorityKey(authSk);

      const net = await Ledgerbook.deploy(authSk);
      const ledger = net.ledger();

      expect(ledger.authority).toEqual(expectedAuth);
      expect(ledger.memberCount).toBe(0n);
      expect(ledger.gates.isEmpty()).toBe(true);
      expect(ledger.accessLog.isEmpty()).toBe(true);
      expect(ledger.accessCount.isEmpty()).toBe(true);
      expect(ledger.revocations.isEmpty()).toBe(true);
    });
  });

  describe('Access Lifecycle - Credential Issuance & Gate Verification', () => {
    it('issues credential and grants access through gate', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const orgId = randomBytes(32);
      const gateId = randomBytes(32);
      const policy = makePolicy(orgId, 2n, true, true, 1000n);

      // Authority registers gate
      await authority.registerGate(gateId, policy);

      let ledger = net.ledger();
      expect(ledger.gates.member(gateId)).toBe(true);

      // Member receives credential
      const memberSk = randomBytes(32);
      const memberHolder = pureCircuits.memberKey(memberSk);
      const cred = makeCredential(orgId, 3n, 100n, 5000n, true);
      const salt = randomBytes(32);

      const commitment = pureCircuits.credentialCommitment(cred, memberHolder, salt);

      // Authority issues credential by inserting commitment into tree
      await authority.issueCredential(commitment);

      ledger = net.ledger();
      expect(ledger.memberCount).toBe(1n);

      // Member verifies access at gate
      const member = net.join(memberSk, cred, salt);
      const pass = await member.verifyAccess(gateId, 1500n);

      const expectedPass = pureCircuits.gatePassFor(gateId, memberSk);
      expect(pass).toEqual(expectedPass);

      // Verify access count and access log
      ledger = net.ledger();
      expect(ledger.accessCount.lookup(gateId).read()).toBe(1n);
      expect(ledger.accessLog.lookup(gateId).member(pass)).toBe(true);
      expect(ledger.accessLog.lookup(gateId).lookup(pass)).toBe(1500n);
    });

    it('records repeat visits by same member at same gate under pseudonymous pass', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const orgId = randomBytes(32);
      const gateId = randomBytes(32);
      await authority.registerGate(gateId, makePolicy(orgId, 1n, false, false, 0n));

      const memberSk = randomBytes(32);
      const memberHolder = pureCircuits.memberKey(memberSk);
      const cred = makeCredential(orgId, 1n);
      const salt = randomBytes(32);

      const commitment = pureCircuits.credentialCommitment(cred, memberHolder, salt);
      await authority.issueCredential(commitment);

      const member = net.join(memberSk, cred, salt);

      const pass1 = await member.verifyAccess(gateId, 100n);
      const pass2 = await member.verifyAccess(gateId, 200n);

      expect(pass1).toEqual(pass2);
      expect(net.ledger().accessCount.lookup(gateId).read()).toBe(2n);
      expect(net.ledger().accessLog.lookup(gateId).lookup(pass1)).toBe(200n);
    });
  });

  describe('Policy Violation Rejections', () => {
    it('rejects access if credential organization does not match gate policy', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const gateOrg = randomBytes(32);
      const otherOrg = randomBytes(32);
      const gateId = randomBytes(32);

      await authority.registerGate(gateId, makePolicy(gateOrg, 1n, false, false, 0n));

      const memberSk = randomBytes(32);
      const cred = makeCredential(otherOrg, 1n);
      const salt = randomBytes(32);
      const commitment = pureCircuits.credentialCommitment(
        cred,
        pureCircuits.memberKey(memberSk),
        salt,
      );
      await authority.issueCredential(commitment);

      const member = net.join(memberSk, cred, salt);
      await expect(member.verifyAccess(gateId, 100n)).rejects.toThrow();
    });

    it('rejects access if credential tier is below policy minimum', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const orgId = randomBytes(32);
      const gateId = randomBytes(32);
      // Policy requires tier >= 3
      await authority.registerGate(gateId, makePolicy(orgId, 3n, false, false, 0n));

      const memberSk = randomBytes(32);
      // Member has tier 2
      const cred = makeCredential(orgId, 2n);
      const salt = randomBytes(32);
      const commitment = pureCircuits.credentialCommitment(
        cred,
        pureCircuits.memberKey(memberSk),
        salt,
      );
      await authority.issueCredential(commitment);

      const member = net.join(memberSk, cred, salt);
      await expect(member.verifyAccess(gateId, 100n)).rejects.toThrow();
    });

    it('rejects access if credential is inactive and policy requires active', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const orgId = randomBytes(32);
      const gateId = randomBytes(32);
      await authority.registerGate(gateId, makePolicy(orgId, 1n, true, false, 0n));

      const memberSk = randomBytes(32);
      const cred = makeCredential(orgId, 1n, 0n, 5000n, false);
      const salt = randomBytes(32);
      const commitment = pureCircuits.credentialCommitment(
        cred,
        pureCircuits.memberKey(memberSk),
        salt,
      );
      await authority.issueCredential(commitment);

      const member = net.join(memberSk, cred, salt);
      await expect(member.verifyAccess(gateId, 100n)).rejects.toThrow();
    });

    it('rejects access if credential is expired and policy checks expiry', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const orgId = randomBytes(32);
      const gateId = randomBytes(32);
      // referenceTime 2000n
      await authority.registerGate(gateId, makePolicy(orgId, 1n, false, true, 2000n));

      const memberSk = randomBytes(32);
      // expiresAt 1500n <= 2000n
      const cred = makeCredential(orgId, 1n, 0n, 1500n, true);
      const salt = randomBytes(32);
      const commitment = pureCircuits.credentialCommitment(
        cred,
        pureCircuits.memberKey(memberSk),
        salt,
      );
      await authority.issueCredential(commitment);

      const member = net.join(memberSk, cred, salt);
      await expect(member.verifyAccess(gateId, 2100n)).rejects.toThrow();
    });

    it('rejects access when credential commitment was never inserted in member tree', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const orgId = randomBytes(32);
      const gateId = randomBytes(32);
      await authority.registerGate(gateId, makePolicy(orgId, 1n, false, false, 0n));

      const memberSk = randomBytes(32);
      const cred = makeCredential(orgId, 1n);
      const salt = randomBytes(32);

      // Notice: issueCredential is NOT called!
      const member = net.join(memberSk, cred, salt);
      await expect(member.verifyAccess(gateId, 100n)).rejects.toThrow();
    });
  });

  describe('Granular Revocation & Member Isolation', () => {
    it('revokes specific credential while leaving other members in the organization active', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const orgId = randomBytes(32);
      const gateId = randomBytes(32);
      await authority.registerGate(gateId, makePolicy(orgId, 1n, false, false, 0n));

      // Member 1
      const m1Sk = randomBytes(32);
      const m1Cred = makeCredential(orgId, 1n);
      const m1Salt = randomBytes(32);
      const m1Commit = pureCircuits.credentialCommitment(
        m1Cred,
        pureCircuits.memberKey(m1Sk),
        m1Salt,
      );
      await authority.issueCredential(m1Commit);

      // Member 2
      const m2Sk = randomBytes(32);
      const m2Cred = makeCredential(orgId, 1n);
      const m2Salt = randomBytes(32);
      const m2Commit = pureCircuits.credentialCommitment(
        m2Cred,
        pureCircuits.memberKey(m2Sk),
        m2Salt,
      );
      await authority.issueCredential(m2Commit);

      const member1 = net.join(m1Sk, m1Cred, m1Salt);
      const member2 = net.join(m2Sk, m2Cred, m2Salt);

      // Both can access initially
      await expect(member1.verifyAccess(gateId, 100n)).resolves.toBeDefined();
      await expect(member2.verifyAccess(gateId, 100n)).resolves.toBeDefined();

      // Authority revokes ONLY Member 1's commitment
      await authority.revokeCredential(m1Commit);

      const rHash1 = pureCircuits.revocationHash(m1Commit);
      expect(net.ledger().revocations.member(rHash1)).toBe(true);
      expect(net.ledger().revocations.lookup(rHash1)).toBe(CredentialState.revoked);

      // Member 1 is now rejected
      await expect(member1.verifyAccess(gateId, 200n)).rejects.toThrow();

      // Member 2 continues to have access unimpeded
      await expect(member2.verifyAccess(gateId, 200n)).resolves.toBeDefined();
    });

    it('supports temporary credential suspension and reactivation lifecycle', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const orgId = randomBytes(32);
      const gateId = randomBytes(32);
      await authority.registerGate(gateId, makePolicy(orgId, 1n, false, false, 0n));

      const memberSk = randomBytes(32);
      const cred = makeCredential(orgId, 1n);
      const salt = randomBytes(32);
      const commit = pureCircuits.credentialCommitment(
        cred,
        pureCircuits.memberKey(memberSk),
        salt,
      );
      await authority.issueCredential(commit);

      const member = net.join(memberSk, cred, salt);

      // Access is granted initially
      await expect(member.verifyAccess(gateId, 100n)).resolves.toBeDefined();

      // Authority suspends credential temporarily
      await authority.suspendCredential(commit);
      const rHash = pureCircuits.revocationHash(commit);
      expect(net.ledger().revocations.member(rHash)).toBe(true);
      expect(net.ledger().revocations.lookup(rHash)).toBe(CredentialState.suspended);

      // Member cannot access while suspended
      await expect(member.verifyAccess(gateId, 150n)).rejects.toThrow();

      // Authority reactivates credential
      await authority.reactivateCredential(commit);
      expect(net.ledger().revocations.lookup(rHash)).toBe(CredentialState.valid);

      // Member access is restored
      await expect(member.verifyAccess(gateId, 200n)).resolves.toBeDefined();
    });
  });

  describe('Gate Administration & Access Control', () => {
    it('allows authority to update gate policy dynamically', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const orgId = randomBytes(32);
      const gateId = randomBytes(32);
      await authority.registerGate(gateId, makePolicy(orgId, 1n, false, false, 0n));

      const memberSk = randomBytes(32);
      const cred = makeCredential(orgId, 1n);
      const salt = randomBytes(32);
      const commit = pureCircuits.credentialCommitment(
        cred,
        pureCircuits.memberKey(memberSk),
        salt,
      );
      await authority.issueCredential(commit);

      const member = net.join(memberSk, cred, salt);
      await expect(member.verifyAccess(gateId, 100n)).resolves.toBeDefined();

      // Authority raises tier to 2
      await authority.updateGate(gateId, makePolicy(orgId, 2n, false, false, 0n));

      // Tier 1 member is now rejected
      await expect(member.verifyAccess(gateId, 200n)).rejects.toThrow();
    });

    it('rejects gate operations by unauthorized non-authority callers', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);

      const stranger = net.join(randomBytes(32));
      const gateId = randomBytes(32);
      const policy = makePolicy(randomBytes(32));

      await expect(stranger.registerGate(gateId, policy)).rejects.toThrow();
      await expect(stranger.issueCredential(randomBytes(32))).rejects.toThrow();
      await expect(stranger.revokeCredential(randomBytes(32))).rejects.toThrow();
      await expect(stranger.updateGate(gateId, policy)).rejects.toThrow();
    });

    it('rejects access verification at non-existent gate', async () => {
      const net = await Ledgerbook.deploy(randomBytes(32));
      const member = net.join(randomBytes(32), makeCredential(randomBytes(32)), randomBytes(32));

      await expect(member.verifyAccess(randomBytes(32), 100n)).rejects.toThrow();
    });
  });

  describe('Zero-Knowledge Public Ledger Privacy Audit', () => {
    it('confirms private member secrets, salt, and attributes never leak to public ledger', async () => {
      const authSk = randomBytes(32);
      const net = await Ledgerbook.deploy(authSk);
      const authority = net.join(authSk);

      const orgId = randomBytes(32);
      const gateId = randomBytes(32);
      await authority.registerGate(gateId, makePolicy(orgId, 1n, false, false, 0n));

      const memberSk = randomBytes(32);
      const memberSalt = randomBytes(32);
      const secretTier = 7n;
      const secretJoinedAt = 98765n;
      const cred = makeCredential(orgId, secretTier, secretJoinedAt, 50000n, true);

      const commit = pureCircuits.credentialCommitment(
        cred,
        pureCircuits.memberKey(memberSk),
        memberSalt,
      );
      await authority.issueCredential(commit);

      const member = net.join(memberSk, cred, memberSalt);
      await member.verifyAccess(gateId, 1000n);

      const serializedLedger = JSON.stringify(
        net.contractState,
        (_, value) => (typeof value === 'bigint' ? value.toString() : value),
      );

      // Private secret key must never appear
      expect(serializedLedger).not.toContain(Buffer.from(memberSk).toString('hex'));
      // Blinding salt must never appear
      expect(serializedLedger).not.toContain(Buffer.from(memberSalt).toString('hex'));
      // Member joinedAt must never appear
      expect(serializedLedger).not.toContain('98765');
    });
  });
});
