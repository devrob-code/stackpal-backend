import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateCryptoTransactionsTable1689892911838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cryptoTransactions" ALTER COLUMN "blockchainTxId" DROP NOT NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
