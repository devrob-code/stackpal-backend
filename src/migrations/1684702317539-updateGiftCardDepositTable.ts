import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGiftCardDepositTable1684702317539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "giftCardDeposits" ALTER COLUMN "denomination" TYPE VARCHAR;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
