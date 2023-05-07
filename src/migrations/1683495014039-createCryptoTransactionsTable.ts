import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createCryptoTransactionsTable1683495014039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cryptoTransactions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'txId', type: 'varchar' },
          { name: 'blockchainTxId', type: 'varchar' },
          { name: 'userId', type: 'int' },
          { name: 'amount', type: 'bigint' },
          { name: 'network', type: 'varchar' },
          { name: 'type', type: 'enum', enum: ['Sent', 'Received', 'Sold', 'Bought'] },
          { name: 'sendType', type: 'enum', enum: ['User to User', 'Wallet Address'], isNullable: true },
          { name: 'senderWalletAddress', type: 'varchar' },
          { name: 'receiverWalletAddress', type: 'varchar' },
          { name: 'blockTime', type: 'varchar' },
          { name: 'transactionDate', type: 'timestamp', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'cryptoTransactions',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cryptoTransactions');
  }
}
