import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertBankDetailsData1685301236786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "banks" ("bankName") 
        VALUES
            ('Access Bank'),
            ('Ecobank'),
            ('FBN Mortgage Limited'),
            ('FCMB'),
            ('Fidelity Bank'),
            ('Finatrust Microfinance Bank'),
            ('First Bank of Nigeria'),
            ('Globus Bank'),
            ('Guarantee Trust Bank'),
            ('Heritage Bank'),
            ('JAIZ Bank'),
            ('Keystone Bank'),
            ('Kuda Bank'),
            ('Lotus Bank'),
            ('Opay'),
            ('(Citibank) Nigeria International Bank'),
            ('Parallex Bank'),
            ('Polaris Bank'),
            ('PremiumTrust Bank'),
            ('Providus Bank'),
            ('Stanbic IBTC'),
            ('Standard Chartered'),
            ('Sterling Bank'),
            ('Sterling Mobile'),
            ('Suntrust Bank'),
            ('Taj Bank'),
            ('Titan Trust Bank'),
            ('United Bank for Africa'),
            ('Union Bank'),
            ('Unity Bank'),
            ('VFD Microfinance Bank'),            
            ('Wema Bank'),
            ('Zenith Bank')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
