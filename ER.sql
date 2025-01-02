-- MySQL Script generated by MySQL Workbench
-- Wed Jan  1 16:11:14 2025
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Entry`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Entry` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `User_id` INT NOT NULL,
  PRIMARY KEY (`id`, `User_id`),
  INDEX `fk_Entry_User_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_Entry_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Parts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Parts` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` DECIMAL(6,4) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Entry_Parts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Entry_Parts` (
  `Entry_id` INT NOT NULL,
  `Entry_Parts_id` INT NOT NULL,
  `Parts_id` INT NOT NULL,
  PRIMARY KEY (`Entry_id`, `Entry_Parts_id`, `Parts_id`),
  INDEX `fk_Entry_has_Parts_Parts1_idx` (`Parts_id` ASC) VISIBLE,
  INDEX `fk_Entry_has_Parts_Entry1_idx` (`Entry_id` ASC, `Entry_Parts_id` ASC) VISIBLE,
  CONSTRAINT `fk_Entry_has_Parts_Entry1`
    FOREIGN KEY (`Entry_id` , `Entry_Parts_id`)
    REFERENCES `mydb`.`Entry` (`id` , `User_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Entry_has_Parts_Parts1`
    FOREIGN KEY (`Parts_id`)
    REFERENCES `mydb`.`Parts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
