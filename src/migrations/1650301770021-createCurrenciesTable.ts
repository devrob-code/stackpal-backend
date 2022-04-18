import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCurrenciesTable1650301770021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'currencies',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'alias',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'logo',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'bigint',
          },
          {
            name: 'isActive',
            type: 'boolean',
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
