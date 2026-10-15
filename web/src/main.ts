import { piezoAudio } from './audio';
import { runDemo } from './chain';
import {
  deriveAuthorityPreview,
  deriveBadgeCommitmentPreview,
  deriveGateNullifierPreview,
  deriveHolderPreview,
  deriveRevocationTagPreview,
  encodeHex,
} from './crypto';
import {
  createPerimeterStore,
  type EnrolledBadgeRecord,
  type PerimeterConsoleStore,
  type StandingFlag,
  type TurnstilePolicySpec,
} from './state';

function byId<T extends HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

function randomSecret32(): Uint8Array {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  return buf;
}

function pauseMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let store: PerimeterConsoleStore;
let rotorAngleDeg = 0;
let scanBusy = false;

// DOM references
const btnPiezoToggle = byId<HTMLButtonElement>('btnPiezoToggle');
const stripGatesCount = byId<HTMLElement>('stripGatesCount');
const stripRosterCount = byId<HTMLElement>('stripRosterCount');
const stripPassagesCount = byId<HTMLElement>('stripPassagesCount');
const stripRevokedCount = byId<HTMLElement>('stripRevokedCount');

const scenPatrol = byId<HTMLButtonElement>('scenPatrol');
const scenVault = byId<HTMLButtonElement>('scenVault');
const scenSuspended = byId<HTMLButtonElement>('scenSuspended');

const rosterActiveSlotLabel = byId<HTMLElement>('rosterActiveSlotLabel');
const rosterListContainer = byId<HTMLElement>('rosterListContainer');

const fldCallsign = byId<HTMLInputElement>('fldCallsign');
const fldTier = byId<HTMLSelectElement>('fldTier');
const fldActive = byId<HTMLSelectElement>('fldActive');
const fldExpiry = byId<HTMLInputElement>('fldExpiry');
const btnEnrollCredential = byId<HTMLButtonElement>('btnEnrollCredential');

const btnSuspendBadge = byId<HTMLButtonElement>('btnSuspendBadge');
const btnRestoreBadge = byId<HTMLButtonElement>('btnRestoreBadge');
const btnRevokeBadge = byId<HTMLButtonElement>('btnRevokeBadge');

const activeGateBanner = byId<HTMLElement>('activeGateBanner');
const turnstileViewport = byId<HTMLElement>('turnstileViewport');
const tierLedStrip = byId<HTMLElement>('tierLedStrip');
const solenoidBanner = byId<HTMLElement>('solenoidBanner');
const standingLedBadge = byId<HTMLElement>('standingLedBadge');
const svgTurnstileRotor = byId<HTMLElement>('svgTurnstileRotor');
const btnRfidTap = byId<HTMLButtonElement>('btnRfidTap');

const cardCallsign = byId<HTMLElement>('cardCallsign');
const cardTierLabel = byId<HTMLElement>('cardTierLabel');
const cardCommitmentHex = byId<HTMLElement>('cardCommitmentHex');
const cardRevocationHex = byId<HTMLElement>('cardRevocationHex');

const scopedPassReadout = byId<HTMLElement>('scopedPassReadout');
const zkTraceLog = byId<HTMLElement>('zkTraceLog');

const selActiveGate = byId<HTMLSelectElement>('selActiveGate');
const polMinTier = byId<HTMLSelectElement>('polMinTier');
const polRefTime = byId<HTMLInputElement>('polRefTime');
const polReqActive = byId<HTMLSelectElement>('polReqActive');
const polCheckExpiry = byId<HTMLSelectElement>('polCheckExpiry');
const btnApplyGatePolicy = byId<HTMLButtonElement>('btnApplyGatePolicy');
const nullifierFeedBody = byId<HTMLElement>('nullifierFeedBody');

