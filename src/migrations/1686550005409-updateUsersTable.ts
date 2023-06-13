import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersTable1686550005409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "bvnVerified" BOOLEAN DEFAULT FALSE;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
