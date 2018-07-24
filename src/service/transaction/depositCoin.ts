import * as factory from '@mocoin/factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

export interface IStartParams {
    expires: Date;
    agent: factory.transaction.depositCoin.IAgent;
    recipient: factory.transaction.depositCoin.IRecipient;
    amount: number;
    notes: string;
    toLocation: factory.transaction.depositCoin.ILocation;
}
/**
 * コイン入金取引サービス
 */
export class DepositCoinTransactionService extends Service {
    /**
     * 取引開始
     */
    public async start(params: IStartParams): Promise<factory.transaction.ITokenizedTransaction> {
        return this.fetch({
            uri: '/transactions/depositCoin/start',
            method: 'POST',
            body: {
                expires: params.expires,
                agent: params.agent,
                recipient: params.recipient,
                amount: params.amount,
                notes: params.notes,
                toLocation: params.toLocation
            },
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 取引確定
     */
    public async confirm(params: factory.transaction.ITokenizedTransaction): Promise<void> {
        return this.fetch({
            uri: '/transactions/depositCoin/confirm',
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: {
                token: params.token
            }
        });
    }
    /**
     * 取引中止
     */
    public async cancel(params: factory.transaction.ITokenizedTransaction): Promise<void> {
        return this.fetch({
            uri: '/transactions/depositCoin/cancel',
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: {
                token: params.token
            }
        });
    }
}
