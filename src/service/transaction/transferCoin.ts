import * as factory from '@mocoin/factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

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
    public async start(params: IStartParams): Promise<factory.transaction.transferCoin.ITransaction> {
        return this.fetch({
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
    public async confirm(params: {
        transactionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/transferCoin/${params.transactionId}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }

    /**
     * 取引中止
     */
    public async cancel(params: {
        transactionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/transferCoin/${params.transactionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }
}
