type ScriptType
    = 'LEGACY'
    | 'P2SH'
    | 'BECH32';


type BaseUtxo = {
    txId: string;
    vout: number;
    value: number;
    type?: ScriptType;
    script?: string | { length: number; };
};


type BaseTarget = {
    address: string;
    value?: number;
    type?: ScriptType;
    script?: string | { length: number; };
};


type CoinSelectResult<I extends BaseUtxo, O extends BaseTarget> = {
    inputs?: I[];
    outputs?: O[];
    fee: number;
};


declare function coinSelect<
    I extends BaseUtxo = BaseUtxo,
    O extends BaseTarget = BaseTarget
>(
    utxos: I[],
    targets: O[],
    feeRate: number
): CoinSelectResult<I, O>;


declare module 'coinselect' {
    export = coinSelect;
}

declare module 'coinselect/accumulative' {
    export = coinSelect;
}

declare module 'coinselect/blackjack' {
    export = coinSelect;
}

declare module 'coinselect/break' {
    export = coinSelect;
}

declare module 'coinselect/split' {
    export = coinSelect;
}
