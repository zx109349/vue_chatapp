/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.5.40 : Database - chat
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`chat` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `chat`;

/*Table structure for table `chat` */

DROP TABLE IF EXISTS `chat`;

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `from` varchar(255) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `time` bigint(255) DEFAULT NULL,
  `isread` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `chat` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(128) DEFAULT NULL,
  `headerimg` varchar(255) DEFAULT NULL,
  `socketid` varchar(255) DEFAULT NULL,
  `isonline` varchar(255) DEFAULT NULL,
  `isgroup` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`headerimg`,`socketid`,`isonline`,`isgroup`) values (1,'小红','/img/1.jpg',NULL,NULL,NULL),(2,'小黑','/img/2.jpg',NULL,NULL,NULL),(3,'小李','/img/3.jpg',NULL,NULL,NULL),(4,'小白','/img/4.jpg',NULL,NULL,NULL),(5,'home','/img/5.jpg','home','true','true'),(6,'sxt','/img/1.jpg',NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
