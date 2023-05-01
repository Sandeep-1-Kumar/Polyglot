-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (x86_64)
--
-- Host: localhost    Database: polyglot
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `languages`
--
grant all on polyglot.* to 'springuser'@'%';

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2005 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (2002,'French'),(2001,'Italian'),(2003,'Spanish'),(2004,'Swahili');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'activity_1'),(2,'learning_1'),(3,'activity_2'),(4,'learning_2'),(5,'activity_3'),(6,'learning_3');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `score` decimal(10,3) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES ('asd@asd.it','asdasdasd',0.000,'asdasdasd'),('kscannee@gmail.com','kscannee',0.000,'kscannnee'),('kscanneee@gmail.com','kscanneee',0.000,'kscanneee'),('priyal@gmail.co','PriyalPatel',0.000,'pripripri'),('priyal@sgmail.co','dsdasdas',0.000,'pripripri'),('priyal1@gmail.co','PriyalPatel',0.000,'pripripri'),('sandy@gmail.com','sandysandy',0.000,'sandysandy');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) DEFAULT NULL,
  `Language` int DEFAULT NULL,
  `Module` int DEFAULT NULL,
  `Score` decimal(10,3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf38dnajrehdyjpilxhaid5lta` (`Language`),
  KEY `FKrnkcbb23n0mviw1olrpy3j45d` (`Module`),
  KEY `FK7fr4unvsv1bsph22dd0trwqsn` (`Email`),
  CONSTRAINT `FK7fr4unvsv1bsph22dd0trwqsn` FOREIGN KEY (`Email`) REFERENCES `player` (`email`),
  CONSTRAINT `FKf38dnajrehdyjpilxhaid5lta` FOREIGN KEY (`Language`) REFERENCES `languages` (`id`),
  CONSTRAINT `FKrnkcbb23n0mviw1olrpy3j45d` FOREIGN KEY (`Module`) REFERENCES `modules` (`id`),
  CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `player` (`email`),
  CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`Language`) REFERENCES `languages` (`id`),
  CONSTRAINT `scores_ibfk_3` FOREIGN KEY (`Module`) REFERENCES `modules` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES (85,'priyal@gmail.co',2001,1,0.000),(86,'priyal@gmail.co',2001,2,0.000),(87,'priyal@gmail.co',2001,3,0.000),(88,'priyal@gmail.co',2001,4,0.000),(89,'priyal@gmail.co',2001,5,0.000),(90,'priyal@gmail.co',2001,6,0.000);
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verbs`
--

DROP TABLE IF EXISTS `verbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verbs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `english_verb` varchar(255) DEFAULT NULL,
  `italian_verb` varchar(255) DEFAULT NULL,
  `url_image` varchar(255) DEFAULT NULL,
  `translated_verb` varchar(255) DEFAULT NULL,
  `swahili_verb` varchar(255) DEFAULT NULL, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verbs`
--

LOCK TABLES `verbs` WRITE;
/*!40000 ALTER TABLE `verbs` DISABLE KEYS */;
INSERT INTO polyglot.verbs VALUES
INSERT INTO polyglot.verbs VALUES
(1, 'swim', 'nuotare', 'https://i.pinimg.com/564x/e4/cf/f8/e4cff885de1bea8c2a8f4e8d9022c16f.jpg',Null, 'kuogelea'), 
(2, 'fly', 'volare', 'https://i.pinimg.com/564x/bb/2c/64/bb2c64a126f3eef15e013ec295387495.jpg',Null, 'kuruka'), 
(3, 'study', 'studiare', 'https://i.pinimg.com/564x/7b/bb/d2/7bbbd2e312172a811eee1a467e90c41a.jpg',Null, 'kujifunza'), 
(4, 'run', 'correre', 'https://i.pinimg.com/564x/d9/3e/ad/d93eadf81d1017d7a1291fbb43987e60.jpg',Null, 'kukimbia'), 
(5, 'talk', 'parlare', 'https://i.pinimg.com/564x/73/4f/4e/734f4e32b659003e02da4b7401885d02.jpg',Null, 'kuzungumza'), 
(6, 'sing', 'cantare', 'https://i.pinimg.com/564x/d9/76/34/d97634a3930f0b44d7371fe8dc3a3ec3.jpg',Null, 'kuimba'), 
(7, 'cook', 'cucinare', 'https://i.pinimg.com/564x/92/98/29/9298299fb18c4bd7ba1e56e606c12aee.jpg',Null, 'kupika'), 
(8, 'clean', 'pulire', 'https://i.pinimg.com/564x/1f/30/c0/1f30c0838364738df2efd0ea10dec830.jpg',Null, 'kusafisha'), 
(9, 'draw', 'disegnare', 'https://i.pinimg.com/564x/f8/f9/15/f8f9153deb26d52df1647e7b7c049f56.jpg',Null, 'kuchora'), 
(10, 'paint', 'dipingere', 'https://i.pinimg.com/564x/c5/c7/96/c5c79612f19e98b2c7dbce0f0daff552.jpg',Null, 'kupaka rangi'), 
(11, 'laugh', 'ridere', 'https://i.pinimg.com/564x/46/5c/9c/465c9c33ae0d6e9348b436fe4edddcf3.jpg', Null,'kuchekea'), 
(12, 'cry', 'piangere', 'https://i.pinimg.com/564x/0f/d3/d2/0fd3d29879252f08ca350521debcdfe4.jpg', Null,'kulia'),
(13, 'speak', 'parlare', 'https://i.pinimg.com/564x/73/4f/4e/734f4e32b659003e02da4b7401885d02.jpg',Null, 'kuongea'),
(14, 'watch', 'guardare', 'https://i.pinimg.com/564x/0d/79/4e/0d794e8ef41cb7e9cb8323eca335def5.jpg',Null, 'kuangalia'),
(15, 'eat', 'mangiare', 'https://i.pinimg.com/564x/b4/55/e5/b455e585d8dac4f99fcf22ca9e2829f8.jpg', Null,'kula'),
(16, 'drink', 'bere', 'https://i.pinimg.com/564x/c3/17/fe/c317fe013fedba61fe970109207b691c.jpg', Null,'kunywa'),
(17, 'sleep', 'dormire' ,'https://i.pinimg.com/564x/d4/e2/4d/d4e24d3a5df06ed5e8c1a89d823e5fe8.jpg',Null, 'kulala'),
(18, 'wake', 'svegliare','https://i.pinimg.com/564x/0a/98/b2/0a98b2c1c9b18a03167ec3575453330f.jpg',Null, 'kuamka'),
(19, 'go', 'andare', 'https://i.pinimg.com/564x/65/95/46/659546693c3a1cd6f441a57f10be6507.jpg',Null, 'kwenda'),
(20, 'think', 'pensare', 'https://i.pinimg.com/564x/a2/21/40/a2214003491d4cf70d500a7f49e04826.jpg',Null, 'kufikiria'),
(21, 'listen', 'ascoltare', 'https://i.pinimg.com/564x/6d/78/7d/6d787dfcd5a76f412b9ae9c31a11b267.jpg',Null, 'kusikiliza'),
(22, 'read', 'leggere', 'https://i.pinimg.com/564x/f7/8f/ec/f78fec21ecf4e824ea0a16d4b3e82f29.jpg',Null, 'kusoma'),
(23, 'write', 'scrivere', 'https://i.pinimg.com/564x/ba/36/ae/ba36ae0fa1f4b288ca609661a0386716.jpg',Null, 'kuandika'),
(24, 'play', 'giocare', 'https://i.pinimg.com/564x/8f/17/b6/8f17b6705b1b86be17cf784b1dbb0cd5.jpg', Null,'kucheza'),
(25, 'drive', 'guidare', 'https://i.pinimg.com/564x/38/a1/0b/38a10ba1d6b9245c1a885b08ffa5a421.jpg',Null, 'kuendesha'),
(26, 'dance', 'ballare', 'https://i.pinimg.com/564x/f2/be/49/f2be49f16e7e7bc9acb6487d19040b05.jpg', Null,'kucheza'),
(27, 'move', 'muovere', 'https://i.pinimg.com/564x/d1/1a/1d/d11a1d6b931ac8ef32c4cc39bb685bb7.jpg',Null, 'kuhama'),
(28, 'wait', 'aspettare', 'https://i.pinimg.com/564x/d6/8c/74/d68c7428c8656b9eb29aea504efb2780.jpg',Null, 'kusubiri'),
(29, 'fight', 'combattere', 'https://i.pinimg.com/564x/49/f5/a0/49f5a0d5b36d87ae3a0459676857778d.jpg',Null, 'kupigana'),
(30,'jump','saltare','http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcT72MG4ALk3Ahbqe6KLFDhqgKwL5uJkci2qR5YbbDUbDyiP1Lq4djHBTTtv2f27mRxUeFmV_F7dmdrHiY1bGhw',NULL,'kuruka'),
(31,'travel','viaggiare','https://media.istockphoto.com/id/1285301614/photo/young-man-arms-outstretched-by-the-sea-at-sunrise-enjoying-freedom-and-life-people-travel.jpg?s=612x612&w=0&k=20&c=0QW6GnkuFNYcPZhy26XVHuTc2avJTK8u6l_1iT0SlZk=',NULL,'kusafiri'),
(32,'exist','esistere','https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FpdCUyMG9mJTIwd2FpdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',NULL,'kuwepo'),
(33,'open','aprire','https://c8.alamy.com/compit/gextc5/mano-destra-aprire-la-porta-isolata-su-sfondo-bianco-con-percorso-di-clipping-gextc5.jpg',NULL,'kufungua');
/*!40000 ALTER TABLE `verbs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-21 11:25:08

