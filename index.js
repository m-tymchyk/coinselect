var utils = require('./utils')
var coinAccumulative = require('./accumulative')
var coinBlackjack = require('./blackjack')
var coinSplit = require('./split')
var coinBreak = require('./break')

// order by descending value, minus the inputs approximate fee
function utxoScore (x, feeRate) {
  return x.value - (feeRate * utils.inputBytes(x))
}

module.exports = function coinSelect (utxos, outputs, feeRate) {
  utxos = utxos.concat().sort(function (a, b) {
    return utxoScore(b, feeRate) - utxoScore(a, feeRate)
  })

  // attempt to use the blackjack strategy first (no change output)
  var base = coinBlackjack(utxos, outputs, feeRate)
  if (base.inputs) return base

  // else, try the accumulative strategy
  return coinAccumulative(utxos, outputs, feeRate)
}

module.exports.coinAccumulative = coinAccumulative
module.exports.coinBlackjack = coinBlackjack
module.exports.coinSplit = coinSplit
module.exports.coinBreak = coinBreak
