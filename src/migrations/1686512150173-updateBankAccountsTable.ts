import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBankAccountsTable1686512150173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bankAccounts" ADD COLUMN "isDeleted" BOOLEAN DEFAULT FALSE; `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
