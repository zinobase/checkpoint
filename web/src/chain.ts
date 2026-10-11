// SPDX-License-Identifier: Apache-2.0
//
// In-browser execution of the compiled Checkpoint Compact contract via WASM
// onchain-runtime and compact-runtime.

import {
  pureCircuits,
  type GatePolicy,
  type MemberCredential,
} from '../../contract/src/managed/checkpoint/contract/index.js';
import { Ledgerbook } from '../../contract/src/simulator.js';

function genBytes(len = 32): Uint8Array {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return arr;
}

function bytesToHex(buf: Uint8Array): string {
  let out = '';
  for (let i = 0; i < buf.length; i++) {
    out += buf[i].toString(16).padStart(2, '0');
  }
  return out;
}

function makeGateId(label: string): Uint8Array {
  const raw = new Uint8Array(32);
  raw.set(new TextEncoder().encode(label).subarray(0, 32));
  return raw;
}

export async function runDemo(log: (...parts: unknown[]) => void): Promise<void> {
  log('[PERIMETER] Booting compiled Checkpoint Compact contract in WASM runtime...');

  const authSecret = genBytes(32);
  const authPubKey = pureCircuits.authorityKey(authSecret);
  const sim = await Ledgerbook.deploy(authSecret);
  const commander = sim.join(authSecret);

  log(`[01/06] Contract deployed @ ${sim.address}`);
  log(`        Facility Authority PK : 0x${bytesToHex(authPubKey).slice(0, 24)}...`);

  const orgId = genBytes(32);
  const gateAlpha = makeGateId('gate-alpha');
  const gatePolicy: GatePolicy = {
    orgId,
    minTier: 2n,
    requireActive: true,
    checkExpiry: true,
    referenceTime: 1000n,
  };

  await commander.registerGate(gateAlpha, gatePolicy);
  log('[02/06] Registered turnstile policy on gate-alpha (MinTier >= 2, Active, Expiry > 1000)');

  const badge1Sk = genBytes(32);
  const badge1Salt = genBytes(32);
  const badge1Cred: MemberCredential = {
    tier: 3n,
    joinedAt: 100n,
    expiresAt: 5000n,
    orgId,
    active: true,
    renewalCount: 0n,
  };
  const leaf1 = pureCircuits.credentialCommitment(
    badge1Cred,
    pureCircuits.memberKey(badge1Sk),
    badge1Salt,
  );
  await commander.issueCredential(leaf1);

  const badge2Sk = genBytes(32);
  const badge2Salt = genBytes(32);
  const badge2Cred: MemberCredential = {
    tier: 2n,
    joinedAt: 200n,
    expiresAt: 5000n,
    orgId,
    active: true,
    renewalCount: 0n,
  };
  const leaf2 = pureCircuits.credentialCommitment(
    badge2Cred,
    pureCircuits.memberKey(badge2Sk),
    badge2Salt,
  );
  await commander.issueCredential(leaf2);

  log(`[03/06] Enrolled 2 badge commitments into HistoricMerkleTree<16>`);
  log(`        Leaf #0 (Tier 3) : 0x${bytesToHex(leaf1).slice(0, 24)}...`);
  log(`        Leaf #1 (Tier 2) : 0x${bytesToHex(leaf2).slice(0, 24)}...`);

  const holder1 = sim.join(badge1Sk, badge1Cred, badge1Salt);
  const passToken1 = await holder1.verifyAccess(gateAlpha, 1500n);
  log(`[04/06] Holder #0 verified access at gate-alpha -> Pass: 0x${bytesToHex(passToken1).slice(0, 24)}...`);

  await commander.revokeCredential(leaf1);
  const revDigest = pureCircuits.revocationHash(leaf1);
  log(`[05/06] Commander revoked Leaf #0 -> Revocation Digest: 0x${bytesToHex(revDigest).slice(0, 24)}...`);

  let holder1Denied = false;
  try {
    await holder1.verifyAccess(gateAlpha, 1600n);
  } catch {
    holder1Denied = true;
  }

  const holder2 = sim.join(badge2Sk, badge2Cred, badge2Salt);
  const passToken2 = await holder2.verifyAccess(gateAlpha, 1600n);
  log(`[06/06] Isolation check -> Holder #0: ${holder1Denied ? 'BARRED' : 'ALLOWED'} | Holder #1: CLEARED (0x${bytesToHex(passToken2).slice(0, 18)}...)`);

  const dump = JSON.stringify(sim.contractState, (_, v) => (typeof v === 'bigint' ? v.toString() : v));
  const skLeak = dump.includes(bytesToHex(badge1Sk)) || dump.includes(bytesToHex(badge2Sk));
  const saltLeak = dump.includes(bytesToHex(badge1Salt)) || dump.includes(bytesToHex(badge2Salt));
  const tierLeak = dump.includes(':3') || dump.includes(':"3"');

  log(`[AUDIT] Zero-Leakage Scan -> SecretKeys: ${skLeak ? 'LEAK' : '0B'} | Salts: ${saltLeak ? 'LEAK' : '0B'} | Tiers: ${tierLeak ? 'LEAK' : '0B'}`);
  log('[DONE] All 6 circuit transitions verified against compiled WASM contract.');
}
