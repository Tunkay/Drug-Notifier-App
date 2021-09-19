-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: drugnotifierapp
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` bigint NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `usr_name` varchar(255) NOT NULL,
  `age` int DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `UK_5cca88c6i17ttuegcvdkgehah` (`name`),
  UNIQUE KEY `UK_c6r58e65byhmixdw3d16m3f1o` (`usr_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (86286,'male','Mayank','9727632863','admin',23,'System Engineer');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug`
--

DROP TABLE IF EXISTS `drug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drug` (
  `id` bigint NOT NULL,
  `drug_dosage` bigint DEFAULT NULL,
  `med_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `drug_time` time DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `prescription_id` bigint DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `drug_frequency` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4aof798s3niq0ji81cccmr8qg` (`prescription_id`),
  CONSTRAINT `FK4aof798s3niq0ji81cccmr8qg` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`prescription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug`
--

LOCK TABLES `drug` WRITE;
/*!40000 ALTER TABLE `drug` DISABLE KEYS */;
INSERT INTO `drug` VALUES (294,23,'Hajam','wewebyh','09:08:10','2021-03-29','2021-03-23',292,NULL,NULL,0),(358,12,'covid19','jwhv','14:43:00','2021-03-31','2021-03-31',357,NULL,NULL,0),(387,12,'covid','jyf','22:57:00','2021-04-01','2021-03-31',386,NULL,NULL,0),(388,34,'fd','hgd','22:58:00','2021-04-01','2021-03-31',386,NULL,NULL,0),(389,34,'ngc','ngc','22:59:00','2021-03-31','2021-03-31',386,NULL,NULL,0),(391,56,'kj','hg','23:00:00','2021-03-31','2021-03-31',390,NULL,NULL,0),(500,12,'sdgh','wrgf','00:21:00',NULL,NULL,499,'2021-04-07','2021-04-06',0),(501,45,'ygdc','teu','00:30:00',NULL,NULL,499,'2021-04-07','2021-04-06',0),(560,40,'Acetaminophen','Acetaminophen is a pain reliever and a fever reducer dobara 2','04:50:19','2014-10-16','2014-10-06',NULL,NULL,NULL,0),(570,23,'gfxch','jfu','12:32:00',NULL,NULL,569,'2021-04-09','2021-04-08',3),(571,34,'fcyh','hch','12:24:00',NULL,NULL,569,'2021-04-09','2021-04-08',3),(573,12,'ycy','kjb ','12:33:00',NULL,NULL,569,'2021-04-10','2021-04-09',3),(582,45,'hgc','gfcxh','13:32:00',NULL,NULL,581,'2021-04-09','2021-04-08',3),(605,23,'qef','wef','03:50:00',NULL,NULL,604,'2021-04-10','2021-04-09',4),(606,45,'grwr','ewg','03:55:00',NULL,NULL,604,'2021-04-11','2021-04-10',7),(607,234,'ewf','qef','03:58:00',NULL,NULL,604,'2021-04-10','2021-04-09',7),(680,34,'jewqvhe','this is for covid 19','22:59:00',NULL,NULL,319,'2021-04-16','2021-04-14',5),(682,45,'ed','jehvduiqeid uvqegyd iumkjn6e5 ts4s4s tf6r gfcth','09:35:00',NULL,NULL,681,'2021-04-16','2021-04-14',7),(727,2,'Covid-19','gfrdstdu','02:50:00',NULL,NULL,726,'2021-04-24','2021-04-16',8),(731,23,'hg','fcty','05:10:00',NULL,NULL,319,'2021-04-20','2021-04-20',6),(734,34,'tdx','hgvhgfxt','05:10:00',NULL,NULL,732,'2021-04-21','2021-04-20',7),(748,34,'hedg','hgdr','23:06:00',NULL,NULL,747,'2021-04-23','2021-04-20',8),(752,45,'cfy','gcytgcgv ycy bu','04:53:00',NULL,NULL,751,'2021-04-24','2021-04-23',8),(757,2,'Covaxine','This is for covid-19','08:05:00',NULL,NULL,756,'2021-07-10','2021-07-04',2);
/*!40000 ALTER TABLE `drug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` bigint NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (767);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` bigint NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `p_id` bigint NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `disease` varchar(255) DEFAULT NULL,
  `usr_name` varchar(255) NOT NULL,
  PRIMARY KEY (`p_id`),
  UNIQUE KEY `UK_ov1mjrglxi907dck4u1sixtqc` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (6,'mal','ghj','123456','lkjhg',34,'kjhgfg',''),(7,'Male','Mayank','123456','vqusvd',34,'iop',''),(10,'Male','Rahul','3456789','hazuhsbxui',34,'congestion',''),(11,'Male','Ravi','9876554678','at po hazra',56,'heart congestion',''),(12,'male','jdci','45678','dcwibi',34,'kjdcwo',''),(13,'gcytu','ghcy','dxy','gc',456,'hvh',''),(14,'ty','ui','2345678','xtdhgcj',23,'jhvcuy',''),(17,'male','tabl','456789','yfewy',23,'usv',''),(20,'male','Ravih','3456789','kjhgyfc',34,'brain',''),(24,'hveyd','uewvif','','',0,'',''),(25,'Male','Aryan Raj','987654321','Koyla Toli,Chatra',25,'Eye irritation',''),(26,'','','','',0,'',''),(43,'Female','Manju Devi','987578921','Jhargram',56,'Kidney stones',''),(44,'Female','Manjulika Devi','98235890','Jhargram',34,'Kidney stones',''),(54,'ebcfi','dchbi','','',0,'',''),(56,'hdvbi','udvqiy','','',0,'',''),(58,'Female','mithi','9470380986','dgvc',34,'udu',''),(61,'Male','Prashant Desai','8765478976','Borivali,Mumbai',30,'Mums',''),(62,'male','Prashant Desait','9876546890','Kolkata',70,'Chest congestion',''),(66,'Male','Prashanti desait','9876543120','yu',56,'gsva',''),(70,'Male','atif aslam','9876548760','hun',40,'klm',''),(71,'fejhjghg','momina','9873513889','jghf',38,'jhghfg',''),(73,'Male','Ralouve Majumdar','9836789089','Mumbai',28,'PhysioDeformity',''),(75,'jh','Krishna','9835423490','ranchi',23,'gyufthg',''),(85,'usgx','ajgsci','9470380985','jhZV',45,'jacvhsi',''),(87,'male','Manan','9470380985','sdgu',34,'hdg',''),(89,'Male','Sidharta','983513880.','Bangalore',34,'Eye Strain',''),(91,'male','Shanu','9836138808','mumbai',34,'dsgh','Shanu'),(100,'','ght','9470380985','ghtr',0,'rewq',''),(105,'Male','Carl jung','9835138808','wdcyf',34,'wdchb',''),(109,'male','Aditya saurav','9876543210','',45,'jsva',''),(110,'male','Ashsish','1234567890','jaebkjb',45,'kjds',''),(113,'male','rtv','1234567890','hbidkj',34,'jewbh',''),(115,'male','Arbuindo Ghosh','1234567890','jhvkblj',45,'dxt',''),(117,'Male','Rahul Roy','1234567890','West India postoffice,Ranchi',45,'Stomach ulcer',''),(118,'Female','Manoj Kumar','1234567890','gvu',45,'jhv',''),(121,'Female','Shreen Farouqui','1234567890','cw',45,'djwgv','Shreen'),(122,'Male','Srijan mahto','1234567890','jewf',45,'jwfvc','Srijan'),(124,'Male','Ram','1234567890','fg',34,'dsc','Ram'),(128,'Male','Shanuo','1234567890','Mumbai',23,'dsjv','Shanuo'),(129,'Male','Pranoy Ghosh','9876549012','jgv',56,'fdx','Pranoy'),(143,'Female','Vaani Mahesh','9872638134','HImachal Pradesh',27,'Tooth Ache','Vaani'),(144,'Male','Pranshul','2345767885','khfuh',45,'hfxt','Pranshul'),(145,'Female','Ritika Chatturvedi','1454677678','jbdh',35,'jdbi','Ritika'),(290,'Male','Jagjeet Singh','9876234109','Mumbai',34,'Heart Attack','Jagjeet'),(337,'Male','Karim Nawaz','9080706050','Mumbai',45,'heart disease','Karim'),(343,'Male','Shambhav','9870604909','hazaribagh',34,'anxiety','shambhav'),(353,'Male','yukti','7612926239','jeh',34,'jhb','yukti'),(355,'Male','Gautam sahu','1234567890','munda',45,'hjbushq','Gautam'),(361,'Male','flsk','1234567890','Mumbai',23,'hsuy','dshkb'),(379,'Male','Karl hung','1234567890','Mumbai',45,'rty','Karl'),(385,'Male','rew','9875435678','hgf',12,'bfhc','rew'),(396,'Male','sd','1234567867','dfv',23,'sax','ty'),(412,'Male','mkoip','1234567890','khbi',34,'jhbv','mk'),(426,'Male','tfh','9807868685','kjbk',44,'hgcgc','rty'),(437,'Male','fv','1234567890','rgf',12,'wer','qwert'),(441,'Male','dyh','1672902716','dwgci',55,'weyc','hsd'),(442,'Male','jhvdw','1937911399','jwrl',34,'kbjek','bwj'),(470,'Female','rewt','1234326588','kg8yi',34,'hgfy','rewt'),(480,'Female','kgf','9268172379','jeh',45,'few','kgf'),(496,'Male','Rajeev Sinha','1346367953','Mumbai',34,'heart attack','Rajeev'),(505,'Female','ioj','1234567890','gvuhj',45,'szd','io'),(515,'Male','gv','1234567890','eh',34,'jqehdg','ew'),(534,'Male','gvrt','1234567890','eh',34,'jqehdg','ewop'),(542,'Female','txdt','1234567890','hgc',34,'yfc','dxt'),(559,'Male','kjbi','1234567890','hgcu',12,'jgcu','tdyt'),(565,'Female','hfcy','1234567890','gfcy',45,'jvhu','Vinod'),(568,'Male','Kishu ram','4537474574','fcyh',56,'gcyh','Kishu'),(580,'Male','hgcyu','0795586657','uyfuj',76,'hgc','hindol'),(589,'Female','wejgv','1234567890','wehb',56,'djqwv','uedc'),(593,'Male','qef','1234567890','dc',23,'fvw','vwefu'),(594,'Male','ewf','1234567890','wre',34,'wv','fd'),(596,'Male','ef2g','7218939390','wrbf',34,'wfeyg','wefgj'),(603,'Female','pq','2323647895','SF',23,'wrg','Pq'),(615,'Male','Shanu Rao','8982364803','Bangalore',23,'Heart','Shanu9'),(619,'Male','grxdy','1234567890','gcyu',234,'gfxt','trdy'),(620,'Male','dchj','1234568908','kjdcjkj',45,'dbhcjk','hvwu'),(623,'Female','wyoni','7129712927','hjedbck',23,'uyebi','wy'),(625,'Male','Kutti','9867826891','jwdgci',45,'wvj','Kutti'),(631,'Male','Patrick Lou','1234567890','Kulkarni',45,'Kiusdv','Patrick'),(632,'Male','Harish k','8723923817','Mumbai',34,'gsvhg','harish'),(633,'Female','Karla','3253835173','Rabkduj',56,'cdvweh','karuna'),(643,'Male','trsdt','2345676785','dy',45,'restr','rs56'),(667,'Male','wqjvdh','1234567890','jdgvc',45,'edgyc','gcy'),(675,'Female','Rankku','7828123939','jdhv',67,'jdgi','Rakshit'),(679,'Female','yuo','1463732832','kjdnw',45,'yrfgu','Rajiv'),(687,'Female','Manoh','8332672823','ewfgi',45,'efyg8','Manoh'),(691,'Male','Santyu','1234567890','gfxtry',45,'ycyc','Santrs'),(692,'Female','hjbgu','6576576464','hcyt',47,'vgv','hgc'),(693,'Male','tyu','1234567890','fs5r',45,'trft','yt'),(697,'Male','ty','1234567890','xtr',34,'jvyg','ghcvy'),(702,'Male','tyuw','1234567890','yfeg',67,'frbu','yoga'),(725,'Male','shashi Shekhar','1234567865','gfdtru',45,'gdt','Shekhsh4'),(729,'Female','gdxtr','9876543245','gfxt',9,'gdxftf','gfxc'),(739,'Male','yi','9876543223','gfcxt',23,'gfdc6','WEr'),(741,'Male','io','1234567890','trd6r',23,'trd6hg','oiop'),(742,'Male','tyk','1234567890','hgv',12,'iyjh','tyk'),(743,'Female','gfct','1234567890','htf',16,'ety','rtyui'),(744,'Male','hbeud','1234567890','htdtr',19,'bfd6t','heud'),(745,'Male','fct','1234567890','hgf6r',21,'gfct','qwdrf'),(749,'Male','kavi','9113131180','Mumbai',22,'Heart','Kavi'),(750,'Male','Kastuba','5555215554','hgfdyt',21,'hft76','Katurba'),(753,'Male','yoi','6328329238','fewvy',18,'fewyg7','wery'),(760,'Male','Mayank Kumar','9876543210','Ranchi',23,'ADHD','May98'),(763,'Male','Kumar Ravi Shekhar','9876543210','Ranchi',23,'ADHD','May98'),(765,'Male','SHabdv','9876543210','vytfwd',13,'vfuc','SFsxg');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `physician`
