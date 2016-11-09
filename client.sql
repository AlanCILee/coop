-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 16-11-08 16:47
-- 서버 버전: 5.6.34
-- PHP 버전: 5.6.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `client`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `auth` int(11) NOT NULL,
  `companyId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `clients`
--

INSERT INTO `clients` (`id`, `name`, `password`, `auth`, `companyId`) VALUES
(1, 'alan', '1', 0, 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `companies`
--

CREATE TABLE `companies` (
  `companyId` int(11) NOT NULL,
  `companyName` varchar(127) NOT NULL,
  `dbName` varchar(127) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `companies`
--

INSERT INTO `companies` (`companyId`, `companyName`, `dbName`) VALUES
(1, 'bluelasso', 'bluelasso');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- 테이블의 인덱스 `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`companyId`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 테이블의 AUTO_INCREMENT `companies`
--
ALTER TABLE `companies`
  MODIFY `companyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `FK_companyId` FOREIGN KEY (`companyId`) REFERENCES `companies` (`companyId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
