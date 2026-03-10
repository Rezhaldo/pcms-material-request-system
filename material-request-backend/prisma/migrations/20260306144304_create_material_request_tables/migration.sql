-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "requestCode" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "requester" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialDetail" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "materialDescription" TEXT NOT NULL,
    "materialType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "supplier" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaterialDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_requestCode_key" ON "Request"("requestCode");

-- AddForeignKey
ALTER TABLE "MaterialDetail" ADD CONSTRAINT "MaterialDetail_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
