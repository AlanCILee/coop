-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 16-10-26 17:55
-- 서버 버전: 5.6.34
-- PHP 버전: 5.6.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `company`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `employees`
--

CREATE TABLE `employees` (
  `empId` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `departId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `employees`
--

INSERT INTO `employees` (`empId`, `name`, `phone`, `departId`) VALUES
(1, 'Alan', '123-456-7890', 1),
(2, 'Nick', '111-222-3333', 2),
(3, 'Steve', '123-432-5432', 3),
(4, 'Aaron', '333-444-5555', 4),
(5, 'Maxwell', '666-777-8888', 5);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`empId`),
  ADD KEY `Foreign_department` (`departId`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `employees`
--
ALTER TABLE `employees`
  MODIFY `empId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `Foreign_department` FOREIGN KEY (`departId`) REFERENCES `department` (`departId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
