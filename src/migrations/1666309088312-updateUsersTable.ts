import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersTable1666309088312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SELECT * FROM "users"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
