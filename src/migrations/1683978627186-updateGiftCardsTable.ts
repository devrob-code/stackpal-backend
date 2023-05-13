import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGiftCardsTable1683978627186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "giftCards" ADD COLUMN "isActive" BOOLEAN DEFAULT TRUE; 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
