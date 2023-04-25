import { MigrationInterface, QueryRunner } from "typeorm";

export class AddThemeField1682423112980 implements MigrationInterface {
    name = 'AddThemeField1682423112980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chart_entity" ADD "theme" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chart_entity" DROP COLUMN "theme"`);
    }

}
