-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlogToChannel" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlogToChannel_AB_unique" ON "_BlogToChannel"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogToChannel_B_index" ON "_BlogToChannel"("B");

-- AddForeignKey
ALTER TABLE "_BlogToChannel" ADD CONSTRAINT "_BlogToChannel_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToChannel" ADD CONSTRAINT "_BlogToChannel_B_fkey" FOREIGN KEY ("B") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
