/*
  Warnings:

  - The values [HEDPHONE] on the enum `product_product_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `product_category` ENUM('MOUSE', 'KEYBOARD', 'HEADPHONE') NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `actions` JSON NULL;
