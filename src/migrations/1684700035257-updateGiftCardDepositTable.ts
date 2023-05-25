import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGiftCardDepositTable1684700035257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "giftCardDeposits" ADD COLUMN "cardName" VARCHAR DEFAULT NULL; 
        ALTER TABLE "giftCardDeposits" ADD COLUMN "cardWorth" INT DEFAULT NULL; 
        ALTER TABLE "giftCardDeposits" ADD COLUMN "giftCardId" INT DEFAULT NULL; 
        ALTER TABLE "giftCardDeposits" ADD COLUMN "speed" VARCHAR DEFAULT NULL; 
        ALTER TABLE "giftCardDeposits" ADD COLUMN "rate" INT DEFAULT NULL; 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
