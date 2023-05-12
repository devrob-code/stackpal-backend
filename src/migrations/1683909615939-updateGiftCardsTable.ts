import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGiftCardsTable1683909615939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "giftCards" RENAME COLUMN "cardType" TO "name";
        ALTER TABLE "giftCards" RENAME COLUMN "denomination" TO "denominationRange";
        ALTER TABLE "giftCards" 
            ADD COLUMN "country" VARCHAR NOT NULL, 
            ADD COLUMN "physicalFastRate" INT NOT NULL,
            ADD COLUMN "physicalSlowRate" INT NOT NULL,
            ADD COLUMN "ecodeFastRate" INT NOT NULL,
            ADD COLUMN "ecodeSlowRate" INT NOT NULL,
            ADD COLUMN "receiptType" VARCHAR,
            ADD COLUMN "receiptImageUrl" VARCHAR;
        ALTER TABLE "giftCards" DROP COLUMN IF EXISTS "physicalRate";
        ALTER TABLE "giftCards" DROP COLUMN IF EXISTS "eCodeRate";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
