import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createFiatPaymentsTable1653742776432
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fiatDeposits',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'p2pAccountId',
            type: 'int',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'isApproved',
            type: 'boolean',
            default: false,
          },
          {
            name: 'approvedBy',
            type: 'int',
            isNullable: true,
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

    await queryRunner.createForeignKey(
      'fiatDeposits',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createForeignKey(
      'fiatDeposits',
      new TableForeignKey({
        columnNames: ['p2pAccountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'p2pAccounts',
      }),
    );

    await queryRunner.createForeignKey(
      'fiatDeposits',
      new TableForeignKey({
        columnNames: ['approvedBy'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "fiatDeposits"`);
  }
}