const leakAuditChip = byId<HTMLElement>('leakAuditChip');
const telAuthorityPk = byId<HTMLElement>('telAuthorityPk');
const telMerkleRoot = byId<HTMLElement>('telMerkleRoot');
const telOrgDigest = byId<HTMLElement>('telOrgDigest');
const telWitnessState = byId<HTMLElement>('telWitnessState');

const btnExecCompiledContract = byId<HTMLButtonElement>('btnExecCompiledContract');
const contractRunState = byId<HTMLElement>('contractRunState');
const wasmContractOutput = byId<HTMLElement>('wasmContractOutput');

function appendZkTrace(text: string, tone: 'ok' | 'warn' | 'deny' | '' = ''): void {
  const row = document.createElement('div');
  row.className = tone ? `zk-trace-row ${tone}` : 'zk-trace-row';
  row.textContent = text;
  zkTraceLog.appendChild(row);
  zkTraceLog.scrollTop = zkTraceLog.scrollHeight;
}

async function createAndEnrollOperator(
  callsign: string,
  tier: number,
  active: boolean,
  expiresAt: number,
): Promise<EnrolledBadgeRecord> {
  const secretKey = randomSecret32();
  const holderKey = await deriveHolderPreview(secretKey);
  const salt = randomSecret32();
  const joinedAt = 100 + store.roster.length * 50;

  const commitmentBytes = await deriveBadgeCommitmentPreview({
    tier,
    joinedAt,
    expiresAt,
    orgIdBytes: store.orgIdBytes,
    active,
    renewalCount: 0,
    holderPubKey: holderKey,
    blindingSalt: salt,
  });

  const revocationBytes = await deriveRevocationTagPreview(commitmentBytes);

  return store.enrollBadge({
    callsign,
    tier,
    active,
    expiresAt,
    commitmentBytes,
    commitmentHex: encodeHex(commitmentBytes),
    revocationTagHex: encodeHex(revocationBytes),
    secretKey,
    holderKey,
    salt,
    joinedAt,
  });
}

function syncGateSelectorOptions(): void {
  const prev = selActiveGate.value;
  selActiveGate.innerHTML = '';
  for (const [code, spec] of store.gates.entries()) {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = `${code} (${spec.sectorLabel} / T>=${spec.minTier})`;
    selActiveGate.appendChild(opt);
  }
  if (prev && store.gates.has(prev)) {
    selActiveGate.value = prev;
  }
  syncPolicyEditorFromSelectedGate();
}

function syncPolicyEditorFromSelectedGate(): void {
  const spec = store.gates.get(selActiveGate.value);
  if (!spec) return;
  polMinTier.value = String(spec.minTier);
  polRefTime.value = String(spec.referenceTime);
  polReqActive.value = spec.requireActive ? 'true' : 'false';
  polCheckExpiry.value = spec.checkExpiry ? 'true' : 'false';
  activeGateBanner.textContent = spec.gateCode.toUpperCase();
}

function syncRosterAndActiveCard(): void {
  rosterListContainer.innerHTML = '';
  const active = store.getActiveBadge();

  for (const item of store.roster) {
    const st = store.getStanding(item.revocationTagHex);
    const row = document.createElement('div');
    row.className =
      active && active.slotId === item.slotId
        ? 'roster-row-item active-slot'
        : 'roster-row-item';

    const left = document.createElement('div');
    left.className = 'roster-row-left';

    const title = document.createElement('span');
    title.className = 'roster-callsign';
    title.textContent = `#${item.slotId} ${item.callsign} [T${item.tier}]`;

    const sub = document.createElement('span');
    sub.className = 'roster-leaf-preview';
    sub.textContent = `0x${item.commitmentHex.slice(0, 14)}...`;

    left.appendChild(title);
    left.appendChild(sub);

    const pill = document.createElement('span');
    pill.className = 'roster-pill';
    pill.dataset.st = st;
    pill.textContent = item.active ? st : 'INACTIVE';

    row.appendChild(left);
    row.appendChild(pill);

    row.addEventListener('click', () => {
      piezoAudio.solenoidClick();
      store.activeSlotId = item.slotId;
      syncAllPanels();
    });

    rosterListContainer.appendChild(row);
  }

  if (active) {
    const st = store.getStanding(active.revocationTagHex);
    rosterActiveSlotLabel.textContent = `SLOT #${active.slotId}`;
    cardCallsign.textContent = active.callsign;
    cardTierLabel.textContent = `TIER ${active.tier}`;
    cardCommitmentHex.textContent = `0x${active.commitmentHex.slice(0, 18)}...`;
    cardRevocationHex.textContent = `0x${active.revocationTagHex.slice(0, 18)}...`;

    standingLedBadge.dataset.standing = st;
    standingLedBadge.textContent = st;

    const leds = tierLedStrip.querySelectorAll<HTMLElement>('.tier-led');
    leds.forEach((led) => {
      const idx = Number(led.dataset.tierIdx || '0');
      led.classList.toggle('lit', idx <= active.tier);
    });
  }
}

