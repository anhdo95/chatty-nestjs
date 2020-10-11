import {MigrationInterface, QueryRunner} from "typeorm";

export class init1602207849684 implements MigrationInterface {
    name = 'init1602207849684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "conversationId" integer NOT NULL, "userId" integer, "content" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversation" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(100) NOT NULL, "type" "conversation_type_enum" NOT NULL DEFAULT 'DIRECT', "ownerId" integer NOT NULL, "coverPhoto" character varying, "lastMessageId" integer NOT NULL, CONSTRAINT "REL_de0389f98ed76b16b16a975542" UNIQUE ("lastMessageId"), CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversation_info" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "conversationId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_d873353aa781bb5855f10b97701" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "fromUserId" integer NOT NULL, "toUserId" integer NOT NULL, "status" "friend_status_enum" NOT NULL DEFAULT 'FOLLOW', CONSTRAINT "PK_1b301ac8ac5fcee876db96069b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversation_user" ("conversationId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e4f6998db4bdfc90cf7cd4c244d" PRIMARY KEY ("conversationId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f71233a63761553475a2acd869" ON "conversation_user" ("conversationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_39e655cc204c899bb0ffe6266c" ON "conversation_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "FK_370aed8457add6193a28a807e2e" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "FK_de0389f98ed76b16b16a9755423" FOREIGN KEY ("lastMessageId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_info" ADD CONSTRAINT "FK_2548353adad389accf9d074e064" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_info" ADD CONSTRAINT "FK_81f978a9635e35fa3d77c8ddeff" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_9d8b5cd24c48ac083ff8f28abb1" FOREIGN KEY ("fromUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_9d0e1a8ea7947b4a77a2cc87979" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_user" ADD CONSTRAINT "FK_f71233a63761553475a2acd8690" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_user" ADD CONSTRAINT "FK_39e655cc204c899bb0ffe6266c8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_user" DROP CONSTRAINT "FK_39e655cc204c899bb0ffe6266c8"`);
        await queryRunner.query(`ALTER TABLE "conversation_user" DROP CONSTRAINT "FK_f71233a63761553475a2acd8690"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_9d0e1a8ea7947b4a77a2cc87979"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_9d8b5cd24c48ac083ff8f28abb1"`);
        await queryRunner.query(`ALTER TABLE "conversation_info" DROP CONSTRAINT "FK_81f978a9635e35fa3d77c8ddeff"`);
        await queryRunner.query(`ALTER TABLE "conversation_info" DROP CONSTRAINT "FK_2548353adad389accf9d074e064"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_de0389f98ed76b16b16a9755423"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_370aed8457add6193a28a807e2e"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"`);
        await queryRunner.query(`DROP INDEX "IDX_39e655cc204c899bb0ffe6266c"`);
        await queryRunner.query(`DROP INDEX "IDX_f71233a63761553475a2acd869"`);
        await queryRunner.query(`DROP TABLE "conversation_user"`);
        await queryRunner.query(`DROP TABLE "friend"`);
        await queryRunner.query(`DROP TABLE "conversation_info"`);
        await queryRunner.query(`DROP TABLE "conversation"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
