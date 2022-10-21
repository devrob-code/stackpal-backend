import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersTable1666307937208 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "pin" VARCHAR;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