function syncNullifierFeed(): void {
  nullifierFeedBody.innerHTML = '';
  for (const ev of store.passageEvents) {
    const tr = document.createElement('tr');
    const stateClass = ev.outcome === 'GRANTED' ? 'nullifier-tag-ok' : 'nullifier-tag-deny';
    tr.innerHTML = `
      <td>${ev.timestampStr}</td>
      <td>${ev.gateCode}</td>
      <td>0x${ev.passNullifierHex.slice(0, 12)}...</td>
      <td class="${stateClass}">${ev.outcome}</td>
    `;
    nullifierFeedBody.appendChild(tr);
  }
}

function syncTelemetryAndAudit(): void {
  stripGatesCount.textContent = String(store.gates.size);
  stripRosterCount.textContent = String(store.roster.length);
  stripPassagesCount.textContent = String(store.totalPassages());
  stripRevokedCount.textContent = String(store.countRevokedOrSuspended());

  telAuthorityPk.textContent = `0x${store.authorityPubHex.slice(0, 20)}...`;
  telMerkleRoot.textContent = `0x${store.tree.currentRootHex().slice(0, 20)}...`;
  telOrgDigest.textContent = `0x${store.orgIdHex.slice(0, 20)}...`;

  const report = store.auditZeroLeakage();
  if (report.clean) {
    leakAuditChip.textContent = '0 LEAKED';
    telWitnessState.textContent = 'HIDDEN';
  } else {
    leakAuditChip.textContent = `EXPOSED: ${report.exposedMarkers.join(',')}`;
    telWitnessState.textContent = 'BREACH';
  }
}

function syncAllPanels(): void {
  syncRosterAndActiveCard();
  syncNullifierFeed();
  syncTelemetryAndAudit();
}

