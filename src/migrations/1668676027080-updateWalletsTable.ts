import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateWalletsTable1668676027080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "wallets" ADD COLUMN "address" TEXT;
        ALTER TABLE "wallets" ADD COLUMN "private_key" TEXT;
        ALTER TABLE "wallets" ADD COLUMN "network" VARCHAR;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
