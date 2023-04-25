import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCharts1682410390974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            INSERT INTO chart_entity (id, title, tpe)
              VALUES
                (DEFAULT, 'Chart 1'::varchar, 'column'::text), 
                (DEFAULT, 'Chart 2'::varchar, 'column'::text),
                (DEFAULT, 'Chart 3'::varchar, 'spline'::text), 
                (DEFAULT, 'Chart 4'::varchar, 'bar'::text);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