async function evaluateTurnstileScan(): Promise<void> {
  if (scanBusy || !store) return;
  const badge = store.getActiveBadge();
  const gateSpec = store.gates.get(selActiveGate.value);
  if (!badge || !gateSpec) return;

  scanBusy = true;
  piezoAudio.rfidScanPing();
  turnstileViewport.dataset.barrierState = 'proving';
  solenoidBanner.textContent = `VERIFYING @ ${gateSpec.gateCode.toUpperCase()}...`;
  zkTraceLog.innerHTML = '';

  appendZkTrace(
    `[SCAN] Badge ${badge.callsign} (#${badge.slotId}) -> ${gateSpec.gateCode}`,
    'warn',
  );
  await pauseMs(120);

  piezoAudio.circuitSweep();
  appendZkTrace(
    `[1/4] Merkle inclusion -> root 0x${store.tree.currentRootHex().slice(0, 16)}...`,
    'ok',
  );
  await pauseMs(140);

  const orgOk = badge.commitmentHex.length === 64;
  const tierOk = badge.tier >= gateSpec.minTier;
  const activeOk = !gateSpec.requireActive || badge.active;
  const expiryOk = !gateSpec.checkExpiry || badge.expiresAt > gateSpec.referenceTime;
  const policyPassed = orgOk && tierOk && activeOk && expiryOk;

  appendZkTrace(
    `[2/4] Policy: Tier ${badge.tier}>=${gateSpec.minTier} (${tierOk ? 'OK' : 'FAIL'}) | Active (${activeOk ? 'OK' : 'FAIL'}) | Expiry (${expiryOk ? 'OK' : 'FAIL'})`,
    policyPassed ? 'ok' : 'deny',
  );
  await pauseMs(140);

  const nowTimeStr = new Date().toTimeString().split(' ')[0];

  if (!policyPassed) {
    let reason = 'POLICY FAILED';
    if (!tierOk) reason = `TIER ${badge.tier} < ${gateSpec.minTier}`;
    else if (!activeOk) reason = 'INACTIVE';
    else if (!expiryOk) reason = 'EXPIRED';

    appendZkTrace(`[REJECT] ${reason}`, 'deny');
    turnstileViewport.dataset.barrierState = 'denied';
    solenoidBanner.textContent = `DENIED // ${reason}`;
    scopedPassReadout.textContent = 'REJECTED';
    piezoAudio.denyLockdownBuzz();

    store.recordPassage({
      timestampStr: nowTimeStr,
      epochSec: Math.floor(Date.now() / 1000),
      gateCode: gateSpec.gateCode,
      passNullifierHex: '00'.repeat(16),
      outcome: 'DENIED',
      detail: reason,
    });
    syncAllPanels();
    scanBusy = false;
    return;
  }

  const standing = store.getStanding(badge.revocationTagHex);
  appendZkTrace(
    `[3/4] Revocation check (0x${badge.revocationTagHex.slice(0, 14)}...) -> ${standing}`,
    standing === 'VALID' ? 'ok' : 'deny',
  );
  await pauseMs(130);

  if (standing !== 'VALID') {
    appendZkTrace(`[REJECT] Standing is ${standing}`, 'deny');
    turnstileViewport.dataset.barrierState = 'denied';
    solenoidBanner.textContent = `DENIED // ${standing}`;
    scopedPassReadout.textContent = `BARRED (${standing})`;
    piezoAudio.denyLockdownBuzz();

    store.recordPassage({
      timestampStr: nowTimeStr,
      epochSec: Math.floor(Date.now() / 1000),
      gateCode: gateSpec.gateCode,
      passNullifierHex: badge.revocationTagHex,
      outcome: 'DENIED',
      detail: standing,
    });
    syncAllPanels();
    scanBusy = false;
    return;
  }

  const gateIdBytes = new TextEncoder().encode(gateSpec.gateCode);
  const nullifierBytes = await deriveGateNullifierPreview(gateIdBytes, badge.secretKey);
  const nullifierHex = encodeHex(nullifierBytes);

  appendZkTrace(
    `[4/4] Nullifier('${gateSpec.gateCode}') -> 0x${nullifierHex.slice(0, 22)}...`,
    'ok',
  );

  rotorAngleDeg += 120;
  svgTurnstileRotor.style.transform = `rotate3d(0, 0, 1, ${rotorAngleDeg}deg)`;
  turnstileViewport.dataset.barrierState = 'granted';
  solenoidBanner.textContent = 'UNLOCKED (+120°)';
  scopedPassReadout.textContent = `0x${nullifierHex.slice(0, 16)}...`;
  piezoAudio.grantPiezoChirp();

  store.recordPassage({
    timestampStr: nowTimeStr,
    epochSec: Math.floor(Date.now() / 1000),
    gateCode: gateSpec.gateCode,
    passNullifierHex: nullifierHex,
    outcome: 'GRANTED',
    detail: 'CLEARED',
  });

  syncAllPanels();
  scanBusy = false;
}

