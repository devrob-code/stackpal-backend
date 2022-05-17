import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createP2PAccountsTable1652787454725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'p2pAccounts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'createdBy',
            type: 'int',
          },
          {
            name: 'accountName',
            type: 'varchar',
          },
          {
            name: 'accountNumber',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'bankName',
            type: 'varchar',
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "p2pAccounts"`);
  }
}
