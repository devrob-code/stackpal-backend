import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateFiatTansactionsTable1688075131524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "fiatTransactions" ALTER COLUMN type TYPE VARCHAR;
            DROP TYPE IF EXISTS fiatTransactions_type_enum CASCADE;
            CREATE TYPE fiat_transactions_type AS ENUM (
                'Withdrawal',
                'Deposit',
                'User to User'
            );
            ALTER TABLE "fiatTransactions" ALTER COLUMN type TYPE fiat_transactions_type USING type::fiat_transactions_type;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
