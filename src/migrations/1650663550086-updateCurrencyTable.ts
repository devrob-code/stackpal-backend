import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateCurrencyTable1650663550086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE currency_type_enum AS ENUM (
            'Fiat',
            'Crypto'
        );

        ALTER TABLE "currencies" ADD COLUMN type VARCHAR;

        ALTER TABLE "currencies" ALTER COLUMN type TYPE currency_type_enum USING type::currency_type_enum;
    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
