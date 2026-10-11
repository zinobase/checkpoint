import { createMerkleAccumulator, encodeHex, type MerkleAccumulatorPreview } from './crypto';

export type StandingFlag = 'VALID' | 'SUSPENDED' | 'REVOKED';

export interface TurnstilePolicySpec {
  gateCode: string;
  sectorLabel: string;
  orgIdHex: string;
  minTier: number;
  requireActive: boolean;
  checkExpiry: boolean;
  referenceTime: number;
}

export interface BadgeAttributes {
  callsign: string;
  tier: number;
  joinedAt: number;
  expiresAt: number;
  orgIdHex: string;
  active: boolean;
  renewalCount: number;
}

export interface EnrolledBadgeRecord {
  slotId: number;
  callsign: string;
  tier: number;
  active: boolean;
  expiresAt: number;
  commitmentBytes: Uint8Array;
  commitmentHex: string;
  revocationTagHex: string;
  secretKey: Uint8Array;
  holderKey: Uint8Array;
  salt: Uint8Array;
  joinedAt: number;
}

export interface PassageNullifierEvent {
  timestampStr: string;
  epochSec: number;
  gateCode: string;
  passNullifierHex: string;
  outcome: 'GRANTED' | 'DENIED';
  detail: string;
}

export interface ZeroLeakageReport {
  clean: boolean;
  exposedMarkers: string[];
}

export interface PerimeterConsoleStore {
  readonly authorityPubHex: string;
  readonly orgIdBytes: Uint8Array;
  readonly orgIdHex: string;
  readonly tree: MerkleAccumulatorPreview;
  readonly gates: Map<string, TurnstilePolicySpec>;
  readonly revocations: Map<string, StandingFlag>;
  readonly passageCounters: Map<string, number>;
  readonly passageEvents: PassageNullifierEvent[];
  readonly roster: EnrolledBadgeRecord[];
  activeSlotId: number | null;

  upsertGate(spec: TurnstilePolicySpec): void;
  enrollBadge(record: Omit<EnrolledBadgeRecord, 'slotId'>): EnrolledBadgeRecord;
  getActiveBadge(): EnrolledBadgeRecord | null;
  setStanding(revocationTagHex: string, state: StandingFlag): void;
  getStanding(revocationTagHex: string): StandingFlag;
  recordPassage(ev: PassageNullifierEvent): void;
  totalPassages(): number;
  countRevokedOrSuspended(): number;
  auditZeroLeakage(): ZeroLeakageReport;
}

export function createPerimeterStore(
  authorityPubHex: string,
  orgIdBytes: Uint8Array,
): PerimeterConsoleStore {
  const orgIdHex = encodeHex(orgIdBytes);
  const tree = createMerkleAccumulator();
  const gates = new Map<string, TurnstilePolicySpec>();
  const revocations = new Map<string, StandingFlag>();
  const passageCounters = new Map<string, number>();
  const passageEvents: PassageNullifierEvent[] = [];
  const roster: EnrolledBadgeRecord[] = [];

  return {
    authorityPubHex,
    orgIdBytes,
    orgIdHex,
    tree,
    gates,
    revocations,
    passageCounters,
    passageEvents,
    roster,
    activeSlotId: null,

    upsertGate(spec: TurnstilePolicySpec): void {
      gates.set(spec.gateCode, { ...spec });
      if (!passageCounters.has(spec.gateCode)) {
        passageCounters.set(spec.gateCode, 0);
      }
    },

    enrollBadge(record: Omit<EnrolledBadgeRecord, 'slotId'>): EnrolledBadgeRecord {
      const { leafIndex } = tree.appendLeaf(record.commitmentBytes);
      const enrolled: EnrolledBadgeRecord = {
        ...record,
        slotId: leafIndex,
      };
      roster.push(enrolled);
      this.activeSlotId = leafIndex;
      return enrolled;
    },

    getActiveBadge(): EnrolledBadgeRecord | null {
      if (this.activeSlotId === null) return null;
      return roster.find((r) => r.slotId === this.activeSlotId) ?? null;
    },

    setStanding(revocationTagHex: string, state: StandingFlag): void {
      revocations.set(revocationTagHex, state);
    },

    getStanding(revocationTagHex: string): StandingFlag {
      return revocations.get(revocationTagHex) ?? 'VALID';
    },

    recordPassage(ev: PassageNullifierEvent): void {
      passageEvents.unshift(ev);
      if (passageEvents.length > 14) {
        passageEvents.pop();
      }
      if (ev.outcome === 'GRANTED') {
        const prev = passageCounters.get(ev.gateCode) ?? 0;
        passageCounters.set(ev.gateCode, prev + 1);
      }
    },

    totalPassages(): number {
      let sum = 0;
      for (const c of passageCounters.values()) {
        sum += c;
      }
      return sum;
    },

    countRevokedOrSuspended(): number {
      let count = 0;
      for (const st of revocations.values()) {
        if (st !== 'VALID') count++;
      }
      return count;
    },

    auditZeroLeakage(): ZeroLeakageReport {
      const publicLedgerSnapshot = JSON.stringify({
        authority: authorityPubHex,
        merkleRoot: tree.currentRootHex(),
        commitments: tree.leaves.map((l) => encodeHex(l)),
        gates: Array.from(gates.entries()),
        passageCounters: Array.from(passageCounters.entries()),
        revocations: Array.from(revocations.entries()),
      }).toLowerCase();

      const exposedMarkers: string[] = [];
      for (const member of roster) {
        const skHex = encodeHex(member.secretKey).toLowerCase();
        const saltHex = encodeHex(member.salt).toLowerCase();
        if (publicLedgerSnapshot.includes(skHex)) {
          exposedMarkers.push(`SecretKey(#${member.slotId})`);
        }
        if (publicLedgerSnapshot.includes(saltHex)) {
          exposedMarkers.push(`BlindingSalt(#${member.slotId})`);
        }
        const joinedToken = `"joinedat":${member.joinedAt}`;
        if (publicLedgerSnapshot.includes(joinedToken)) {
          exposedMarkers.push(`JoinedEpoch(#${member.slotId})`);
        }
      }

      return {
        clean: exposedMarkers.length === 0,
        exposedMarkers,
      };
    },
  };
}
