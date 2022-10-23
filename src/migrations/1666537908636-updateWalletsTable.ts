import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateWalletsTable1666537908636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wallets" ADD COLUMN "pin" VARCHAR;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