function mutateActiveStanding(target: StandingFlag): void {
  const active = store.getActiveBadge();
  if (!active) return;
  store.setStanding(active.revocationTagHex, target);
  if (target === 'VALID') {
    piezoAudio.grantPiezoChirp();
    turnstileViewport.dataset.barrierState = 'locked';
    solenoidBanner.textContent = `${active.callsign}: VALID`;
  } else {
    piezoAudio.denyLockdownBuzz();
    turnstileViewport.dataset.barrierState = 'denied';
    solenoidBanner.textContent = `${active.callsign}: ${target}`;
  }
  appendZkTrace(
    `[LEDGER] 0x${active.revocationTagHex.slice(0, 14)}... -> ${target}`,
    target === 'VALID' ? 'ok' : 'deny',
  );
  syncAllPanels();
}

function highlightScenarioButton(activeBtn: HTMLButtonElement): void {
  [scenPatrol, scenVault, scenSuspended].forEach((b) => b.classList.remove('selected'));
  activeBtn.classList.add('selected');
}

// Event Listeners
btnPiezoToggle.addEventListener('click', () => {
  const armed = piezoAudio.flipPower();
  btnPiezoToggle.textContent = `AUDIO: ${armed ? 'ON' : 'OFF'}`;
  btnPiezoToggle.classList.toggle('armed', armed);
});

scenPatrol.addEventListener('click', async () => {
  piezoAudio.solenoidClick();
  highlightScenarioButton(scenPatrol);
  fldCallsign.value = 'PATROL-02';
  fldTier.value = '2';
  fldActive.value = 'true';
  fldExpiry.value = '5000';
  selActiveGate.value = 'gate-alpha';
  syncPolicyEditorFromSelectedGate();
  await createAndEnrollOperator('PATROL-02', 2, true, 5000);
  syncAllPanels();
});

scenVault.addEventListener('click', async () => {
  piezoAudio.solenoidClick();
  highlightScenarioButton(scenVault);
  fldCallsign.value = 'VAULT-CMD';
  fldTier.value = '3';
  fldActive.value = 'true';
  fldExpiry.value = '9000';
  selActiveGate.value = 'gate-vault-sec';
  syncPolicyEditorFromSelectedGate();
  await createAndEnrollOperator('VAULT-CMD', 3, true, 9000);
  syncAllPanels();
});

scenSuspended.addEventListener('click', async () => {
  piezoAudio.solenoidClick();
  highlightScenarioButton(scenSuspended);
  fldCallsign.value = 'EXPIRED-OP';
  fldTier.value = '2';
  fldActive.value = 'false';
  fldExpiry.value = '5000';
  selActiveGate.value = 'gate-alpha';
  syncPolicyEditorFromSelectedGate();
  await createAndEnrollOperator('EXPIRED-OP', 2, false, 5000);
  syncAllPanels();
});

btnEnrollCredential.addEventListener('click', async () => {
  piezoAudio.solenoidClick();
  btnEnrollCredential.disabled = true;
  const callsign = (fldCallsign.value.trim() || `OPERATIVE-0${store.roster.length + 1}`).toUpperCase();
  const tier = Number(fldTier.value || '2');
  const active = fldActive.value === 'true';
  const expiresAt = Number(fldExpiry.value || '5000');

  const enrolled = await createAndEnrollOperator(callsign, tier, active, expiresAt);
  appendZkTrace(
    `[ISSUE] #${enrolled.slotId} (${enrolled.callsign}) -> 0x${enrolled.commitmentHex.slice(0, 16)}...`,
    'ok',
  );
  piezoAudio.grantPiezoChirp();
  syncAllPanels();
  btnEnrollCredential.disabled = false;
});

btnSuspendBadge.addEventListener('click', () => mutateActiveStanding('SUSPENDED'));
btnRestoreBadge.addEventListener('click', () => mutateActiveStanding('VALID'));
btnRevokeBadge.addEventListener('click', () => mutateActiveStanding('REVOKED'));

