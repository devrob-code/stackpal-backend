import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class updateGiftCardsTable1660512978943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "giftCards"`);
    await queryRunner.query(`DROP TABLE "rates"`);

    await queryRunner.createTable(
      new Table({
        name: 'giftCards',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'adminId', type: 'int' },
          { name: 'cardType', type: 'varchar', isNullable: false },
          { name: 'imageUrl', type: 'varchar', isNullable: true },
          { name: 'physicalRate', type: 'bigint', isNullable: false },
          { name: 'eCodeRate', type: 'bigint', isNullable: false },
          { name: 'denomination', type: 'int', isNullable: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'giftCards',
      new TableForeignKey({
        columnNames: ['adminId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('giftCards');
  }
}
