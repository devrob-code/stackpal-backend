import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateFiatPaymentsTable1653757562352
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fiatDeposits" ADD COLUMN "walletId" INT;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