btnRfidTap.addEventListener('click', () => {
  void evaluateTurnstileScan();
});

selActiveGate.addEventListener('change', () => {
  piezoAudio.solenoidClick();
  syncPolicyEditorFromSelectedGate();
});

btnApplyGatePolicy.addEventListener('click', () => {
  piezoAudio.solenoidClick();
  const current = store.gates.get(selActiveGate.value);
  if (!current) return;
  const updated: TurnstilePolicySpec = {
    ...current,
    minTier: Number(polMinTier.value || '2'),
    referenceTime: Number(polRefTime.value || '1000'),
    requireActive: polReqActive.value === 'true',
    checkExpiry: polCheckExpiry.value === 'true',
  };
  store.upsertGate(updated);
  appendZkTrace(
    `[POLICY] ${updated.gateCode}: T>=${updated.minTier}, active=${updated.requireActive}, t=${updated.referenceTime}`,
    'warn',
  );
  syncGateSelectorOptions();
  syncAllPanels();
});

// Live WASM Contract Execution & Verification Hook (#probe / dataset.gate)
async function executeLiveContractRun(): Promise<void> {
  btnExecCompiledContract.disabled = true;
  wasmContractOutput.textContent = '';
  contractRunState.textContent = 'RUNNING';
  const startedAt = performance.now();

  try {
    await runDemo((...parts) => {
      wasmContractOutput.textContent += parts.map(String).join(' ') + '\n';
      wasmContractOutput.scrollTop = wasmContractOutput.scrollHeight;
    });
    document.body.dataset.gate = 'completed';
    const elapsedMs = Math.round(performance.now() - startedAt);
    contractRunState.textContent = `OK (${elapsedMs} ms)`;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    wasmContractOutput.textContent += `\nCircuit error: ${msg}`;
    contractRunState.textContent = 'REJECTED';
    document.body.dataset.gate = 'rejected: ' + msg;
  } finally {
    btnExecCompiledContract.disabled = false;
  }
}

btnExecCompiledContract.addEventListener('click', () => {
  piezoAudio.solenoidClick();
  void executeLiveContractRun();
});

// Boot Console State
(async () => {
  const authorityPub = await deriveAuthorityPreview(randomSecret32());
  const orgIdBytes = randomSecret32();
  store = createPerimeterStore(encodeHex(authorityPub), orgIdBytes);

  store.upsertGate({
    gateCode: 'gate-alpha',
    sectorLabel: 'ALPHA',
    orgIdHex: store.orgIdHex,
    minTier: 2,
    requireActive: true,
    checkExpiry: true,
    referenceTime: 1000,
  });

  store.upsertGate({
    gateCode: 'gate-vault-sec',
    sectorLabel: 'VAULT',
    orgIdHex: store.orgIdHex,
    minTier: 3,
    requireActive: true,
    checkExpiry: true,
    referenceTime: 1000,
  });

  store.upsertGate({
    gateCode: 'gate-scif-core',
    sectorLabel: 'CORE',
    orgIdHex: store.orgIdHex,
    minTier: 4,
    requireActive: true,
    checkExpiry: true,
    referenceTime: 1000,
  });

  await createAndEnrollOperator('VANGUARD-01', 2, true, 5000);
  await createAndEnrollOperator('SENTINEL-02', 3, true, 8000);
  store.activeSlotId = 0;

  store.recordPassage({
    timestampStr: 'BOOT',
    epochSec: 1000,
    gateCode: 'gate-alpha',
    passNullifierHex: encodeHex(randomSecret32()),
    outcome: 'GRANTED',
    detail: 'INIT',
  });

  syncGateSelectorOptions();
  syncAllPanels();
  appendZkTrace('[READY] Scan badge to verify access.', 'ok');

  if (location.hash === '#probe') {
    void executeLiveContractRun();
  }
})();
