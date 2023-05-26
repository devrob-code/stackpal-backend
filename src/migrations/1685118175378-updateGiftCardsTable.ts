import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGiftCardsTable1685118175378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "giftCards" ALTER COLUMN "physicalSlowRate" DROP NOT NULL;
            ALTER TABLE "giftCards" ALTER COLUMN "physicalFastRate" DROP NOT NULL;
            ALTER TABLE "giftCards" ALTER COLUMN "ecodeFastRate" DROP NOT NULL;
            ALTER TABLE "giftCards" ALTER COLUMN "ecodeSlowRate" DROP NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
