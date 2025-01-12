# coinselect

[![TRAVIS](https://secure.travis-ci.org/bitcoinjs/coinselect.png)](http://travis-ci.org/bitcoinjs/coinselect)
[![NPM](http://img.shields.io/npm/v/coinselect.svg)](https://www.npmjs.org/package/coinselect)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

An unspent transaction output (UTXO) selection module for bitcoin.

**WARNING:** Value units are in `satoshi`s, **not** Bitcoin.


## Algorithms
Module | Algorithm | Re-orders UTXOs?
-|-|-
`require('coinselect')` | Blackjack, with Accumulative fallback | By Descending Value
`require('coinselect').coinAccumulative` | Accumulative - accumulates inputs until the target value (+fees) is reached, skipping detrimental inputs | -
`require('coinselect').coinBlackjack` | Blackjack - accumulates inputs until the target value (+fees) is matched, does not accumulate inputs that go over the target value (within a threshold) | -
`require('coinselect').coibBreak` | Break - breaks the input values into equal denominations of `output` (as provided) | -
`require('coinselect').coinSplit` | Split - splits the input values evenly between all `outputs`, any provided `output` with `.value` remains unchanged | -


**Note:** Each algorithm will add a change output if the `input - output - fee` value difference is over a dust threshold.
This is calculated independently by `utils.finalize`, irrespective of the algorithm chosen, for the purposes of safety.

**Pro-tip:** if you want to send-all inputs to an output address, `coinSplit` with a partial output (`.address` defined, no `.value`) can be used to send-all, while leaving an appropriate amount for the `fee`. 

## Example

``` javascript
let coinSelect = require('coinselect')
let feeRate = 55 // satoshis per byte
let utxos = [
  ...,
  {
    txid: '...',
    vout: 0,
    ...,
    value: 10000
  }
]
let targets = [
  ...,
  {
    address: '1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm',
    value: 5000
  }
]

// ...
let { inputs, outputs, fee } = coinSelect(utxos, targets, feeRate)

// the accumulated fee is always returned for analysis
console.log(fee)

// .inputs and .outputs will be undefined if no solution was found
if (!inputs || !outputs) return

let txb = new bitcoin.TransactionBuilder()

inputs.forEach(input => txb.addInput(input.txid, input.vout))
outputs.forEach(output => {
  // watch out, outputs may have been added that you need to provide
  // an output address/script for
  if (!output.address) {
    output.address = wallet.getChangeAddress()
    wallet.nextChangeAddress()
  }

  txb.addOutput(output.address, output.value)
})
```


## License [MIT](LICENSE)
