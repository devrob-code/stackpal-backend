import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTransactionsTable1683581511507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "tvTransactions" ADD COLUMN "billerTxId" VARCHAR, ADD COLUMN "status" VARCHAR;
        ALTER TABLE "airtimeDataTransactions" ADD COLUMN "billerTxId" VARCHAR, ADD COLUMN "status" VARCHAR;
        ALTER TABLE "electricityTransactions" ADD COLUMN "billerTxId" VARCHAR, ADD COLUMN "status" VARCHAR;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
