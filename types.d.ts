type BaseUtxo = {
    txId: string;
    vout: number;
    value: number;
    script?: string;

    [key: string]: any;
};

type BaseTarget = {
    address: string;
    value?: number;
    script?: string;

    [key: string]: any;
};

type CoinSelectResult = {
    inputs?: BaseUtxo[];
    outputs?: BaseTarget[];
    fee: number;
};

declare module 'coinselect' {
    function coinSelect(utxos: BaseUtxo[], targets: BaseTarget[], feeRate: number): CoinSelectResult;

    export = coinSelect;
}

declare module 'coinselect/accumulative' {
    function coinSelect(utxos: BaseUtxo[], targets: BaseTarget[], feeRate: number): CoinSelectResult;

    export = coinSelect;
}

declare module 'coinselect/blackjack' {
    function coinSelect(utxos: BaseUtxo[], targets: BaseTarget[], feeRate: number): CoinSelectResult;

    export = coinSelect;
}

declare module 'coinselect/break' {
    function coinSelect(utxos: BaseUtxo[], targets: BaseTarget[], feeRate: number): CoinSelectResult;

    export = coinSelect;
}

declare module 'coinselect/split' {
    function coinSelect(utxos: BaseUtxo[], targets: BaseTarget[], feeRate: number): CoinSelectResult;

    export = coinSelect;
}
