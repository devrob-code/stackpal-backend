import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createBankAccountsTable1685402267524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bankAccounts',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'userId', type: 'int' },
          { name: 'bankId', type: 'int' },
          { name: 'accountName', type: 'varchar' },
          { name: 'accountNumber', type: 'varchar' },
          { name: 'type', type: 'enum', enum: ['savings', 'current'], isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'bankAccounts',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createForeignKey(
      'bankAccounts',
      new TableForeignKey({
        columnNames: ['bankId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'banks',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bankAccounts');
  }
}
