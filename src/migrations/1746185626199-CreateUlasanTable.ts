import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentTable1746185626199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE ulasan (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                song_id INTEGER NOT NULL,
                ulasan TEXT NOT NULL,
                created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id) 
                    REFERENCES Users(id)
                    ON DELETE CASCADE,
                    
                CONSTRAINT fk_song
                    FOREIGN KEY(song_id)
                    REFERENCES song(id)
                    ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE ulasan;`)
    }

}
