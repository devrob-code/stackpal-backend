import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersTable1649521433720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "emailVerified" BOOLEAN DEFAULT FALSE;`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "phoneVerified" BOOLEAN DEFAULT FALSE;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerified";`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phoneVerified"`);
  }
}
