import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersTable1668859925839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "users" ADD COLUMN "dob" DATE;
        
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
