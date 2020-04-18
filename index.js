const bgold = require('bgoldjs-lib');
const bip39 = require('bip39');

async function main() {
  const BTG = bgold.networks.bitcoingold;

  const mnemonic = 'shoot island position soft burden budget tooth cruel issue economy destroy above';
  bip39.validateMnemonic(mnemonic);

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = bgold.HDNode.fromSeedBuffer(seed, BTG);

  console.log('mnenomic:', mnemonic);
  console.log('seed:', seed.toString('hex'));

  const node = root.derivePath("m/84'/156'/0'/0/0");
  console.log('path:', "m/84'/156'/0'/0/0");

  const pubKey = node.getPublicKeyBuffer();
  console.log('derived pubKey:', pubKey.toString('hex'));
  console.log('p2pkh', node.getAddress());

  const scriptPubKey = bgold.script.witnessPubKeyHash.output.encode(bgold.crypto.hash160(pubKey))
  const p2wpkh = bgold.address.fromOutputScript(scriptPubKey, BTG);

  console.log('bech32 p2wpkh:', p2wpkh);
}
main();
