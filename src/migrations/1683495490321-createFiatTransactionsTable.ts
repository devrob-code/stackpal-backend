import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createFiatTransactionsTable1683495490321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fiatTransactions',
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
          { name: 'type', type: 'enum', enum: ['Withdrawal', 'Deposit'] },
          { name: 'p2pAccountId', type: 'int', isNullable: true },
          { name: 'receiverBankId', type: 'int', isNullable: true },
          { name: 'transactionDate', type: 'timestamp', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'fiatTransactions',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fiatTransactions');
  }
}
