import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersTable1650494952753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE roles_enum AS ENUM (
            'Customer',
            'Admin',
            'Super Admin'
        );

        ALTER TABLE "users" ADD COLUMN role VARCHAR;

        ALTER TABLE "users" ALTER COLUMN role TYPE roles_enum USING role::roles_enum;
        
        ALTER TABLE "users" ALTER COLUMN role SET DEFAULT 'Customer';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
