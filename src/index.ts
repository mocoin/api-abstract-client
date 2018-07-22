// tslint:disable:max-classes-per-file
import * as factory from '@mocoin/factory';

import { AuthClient } from './auth/authClient';

import { PersonService } from './service/person';
import { BuyCoinTransactionService } from './service/transaction/buyCoin';
import { DepositCoinTransactionService } from './service/transaction/depositCoin';
import { ReturnCoinTransactionService } from './service/transaction/returnCoin';
import { TransferCoinTransactionService } from './service/transaction/transferCoin';
import { WithdrawCoinTransactionService } from './service/transaction/withdrawCoin';
import * as transporters from './transporters';

export import factory = factory;
export import transporters = transporters;

/**
 * 認証クライアント抽象クラス
 */
export abstract class Auth extends AuthClient { }
/**
 * サービスモジュール
 */
export namespace service {
    /**
     * ユーザーサービス
     */
    export class Person extends PersonService { }
    export namespace transaction {
        /**
         * コイン購入取引サービス
         */
        export class BuyCoin extends BuyCoinTransactionService { }
        /**
         * コイン入金取引サービス
         */
        export class DepositCoin extends DepositCoinTransactionService { }
        /**
         * コイン返金取引サービス
         */
        export class ReturnCoin extends ReturnCoinTransactionService { }
        /**
         * コイン転送取引サービス
         */
        export class TransferCoin extends TransferCoinTransactionService { }
        /**
         * コイン出金取引サービス
         */
        export class WithdrawCoin extends WithdrawCoinTransactionService { }
    }
}
