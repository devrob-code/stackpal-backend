import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateWalletsTable1673742700312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wallets" 
        ALTER COLUMN balance TYPE BIGINT;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
