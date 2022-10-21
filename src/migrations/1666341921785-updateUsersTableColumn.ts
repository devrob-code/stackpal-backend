import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersTableColumn1666341921785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users RENAME COLUMN pin TO "transactionPin";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
