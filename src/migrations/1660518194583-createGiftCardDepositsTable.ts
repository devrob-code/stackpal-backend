import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createGiftCardDepositsTable1660518194583
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'giftCardDeposits',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'userId', type: 'int' },
          {
            name: 'type',
            type: 'enum',
            enum: ['Physical', 'E-Code'],
          },
          { name: 'denomination', type: 'bigint', isNullable: true },
          { name: 'isApproved', type: 'boolean', default: false },
          { name: 'approvedBy', type: 'int', isNullable: true },
          { name: 'approvalRate', type: 'bigint', isNullable: true },
          { name: 'isCredited', type: 'boolean', default: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'giftCardDeposits',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createForeignKey(
      'giftCardDeposits',
      new TableForeignKey({
        columnNames: ['approvedBy'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('giftCardDeposits');
  }
}
