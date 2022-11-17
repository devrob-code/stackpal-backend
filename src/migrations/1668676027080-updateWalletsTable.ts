import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateWalletsTable1668676027080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wallets" ADD COLUMN "address" TEXT;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
