-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 16-11-25 10:14
-- 서버 버전: 5.6.34
-- PHP 버전: 5.6.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `bluelasso`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `department`
--

CREATE TABLE `department` (
  `departId` int(11) NOT NULL,
  `departName` varchar(50) NOT NULL,
  `departRatio` int(11) NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `department`
--

INSERT INTO `department` (`departId`, `departName`, `departRatio`, `valid`) VALUES
(28, 'S', 20, 1),
(29, 'K', 20, 1),
(30, 'W', 60, 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `employees`
--

CREATE TABLE `employees` (
  `empId` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `departId` int(50) DEFAULT NULL,
  `ratio` int(11) NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `employees`
--

INSERT INTO `employees` (`empId`, `name`, `phone`, `departId`, `ratio`, `valid`) VALUES
(35, 'Young', '1', 29, 100, 1),
(36, 'Roland', '2', 29, 100, 1),
(37, 'Omu', '3', 28, 100, 1),
(38, 'Daniel', '4', 28, 100, 1),
(39, 'Queenee', '5', 30, 100, 1),
(40, 'Lisa', '6', 29, 50, 1),
(41, 'Grace', '7', 29, 100, 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `schedule`
--

CREATE TABLE `schedule` (
  `scheduleId` bigint(24) NOT NULL,
  `date` varchar(20) NOT NULL,
  `departId` int(11) NOT NULL,
  `empId` int(11) NOT NULL,
  `startT` varchar(11) NOT NULL,
  `endT` varchar(11) NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `schedule`
--

INSERT INTO `schedule` (`scheduleId`, `date`, `departId`, `empId`, `startT`, `endT`, `valid`) VALUES
(15, '2016-11-23', 29, 35, '10:30', '14:00', 1),
(16, '2016-11-23', 29, 36, '10:00', '15:00', 1),
(17, '2016-11-23', 29, 35, '16:00', '22:30', 1),
(18, '2016-11-23', 28, 38, '10:00', '17:00', 0),
(19, '2016-11-23', 28, 38, '12:00', '22:00', 1),
(20, '2016-11-23', 29, 41, '15:00', '21:30', 1),
(21, '2016-11-23', 30, 41, '10:00', '14:00', 1),
(22, '2016-11-23', 30, 39, '10:00', '20:00', 1),
(23, '2016-11-23', 30, 40, '10:00', '14:00', 1),
(24, '2016-11-23', 28, 37, '10:00', '15:00', 1),
(54, '2016-11-24', 29, 35, '10:30', '14:00', 1),
(55, '2016-11-24', 29, 36, '10:00', '15:00', 1),
(56, '2016-11-24', 29, 35, '16:00', '22:30', 1),
(57, '2016-11-24', 28, 38, '12:00', '21:45', 1),
(58, '2016-11-24', 29, 41, '15:00', '21:30', 1),
(59, '2016-11-24', 30, 41, '10:00', '14:00', 1),
(60, '2016-11-24', 30, 39, '10:00', '20:00', 1),
(61, '2016-11-24', 30, 40, '10:00', '14:00', 1),
(62, '2016-11-24', 28, 37, '10:00', '15:00', 1),
(63, '2016-11-25', 29, 35, '10:30', '14:00', 1),
(64, '2016-11-25', 29, 36, '10:00', '15:00', 1),
(65, '2016-11-25', 29, 35, '16:00', '22:30', 1),
(66, '2016-11-25', 28, 38, '12:00', '21:45', 0),
(67, '2016-11-25', 29, 41, '15:00', '21:30', 1),
(68, '2016-11-25', 30, 41, '10:00', '14:00', 1),
(69, '2016-11-25', 30, 39, '10:00', '20:00', 1),
(70, '2016-11-25', 30, 40, '10:00', '14:00', 1),
(71, '2016-11-25', 28, 37, '10:00', '15:00', 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `timezone`
--

CREATE TABLE `timezone` (
  `zoneId` int(11) NOT NULL,
  `zoneName` varchar(50) NOT NULL,
  `startT` varchar(20) NOT NULL,
  `endT` varchar(20) NOT NULL,
  `valid` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 테이블의 덤프 데이터 `timezone`
--

INSERT INTO `timezone` (`zoneId`, `zoneName`, `startT`, `endT`, `valid`) VALUES
(38, 'Morning', '08:00', '16:00', 1),
(39, 'Evening', '16:00', '23:45', 1),
(40, 'Test', '00:30', '01:15', 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `tip`
--

CREATE TABLE `tip` (
  `tipId` bigint(24) NOT NULL,
  `date` varchar(20) NOT NULL,
  `zoneId` int(11) NOT NULL,
  `tip` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `tip`
--

INSERT INTO `tip` (`tipId`, `date`, `zoneId`, `tip`) VALUES
(25, '2016-11-23', 38, 1000),
(26, '2016-11-23', 39, 1500),
(27, '2016-11-24', 38, 1100),
(28, '2016-11-24', 39, 1200);

-- --------------------------------------------------------

--
-- 테이블 구조 `wage`
--

CREATE TABLE `wage` (
  `wageId` int(11) NOT NULL,
  `wage` float NOT NULL,
  `empId` int(11) NOT NULL,
  `date` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `wage`
--

INSERT INTO `wage` (`wageId`, `wage`, `empId`, `date`) VALUES
(7, 12, 35, '2016-11-23 15:10:45'),
(8, 12, 35, '2016-11-23 15:11:53'),
(9, 35, 35, '2016-11-23 15:12:36'),
(10, 10, 35, '2016-11-23 15:13:50'),
(11, 17, 35, '2016-11-23 15:22:50'),
(12, 1, 35, '2016-11-23 15:25:23'),
(13, 3, 35, '2016-11-23 15:26:40'),
(14, 10, 35, '2016-11-23 15:33:47'),
(15, 5.1, 35, '2016-11-23 15:35:06'),
(16, 10, 36, '2016-11-23 15:39:02'),
(17, 25, 37, '2016-11-23 15:41:10'),
(18, 15, 38, '2016-11-23 15:41:24'),
(19, 8.9, 39, '2016-11-23 15:41:41'),
(20, 8.9, 40, '2016-11-23 15:41:54'),
(21, 10, 41, '2016-11-23 15:43:44'),
(22, 30, 37, '2016-11-24 15:31:51');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`departId`),
  ADD UNIQUE KEY `departId` (`departId`);

--
-- 테이블의 인덱스 `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`empId`),
  ADD KEY `Foreign_department` (`departId`);

--
-- 테이블의 인덱스 `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`scheduleId`),
  ADD KEY `empId` (`empId`) USING BTREE,
  ADD KEY `departId` (`departId`);

--
-- 테이블의 인덱스 `timezone`
--
ALTER TABLE `timezone`
  ADD PRIMARY KEY (`zoneId`);

--
-- 테이블의 인덱스 `tip`
--
ALTER TABLE `tip`
  ADD PRIMARY KEY (`tipId`);

--
-- 테이블의 인덱스 `wage`
--
ALTER TABLE `wage`
  ADD PRIMARY KEY (`wageId`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `department`
--
ALTER TABLE `department`
  MODIFY `departId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- 테이블의 AUTO_INCREMENT `employees`
--
ALTER TABLE `employees`
  MODIFY `empId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- 테이블의 AUTO_INCREMENT `schedule`
--
ALTER TABLE `schedule`
  MODIFY `scheduleId` bigint(24) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- 테이블의 AUTO_INCREMENT `timezone`
--
ALTER TABLE `timezone`
  MODIFY `zoneId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- 테이블의 AUTO_INCREMENT `tip`
--
ALTER TABLE `tip`
  MODIFY `tipId` bigint(24) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- 테이블의 AUTO_INCREMENT `wage`
--
ALTER TABLE `wage`
  MODIFY `wageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `FK_empId` FOREIGN KEY (`empId`) REFERENCES `employees` (`empId`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
