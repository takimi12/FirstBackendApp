import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrders1759858039604 implements MigrationInterface {
    name = 'CreateOrders1759858039604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "order" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "customerName" character varying NOT NULL,
                "customerEmail" character varying NOT NULL,
                "subtotal" numeric(10,2) NOT NULL,
                "tax" numeric(10,2) NOT NULL,
                "total" numeric(10,2) NOT NULL,
                "orderDate" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "order_item" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "orderId" uuid NOT NULL,
                "productId" uuid NOT NULL,
                "name" character varying NOT NULL,
                "quantity" integer NOT NULL DEFAULT '1',
                "price" numeric(10,2) NOT NULL,
                "total" numeric(10,2) NOT NULL,
                CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"
            FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810"
            FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84"
            FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }
}
