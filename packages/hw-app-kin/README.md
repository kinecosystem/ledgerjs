<img src="https://user-images.githubusercontent.com/211411/34776833-6f1ef4da-f618-11e7-8b13-f0697901d6a8.png" height="100" />

## Ledger Kin app API

## Usage


```js
// when using "@ledgerhq/hw-transport-node-hid" library you need to go to
// Settings -> Browser support in ledger stellar app and set this setting to 'No'
import Transport from "@ledgerhq/hw-transport-node-hid";
// import Transport from "@ledgerhq/hw-transport-u2f"; // for browser
import Kin from "@ledgerhq/hw-app-kin";
import KinSdk from "kin-sdk";

const getKinAppVersion = async () => {
    const transport = await Transport.create();
    const kinApi = new Kin(transport);
    const result = await kinApi.getAppConfiguration();
    return result.version;
}
getKinAppVersion().then(v => console.log(v));

const getKinPublicKey = async () => {
  const transport = await Transport.create();
  const kinApi = new Kin(transport);
  const result = await kinApi.getPublicKey("44'/2017'/0'");
  return result.publicKey;
};
let publicKey;
getKimPublicKey().then(pk => {
    console.log(pk);
    publicKey = pk;
});

const signKinTransaction = async (publicKey) => {
  const transaction = new KinSdk.TransactionBuilder({accountId: () => publicKey, sequenceNumber: () => '1234', incrementSequenceNumber: () => null})
    .addOperation(KinSdk.Operation.createAccount({
       source: publicKey,
       destination: 'GBLYVYCCCRYTZTWTWGOMJYKEGQMTH2U3X4R4NUI7CUGIGEJEKYD5S5OJ', // SATIS5GR33FXKM7HVWZ2UQO33GM66TVORZUEF2HPUQ3J7K634CTOAWQ7
       startingBalance: '11.331',
    }))
    .build();
  const transport = await Transport.create();
  const kinApi = new Kin(transport);
  const result = await kinApi.signTransaction("44'/2017'/0'", transaction.signatureBase());
  
  // add signature to transaction
  const keyPair = KinSdk.Keypair.fromPublicKey(publicKey);
  const hint = keyPair.signatureHint();
  const decorated = new KinSdk.xdr.DecoratedSignature({hint: hint, signature: result.signature});
  transaction.signatures.push(decorated);
  
  return transaction;
}
signKinTransaction(publicKey).then(transaction => console.log(transaction.toEnvelope().toXDR().toString('base64')));
```


[Github](https://github.com/LedgerHQ/ledgerjs/),
[API Doc](http://ledgerhq.github.io/ledgerjs/),
[Ledger Devs Slack](https://ledger-dev.slack.com/)
