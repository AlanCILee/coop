-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 16-11-10 16:38
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
  `departRatio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `employees`
--

CREATE TABLE `employees` (
  `empId` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `departId` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `empwage`
--

CREATE TABLE `empwage` (
  `empId` int(11) NOT NULL,
  `wageId` int(11) NOT NULL,
  `setDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `schedule`
--

CREATE TABLE `schedule` (
  `scheduleId` int(11) NOT NULL,
  `date` date NOT NULL,
  `departId` int(11) NOT NULL,
  `empId` int(11) NOT NULL,
  `startT` int(11) NOT NULL,
  `endT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `wage`
--

CREATE TABLE `wage` (
  `wageId` int(11) NOT NULL,
  `wage` int(11) NOT NULL
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
-- 테이블의 인덱스 `empwage`
--
ALTER TABLE `empwage`
  ADD KEY `empId` (`empId`) USING BTREE,
  ADD KEY `wageId` (`wageId`);

--
-- 테이블의 인덱스 `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`scheduleId`),
  ADD KEY `empId` (`empId`) USING BTREE,
  ADD KEY `departId` (`departId`);

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
  MODIFY `departId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 테이블의 AUTO_INCREMENT `employees`
--
ALTER TABLE `employees`
  MODIFY `empId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 테이블의 AUTO_INCREMENT `schedule`
--
ALTER TABLE `schedule`
  MODIFY `scheduleId` int(11) NOT NULL AUTO_INCREMENT;
--
-- 테이블의 AUTO_INCREMENT `wage`
--
ALTER TABLE `wage`
  MODIFY `wageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `empwage`
--
ALTER TABLE `empwage`
  ADD CONSTRAINT `empwage_ibfk_1` FOREIGN KEY (`empId`) REFERENCES `employees` (`empId`),
  ADD CONSTRAINT `empwage_ibfk_2` FOREIGN KEY (`wageId`) REFERENCES `wage` (`wageId`);

--
-- 테이블의 제약사항 `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `FK_empId` FOREIGN KEY (`empId`) REFERENCES `employees` (`empId`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
