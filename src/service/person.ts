import * as factory from '@mocoin/factory';
import { CREATED, NO_CONTENT, OK } from 'http-status';

import { Service } from '../service';

export interface IBankAccountPaymentMethod {
    paymentMethodType: factory.paymentMethodType.BankAccount;
    accountNumber: string;
}
export type IPaymentMethod<T extends factory.paymentMethodType> =
    T extends factory.paymentMethodType.BankAccount ? IBankAccountPaymentMethod :
    never;

/**
 * ユーザーサービス
 */
export class PersonService extends Service {
    /**
     * コイン口座開設
     */
    public async openCoinAccount(params: {
        /**
         * person id
         * ログインユーザーの場合'me'を指定
         */
        personId: string;
        /**
         * 口座名義
         */
        name: string;
    }): Promise<factory.pecorino.account.IAccount> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts/coin`,
            method: 'POST',
            body: {
                name: params.name
            },
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * コイン口座開解約
     * 口座の状態を変更するだけで、ユーザーの所有する口座リストから削除はされません。
     * 解約された口座で取引を進行しようとすると400エラーとなります。
     */
    public async closeCoinAccount(params: {
        /**
         * person id
         * ログインユーザーの場合'me'を指定
         */
        personId: string;
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts/coin/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * コイン口座検索
     */
    public async searchCoinAccounts(params: {
        /**
         * person id
         * ログインユーザーの場合'me'を指定
         */
        personId: string;
    }): Promise<factory.pecorino.account.IAccount[]> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts/coin`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }

    /**
     * コイン口座取引履歴検索
     */
    public async searchCoinAccountMoneyTransferActions(params: {
        /**
         * person id
         * ログインユーザーの場合'me'を指定
         */
        personId: string;
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<factory.pecorino.action.transfer.moneyTransfer.IAction[]> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts/coin/${params.accountNumber}/actions/moneyTransfer`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 決済方法追加
     * 外部銀行口座や決済サービスから承認を受け取って、決済方法を追加するイメージ
     */
    public async addPaymentMethod<T extends factory.paymentMethodType>(
        params: {
            /**
             * person id
             * ログインユーザーの場合'me'を指定
             */
            personId: string;
        } & IPaymentMethod<T>
    ): Promise<factory.ownershipInfo.IPaymentMethod<T>> {
        return this.fetch({
            uri: `/people/${params.personId}/paymentMethods`,
            method: 'POST',
            body: {
                paymentMethodType: params.paymentMethodType,
                accountNumber: params.accountNumber
            },
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * 決済方法検索
     */
    public async searchPaymentMethods(params: {
        /**
         * person id
         * ログインユーザーの場合'me'を指定
         */
        personId: string;
    }): Promise<factory.ownershipInfo.IPaymentMethod<factory.paymentMethodType>[]> {
        return this.fetch({
            uri: `/people/${params.personId}/paymentMethods`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
}
