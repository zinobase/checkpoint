import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.20.0');

export var CredentialState;
(function (CredentialState) {
  CredentialState[CredentialState['valid'] = 0] = 'valid';
  CredentialState[CredentialState['suspended'] = 1] = 'suspended';
  CredentialState[CredentialState['revoked'] = 2] = 'revoked';
})(CredentialState || (CredentialState = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_2 = __compactRuntime.CompactTypeBoolean;

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

class _GatePolicy_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment()))));
  }
  fromValue(value_0) {
    return {
      orgId: _descriptor_0.fromValue(value_0),
      minTier: _descriptor_1.fromValue(value_0),
      requireActive: _descriptor_2.fromValue(value_0),
      checkExpiry: _descriptor_2.fromValue(value_0),
      referenceTime: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.orgId).concat(_descriptor_1.toValue(value_0.minTier).concat(_descriptor_2.toValue(value_0.requireActive).concat(_descriptor_2.toValue(value_0.checkExpiry).concat(_descriptor_3.toValue(value_0.referenceTime)))));
  }
}

const _descriptor_4 = new _GatePolicy_0();

const _descriptor_5 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_6 = __compactRuntime.CompactTypeField;

class _MerkleTreeDigest_0 {
  alignment() {
    return _descriptor_6.alignment();
  }
  fromValue(value_0) {
    return {
      field: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.field);
  }
}

const _descriptor_7 = new _MerkleTreeDigest_0();

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_9 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

class _MemberCredential_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_8.alignment())))));
  }
  fromValue(value_0) {
    return {
      tier: _descriptor_1.fromValue(value_0),
      joinedAt: _descriptor_3.fromValue(value_0),
      expiresAt: _descriptor_3.fromValue(value_0),
      orgId: _descriptor_0.fromValue(value_0),
      active: _descriptor_2.fromValue(value_0),
      renewalCount: _descriptor_8.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.tier).concat(_descriptor_3.toValue(value_0.joinedAt).concat(_descriptor_3.toValue(value_0.expiresAt).concat(_descriptor_0.toValue(value_0.orgId).concat(_descriptor_2.toValue(value_0.active).concat(_descriptor_8.toValue(value_0.renewalCount))))));
  }
}

const _descriptor_10 = new _MemberCredential_0();

class _MerkleTreePathEntry_0 {
  alignment() {
    return _descriptor_7.alignment().concat(_descriptor_2.alignment());
  }
  fromValue(value_0) {
    return {
      sibling: _descriptor_7.fromValue(value_0),
      goes_left: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.sibling).concat(_descriptor_2.toValue(value_0.goes_left));
  }
}

const _descriptor_11 = new _MerkleTreePathEntry_0();

const _descriptor_12 = new __compactRuntime.CompactTypeVector(16, _descriptor_11);

class _MerkleTreePath_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_12.alignment());
  }
  fromValue(value_0) {
    return {
      leaf: _descriptor_0.fromValue(value_0),
      path: _descriptor_12.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.leaf).concat(_descriptor_12.toValue(value_0.path));
  }
}

const _descriptor_13 = new _MerkleTreePath_0();

const _descriptor_14 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

const _descriptor_15 = new __compactRuntime.CompactTypeBytes(6);

class _LeafPreimage_0 {
  alignment() {
    return _descriptor_15.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_15.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_15.toValue(value_0.domain_sep).concat(_descriptor_0.toValue(value_0.data));
  }
}

const _descriptor_16 = new _LeafPreimage_0();

class _CredentialPreimage_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_10.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      domain: _descriptor_0.fromValue(value_0),
      cred: _descriptor_10.fromValue(value_0),
      holder: _descriptor_0.fromValue(value_0),
      salt: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.domain).concat(_descriptor_10.toValue(value_0.cred).concat(_descriptor_0.toValue(value_0.holder).concat(_descriptor_0.toValue(value_0.salt))));
  }
}

const _descriptor_17 = new _CredentialPreimage_0();

const _descriptor_18 = new __compactRuntime.CompactTypeVector(3, _descriptor_0);

const _descriptor_19 = new __compactRuntime.CompactTypeVector(2, _descriptor_6);

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_20 = new _Either_0();

const _descriptor_21 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_22 = new _ContractAddress_0();

class _UserAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_23 = new _UserAddress_0();

class _Either_1 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_22.alignment().concat(_descriptor_23.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_22.fromValue(value_0),
      right: _descriptor_23.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_22.toValue(value_0.left).concat(_descriptor_23.toValue(value_0.right)));
  }
}

const _descriptor_24 = new _Either_1();

class _Maybe_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_24.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_2.fromValue(value_0),
      value: _descriptor_24.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_some).concat(_descriptor_24.toValue(value_0.value));
  }
}

