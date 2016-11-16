-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 16-11-16 09:10
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

CREATE TABLE `employees` (
  `empId` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `departId` int(50) DEFAULT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `employees`
--

INSERT INTO `employees` (`empId`, `name`, `phone`, `departId`, `valid`) VALUES
(6, 'dfd', '12', 1, 1),
(7, 'jjj', '123', 2, 1),
(8, 'fgt', '333', 0, 1),
(9, 'ggg', '444', 2, 1),
(10, 'abc', '12', 2, 1),
(11, 'ggg', '111', 3, 1),
(12, 'bbb', '12', 1, 1),
(13, 'yt6', '7', 0, 1),
(14, 'hy', '9', 1, 1),
(15, 'qwe', '12', 1, 1),
(16, 'qaz', '12', 1, 1),
(17, 'qwe', '1', 2, 1),
(18, 'agde2', '12', 0, 1),
(19, 'eadc', '222', 2, 1),
(30, 'rew', '444', 3, 0),
(31, 'zasa', '1', 1, 1),
(32, 'rew', '444', 3, 1),
(33, 'trew', '12', 2, 1),
(34, 'trewq', '1', 0, 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `schedule`
--

CREATE TABLE `schedule` (
  `scheduleId` bigint(24) NOT NULL,
  `date` date NOT NULL,
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
(1, '2016-11-14', 3, 7, '0', '1', 1),
(2, '2016-11-14', 3, 7, '1', '2', 1),
(3, '2016-11-14', 2, 11, '00:30', '01:00', 1),
(4, '2016-11-14', 2, 6, '08:15', '09:30', 1),
(5, '2016-11-14', 2, 17, '10:15', '11:00', 1),
(6, '2016-11-14', 18, 19, '13:45', '14:15', 1),
(7, '2016-11-14', 2, 14, '00:30', '01:00', 1),
(8, '2016-11-14', 1, 12, '00:00', '00:00', 1),
(9, '2016-11-14', 1, 10, '07:45', '11:45', 1),
(10, '2016-11-14', 3, 10, '10:00', '12:15', 1),
(11, '2016-11-14', 16, 32, '08:30', '11:00', 1),
(12, '2016-11-14', 17, 18, '07:30', '10:00', 1),
(13, '2016-11-14', 3, 8, '08:45', '10:45', 1),
(14, '2016-11-14', 3, 31, '13:00', '14:15', 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `timezone`
--

CREATE TABLE `timezone` (
  `zoneId` int(11) NOT NULL,
  `zoneName` varchar(50) NOT NULL,
  `startT` time NOT NULL,
  `endT` time NOT NULL,
  `valid` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 테이블의 덤프 데이터 `timezone`
--

INSERT INTO `timezone` (`zoneId`, `zoneName`, `startT`, `endT`, `valid`) VALUES
(1, 'KKK', '00:15:00', '00:45:00', 0),
(2, 'LL', '00:00:00', '00:00:00', 0),
(3, 'OOO', '00:00:00', '01:00:00', 0),
(4, 'OOO', '01:30:00', '02:00:00', 0),
(5, 'adf', '01:45:00', '02:30:00', 0),
(6, 'dsaf', '00:00:00', '00:15:00', 0),
(7, 'daddddd', '00:00:00', '00:45:00', 0),
(8, 'daddddd', '00:00:00', '01:30:00', 0),
(9, 'daddddd', '00:00:00', '02:30:00', 0),
(10, 'ggg', '00:00:00', '00:00:00', 0),
(11, 'ggg', '00:00:00', '01:00:00', 0),
(12, 'ewq', '00:00:00', '00:00:00', 0),
(13, 'ggg', '00:00:00', '00:45:00', 0),
(14, 'kkk', '00:00:00', '00:00:00', 0),
(15, 'qwe', '00:00:00', '00:00:00', 0),
(16, 'qwe', '00:00:00', '00:15:00', 0),
(17, 'zaq', '00:00:00', '00:00:00', 0),
(18, 'zaq', '00:00:00', '00:15:00', 0),
(19, 'teq', '00:00:00', '00:00:00', 0),
(20, '19', '00:00:00', '01:45:00', 0),
(21, 'zxcv', '00:00:00', '00:00:00', 0),
(22, 'zxcv', '00:00:00', '01:00:00', 0),
(23, 'TH', '00:00:00', '00:15:00', 0),
(24, 'TH', '00:00:00', '01:00:00', 0),
(25, 'HH', '00:00:00', '00:15:00', 0),
(26, 'HH', '00:00:00', '01:00:00', 0),
(27, 'ZZ', '00:00:00', '00:15:00', 0),
(28, 'ZZ', '00:00:00', '01:00:00', 0),
(29, 'yhy', '00:00:00', '00:00:00', 0),
(30, 'yhy', '00:00:00', '01:00:00', 0),
(31, 'xxx', '00:00:00', '00:15:00', 0),
(32, 'xxx', '00:00:00', '01:00:00', 0),
(33, 'vvv', '00:00:00', '00:15:00', 0),
(34, 'vvv', '00:00:00', '01:00:00', 0),
(35, 'Morning', '06:00:00', '12:00:00', 1),
(36, 'Afternoon', '12:00:00', '18:30:00', 1),
(37, 'Evening', '18:30:00', '23:45:00', 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `tip`
--

CREATE TABLE `tip` (
  `tipId` bigint(24) NOT NULL,
  `date` date NOT NULL,
  `zoneId` int(11) NOT NULL,
  `tip` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `tip`
--

INSERT INTO `tip` (`tipId`, `date`, `zoneId`, `tip`) VALUES
(22, '2016-11-15', 35, 11),
(23, '2016-11-15', 36, 22),
(24, '2016-11-15', 37, 33);

-- --------------------------------------------------------

--
-- 테이블 구조 `wage`
--

CREATE TABLE `wage` (
  `wageId` int(11) NOT NULL,
  `wage` int(11) NOT NULL,
  `empId` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `departId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- 테이블의 AUTO_INCREMENT `employees`
--
ALTER TABLE `employees`
  MODIFY `empId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- 테이블의 AUTO_INCREMENT `schedule`
--
ALTER TABLE `schedule`
  MODIFY `scheduleId` bigint(24) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- 테이블의 AUTO_INCREMENT `timezone`
--
ALTER TABLE `timezone`
  MODIFY `zoneId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- 테이블의 AUTO_INCREMENT `tip`
--
ALTER TABLE `tip`
  MODIFY `tipId` bigint(24) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- 테이블의 AUTO_INCREMENT `wage`
--
ALTER TABLE `wage`
  MODIFY `wageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
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
