-- CreateTable
CREATE TABLE "User" (
    "userid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomid" TEXT NOT NULL,
    "connection" TEXT,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomid")
);

-- CreateTable
CREATE TABLE "Chats" (
    "chatid" TEXT NOT NULL,
    "roomid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("chatid")
);

-- CreateTable
CREATE TABLE "_RoomToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoomToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ChatUpvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChatUpvotes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userid_key" ON "User"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_RoomToUser_B_index" ON "_RoomToUser"("B");

-- CreateIndex
CREATE INDEX "_ChatUpvotes_B_index" ON "_ChatUpvotes"("B");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_roomid_fkey" FOREIGN KEY ("roomid") REFERENCES "Room"("roomid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("roomid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatUpvotes" ADD CONSTRAINT "_ChatUpvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Chats"("chatid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatUpvotes" ADD CONSTRAINT "_ChatUpvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;
