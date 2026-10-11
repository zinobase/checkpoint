// Fast WebCrypto SHA-256 preview utilities for instant HUD feedback.
// Note: These are UI previews only; real circuit execution happens via the
// compiled Compact contract in chain.ts.

export function encodeHex(buf: Uint8Array): string {
  let out = '';
  for (let i = 0; i < buf.length; i++) {
    out += buf[i].toString(16).padStart(2, '0');
  }
  return out;
}

export function decodeHex(hexInput: string): Uint8Array {
  const normalized = hexInput.startsWith('0x') ? hexInput.slice(2) : hexInput;
  const pairs = normalized.match(/.{1,2}/g) ?? [];
  const bytes = new Uint8Array(pairs.length);
  for (let i = 0; i < pairs.length; i++) {
    bytes[i] = parseInt(pairs[i], 16);
  }
  return bytes;
}

function encodeDomainPrefix(tag: string): Uint8Array {
  const raw = new TextEncoder().encode(tag);
  const block = new Uint8Array(32);
  block.set(raw.subarray(0, 32));
  return block;
}

function serializeField(item: Uint8Array | bigint | number | boolean): Uint8Array {
  if (item instanceof Uint8Array) {
    return item;
  }
  if (typeof item === 'boolean') {
    return new Uint8Array([item ? 1 : 0]);
  }
  const word = new Uint8Array(8);
  new DataView(word.buffer).setBigUint64(0, BigInt(item), false);
  return word;
}

export async function previewDomainHash(
  domainTag: string,
  ...inputs: (Uint8Array | bigint | number | boolean)[]
): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [encodeDomainPrefix(domainTag), ...inputs.map(serializeField)];
  let totalBytes = 0;
  for (const c of chunks) {
    totalBytes += c.length;
  }
  const frame = new Uint8Array(totalBytes);
  let cursor = 0;
  for (const c of chunks) {
    frame.set(c, cursor);
    cursor += c.length;
  }
  const digest = await crypto.subtle.digest('SHA-256', frame);
  return new Uint8Array(digest);
}

export function deriveAuthorityPreview(secretKey: Uint8Array): Promise<Uint8Array> {
  return previewDomainHash('checkpoint:org:v1', secretKey);
}

export function deriveVerifierPreview(secretKey: Uint8Array): Promise<Uint8Array> {
  return previewDomainHash('checkpoint:verifier:v1', secretKey);
}

export function deriveHolderPreview(secretKey: Uint8Array): Promise<Uint8Array> {
  return previewDomainHash('checkpoint:member:v1', secretKey);
}

export interface BadgeCommitmentInput {
  tier: number;
  joinedAt: number;
  expiresAt: number;
  orgIdBytes: Uint8Array;
  active: boolean;
  renewalCount: number;
  holderPubKey: Uint8Array;
  blindingSalt: Uint8Array;
}

export function deriveBadgeCommitmentPreview(spec: BadgeCommitmentInput): Promise<Uint8Array> {
  return previewDomainHash(
    'checkpoint:credential:v1',
    spec.tier,
    spec.joinedAt,
    spec.expiresAt,
    spec.orgIdBytes,
    spec.active,
    spec.renewalCount,
    spec.holderPubKey,
    spec.blindingSalt,
  );
}

export function deriveGateNullifierPreview(
  gateIdBytes: Uint8Array,
  holderSecret: Uint8Array,
): Promise<Uint8Array> {
  return previewDomainHash('checkpoint:gate-pass:v1', gateIdBytes, holderSecret);
}

export function deriveRevocationTagPreview(commitment: Uint8Array): Promise<Uint8Array> {
  return previewDomainHash('checkpoint:revocation:v2', commitment);
}

export interface MerkleAccumulatorPreview {
  readonly leaves: Uint8Array[];
  appendLeaf(commitment: Uint8Array): { leafIndex: number; rootHex: string };
  currentRootHex(): string;
}

export function createMerkleAccumulator(): MerkleAccumulatorPreview {
  const leaves: Uint8Array[] = [];
  return {
    leaves,
    appendLeaf(commitment: Uint8Array) {
      leaves.push(commitment);
      return {
        leafIndex: leaves.length - 1,
        rootHex: this.currentRootHex(),
      };
    },
    currentRootHex() {
      if (leaves.length === 0) {
        return '00'.repeat(32);
      }
      return encodeHex(leaves[leaves.length - 1]);
    },
  };
}
