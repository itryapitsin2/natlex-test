import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1682408984698 implements MigrationInterface {
  name = 'Init1682408984698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            CREATE TABLE "chart_entity" (
                "id" SERIAL NOT NULL, 
                "title" character varying NOT NULL, 
                "tpe" text NOT NULL, 
                CONSTRAINT "PK_4c868f8878ce35abb995c2f45d6" PRIMARY KEY ("id")
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "chart_entity"`);
  }
}
