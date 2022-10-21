import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersTable1666309088312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "pin" INT;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
