-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2016 at 02:05 AM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blueenergi`
--

-- --------------------------------------------------------

--
-- Table structure for table `dispatch`
--

DROP TABLE IF EXISTS `dispatch`;
CREATE TABLE IF NOT EXISTS `dispatch` (
  `dispatch_Id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_Id` int(11) NOT NULL,
  `customer_Id` int(11) NOT NULL,
  `sold_qty` int(11) NOT NULL,
  `storage_balance` decimal(20,2) NOT NULL,
  `sold_rate` decimal(20,2) NOT NULL,
  `outstanding` int(11) DEFAULT NULL,
  `payment_due_date` date NOT NULL,
  `actual_payment_date` date NOT NULL,
  `amount_paid` decimal(20,2) NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`dispatch_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  PRIMARY KEY (`product_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
CREATE TABLE IF NOT EXISTS `purchase` (
  `purchase_Id` int(11) NOT NULL AUTO_INCREMENT,
  `truck_number` varchar(250) NOT NULL,
  `users_Id` int(120) NOT NULL,
  `product_Id` int(120) NOT NULL,
  `quantity` int(20) NOT NULL,
  `amount_payed` decimal(20,2) NOT NULL,
  `bank` varchar(250) NOT NULL,
  `ticket_no` varchar(250) DEFAULT NULL,
  `depot` varchar(250) NOT NULL,
  `quantity_confirmed` int(120) DEFAULT NULL,
  `product_Id_confirmed` int(120) DEFAULT NULL,
  `clearance_amount` decimal(20,2) DEFAULT NULL,
  `clearnace_bank` varchar(250) DEFAULT NULL,
  `product_cleared` int(120) DEFAULT NULL,
  `price_per_litre` decimal(20,2) NOT NULL,
  `purchase_date` date NOT NULL,
  PRIMARY KEY (`purchase_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `users_Id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `lastseen` timestamp NULL DEFAULT NULL,
  `level` tinyint(2) NOT NULL,
  PRIMARY KEY (`users_Id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