--

DROP TABLE IF EXISTS `physician`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `physician` (
  `name` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `physician_age` int DEFAULT NULL,
  `physician_phone` varchar(255) DEFAULT NULL,
  `physician_qualifiacation` varchar(255) DEFAULT NULL,
  `physician_specilization` varchar(255) DEFAULT NULL,
  `u_id` bigint NOT NULL,
  `usr_name` varchar(255) NOT NULL,
  `admin_id` bigint DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `FKnlvsisj6b44jaeppny14hvs2a` (`admin_id`),
  CONSTRAINT `FKnlvsisj6b44jaeppny14hvs2a` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `physician`
--

LOCK TABLES `physician` WRITE;
/*!40000 ALTER TABLE `physician` DISABLE KEYS */;
INSERT INTO `physician` VALUES ('','Male',45,'1234567890','gcycyc','jvuigiu',106,'',NULL),('2feg','Male',12,'9981298177','fev','efv',595,'jhqwved',NULL),('2fjhv','Male',34,'2123456789','fev','egfv',588,'gved',NULL),('anshul','',34,'1234567890','mbbs','md',94,'',NULL),('asyr','Male',34,'9835138808','qwert','rt',97,'',NULL),('bt4iv','Male',34,'1234567890','ygfc','jhv',540,'vuh',NULL),('Danish Khan','Male',45,'1234567890','mbbs','md',495,'Danish',NULL),('dfgh','kih',68,'98765',NULL,NULL,5,'',NULL),('dfxte','esztx',34,'234567',NULL,NULL,15,'',NULL),('djc','male',45,'1234567890','jdv','hvdbch',112,'',NULL),('djhcg','Male',45,'1234567890','ehwgvu','qwdhgv',663,'weru',86286),('Dr Krishna Thakur','Male',34,'9856789087','MD ','PhysioTherapist',74,'',NULL),('Dr. Abh ','male',49,'9237727890','hgdwvc','hewgv',673,'Abhu',86286),('Dr. Abhash ','male',56,'9238823890','hgdwvc',NULL,646,'Abhasssh',86286),('Dr. Abhishek Singhal','Male',34,'1234567890','jsd','jus',120,'',NULL),('Dr. Abhudev ','male',49,'9237723890','hgdwvc','hewgv',647,'Abhuud',86286),('Dr. crumb','Male',23,'8727928229','biubcei','iegqi',352,'crumb',NULL),('Dr. ftu','Male',56,'1234567890','fx6r','jgvu',660,'6789',86286),('dr. Haathi','Male',45,'4546474849','jhv','fcy',346,'haathi',NULL),('Dr. Kavita Nayar','Female',56,'9890054736','mbbs','md',314,'Kavita',NULL),('Dr. Langford','Female',23,'9870605040','mbbs','chiropractor',333,'Langford',NULL),('DR. NIkhil makhija','Male',45,'987654235','mbbs','ENT ',60,'',NULL),('Dr. Ramn Prateek','Male',45,'9876543221','md in heart','Heart ailments',291,'Ramn',NULL),('Dr. Salim Mukherjee','Male',45,'98765432','mbbs','Gyna',67,'',NULL),('dr. Shakti','Male',0,NULL,NULL,NULL,349,'shakti',NULL),('Dr. Tab','Male',32,'1234433444','mbbs','eye specialist',766,'Tabby',86286),('Dr.Karan Rao','Male',45,'1000000000','mbbs','md in heart',614,'Karan',NULL),('Dr.Raghu Toi','Male',45,'9786898712','mbbs','Chiropracter',213,'Raghu',NULL),('e','Male',34,'1234567890','jweygu','ueftu',621,'iuo',NULL),('Edgy','Male',45,'8271969267','qdyviy','udygiu',652,'Edgyy',86286),('egy','Male',56,'9876542617','jedv','dagj',651,'eggy',86286),('eqrt','Male',67,'1234567890','jhwve','edvu',666,'eqrt',86286),('euwgv','Male',12,'4567889128','iwdhcb','ughex',508,'wd',NULL),('Faizaan Sheikh','Male',45,'8978685479','ryf','rtyh',624,'Faizaan',NULL),('fdxy','Male',45,'1234567823','gfrxdt','gdx',644,'fxdt',NULL),('fhfj','hv',56,'9470380985','bvv','jvhj',80,'',NULL),('fjew','Male',12,'1234567890','uewh','ugfe',469,'hre',NULL),('gc','Male',12,'1234567890','hcg','hjv',427,'h',NULL),('gcfyg','Male',56,'1234567890','gfcy','txt',657,'wer',86286),('gchc','juy',67,'9470380985','gcugc','gcu',81,'',NULL),('gcyg','Male',45,'1234567890','yfxcy','hcuy',661,'ertyhb',86286),('gdvs','Male',34,'1234567890','fg','ef',436,'gdvs',NULL),('gf','Male',45,'1234565779','hfc','ugv',440,'gx',NULL),('gfcy','Male',45,'1234567890','gfx5r','hgycyhj',696,'hfcy',86286),('gfh','kjhg',67,'9835138890','iop','vgfh',76,'',NULL),('Girija Shekhar','Male',45,'9873412568','mbbs','md',305,'Girija',NULL),('h3eb','Male',23,'1234567890','kjb4tv','dkjrb3',541,'uvuy',NULL),('Hareem','Male',45,'1234567890','ededyw','ebhdb',701,'ertyu',86286),('Harish','male',34,'1234567','mbbs','assistant',19,'',NULL),('Harry Potter','Male',45,'1234567890','mbbs','ENT',127,'',NULL),('Harsh Kahn','Male',45,'1234567890','mbbs','md in eye secialization',378,'harsh',NULL),('has','male',45,'9835138808','jd','asjbhxi',82,'',NULL),('hbs','Male',45,'6282389387','hgvqd','hgevdu',648,'hs',86286),('hc','Male',45,'1234567890','gcyu','ytdy',629,'hc',NULL),('Hel','Male',45,'1234567890','hdgvc','hdgcv',630,'Hel',NULL),('heli','Male',34,'9083568720','dsbji',NULL,351,'Heli',NULL),('hg u','Male',34,'7655358909','jn','inu',566,'yfc',NULL),('hgfvew','Male',45,'1234567890','kwehf','rbhf',662,'3456',86286),('hgvsu','Male',12,'1234567890','sfgr','dth',384,'qwgf',NULL),('hi','hi',30,'9470386923','md','sa',72,'',NULL),('hrvi','hebr',23,'2345678','jhbfvi','rwhiv',18,'',NULL),('hv','Male',32,'1535436587','jgvuj','utgfu',504,'hv',NULL),('hwiq','Male',56,'6256257827','jedhcj','gcywd',642,'wr',NULL),('iweuf','Male',32,'1234567890','wri','iu',454,'hbsif',NULL),('jd','Male',45,'9876546217','jeygi','kweugf',649,'hgs',86286),('jedcb','Male',45,'1234567890','hedcu','',694,'udwbh',86286),('jfu','Male',23,'1234567890','mhb','jgc',411,'jfu',NULL),('jhdc','uw',23,'9987654','mbbs','dermotology',22,'',NULL),('jhg','mhng',56,'9876546890','trdtr','gfytfu',78,'',NULL),('jhyui','Male',56,'9470380985','Mbbs','Md',96,'',NULL),('jk','io',12,'65987654','mnb','hdbci',59,'',NULL),('jview','Male',34,'1234567908','gcwdh','dc',671,'eqtytu',86286),('jyg','Male',23,'0875547688','gcj','cghg',425,'jtf',NULL),('Karen Polin','Female',45,'9856902345','mbbs','Skin Specialist',103,'Karen',NULL),('ki','Male',45,'9835138808','md','mbbs',95,'',NULL),('Kismat Jaan Gurvinder','Female',45,'9470380985','MD IN EYE SURGERY','Eye Surgery',101,'',NULL),('kjbhhk,','mkkjo',34,'987765478','mbbs','jklo',69,'',NULL),('Latika','Female',67,'9835138808','iwdb','sdjvu',104,'',NULL),('manan Pandey','Male',34,'1234567890','jwhdbci','jwvhc',474,'manan',NULL),('mgf','Female',95,'9835138808','rfb','rfb',99,'',NULL),('mkl','',45,'9835138808','iuh','hj',92,'',NULL),('Mohini','Male',454,'1234567890','mbbs','msd',703,'Mohini',86286),('Mohit Chautala','male',23,'9876543210','mbbs','Throat Specialist',114,'',NULL),('Nana Parekar','male',45,'1234567890','ghv','fdx',111,'',NULL),('Neelam','Female',40,'983526788',NULL,NULL,9,'',NULL),('oijo','ufu',56,'3456',NULL,NULL,8,'',NULL),('Pratik','Male',21,'9287328683','jfvg','edu',738,'Pratik',86286),('Raghav','Male',23,'7283297923','fcguy','efugu',678,'Raghav',86286),('Rahul','Male',34,'1234567890','gh','hg',123,'',NULL),('Raja','Male',45,'7623836739','jedgiu','eufgy8',683,'Raja',86286),('Rajjev','Male',45,'1234567890','hegdu','qwhdfu',674,'Rajeevi',86286),('Ralph','Male',45,'1234567890','jhvdc','fshgj',125,'',NULL),('rami malik','Male',45,'1234567899','jhvqj','hgvwdj',356,'Rami',NULL),('Rantam','Male',45,'6211278937','eufygiuebfw','uwehyfgui',622,'Rantham',NULL),('rasi','male',45,'345678','md','heart',16,'',NULL),('rety','Male',45,'6527467436','gve','uyrgf',645,'QW',NULL),('rty','Male',56,'9876543210','gfxytd','utfuf',655,'rtyi',86286),('rtyu','Male',56,'9835138808','nji','olm',98,'',NULL),('sagix','sgk',80,'9835138809','kajdbc','akucg',84,'',NULL),('Shanu','male',34,'9470380985','mbbs','heart surgeon',23,'',NULL),('Shanul Rana','Male',45,'9835138808','MD','ENT',102,'',NULL),('Shashi Shekhar','Male',45,'1234567890','gfgh','trds',116,'',NULL),('shikbq','kjsqbkj',45,'9851945670','sajbk','aksjbkj',83,'',NULL),('Shyuoi','Male',27,NULL,NULL,NULL,350,'Shyuo',NULL),('Somu Tiwari','male',45,'1234356789','djcnj','jfvbkj',108,'',NULL),('sv','Male',45,'1234567890','jcv','qdgv',665,'Sv',86286),('trd6','Male',21,'6567687876','gvuyvu','bijhb',730,'rtyu',86286),('tsc6yx','Male',34,'1234567890','wdch','wudgc',513,'hsdb',NULL),('tyu','Male',78,'1234567890','ydcyc','yrd6',656,'erto',86286),('tyui','Male',45,'2345678909','gfcyf','gfctr',688,'werti',86286),('uio','Male',45,'1234567890','hfcty','gdxt',658,'23456',86286),('uoih','Male',56,'1234567890','fcy','hgfc7t',659,'45678',86286),('user','Male',34,'9835143255','md','assistant',21,'',NULL),('uuio','Female',45,'1234567890','qw','uv',119,'',NULL),('ve','Male',23,'1234567890','vqduVU','WEFJ',602,'ve',NULL),('vguj','Male',56,'1234567890','uv','jv',574,'hgjv',NULL),('Vinodini jin','Male',34,'1432637362','fy','gfx',567,'Vinodini',NULL),('vusx','Male',45,'1234567890','qwdvu','jwdygi',653,'vusx',86286),('vuw','Female',45,'9876543289','wducg','hdgxc',654,'vuw',86286),('wef','Male',69,'1234567890','dv','ade',597,'efw',NULL),('weu','Male',12,'1234567890','ce','fc',395,'eytw',NULL),('wqdnv','Male',56,'1234567890','qdvhj','ueyd',664,'RT',86286),('ygc','Male',43,'6708765459','jhgv','ygc',397,'lovely',NULL),('ygct','Male',45,'1234567898','fgxctr','grd5',695,'gd',86286),('ymkj','Male',56,'9875667875','jgfuj','hgcu',579,'kriti',NULL),('yui','Male',56,'9823871681','jqhevdi','ejdgi',650,'rtb',86286),('Zaki Mohd','Male',34,'5261781638','sdhv','hsv',146,'',NULL);
/*!40000 ALTER TABLE `physician` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `prescription_id` bigint NOT NULL,
  `drug_dosage` bigint DEFAULT NULL,
  `drug_id` bigint DEFAULT NULL,
  `drug_time` time DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `patient_p_id` bigint DEFAULT NULL,
  `p_id` bigint DEFAULT NULL,
  PRIMARY KEY (`prescription_id`),
  KEY `FK45dseox66727h2f1oi86h3d3r` (`patient_p_id`),
  KEY `FKkgg6j9epc5bi181m0c0rfjlxt` (`p_id`),
  CONSTRAINT `FK45dseox66727h2f1oi86h3d3r` FOREIGN KEY (`patient_p_id`) REFERENCES `patient` (`p_id`),
  CONSTRAINT `FKkgg6j9epc5bi181m0c0rfjlxt` FOREIGN KEY (`p_id`) REFERENCES `patient` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (181,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(292,23,50,'09:08:10','2021-03-29','2021-03-25',NULL,290),(319,12,50,'23:20:00','2021-03-26','2021-03-23',NULL,91),(357,12,50,'14:43:00','2021-03-31','2021-03-31',NULL,355),(386,12,50,'22:57:00','2021-04-01','2021-03-31',NULL,385),(390,56,50,'23:00:00','2021-03-31','2021-03-31',NULL,385),(499,NULL,50,NULL,NULL,NULL,NULL,496),(569,NULL,50,NULL,NULL,NULL,NULL,568),(581,NULL,50,NULL,NULL,NULL,NULL,580),(604,NULL,50,NULL,NULL,NULL,NULL,603),(681,NULL,50,NULL,NULL,NULL,NULL,91),(684,NULL,50,NULL,NULL,NULL,NULL,91),(726,NULL,50,NULL,NULL,NULL,NULL,725),(732,NULL,50,NULL,NULL,NULL,NULL,343),(735,NULL,50,NULL,NULL,NULL,NULL,91),(747,NULL,50,NULL,NULL,NULL,NULL,337),(751,NULL,50,NULL,NULL,NULL,NULL,128),(756,NULL,50,NULL,NULL,NULL,NULL,91);
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `name` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `disease` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registeration`
--

DROP TABLE IF EXISTS `registeration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registeration` (
  `id` bigint NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registeration`
--

LOCK TABLES `registeration` WRITE;
/*!40000 ALTER TABLE `registeration` DISABLE KEYS */;
/*!40000 ALTER TABLE `registeration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration_record`
--

DROP TABLE IF EXISTS `registration_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration_record` (
  `id` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_record`
--

LOCK TABLES `registration_record` WRITE;
/*!40000 ALTER TABLE `registration_record` DISABLE KEYS */;
INSERT INTO `registration_record` VALUES ('23456','We@1234'),('3456','W@1233'),('45678','W@1234'),('6789','E@12345'),('Abhishek','2345'),('Aditya','2345'),('admin','Admin@123'),('Anshul','a'),('Arbuindo','pather'),('Ashish','123456'),('bvc','xcv'),('bwj','343'),('crumb','123'),('Danish','12345'),('djc','ghj'),('djhv','shbxj'),('dshkb','123'),('dxt','12345'),('Edgyy','Edyy@1234'),('efw','34'),('eggy','Eggy@1'),('eqrt','Q@3456'),('eqtytu','QWE@123'),('ert','E@1242'),('erto','ioW@123'),('ertyhb','@1234cC'),('ertyu','E@12344'),('eytw','12'),('Faizaan','123'),('fd','34'),('fxdt','Q@12344'),('Gautam','123'),('gcy','S@1234'),('gd','Qwe@123'),('gdvs','12'),('gfxc','QW@1234'),('ghcvy','Tw@1234'),('ghh','iop'),('Girija','123'),('gved','1231'),('gx','123'),('h','gc'),('haathi','67'),('harish','Raghav@1'),('Harry','12345'),('harsh','4567'),('hbsif','1231'),('hbuh','rocket'),('hc','Rity@1'),('Hel','Word@1'),('Heli','56'),('heud','QW@1234'),('hfcy','Qw@1245'),('hgc','QW@125'),('hgjv','345'),('hgs','H@12345'),('hi','kj'),('hindol','456'),('hity','kity'),('hre','123'),('hs','H@12346'),('hsd','123'),('hv','23'),('hvwu','45'),('io','23'),('iuo','345'),('Jagjeet','123456'),('jfu','34'),('jhqwved','131'),('jtf','1234'),('Karan','1234'),('Karen','12345'),('Karim','1234'),('Karl','123'),('karuna','karunR@1'),('Katurba','Katurba@123'),('Kavi','Kavi@1223'),('Kavita','1234'),('kbdcu','98765'),('kgf','123'),('kiq','h'),('Kishu','456'),('Kismat','12356'),('kity','k'),('kriti','45'),('Kutti','345'),('Langford','12345'),('lovely','123'),('manan','12'),('Manoh','Manoh@123'),('Manoj','123'),('May98','May@345'),('mk','12345'),('Mohini','Er@1234'),('Mohit','456789'),('Nana','parekar'),('oiop','QW@12345'),('Patrick','Patrick@12'),('Pq','pq'),('Pranoy','qw'),('Pranshul','qw'),('Pratik','Pra@1234'),('QW','Q@12345'),('qwdrf','QW@1234'),('Qwe','Q@12345'),('qwert','123'),('qwgf','12'),('Raghav','Raghav@1'),('Raghu','123456'),('Rahul','ra'),('Raja','Raja@123'),('Rajeev','123'),('Rajeevi','R@1234'),('Rajiv','Rajiv@12'),('Rakshit','Rakshit@1'),('Ram','12345'),('Rami','123'),('Ramn','908'),('Rantham','345'),('rew','12'),('rewt','123'),('Ritika','34567'),('Rocket','12345'),('rs56','QWE@123'),('RT','RTY@123'),('rtb','R@6789'),('rtv','trv'),('rty','34'),('rtyi','RT@1234'),('rtyu','RT@1235'),('rtyui','QW@1234'),('Sam','hi'),('Santrs','Santrs@12'),('SFsxg','Q@456782'),('shakti','234'),('shambhav','1234'),('Shanu','123'),('Shanu9','12345'),('Shanul','hello'),('Shanuo','hyu'),('Shashi','1278'),('Shekhsh4','Tamish@12'),('Shreen','345'),('Shyuo','123'),('Somu','12345'),('Srijan','367'),('Sv','SV@1234'),('Tabby','Tab@123'),('tdyt','2345'),('trdy','1234'),('ty','12'),('tyk','RT@12345'),('tyu','Rahul@1'),('udwbh','R@1234'),('uedc','345'),('uio','kio'),('uipl','tyu'),('uuv','io'),('uvuy',NULL),('Vaani','pabitro'),('ve','ve'),('Vinod','12345'),('Vinodini','234'),('vuh',NULL),('vusx','V@1234'),('vuw','V@1234'),('vwefu','232'),('wefgj','133'),('wer','Q@1234'),('wert','rtyu'),('werti','poW@123'),('weru','WER@123'),('wery','Wery@124'),('wr','J@1mjk'),('wy','12'),('yfc','123'),('yoga','ET@1234'),('yt','WE@123'),('yui','Q@12345'),('yukti','345'),('zaki','234');
/*!40000 ALTER TABLE `registration_record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-19  5:42:10
