import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersTable1672329386223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "users" ADD COLUMN "avatar" VARCHAR;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
