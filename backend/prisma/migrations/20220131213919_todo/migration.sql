-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);
