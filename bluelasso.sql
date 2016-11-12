-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 16-11-12 05:10
-- 서버 버전: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bluelasso`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `departId` int(11) NOT NULL AUTO_INCREMENT,
  `departName` varchar(50) NOT NULL,
  `departRatio` int(11) NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`departId`),
  UNIQUE KEY `departId` (`departId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

--
-- 테이블의 덤프 데이터 `department`
--

INSERT INTO `department` (`departId`, `departName`, `departRatio`, `valid`) VALUES
(9, 'yyy', 90, 0),
(10, 'yyy', 9, 0),
(11, 'mmm', 86, 0),
(12, 'mmm', 77, 0),
(13, 'qw', 1, 0),
(14, 'qw', 11, 0),
(15, 'as', 1, 0),
(16, 'as', 11, 1),
(17, 'klklkl', 12, 1),
(18, 'asasas', 1, 1),
(19, 'ewq', 1, 0),
(20, 'zzz', 1, 0),
(21, 'qqq', 1, 0),
(22, 'sasasa', 12, 0),
(23, 'xx', 99, 0),
(24, 'xx', 12, 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `employees`
--

CREATE TABLE IF NOT EXISTS `employees` (
  `empId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `departId` int(50) DEFAULT NULL,
  `wage` float NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`empId`),
  KEY `Foreign_department` (`departId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- 테이블의 덤프 데이터 `employees`
--

INSERT INTO `employees` (`empId`, `name`, `phone`, `departId`, `wage`, `valid`) VALUES
(6, 'dfd', '12', 1, 0, 1),
(7, 'jjj', '123', 2, 0, 1),
(8, 'fgt', '333', 0, 0, 1),
(9, 'ggg', '444', 2, 0, 1),
(10, 'abc', '12', 2, 0, 1),
(11, 'ggg', '111', 3, 0, 1),
(12, 'bbb', '12', 1, 0, 1),
(13, 'yt6', '7', 0, 0, 1),
(14, 'hy', '9', 1, 0, 1),
(15, 'qwe', '12', 1, 0, 1),
(16, 'qaz', '12', 1, 0, 1),
(17, 'qwe', '1', 2, 0, 1),
(18, 'agde2', '12', 0, 0, 1),
(19, 'eadc', '222', 2, 0, 1),
(20, 'KKK', '123', 2, 21, 1),
(21, 'rrr', '123', 2, 321, 0),
(22, 'rrr', '123', 2, 21, 1),
(23, 'ggg', '321', 3, 12, 0),
(24, 'ggg', '321', 3, 23, 0),
(25, 'tre', '12', 1, 1, 0),
(26, 'tre', '12', 1, 13, 0),
(27, 'gda', '123', 0, 21, 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `empwage`
--

CREATE TABLE IF NOT EXISTS `empwage` (
  `empId` int(11) NOT NULL,
  `wageId` int(11) NOT NULL,
  `setDate` date NOT NULL,
  KEY `empId` (`empId`) USING BTREE,
  KEY `wageId` (`wageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `scheduleId` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `departId` int(11) NOT NULL,
  `empId` int(11) NOT NULL,
  `startT` int(11) NOT NULL,
  `endT` int(11) NOT NULL,
  PRIMARY KEY (`scheduleId`),
  KEY `empId` (`empId`) USING BTREE,
  KEY `departId` (`departId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 테이블 구조 `timezone`
--

CREATE TABLE IF NOT EXISTS `timezone` (
  `zoneId` int(11) NOT NULL AUTO_INCREMENT,
  `zoneName` varchar(50) NOT NULL,
  `startT` time NOT NULL,
  `endT` time NOT NULL,
  `valid` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`zoneId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- 테이블의 덤프 데이터 `timezone`
--

INSERT INTO `timezone` (`zoneId`, `zoneName`, `startT`, `endT`, `valid`) VALUES
(1, 'KKK', '00:15:00', '00:45:00', 0),
(2, 'LL', '00:00:00', '00:00:00', 1),
(3, 'OOO', '00:00:00', '01:00:00', 1),
(4, 'OOO', '01:30:00', '02:00:00', 1),
(5, 'adf', '01:45:00', '02:30:00', 1),
(6, 'dsaf', '00:00:00', '00:15:00', 1),
(7, 'daddddd', '00:00:00', '00:45:00', 1),
(8, 'daddddd', '00:00:00', '01:30:00', 1),
(9, 'daddddd', '00:00:00', '02:30:00', 1),
(10, 'ggg', '00:00:00', '00:00:00', 0),
(11, 'ggg', '00:00:00', '01:00:00', 1),
(12, 'ewq', '00:00:00', '00:00:00', 1),
(13, 'ggg', '00:00:00', '00:45:00', 1),
(14, 'kkk', '00:00:00', '00:00:00', 1),
(15, 'qwe', '00:00:00', '00:00:00', 0),
(16, 'qwe', '00:00:00', '00:15:00', 1),
(17, 'zaq', '00:00:00', '00:00:00', 0),
(18, 'zaq', '00:00:00', '00:15:00', 1),
(19, 'teq', '00:00:00', '00:00:00', 0),
(20, '19', '00:00:00', '01:45:00', 1),
(21, 'zxcv', '00:00:00', '00:00:00', 0),
(22, 'zxcv', '00:00:00', '01:00:00', 1),
(23, 'TH', '00:00:00', '00:15:00', 0),
(24, 'TH', '00:00:00', '01:00:00', 0),
(25, 'HH', '00:00:00', '00:15:00', 0),
(26, 'HH', '00:00:00', '01:00:00', 0),
(27, 'ZZ', '00:00:00', '00:15:00', 0),
(28, 'ZZ', '00:00:00', '01:00:00', 1),
(29, 'yhy', '00:00:00', '00:00:00', 0),
(30, 'yhy', '00:00:00', '01:00:00', 1),
(31, 'xxx', '00:00:00', '00:15:00', 0),
(32, 'xxx', '00:00:00', '01:00:00', 0),
(33, 'vvv', '00:00:00', '00:15:00', 0),
(34, 'vvv', '00:00:00', '01:00:00', 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `wage`
--

CREATE TABLE IF NOT EXISTS `wage` (
  `wageId` bigint(32) NOT NULL AUTO_INCREMENT,
  `wage` float NOT NULL,
  `empId` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`wageId`),
  UNIQUE KEY `wageId` (`wageId`),
  KEY `empId` (`empId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=29 ;

--
-- 테이블의 덤프 데이터 `wage`
--

INSERT INTO `wage` (`wageId`, `wage`, `empId`, `date`) VALUES
(7, 32, 6, '2016-11-10 00:00:00'),
(8, 1, 7, '2016-11-10 00:00:00'),
(9, 11, 8, '2016-11-10 00:00:00'),
(10, 44, 9, '2016-11-10 00:00:00'),
(11, 21, 10, '2016-11-10 00:00:00'),
(13, 222, 11, '2016-11-10 00:00:00'),
(15, 33, 12, '2016-11-10 00:00:00'),
(16, 44, 6, '0000-00-00 00:00:00'),
(17, 33, 6, '0000-00-00 00:00:00'),
(18, 0, 13, '2016-11-10 00:00:00'),
(19, 0, 14, '2016-11-10 00:00:00'),
(20, 10, 14, '0000-00-00 00:00:00'),
(21, 0, 15, '2016-11-10 00:00:00'),
(22, 10, 15, '0000-00-00 00:00:00'),
(23, 33, 16, '2016-11-10 00:00:00'),
(24, 2, 17, '2016-11-10 00:00:00'),
(25, 29, 17, '2016-11-10 00:00:00'),
(26, 31, 18, '2016-11-11 00:00:00'),
(27, 33, 18, '2016-11-11 00:00:00'),
(28, 32, 19, '2016-11-11 11:24:41');

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `empwage`
--
ALTER TABLE `empwage`
  ADD CONSTRAINT `empwage_ibfk_1` FOREIGN KEY (`empId`) REFERENCES `employees` (`empId`);

--
-- 테이블의 제약사항 `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `FK_empId` FOREIGN KEY (`empId`) REFERENCES `employees` (`empId`) ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `wage`
--
ALTER TABLE `wage`
  ADD CONSTRAINT `wage_ibfk_1` FOREIGN KEY (`empId`) REFERENCES `employees` (`empId`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
