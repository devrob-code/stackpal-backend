import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createWithdrawalRequestsTable1693574151257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'withdrawalRequests',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'userId', type: 'int' },
          { name: 'bankAccountId', type: 'int' },
          { name: 'amount', type: 'int' },
          { name: 'userCredited', type: 'boolean', default: false },
          { name: 'creditedBy', type: 'int', isNullable: true },
          { name: 'transactionId', type: 'varchar', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'withdrawalRequests',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createForeignKey(
      'withdrawalRequests',
      new TableForeignKey({
        columnNames: ['bankAccountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bankAccounts',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('withdrawalRequests');
  }
}
