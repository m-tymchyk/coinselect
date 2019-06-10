export type ScriptType
    = 'LEGACY'
    | 'P2SH'
    | 'BECH32';

export type CoinUtxo = {
    txid: string;
    vout: number;
    value: number;
    type?: ScriptType;
    script?: string | { length: number; };
};

export type CoinTarget = {
    address: string;
    value?: number;
    type?: ScriptType;
    script?: string | { length: number; };
};

export type CoinSelectResult<I extends CoinUtxo = CoinUtxo, O extends CoinTarget = CoinTarget> = {
    inputs?: I[];
    outputs?: O[];
    fee: number;
};

declare type CoinSelect<I extends CoinUtxo = CoinUtxo, O extends CoinTarget = CoinTarget>
    = (utxos: I[], targets: O[], feeRate: number) => CoinSelectResult<I, O>;


declare var coinSelect: CoinSelect;
declare var coinAccumulative: CoinSelect;
declare var coinBlackjack: CoinSelect;
declare var coinSplit: CoinSelect;
declare var coinBreak: CoinSelect;

export { coinAccumulative, coinBlackjack, coinSplit, coinBreak, };
export default coinSelect;

