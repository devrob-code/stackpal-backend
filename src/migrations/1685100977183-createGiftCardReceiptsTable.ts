import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createGiftCardReceiptsTable1685100977183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'giftCardReceipts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'giftCardId', type: 'int', isNullable: true },
          { name: 'giftCardName', type: 'varchar' },
          { name: 'name', type: 'varchar' },
          { name: 'rate', type: 'int' },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'giftCardReceipts',
      new TableForeignKey({
        columnNames: ['giftCardId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'giftCards',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('giftCards');
  }
}
