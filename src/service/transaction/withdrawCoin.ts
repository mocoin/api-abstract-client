import * as factory from '@mocoin/factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

export interface IStartParams {
    expires: Date;
    agent: factory.transaction.withdrawCoin.IAgent;
    recipient: factory.transaction.withdrawCoin.IRecipient;
    amount: number;
    notes: string;
    fromLocation: factory.transaction.withdrawCoin.ILocation;
}
/**
 * コイン出金取引サービス
 */
export class WithdrawCoinTransactionService extends Service {
    /**
     * 取引開始
     */
    public async start(params: IStartParams): Promise<factory.transaction.ITokenizedTransaction> {
        return this.fetch({
            uri: '/transactions/withdrawCoin/start',
            method: 'POST',
            body: {
                expires: params.expires,
                agent: params.agent,
                recipient: params.recipient,
                amount: params.amount,
                notes: params.notes,
                fromLocation: params.fromLocation
            },
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 取引確定
     */
    public async confirm(params: factory.transaction.ITokenizedTransaction): Promise<void> {
        return this.fetch({
            uri: '/transactions/withdrawCoin/confirm',
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
    public async cancel(params: factory.transaction.ITokenizedTransaction): Promise<void> {
        return this.fetch({
            uri: '/transactions/withdrawCoin/cancel',
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT],
            body: {
                token: params.token
            }
        });
    }
}
