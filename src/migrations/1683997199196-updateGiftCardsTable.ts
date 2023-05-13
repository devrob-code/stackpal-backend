import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGiftCardsTable1683997199196 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "giftCards" ADD COLUMN "countryFlag" VARCHAR DEFAULT NULL; 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
