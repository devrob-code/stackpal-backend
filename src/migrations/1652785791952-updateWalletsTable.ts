import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateWalletsTable1652785791952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE wallets ALTER COLUMN balance SET DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
