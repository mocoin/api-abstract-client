import * as factory from '@mocoin/factory';
import { NO_CONTENT, OK } from 'http-status';

import { IFetchOptions, Service } from '../../service';

export interface IStartParams {
    expires: Date;
    agent: factory.transaction.transferCoin.IAgent;
    recipient: factory.transaction.transferCoin.IRecipient;
    amount: number;
    notes: string;
    fromLocation: factory.transaction.transferCoin.ILocation;
    toLocation: factory.transaction.transferCoin.ILocation;
}
/**
 * コイン転送取引サービス
 */
export class TransferCoinTransactionService extends Service {
    /**
     * 取引開始
     */
    public async start(
        params: IStartParams,
        options?: IFetchOptions
    ): Promise<factory.transaction.ITokenizedTransaction> {
        return this.fetch({
            ...options,
            uri: '/transactions/transferCoin/start',
            method: 'POST',
            body: {
                expires: params.expires,
                agent: params.agent,
                recipient: params.recipient,
                amount: params.amount,
                notes: params.notes,
                fromLocation: params.fromLocation,
                toLocation: params.toLocation
            },
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 取引確定
     */
    public async confirm(
        params: factory.transaction.ITokenizedTransaction,
        options?: IFetchOptions): Promise<void> {
        return this.fetch({
            ...options,
            uri: '/transactions/transferCoin/confirm',
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT],
            body: {
                token: params.token
            }
        });
    }
    /**
     * 取引中止
     */
    public async cancel(
        params: factory.transaction.ITokenizedTransaction,
        options?: IFetchOptions
    ): Promise<void> {
        return this.fetch({
            ...options,
            uri: '/transactions/transferCoin/cancel',
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT],
            body: {
                token: params.token
            }
        });
    }
}
