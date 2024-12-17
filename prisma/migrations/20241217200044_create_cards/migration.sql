-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "card" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "affirmation" TEXT NOT NULL,
    "suggestedMusic" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "blend" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "incense" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
