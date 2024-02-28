/*
  Warnings:

  - You are about to drop the column `pasword_hashed` on the `user` table. All the data in the column will be lost.
  - Added the required column `password_hashed` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `pasword_hashed`,
    ADD COLUMN `password_hashed` VARCHAR(191) NOT NULL;
