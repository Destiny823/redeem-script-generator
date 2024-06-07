# Redeem Script Generator

## Introduction

The Redeem Script Generator is a Node.js tool designed to facilitate the creation and verification of Bitcoin Pay-to-Script-Hash (P2SH) addresses using BIP-65. This project allows users to generate a redeem script and its corresponding P2SH address based on a given public key (in hexadecimal format) or a Taproot address and a specified block height. This tool is particularly useful for verifying the locking of assets in non-custodial staking setups, ensuring the security and immutability of transactions until a specified block height is reached.

## Features

- **Generate Redeem Script:** Create a redeem script using a public key (hex) or a Taproot address and a block height.
- **P2SH Address Verification:** Verify and display the corresponding P2SH address of the generated redeem script.
- **Support for BIP-65:** Utilize the `OP_CHECKLOCKTIMEVERIFY` opcode to ensure time-locked transactions.
- **Command-Line Interface:** Simple and interactive CLI for user inputs.

## Usage
Run the Script:

```
npm start
```
Follow the Prompts:

Enter a public key (hex) or a Taproot address.
Enter the block height for the OP_CHECKLOCKTIMEVERIFY.
Output:

The script will display the generated redeem script (in hex) and its corresponding P2SH address.

## How It Works
Code Explanation

- **Input Handling**: The script uses readline to handle user inputs for the public key or Taproot address and the block height.
- **Public Key Extraction**: If a Taproot address is provided, the script extracts the internal public key using bitcoinjs-lib.
- **Locking Script Creation**: The getCltvRedeemScript function creates a locking script using OP_CHECKLOCKTIMEVERIFY and the provided public key.
- **P2SH Address Calculation**: The script calculates the corresponding P2SH address from the redeem script using bitcoinjs-lib.

## Key Functions
- **getCltvRedeemScript(pubkeyHex, blockheight)**:
This function generates the redeem script for a given public key and block height using BIP-65.
```
function getCltvRedeemScript(pubkeyHex, blockheight) {
  const pubkey = Buffer.from(pubkeyHex, 'hex');
  const lockTime = bitcoin.script.number.encode(blockheight);
  const redeemScript = bitcoin.script.compile([
    lockTime,
    bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
    bitcoin.opcodes.OP_DROP,
    pubkey,
    bitcoin.opcodes.OP_CHECKSIG,
  ]);
  return redeemScript;
}
```

## Benefits
- **Non-Custodial Staking**: This tool supports the BRC-H7LC standard, enabling users to lock their assets securely without relying on a third party.
- **Script Verification**: Users can verify the integrity and correctness of their redeem scripts and corresponding P2SH addresses.
- **Educational Resource**: This project serves as a practical example of implementing BIP-65 in a real-world application.

**Resources and Further Reading:**

* **General BIPs**: [Visit the GitHub page for BIPs (Bitcoin Improvement Proposals)](https://github.com/bitcoin/bips)
* **BIP 65 (OP_CHECKLOCKTIMEVERIFY)**: [Read about BIP 65 on GitHub](https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki)
* **BIP 112 (CHECKSEQUENCEVERIFY)**: [Discover the specifics of BIP 112 on GitHub](https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki)
* **HTLC (Hash Time-Locked Contracts)**: [Explore how HTLCs function at Bitcoin Optech](https://bitcoinops.org/en/topics/htlc/)

* **BRC-H7LC**:  [ A native Bitcoin staking, non-custodial for BRC20 Standard](https://l1f.discourse.group/t/brc-h7lc-a-native-bitcoin-staking-non-custodial-for-brc20-standard/646)
