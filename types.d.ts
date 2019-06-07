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


export {
    CoinSelect as coinAccumulative,
    CoinSelect as coinBlackjack,
    CoinSelect as coinSplit,
    CoinSelect as coinBreak,
};

declare var coinSelect: CoinSelect;
export default coinSelect;

