import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGenreTable1746185582423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE category (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                name VARCHAR(255) NOT NULL,
                deskripsi TEXT,
                created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id) 
                    REFERENCES Users(id)
                    ON DELETE CASCADE
            );
          `);
          await queryRunner.query(`
            ALTER TABLE song
            ADD CONSTRAINT fk_category
            FOREIGN KEY (category_id)
            REFERENCES category(id)
            ON DELETE SET NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE song
            DROP CONSTRAINT IF EXISTS fk_category;
        `);
        
        await queryRunner.query(`DROP TABLE category;`);
    }

}
