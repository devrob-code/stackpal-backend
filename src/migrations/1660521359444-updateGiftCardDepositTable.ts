import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGiftCardDepositTable1660521359444
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "giftCardDeposits" 
            ADD COLUMN "cardImageUrl" VARCHAR,
            ADD COLUMN "code" VARCHAR`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "giftCardDeposits" 
    DROP COLUMN "cardImageUrl",
    DROP COLUMN "code"`);
  }
}
