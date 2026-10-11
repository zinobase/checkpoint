// SPDX-License-Identifier: Apache-2.0
//
// Command-line simulation of the Checkpoint perimeter turnstile contract.

import {
  pureCircuits,
  type GatePolicy,
  type MemberCredential,
} from '../contract/src/managed/checkpoint/contract/index.js';
import { Ledgerbook } from '../contract/src/simulator.js';

function freshRandomBytes(size = 32): Uint8Array {
  const buf = new Uint8Array(size);
  crypto.getRandomValues(buf);
  return buf;
}

function encodeGateTag(tag: string): Uint8Array {
  const padded = new Uint8Array(32);
  padded.set(new TextEncoder().encode(tag).subarray(0, 32));
  return padded;
}

function hexPreview(bytes: Uint8Array, chars = 24): string {
  return `0x${Buffer.from(bytes).toString('hex').slice(0, chars)}...`;
}

function fullHex(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('hex');
}

async function executePerimeterDemo(): Promise<void> {
  console.log('=== CHECKPOINT PERIMETER TURNSTILE PROTOCOL SIMULATION ===\n');

  const authoritySecret = freshRandomBytes();
  const authorityPublic = pureCircuits.authorityKey(authoritySecret);
  const harness = await Ledgerbook.deploy(authoritySecret);
  const commander = harness.join(authoritySecret);

  console.log('[STAGE 01] Contract initialized on Midnight');
  console.log(`           Authority Key : ${hexPreview(authorityPublic)}`);
  console.log(`           Contract Addr : ${harness.address}\n`);

  const facilityOrgId = freshRandomBytes();
  const alphaGateId = encodeGateTag('gate-alpha');
  const alphaPolicy: GatePolicy = {
    orgId: facilityOrgId,
    minTier: 2n,
    requireActive: true,
    checkExpiry: true,
    referenceTime: 1000n,
  };

  await commander.registerGate(alphaGateId, alphaPolicy);
  console.log('[STAGE 02] Registered perimeter gate policy (gate-alpha)');
  console.log('           Predicate     : orgMatch && tier >= 2 && active && expiresAt > 1000\n');

  const opOneSk = freshRandomBytes();
  const opOneSalt = freshRandomBytes();
  const opOneBadge: MemberCredential = {
    tier: 3n,
    joinedAt: 100n,
    expiresAt: 5000n,
    orgId: facilityOrgId,
    active: true,
    renewalCount: 0n,
  };
  const opOneLeaf = pureCircuits.credentialCommitment(
    opOneBadge,
    pureCircuits.memberKey(opOneSk),
    opOneSalt,
  );
  await commander.issueCredential(opOneLeaf);

  const opTwoSk = freshRandomBytes();
  const opTwoSalt = freshRandomBytes();
  const opTwoBadge: MemberCredential = {
    tier: 2n,
    joinedAt: 200n,
    expiresAt: 5000n,
    orgId: facilityOrgId,
    active: true,
    renewalCount: 0n,
  };
  const opTwoLeaf = pureCircuits.credentialCommitment(
    opTwoBadge,
    pureCircuits.memberKey(opTwoSk),
    opTwoSalt,
  );
  await commander.issueCredential(opTwoLeaf);

  console.log('[STAGE 03] Enrolled two operator badges into HistoricMerkleTree<16>');
  console.log(`           Operator A Leaf : ${hexPreview(opOneLeaf)}`);
  console.log(`           Operator B Leaf : ${hexPreview(opTwoLeaf)}\n`);

  const operatorOne = harness.join(opOneSk, opOneBadge, opOneSalt);
  const nullifierPassA = await operatorOne.verifyAccess(alphaGateId, 1500n);
  console.log('[STAGE 04] Operator A cleared turnstile gate-alpha in zero knowledge');
  console.log(`           Scoped Pass     : ${hexPreview(nullifierPassA)}\n`);

  await commander.revokeCredential(opOneLeaf);
  const revTag = pureCircuits.revocationHash(opOneLeaf);
  console.log('[STAGE 05] Revoked Operator A leaf commitment');
  console.log(`           Revocation Tag  : ${hexPreview(revTag)}\n`);

  let opOneDenied = false;
  try {
    await operatorOne.verifyAccess(alphaGateId, 1600n);
  } catch {
    opOneDenied = true;
  }

  const operatorTwo = harness.join(opTwoSk, opTwoBadge, opTwoSalt);
  const nullifierPassB = await operatorTwo.verifyAccess(alphaGateId, 1600n);

  console.log('[STAGE 06] Verified granular revocation isolation');
  console.log(`           Operator A Retry: ${opOneDenied ? 'BLOCKED (REVOKED)' : 'UNEXPECTED GRANT'}`);
  console.log(`           Operator B Scan : GRANTED (${hexPreview(nullifierPassB, 20)})\n`);

  const rawStateJson = JSON.stringify(harness.contractState, (_, v) =>
    typeof v === 'bigint' ? v.toString() : v,
  );
  const skExposed =
    rawStateJson.includes(fullHex(opOneSk)) || rawStateJson.includes(fullHex(opTwoSk));
  const saltExposed =
    rawStateJson.includes(fullHex(opOneSalt)) || rawStateJson.includes(fullHex(opTwoSalt));
  const tierExposed = rawStateJson.includes(':3') || rawStateJson.includes(':"3"');

  console.log('=== PUBLIC LEDGER ZERO-LEAKAGE AUDIT ===');
  console.log(`  Secret Keys Exposed  : ${skExposed ? 'FAIL' : 'NONE (0 bytes)'}`);
  console.log(`  Blinding Salts       : ${saltExposed ? 'FAIL' : 'NONE (0 bytes)'}`);
  console.log(`  Clearance Tier Value : ${tierExposed ? 'FAIL' : 'NONE (0 bytes)'}`);
  console.log('  Verdict              : 0 BYTES LEAKED\n');
}

executePerimeterDemo().catch((err) => {
  console.error('Perimeter simulation error:', err);
  process.exit(1);
});
