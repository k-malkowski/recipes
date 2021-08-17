-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVATED', 'PENDING');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'PENDING';

-- CreateTable
CREATE TABLE "Activation" (
    "uuid" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'PENDING',
    "userUuid" TEXT NOT NULL,

    PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activation_userUuid_unique" ON "Activation"("userUuid");

-- AddForeignKey
ALTER TABLE "Activation" ADD FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
