/*
  Warnings:

  - You are about to drop the column `entry` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Recipe_entry_key";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "entry";
