const bitcoin = require('bitcoinjs-lib');
const readline = require('readline');
const tinysecp = require('tiny-secp256k1');

// Initialize ECC library
bitcoin.initEccLib(tinysecp);

// Function to create a redeem script with the block height
function createRedeemScript(pubkeyHex, blockheight) {
  const pubkey = Buffer.from(pubkeyHex, 'hex');
  const lockTime = bitcoin.script.number.encode(blockheight);
  return bitcoin.script.compile([
    lockTime,
    bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
    bitcoin.opcodes.OP_DROP,
    pubkey,
    bitcoin.opcodes.OP_CHECKSIG,
  ]);
}

// Function to get the P2SH address from the redeem script
function getP2SHAddress(redeemScript) {
  const scriptPubKey = bitcoin.payments.p2sh({ redeem: { output: redeemScript } });
  return scriptPubKey.address;
}

// Set up readline to get user inputs
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask questions and get answers from the user
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Main function to execute the script
async function main() {
  try {
    const pubkeyHex = await askQuestion("Please Enter the public key (hex): ");
    const blockheight = parseInt(await askQuestion("Enter the block height: "), 10);

    const redeemScript = createRedeemScript(pubkeyHex, blockheight);
    console.log("Redeem Script (hex): ", redeemScript.toString('hex'));

    const p2shAddress = getP2SHAddress(redeemScript);
    console.log("P2SH Address: ", p2shAddress);

  } catch (err) {
    console.error("An error occurred: ", err.message);
  } finally {
    rl.close();
  }
}

// Execute the main function
main().catch(err => {
  console.error("An error occurred: ", err);
  rl.close();
});
