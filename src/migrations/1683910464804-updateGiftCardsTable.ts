import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGiftCardsTable1683910464804 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "giftCards" ALTER COLUMN "denominationRange" TYPE VARCHAR;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
