import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDefaultCurrency1650316855006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO currencies 
        (name, alias, logo, price, "isActive") 
        VALUES
        ('Bitcoin','BTC', 'https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/87496d50-2408-43e1-ad4c-78b47b448a6a.png', '4069819', true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
