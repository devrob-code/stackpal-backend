import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createElectricityTransactionsTable1683494262666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'electricityTransactions',
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
          { name: 'plan', type: 'enum', enum: ['Prepaid', 'Postpaid'] },
          { name: 'recipient', type: 'varchar' },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'electricityTransactions',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('electricityTransactions');
  }
}