const _descriptor_25 = new _Maybe_0();

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.privateKey) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named privateKey');
    }
    if (typeof(witnesses_0.heldCredential) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named heldCredential');
    }
    if (typeof(witnesses_0.credentialSalt) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named credentialSalt');
    }
    if (typeof(witnesses_0.credentialPath) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named credentialPath');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      async authorityKey(context, ...args_1) {
        return { result: pureCircuits.authorityKey(...args_1), context };
      },
      async verifierKey(context, ...args_1) {
        return { result: pureCircuits.verifierKey(...args_1), context };
      },
      async memberKey(context, ...args_1) {
        return { result: pureCircuits.memberKey(...args_1), context };
      },
      async credentialCommitment(context, ...args_1) {
        return { result: pureCircuits.credentialCommitment(...args_1), context };
      },
      async gatePassFor(context, ...args_1) {
        return { result: pureCircuits.gatePassFor(...args_1), context };
      },
      async revocationHash(context, ...args_1) {
        return { result: pureCircuits.revocationHash(...args_1), context };
      },
      async satisfiesGate(context, ...args_1) {
        return { result: pureCircuits.satisfiesGate(...args_1), context };
      },
      issueCredential: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`issueCredential: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const commitment_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('issueCredential',
                                     'argument 1 (as invoked from Typescript)',
                                     'checkpoint.compact line 105 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
          __compactRuntime.typeError('issueCredential',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'checkpoint.compact line 105 char 1',
                                     'Bytes<32>',
                                     commitment_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(commitment_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._issueCredential_0(context,
                                                       partialProofData,
                                                       commitment_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      registerGate: async (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`registerGate: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const gateId_0 = args_1[1];
        const policy_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('registerGate',
                                     'argument 1 (as invoked from Typescript)',
                                     'checkpoint.compact line 111 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(gateId_0.buffer instanceof ArrayBuffer && gateId_0.BYTES_PER_ELEMENT === 1 && gateId_0.length === 32)) {
          __compactRuntime.typeError('registerGate',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'checkpoint.compact line 111 char 1',
                                     'Bytes<32>',
                                     gateId_0)
        }
        if (!(typeof(policy_0) === 'object' && policy_0.orgId.buffer instanceof ArrayBuffer && policy_0.orgId.BYTES_PER_ELEMENT === 1 && policy_0.orgId.length === 32 && typeof(policy_0.minTier) === 'bigint' && policy_0.minTier >= 0n && policy_0.minTier <= 255n && typeof(policy_0.requireActive) === 'boolean' && typeof(policy_0.checkExpiry) === 'boolean' && typeof(policy_0.referenceTime) === 'bigint' && policy_0.referenceTime >= 0n && policy_0.referenceTime <= 4294967295n)) {
          __compactRuntime.typeError('registerGate',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'checkpoint.compact line 111 char 1',
                                     'struct GatePolicy<orgId: Bytes<32>, minTier: Uint<0..256>, requireActive: Boolean, checkExpiry: Boolean, referenceTime: Uint<0..4294967296>>',
                                     policy_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(gateId_0).concat(_descriptor_4.toValue(policy_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_4.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._registerGate_0(context,
                                                    partialProofData,
                                                    gateId_0,
                                                    policy_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      verifyAccess: async (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`verifyAccess: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const gateId_0 = args_1[1];
        const timestamp_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('verifyAccess',
                                     'argument 1 (as invoked from Typescript)',
                                     'checkpoint.compact line 121 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(gateId_0.buffer instanceof ArrayBuffer && gateId_0.BYTES_PER_ELEMENT === 1 && gateId_0.length === 32)) {
          __compactRuntime.typeError('verifyAccess',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'checkpoint.compact line 121 char 1',
                                     'Bytes<32>',
                                     gateId_0)
        }
        if (!(typeof(timestamp_0) === 'bigint' && timestamp_0 >= 0n && timestamp_0 <= 4294967295n)) {
          __compactRuntime.typeError('verifyAccess',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'checkpoint.compact line 121 char 1',
                                     'Uint<0..4294967296>',
                                     timestamp_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(gateId_0).concat(_descriptor_3.toValue(timestamp_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_3.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._verifyAccess_0(context,
                                                    partialProofData,
                                                    gateId_0,
                                                    timestamp_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      suspendCredential: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`suspendCredential: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const credCommitment_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('suspendCredential',
                                     'argument 1 (as invoked from Typescript)',
                                     'checkpoint.compact line 148 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(credCommitment_0.buffer instanceof ArrayBuffer && credCommitment_0.BYTES_PER_ELEMENT === 1 && credCommitment_0.length === 32)) {
          __compactRuntime.typeError('suspendCredential',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'checkpoint.compact line 148 char 1',
                                     'Bytes<32>',
                                     credCommitment_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(credCommitment_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._suspendCredential_0(context,
                                                         partialProofData,
                                                         credCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      reactivateCredential: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`reactivateCredential: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const credCommitment_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('reactivateCredential',
                                     'argument 1 (as invoked from Typescript)',
                                     'checkpoint.compact line 154 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(credCommitment_0.buffer instanceof ArrayBuffer && credCommitment_0.BYTES_PER_ELEMENT === 1 && credCommitment_0.length === 32)) {
          __compactRuntime.typeError('reactivateCredential',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'checkpoint.compact line 154 char 1',
                                     'Bytes<32>',
                                     credCommitment_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(credCommitment_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._reactivateCredential_0(context,
                                                            partialProofData,
                                                            credCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      revokeCredential: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`revokeCredential: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const credCommitment_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('revokeCredential',
                                     'argument 1 (as invoked from Typescript)',
                                     'checkpoint.compact line 160 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(credCommitment_0.buffer instanceof ArrayBuffer && credCommitment_0.BYTES_PER_ELEMENT === 1 && credCommitment_0.length === 32)) {
          __compactRuntime.typeError('revokeCredential',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'checkpoint.compact line 160 char 1',
                                     'Bytes<32>',
                                     credCommitment_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(credCommitment_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._revokeCredential_0(context,
                                                        partialProofData,
                                                        credCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      updateGate: async (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`updateGate: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const gateId_0 = args_1[1];
        const policy_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('updateGate',
                                     'argument 1 (as invoked from Typescript)',
                                     'checkpoint.compact line 166 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(gateId_0.buffer instanceof ArrayBuffer && gateId_0.BYTES_PER_ELEMENT === 1 && gateId_0.length === 32)) {
          __compactRuntime.typeError('updateGate',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'checkpoint.compact line 166 char 1',
                                     'Bytes<32>',
                                     gateId_0)
        }
        if (!(typeof(policy_0) === 'object' && policy_0.orgId.buffer instanceof ArrayBuffer && policy_0.orgId.BYTES_PER_ELEMENT === 1 && policy_0.orgId.length === 32 && typeof(policy_0.minTier) === 'bigint' && policy_0.minTier >= 0n && policy_0.minTier <= 255n && typeof(policy_0.requireActive) === 'boolean' && typeof(policy_0.checkExpiry) === 'boolean' && typeof(policy_0.referenceTime) === 'bigint' && policy_0.referenceTime >= 0n && policy_0.referenceTime <= 4294967295n)) {
          __compactRuntime.typeError('updateGate',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'checkpoint.compact line 166 char 1',
                                     'struct GatePolicy<orgId: Bytes<32>, minTier: Uint<0..256>, requireActive: Boolean, checkExpiry: Boolean, referenceTime: Uint<0..4294967296>>',
                                     policy_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(gateId_0).concat(_descriptor_4.toValue(policy_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_4.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._updateGate_0(context,
                                                  partialProofData,
                                                  gateId_0,
                                                  policy_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      }
    };
    this.impureCircuits = {
      issueCredential: this.circuits.issueCredential,
      registerGate: this.circuits.registerGate,
      verifyAccess: this.circuits.verifyAccess,
      suspendCredential: this.circuits.suspendCredential,
      reactivateCredential: this.circuits.reactivateCredential,
      revokeCredential: this.circuits.revokeCredential,
      updateGate: this.circuits.updateGate
    };
    this.provableCircuits = {
      issueCredential: this.circuits.issueCredential,
      registerGate: this.circuits.registerGate,
      verifyAccess: this.circuits.verifyAccess,
      suspendCredential: this.circuits.suspendCredential,
      reactivateCredential: this.circuits.reactivateCredential,
      revokeCredential: this.circuits.revokeCredential,
      updateGate: this.circuits.updateGate
    };
  }
  async initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('issueCredential', new __compactRuntime.ContractOperation());
    state_0.setOperation('registerGate', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyAccess', new __compactRuntime.ContractOperation());
    state_0.setOperation('suspendCredential', new __compactRuntime.ContractOperation());
    state_0.setOperation('reactivateCredential', new __compactRuntime.ContractOperation());
    state_0.setOperation('revokeCredential', new __compactRuntime.ContractOperation());
    state_0.setOperation('updateGate', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext({circuitId: 'constructor', contractAddress: __compactRuntime.dummyContractAddress(), coinPublicKeyOrZswapState: constructorContext_0.initialZswapLocalState.coinPublicKey, contractState: state_0.data, privateState: constructorContext_0.initialPrivateState});
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(1n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newBoundedMerkleTree(
                                                                       new __compactRuntime.StateBoundedMerkleTree(16)
                                                                     )).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                        alignment: _descriptor_9.alignment() })).arrayPush(__compactRuntime.StateValue.newMap(
                                                                                                                                                                             new __compactRuntime.StateMap()
                                                                                                                                                                           ))
                                                          .encode() } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(2n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(0n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       'root',
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(2n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(3n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(4n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(5n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(6n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_0 = this._authorityKey_0(this._privateKey_0(context,
                                                          partialProofData));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.callContext.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.callContext.currentPrivateState,
      currentZswapLocalState: context.callContext.currentZswapLocalState
    }
  }
  _merkleTreePathRoot_0(path_0) {
    return { field:
               this._folder_0((...args_0) =>
                                this._merkleTreePathEntryRoot_0(...args_0),
                              this._degradeToTransient_0(this._persistentHash_3({ domain_sep:
                                                                                    new Uint8Array([109, 100, 110, 58, 108, 104]),
                                                                                  data:
                                                                                    path_0.leaf })),
                              path_0.path) };
  }
  _merkleTreePathEntryRoot_0(recursiveDigest_0, entry_0) {
    const left_0 = entry_0.goes_left ? recursiveDigest_0 : entry_0.sibling.field;
    const right_0 = entry_0.goes_left ?
                    entry_0.sibling.field :
                    recursiveDigest_0;
    return this._transientHash_0([left_0, right_0]);
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_19, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_17, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_18, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_14, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_16, value_0);
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  _privateKey_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.privateKey(witnessContext_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('privateKey',
                                 'return value',
                                 'checkpoint.compact line 51 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _heldCredential_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.heldCredential(witnessContext_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && typeof(result_0.tier) === 'bigint' && result_0.tier >= 0n && result_0.tier <= 255n && typeof(result_0.joinedAt) === 'bigint' && result_0.joinedAt >= 0n && result_0.joinedAt <= 4294967295n && typeof(result_0.expiresAt) === 'bigint' && result_0.expiresAt >= 0n && result_0.expiresAt <= 4294967295n && result_0.orgId.buffer instanceof ArrayBuffer && result_0.orgId.BYTES_PER_ELEMENT === 1 && result_0.orgId.length === 32 && typeof(result_0.active) === 'boolean' && typeof(result_0.renewalCount) === 'bigint' && result_0.renewalCount >= 0n && result_0.renewalCount <= 65535n)) {
      __compactRuntime.typeError('heldCredential',
                                 'return value',
                                 'checkpoint.compact line 52 char 1',
                                 'struct MemberCredential<tier: Uint<0..256>, joinedAt: Uint<0..4294967296>, expiresAt: Uint<0..4294967296>, orgId: Bytes<32>, active: Boolean, renewalCount: Uint<0..65536>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_10.toValue(result_0),
      alignment: _descriptor_10.alignment()
    });
    return result_0;
  }
  _credentialSalt_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.credentialSalt(witnessContext_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('credentialSalt',
                                 'return value',
                                 'checkpoint.compact line 53 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _credentialPath_0(context, partialProofData, commitment_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.credentialPath(witnessContext_0,
                                                                         commitment_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && result_0.leaf.buffer instanceof ArrayBuffer && result_0.leaf.BYTES_PER_ELEMENT === 1 && result_0.leaf.length === 32 && Array.isArray(result_0.path) && result_0.path.length === 16 && result_0.path.every((t) => typeof(t) === 'object' && typeof(t.sibling) === 'object' && typeof(t.sibling.field) === 'bigint' && t.sibling.field >= 0 && t.sibling.field <= __compactRuntime.MAX_FIELD && typeof(t.goes_left) === 'boolean'))) {
      __compactRuntime.typeError('credentialPath',
                                 'return value',
                                 'checkpoint.compact line 54 char 1',
                                 'struct MerkleTreePath<leaf: Bytes<32>, path: Vector<16, struct MerkleTreePathEntry<sibling: struct MerkleTreeDigest<field: Field>, goes_left: Boolean>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_13.toValue(result_0),
      alignment: _descriptor_13.alignment()
    });
    return result_0;
  }
  _authorityKey_0(sk_0) {
    return this._persistentHash_2([new Uint8Array([99, 104, 101, 99, 107, 112, 111, 105, 110, 116, 58, 111, 114, 103, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _verifierKey_0(sk_0) {
    return this._persistentHash_2([new Uint8Array([99, 104, 101, 99, 107, 112, 111, 105, 110, 116, 58, 118, 101, 114, 105, 102, 105, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _memberKey_0(sk_0) {
    return this._persistentHash_2([new Uint8Array([99, 104, 101, 99, 107, 112, 111, 105, 110, 116, 58, 109, 101, 109, 98, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _credentialCommitment_0(cred_0, holder_0, salt_0) {
    return this._persistentHash_0({ domain:
                                      new Uint8Array([99, 104, 101, 99, 107, 112, 111, 105, 110, 116, 58, 99, 114, 101, 100, 101, 110, 116, 105, 97, 108, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0]),
                                    cred: cred_0,
                                    holder: holder_0,
                                    salt: salt_0 });
  }
  _gatePassFor_0(gateId_0, memberSk_0) {
    return this._persistentHash_1([new Uint8Array([99, 104, 101, 99, 107, 112, 111, 105, 110, 116, 58, 103, 97, 116, 101, 45, 112, 97, 115, 115, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   gateId_0,
                                   memberSk_0]);
  }
  _revocationHash_0(commitment_0) {
    return this._persistentHash_2([new Uint8Array([99, 104, 101, 99, 107, 112, 111, 105, 110, 116, 58, 114, 101, 118, 111, 99, 97, 116, 105, 111, 110, 58, 118, 50, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   commitment_0]);
  }
  _satisfiesGate_0(cred_0, policy_0) {
    const orgMatch_0 = this._equal_0(cred_0.orgId, policy_0.orgId);
    let t_0; const tierOk_0 = (t_0 = cred_0.tier, t_0 >= policy_0.minTier);
    const activeOk_0 = !policy_0.requireActive || cred_0.active;
    let t_1;
    const expiryOk_0 = !policy_0.checkExpiry
                       ||
                       (t_1 = cred_0.expiresAt, t_1 > policy_0.referenceTime);
    return orgMatch_0 && tierOk_0 && activeOk_0 && expiryOk_0;
  }
  async _issueCredential_0(context, partialProofData, commitment_0) {
    __compactRuntime.assert(this._equal_1(this._authorityKey_0(this._privateKey_0(context,
                                                                                  partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_1.toValue(0n),
                                                                                                                                alignment: _descriptor_1.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Not authorized to issue');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(1n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(0n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(1n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.leafHash(
                                                                                              { value: _descriptor_0.toValue(commitment_0),
                                                                                                alignment: _descriptor_0.alignment() }
                                                                                            )).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(1n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { addi: { immediate: 1 } },
                                       { ins: { cached: true, n: 1 } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(2n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(0n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       'root',
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(2n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_8.toValue(tmp_0),
                                                                alignment: _descriptor_8.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  async _registerGate_0(context, partialProofData, gateId_0, policy_0) {
    const gId_0 = gateId_0;
    const pol_0 = policy_0;
    __compactRuntime.assert(this._equal_2(this._authorityKey_0(this._privateKey_0(context,
                                                                                  partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_1.toValue(0n),
                                                                                                                                alignment: _descriptor_1.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Not authorized to register gate');
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_1.toValue(3n),
                                                                                                                   alignment: _descriptor_1.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(gId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'Gate already exists');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(3n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(gId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(pol_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(4n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(gId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(5n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(gId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  async _verifyAccess_0(context, partialProofData, gateId_0, timestamp_0) {
    const gId_0 = gateId_0;
    const time_0 = timestamp_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_1.toValue(3n),
                                                                                                                  alignment: _descriptor_1.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(gId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Unknown gate');
    const policy_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_1.toValue(3n),
                                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_0.toValue(gId_0),
                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value);
    const cred_0 = this._heldCredential_0(context, partialProofData);
    const salt_0 = this._credentialSalt_0(context, partialProofData);
    const sk_0 = this._privateKey_0(context, partialProofData);
    const commitment_0 = this._credentialCommitment_0(cred_0,
                                                      this._memberKey_0(sk_0),
                                                      salt_0);
    const path_0 = this._credentialPath_0(context,
                                          partialProofData,
                                          commitment_0);
    __compactRuntime.assert(this._equal_3(path_0.leaf, commitment_0),
                            'Path leaf mismatch');
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._merkleTreePathRoot_0(path_0),
                             _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_1.toValue(1n),
                                                                                                                   alignment: _descriptor_1.alignment() } }] } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_1.toValue(2n),
                                                                                                                   alignment: _descriptor_1.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_7.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'Credential not in member tree');
    __compactRuntime.assert(this._satisfiesGate_0(cred_0, policy_0),
                            'Credential does not satisfy gate policy');
    const rHash_0 = this._revocationHash_0(commitment_0);
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_1.toValue(6n),
                                                                                                                   alignment: _descriptor_1.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rHash_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)
                            ||
                            _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_1.toValue(6n),
                                                                                                                  alignment: _descriptor_1.alignment() } }] } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_0.toValue(rHash_0),
                                                                                                                  alignment: _descriptor_0.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            0,
                            'Credential is not valid');
    const pass_0 = this._gatePassFor_0(gId_0, sk_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(4n),
                                                                  alignment: _descriptor_1.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_0.toValue(gId_0),
                                                                  alignment: _descriptor_0.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(pass_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(time_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_1 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(5n),
                                                                  alignment: _descriptor_1.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_0.toValue(gId_0),
                                                                  alignment: _descriptor_0.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_8.toValue(tmp_1),
                                                                alignment: _descriptor_8.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 2 } }]);
    return pass_0;
  }
  async _suspendCredential_0(context, partialProofData, credCommitment_0) {
    __compactRuntime.assert(this._equal_4(this._authorityKey_0(this._privateKey_0(context,
                                                                                  partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_1.toValue(0n),
                                                                                                                                alignment: _descriptor_1.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Not authorized to suspend');
    const rHash_0 = this._revocationHash_0(credCommitment_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(6n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rHash_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(1),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  async _reactivateCredential_0(context, partialProofData, credCommitment_0) {
    __compactRuntime.assert(this._equal_5(this._authorityKey_0(this._privateKey_0(context,
                                                                                  partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_1.toValue(0n),
                                                                                                                                alignment: _descriptor_1.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Not authorized to reactivate');
    const rHash_0 = this._revocationHash_0(credCommitment_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(6n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rHash_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  async _revokeCredential_0(context, partialProofData, credCommitment_0) {
    __compactRuntime.assert(this._equal_6(this._authorityKey_0(this._privateKey_0(context,
                                                                                  partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_1.toValue(0n),
                                                                                                                                alignment: _descriptor_1.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Not authorized to revoke');
    const rHash_0 = this._revocationHash_0(credCommitment_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(6n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rHash_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(2),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  async _updateGate_0(context, partialProofData, gateId_0, policy_0) {
    const gId_0 = gateId_0;
    const pol_0 = policy_0;
    __compactRuntime.assert(this._equal_7(this._authorityKey_0(this._privateKey_0(context,
                                                                                  partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_1.toValue(0n),
                                                                                                                                alignment: _descriptor_1.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Not authorized');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_1.toValue(3n),
                                                                                                                  alignment: _descriptor_1.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(gId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Gate not found');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(3n),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(gId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(pol_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _folder_0(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    callContext: { currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()), currentGasCost: __compactRuntime.emptyRunningCost() },
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get authority() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_1.toValue(0n),
                                                                                                   alignment: _descriptor_1.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    members: {
      isFull(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isFull: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(1n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(1n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(65536n),
                                                                                                                                 alignment: _descriptor_9.alignment() }).encode() } },
                                                                          'lt',
                                                                          'neg',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      checkRoot(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`checkRoot: expected 1 argument, received ${args_0.length}`);
        }
        const rt_0 = args_0[0];
        if (!(typeof(rt_0) === 'object' && typeof(rt_0.field) === 'bigint' && rt_0.field >= 0 && rt_0.field <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('checkRoot',
                                     'argument 1',
                                     'checkpoint.compact line 40 char 1',
                                     'struct MerkleTreeDigest<field: Field>',
                                     rt_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(1n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(2n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(rt_0),
                                                                                                                                 alignment: _descriptor_7.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      root(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`root: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return ((result) => result             ? __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(result)             : undefined)(self_0.asArray()[0].asBoundedMerkleTree().rehash().root()?.value);
      },
      firstFree(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`first_free: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return __compactRuntime.CompactTypeField.fromValue(self_0.asArray()[1].asCell().value);
      },
      pathForLeaf(...args_0) {
        if (args_0.length !== 2) {
          throw new __compactRuntime.CompactError(`path_for_leaf: expected 2 arguments, received ${args_0.length}`);
        }
        const index_0 = args_0[0];
        const leaf_0 = args_0[1];
        if (!(typeof(index_0) === 'bigint' && index_0 >= 0 && index_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 1',
                                     'checkpoint.compact line 40 char 1',
                                     'Field',
                                     index_0)
        }
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 2',
                                     'checkpoint.compact line 40 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[1];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(16, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().pathForLeaf(    index_0,    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      },
      findPathForLeaf(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`find_path_for_leaf: expected 1 argument, received ${args_0.length}`);
        }
        const leaf_0 = args_0[0];
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('find_path_for_leaf',
                                     'argument 1',
                                     'checkpoint.compact line 40 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[1];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(16, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().findPathForLeaf(    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      },
      history(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`history: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return self_0.asArray()[2].asMap().keys().map(  (elem) => __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get memberCount() {
      return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_1.toValue(2n),
                                                                                                   alignment: _descriptor_1.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    gates: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(3n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                                 alignment: _descriptor_9.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(3n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'checkpoint.compact line 42 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(3n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'checkpoint.compact line 42 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(3n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[3];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_4.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    accessLog: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(4n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                                 alignment: _descriptor_9.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(4n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'checkpoint.compact line 43 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(4n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'checkpoint.compact line 43 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        if (state.asArray()[4].asMap().get({ value: _descriptor_0.toValue(key_0),
                                             alignment: _descriptor_0.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_1.toValue(4n),
                                                                                                         alignment: _descriptor_1.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              'size',
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                                     alignment: _descriptor_9.alignment() }).encode() } },
                                                                              'eq',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_1.toValue(4n),
                                                                                                         alignment: _descriptor_1.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              'size',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(key_1.buffer instanceof ArrayBuffer && key_1.BYTES_PER_ELEMENT === 1 && key_1.length === 32)) {
              __compactRuntime.typeError('member',
                                         'argument 1',
                                         'checkpoint.compact line 43 char 41',
                                         'Bytes<32>',
                                         key_1)
            }
            return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_1.toValue(4n),
                                                                                                         alignment: _descriptor_1.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_1),
                                                                                                                                     alignment: _descriptor_0.alignment() }).encode() } },
                                                                              'member',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(key_1.buffer instanceof ArrayBuffer && key_1.BYTES_PER_ELEMENT === 1 && key_1.length === 32)) {
              __compactRuntime.typeError('lookup',
                                         'argument 1',
                                         'checkpoint.compact line 43 char 41',
                                         'Bytes<32>',
                                         key_1)
            }
            return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_1.toValue(4n),
                                                                                                         alignment: _descriptor_1.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_1),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[4].asMap().get({ value: _descriptor_0.toValue(key_0),
                                                            alignment: _descriptor_0.alignment() });
            return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_3.fromValue(value.value)    ];  })[Symbol.iterator]();
          }
        }
      }
    },
    accessCount: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(5n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                                 alignment: _descriptor_9.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(5n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'checkpoint.compact line 44 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(5n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'checkpoint.compact line 44 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        if (state.asArray()[5].asMap().get({ value: _descriptor_0.toValue(key_0),
                                             alignment: _descriptor_0.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          read(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`read: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_1.toValue(5n),
                                                                                                         alignment: _descriptor_1.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          }
        }
      }
    },
    revocations: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(6n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                                 alignment: _descriptor_9.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(6n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'checkpoint.compact line 45 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(6n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'checkpoint.compact line 45 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(6n),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[6];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_5.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  callContext: { currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress()), currentGasCost: __compactRuntime.emptyRunningCost() }
};
const _dummyContract = new Contract({
  privateKey: (...args) => undefined,
  heldCredential: (...args) => undefined,
  credentialSalt: (...args) => undefined,
  credentialPath: (...args) => undefined
});
export const pureCircuits = {
  authorityKey: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`authorityKey: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('authorityKey',
                                 'argument 1',
                                 'checkpoint.compact line 60 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    return _dummyContract._authorityKey_0(sk_0);
  },
  verifierKey: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`verifierKey: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('verifierKey',
                                 'argument 1',
                                 'checkpoint.compact line 64 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    return _dummyContract._verifierKey_0(sk_0);
  },
  memberKey: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`memberKey: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('memberKey',
                                 'argument 1',
                                 'checkpoint.compact line 68 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    return _dummyContract._memberKey_0(sk_0);
  },
  credentialCommitment: (...args_0) => {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`credentialCommitment: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const cred_0 = args_0[0];
    const holder_0 = args_0[1];
    const salt_0 = args_0[2];
    if (!(typeof(cred_0) === 'object' && typeof(cred_0.tier) === 'bigint' && cred_0.tier >= 0n && cred_0.tier <= 255n && typeof(cred_0.joinedAt) === 'bigint' && cred_0.joinedAt >= 0n && cred_0.joinedAt <= 4294967295n && typeof(cred_0.expiresAt) === 'bigint' && cred_0.expiresAt >= 0n && cred_0.expiresAt <= 4294967295n && cred_0.orgId.buffer instanceof ArrayBuffer && cred_0.orgId.BYTES_PER_ELEMENT === 1 && cred_0.orgId.length === 32 && typeof(cred_0.active) === 'boolean' && typeof(cred_0.renewalCount) === 'bigint' && cred_0.renewalCount >= 0n && cred_0.renewalCount <= 65535n)) {
      __compactRuntime.typeError('credentialCommitment',
                                 'argument 1',
                                 'checkpoint.compact line 72 char 1',
                                 'struct MemberCredential<tier: Uint<0..256>, joinedAt: Uint<0..4294967296>, expiresAt: Uint<0..4294967296>, orgId: Bytes<32>, active: Boolean, renewalCount: Uint<0..65536>>',
                                 cred_0)
    }
    if (!(holder_0.buffer instanceof ArrayBuffer && holder_0.BYTES_PER_ELEMENT === 1 && holder_0.length === 32)) {
      __compactRuntime.typeError('credentialCommitment',
                                 'argument 2',
                                 'checkpoint.compact line 72 char 1',
                                 'Bytes<32>',
                                 holder_0)
    }
    if (!(salt_0.buffer instanceof ArrayBuffer && salt_0.BYTES_PER_ELEMENT === 1 && salt_0.length === 32)) {
      __compactRuntime.typeError('credentialCommitment',
                                 'argument 3',
                                 'checkpoint.compact line 72 char 1',
                                 'Bytes<32>',
                                 salt_0)
    }
    return _dummyContract._credentialCommitment_0(cred_0, holder_0, salt_0);
  },
  gatePassFor: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`gatePassFor: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const gateId_0 = args_0[0];
    const memberSk_0 = args_0[1];
    if (!(gateId_0.buffer instanceof ArrayBuffer && gateId_0.BYTES_PER_ELEMENT === 1 && gateId_0.length === 32)) {
      __compactRuntime.typeError('gatePassFor',
                                 'argument 1',
                                 'checkpoint.compact line 81 char 1',
                                 'Bytes<32>',
                                 gateId_0)
    }
    if (!(memberSk_0.buffer instanceof ArrayBuffer && memberSk_0.BYTES_PER_ELEMENT === 1 && memberSk_0.length === 32)) {
      __compactRuntime.typeError('gatePassFor',
                                 'argument 2',
                                 'checkpoint.compact line 81 char 1',
                                 'Bytes<32>',
                                 memberSk_0)
    }
    return _dummyContract._gatePassFor_0(gateId_0, memberSk_0);
  },
  revocationHash: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`revocationHash: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const commitment_0 = args_0[0];
    if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
      __compactRuntime.typeError('revocationHash',
                                 'argument 1',
                                 'checkpoint.compact line 85 char 1',
                                 'Bytes<32>',
                                 commitment_0)
    }
    return _dummyContract._revocationHash_0(commitment_0);
  },
  satisfiesGate: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`satisfiesGate: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const cred_0 = args_0[0];
    const policy_0 = args_0[1];
    if (!(typeof(cred_0) === 'object' && typeof(cred_0.tier) === 'bigint' && cred_0.tier >= 0n && cred_0.tier <= 255n && typeof(cred_0.joinedAt) === 'bigint' && cred_0.joinedAt >= 0n && cred_0.joinedAt <= 4294967295n && typeof(cred_0.expiresAt) === 'bigint' && cred_0.expiresAt >= 0n && cred_0.expiresAt <= 4294967295n && cred_0.orgId.buffer instanceof ArrayBuffer && cred_0.orgId.BYTES_PER_ELEMENT === 1 && cred_0.orgId.length === 32 && typeof(cred_0.active) === 'boolean' && typeof(cred_0.renewalCount) === 'bigint' && cred_0.renewalCount >= 0n && cred_0.renewalCount <= 65535n)) {
      __compactRuntime.typeError('satisfiesGate',
                                 'argument 1',
                                 'checkpoint.compact line 89 char 1',
                                 'struct MemberCredential<tier: Uint<0..256>, joinedAt: Uint<0..4294967296>, expiresAt: Uint<0..4294967296>, orgId: Bytes<32>, active: Boolean, renewalCount: Uint<0..65536>>',
                                 cred_0)
    }
    if (!(typeof(policy_0) === 'object' && policy_0.orgId.buffer instanceof ArrayBuffer && policy_0.orgId.BYTES_PER_ELEMENT === 1 && policy_0.orgId.length === 32 && typeof(policy_0.minTier) === 'bigint' && policy_0.minTier >= 0n && policy_0.minTier <= 255n && typeof(policy_0.requireActive) === 'boolean' && typeof(policy_0.checkExpiry) === 'boolean' && typeof(policy_0.referenceTime) === 'bigint' && policy_0.referenceTime >= 0n && policy_0.referenceTime <= 4294967295n)) {
      __compactRuntime.typeError('satisfiesGate',
                                 'argument 2',
                                 'checkpoint.compact line 89 char 1',
                                 'struct GatePolicy<orgId: Bytes<32>, minTier: Uint<0..256>, requireActive: Boolean, checkExpiry: Boolean, referenceTime: Uint<0..4294967296>>',
                                 policy_0)
    }
    return _dummyContract._satisfiesGate_0(cred_0, policy_0);
  }
};
export const expectedVk = {};

export const circuitSignatures = {
  'authorityKey': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'verifierKey': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'memberKey': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'credentialCommitment': {pure: true, provable: false, argumentTypes: [{tag: 'Struct', name: 'MemberCredential', elements: [{name: 'tier', type: {tag: 'Uint', maxval: '255'}}, {name: 'joinedAt', type: {tag: 'Uint', maxval: '4294967295'}}, {name: 'expiresAt', type: {tag: 'Uint', maxval: '4294967295'}}, {name: 'orgId', type: {tag: 'Bytes', length: 32}}, {name: 'active', type: {tag: 'Boolean'}}, {name: 'renewalCount', type: {tag: 'Uint', maxval: '65535'}}]}, {tag: 'Bytes', length: 32}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'gatePassFor': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'revocationHash': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'satisfiesGate': {pure: true, provable: false, argumentTypes: [{tag: 'Struct', name: 'MemberCredential', elements: [{name: 'tier', type: {tag: 'Uint', maxval: '255'}}, {name: 'joinedAt', type: {tag: 'Uint', maxval: '4294967295'}}, {name: 'expiresAt', type: {tag: 'Uint', maxval: '4294967295'}}, {name: 'orgId', type: {tag: 'Bytes', length: 32}}, {name: 'active', type: {tag: 'Boolean'}}, {name: 'renewalCount', type: {tag: 'Uint', maxval: '65535'}}]}, {tag: 'Struct', name: 'GatePolicy', elements: [{name: 'orgId', type: {tag: 'Bytes', length: 32}}, {name: 'minTier', type: {tag: 'Uint', maxval: '255'}}, {name: 'requireActive', type: {tag: 'Boolean'}}, {name: 'checkExpiry', type: {tag: 'Boolean'}}, {name: 'referenceTime', type: {tag: 'Uint', maxval: '4294967295'}}]}], resultType: {tag: 'Boolean'}},
  'issueCredential': {pure: false, provable: true, argumentTypes: [{tag: 'Bytes', length: 32}], resultType: {tag: 'Tuple', types: []}},
  'registerGate': {pure: false, provable: true, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Struct', name: 'GatePolicy', elements: [{name: 'orgId', type: {tag: 'Bytes', length: 32}}, {name: 'minTier', type: {tag: 'Uint', maxval: '255'}}, {name: 'requireActive', type: {tag: 'Boolean'}}, {name: 'checkExpiry', type: {tag: 'Boolean'}}, {name: 'referenceTime', type: {tag: 'Uint', maxval: '4294967295'}}]}], resultType: {tag: 'Tuple', types: []}},
  'verifyAccess': {pure: false, provable: true, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Uint', maxval: '4294967295'}], resultType: {tag: 'Bytes', length: 32}},
  'suspendCredential': {pure: false, provable: true, argumentTypes: [{tag: 'Bytes', length: 32}], resultType: {tag: 'Tuple', types: []}},
  'reactivateCredential': {pure: false, provable: true, argumentTypes: [{tag: 'Bytes', length: 32}], resultType: {tag: 'Tuple', types: []}},
  'revokeCredential': {pure: false, provable: true, argumentTypes: [{tag: 'Bytes', length: 32}], resultType: {tag: 'Tuple', types: []}},
  'updateGate': {pure: false, provable: true, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Struct', name: 'GatePolicy', elements: [{name: 'orgId', type: {tag: 'Bytes', length: 32}}, {name: 'minTier', type: {tag: 'Uint', maxval: '255'}}, {name: 'requireActive', type: {tag: 'Boolean'}}, {name: 'checkExpiry', type: {tag: 'Boolean'}}, {name: 'referenceTime', type: {tag: 'Uint', maxval: '4294967295'}}]}], resultType: {tag: 'Tuple', types: []}},
};

export const declaredInterfaces = {};

//# sourceMappingURL=index.js.map
