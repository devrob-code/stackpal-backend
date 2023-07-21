import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateFiatTansactionsTable1688080817335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "fiatTransactions" ADD COLUMN "senderId" INT;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
