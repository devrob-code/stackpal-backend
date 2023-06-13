import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBankAccountsTable1686397793687 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "bankAccounts" DROP CONSTRAINT "FK_a401dd65653de4d2b7a80a14035";
    `);

    await queryRunner.query(`
        ALTER TABLE "bankAccounts" 
        RENAME COLUMN "bankId" TO "bankName";
    `);

    await queryRunner.query(`
        ALTER TABLE "bankAccounts" 
        ALTER COLUMN "bankName" TYPE VARCHAR;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
