import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1657582964306 implements MigrationInterface {
  name = 'PostRefactoring1657582964306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wallets" ADD "address" TEXT NULL`);
    await queryRunner.query(
      `ALTER TABLE "wallets" ADD "private_key" TEXT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "wallets" ADD "network" TEXT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
