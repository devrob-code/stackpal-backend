import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createAirtimeDataTransactionsTable1683494855049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'airtimeDataTransactions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'txId', type: 'varchar' },
          { name: 'userId', type: 'int' },
          { name: 'amount', type: 'bigint' },
          { name: 'network', type: 'varchar' },
          { name: 'type', type: 'enum', enum: ['Data', 'Airtime'] },
          { name: 'plan', type: 'text', isNullable: true },
          { name: 'recipient', type: 'varchar' },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'airtimeDataTransactions',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('airtimeDataTransactions');
  }
}
