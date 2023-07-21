import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateCryptoTransactionsTable1689904594369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cryptoTransactions" ADD COLUMN "receiverId" INT DEFAULT NULL; `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
