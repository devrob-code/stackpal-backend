import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';
import { SendFiatDto } from './dto/request/send-fiat.dto';
import { TransactionRepositoryService } from 'src/repositories/transactions/transactions.repository.service';
import { HelperService } from 'src/core/helpers/helper.service';
import { MailService } from 'src/core/mail/mail.service';
import * as moment from 'moment';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';
import { FiatTransactionsType } from '../transactions/transactions.constants';
import { WalletAction } from '../wallet/wallet.constants';

@Injectable()
export class UserToUserService {
  constructor(
    private readonly mailService: MailService,
    private readonly helperService: HelperService,
    private readonly walletRepositoryService: WalletRepositoryService,
    private readonly transactionRepositoryService: TransactionRepositoryService,
    private readonly userRepositoryService: UserRepositoryService,
  ) {}

  public async sendFiat(body: SendFiatDto, userId: number): Promise<any> {
    try {
      const txId = this.helperService.generateTransactionId('SPAL_', 8);
      const senderWallet = await this.walletRepositoryService.getByCurrencyIdAndUserId(body.currencyId, userId);
      const receiver = await this.userRepositoryService.getById(body.receiverId);
      const receiverAction = body.action == WalletAction.increase && WalletAction.increase;
      const senderAction = body.action == WalletAction.increase && WalletAction.deduct;

      if (senderWallet.balance >= body.amount) {
        const sendFiat = await this.walletRepositoryService
          .changeWalletBalanceByCurrencyIdAndUserId(userId, body.amount, senderAction, body.currencyId)
          .then(() => {
            this.walletRepositoryService.changeWalletBalanceByCurrencyIdAndUserId(
              body.receiverId,
              body.amount,
              receiverAction,
              body.currencyId,
            );

            return true;
          })
          .catch((e) => {
            return false;
          });

        if (sendFiat) {
          // Log into transactions

          const response = await this.transactionRepositoryService.createFiatTransactionHistory({
            txId,
            userId: body.receiverId,
            amount: body.amount,
            type: body.type,
            transactionDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            senderId: userId,
          });
          if (response)
            this.mailService.fiatTransaction(
              receiver.email,
              body.amount,
              receiver.username,
              FiatTransactionsType.userToUser,
              txId,
            );

          return {
            status: true,
            message: 'Successfully Sent',
            data: response,
          };
        } else {
          return {
            status: false,
            message: 'An Error Occured',
            data: null,
          };
        }
      } else {
        return {
          status: false,
          message: 'Insufficient Balance',
          data: null,
        };
      }
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
