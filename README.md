# checkpoint // perimeter-09

Anonymous physical-facility and enclave turnstile authorization built with Midnight Compact (`0.35.0`).

Standard RFID and biometric access control logs every badge tap as `(holder_id, tier, gate_id, timestamp)` in a central database. Anyone with read access to the facility log can reconstruct an operator's daily movement schedule.

`checkpoint` replaces identity-bearing badge taps with zero-knowledge proofs against an on-chain `HistoricMerkleTree<16, Bytes<32>>`:

- **Enrolment (`issueCredential`)**: Facility authority commits `H(tier, joinedAt, expiresAt, orgId, active, renewalCount, memberKey, salt)` into the depth-16 Merkle tree.
- **Gate policy (`registerGate` / `updateGate`)**: Each sector turnstile defines its own policy (`minTier`, `requireActive`, `checkExpiry`, `referenceTime`, `orgId`).
- **Turnstile scan (`verifyAccess`)**: The badge holder proves Merkle inclusion for a valid historical root, proves `satisfiesGate` in zero knowledge, proves their commitment's revocation tag (`checkpoint:revocation:v2`) is not marked suspended or revoked on the public ledger, and emits a gate-scoped nullifier (`checkpoint:gate-pass:v1`) tied to `(gateId, memberSk, epoch)`.
- **Granular standing override (`suspendCredential` / `reactivateCredential` / `revokeCredential`)**: The authority can freeze, restore, or permanently revoke a single badge commitment without re-keying the Merkle tree or disturbing sibling operators.

## Quickcheck

```sh
npm ci
npm run typecheck
npm test        # 26 vitest specs against the compiled checkpoint.compact circuits
npm run demo    # terminal simulation with ledger zero-leakage verification
npm run dev     # launch the 3-bay tactical turnstile HUD
```

The browser console in `web/` bundles the compiled contract (`contract/src/managed/checkpoint`) with `@midnight-ntwrk/compact-runtime` so every circuit can be executed directly in WebAssembly without a wallet extension or external proof server.

Apache-2.0
