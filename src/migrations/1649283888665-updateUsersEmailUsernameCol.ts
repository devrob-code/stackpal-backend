import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersEmailUsernameCol1649283888665
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD UNIQUE(username);`);
    await queryRunner.query(`ALTER TABLE "users" ADD UNIQUE(email);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
