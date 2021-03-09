-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2021 at 12:22 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `picurl` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `industry` varchar(100) DEFAULT NULL,
  `registered_users` text DEFAULT NULL,
  `begin_date` text DEFAULT NULL,
  `end_date` text DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `picurl`, `location`, `industry`, `registered_users`, `begin_date`, `end_date`, `user_id`, `CreatedDate`, `UpdatedDate`) VALUES
(9, 'developer conference ', 'x company is organizing developer conference', 'events.svg', 'sweden', 'software', '{\"0\":\"3\"}', '2021-03-24 07:59:43', '2021-03-31 08:59:43', 4, '2021-03-09 08:00:49', '2021-03-09 08:04:42'),
(10, 'book reading meetup', 'we are organizing gathering of book club', 'events.svg', 'islamabad', 'literature', '{\"0\":\"3\"}', '2021-03-01 08:01:02', '2021-03-03 08:01:02', 4, '2021-03-09 08:01:36', '2021-03-09 08:04:46'),
(11, 'coding competition', 'organizing coding competitiion', 'events.svg', 'sweden', 'software', NULL, '2021-03-17 11:59:09', '2021-03-25 11:59:09', 4, '2021-03-09 11:59:39', '2021-03-09 11:59:39'),
(12, 'testing past events', 'this is for test', 'events.svg', 'germany', 'QA', NULL, '2020-12-29 12:01:31', '2021-01-20 12:01:31', 4, '2021-03-09 12:02:26', '2021-03-09 12:02:26');

-- --------------------------------------------------------

--
-- Table structure for table `keys`
--

CREATE TABLE `keys` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `key` varchar(40) NOT NULL,
  `level` int(2) NOT NULL,
  `ignore_limits` tinyint(1) NOT NULL DEFAULT 0,
  `is_private_key` tinyint(1) NOT NULL DEFAULT 0,
  `ip_addresses` text DEFAULT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `keys`
--

INSERT INTO `keys` (`id`, `user_id`, `key`, `level`, `ignore_limits`, `is_private_key`, `ip_addresses`, `date_created`) VALUES
(1, 1, 'EVENTAPP@123', 0, 0, 0, NULL, '2018-10-11 13:34:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=Active | 0=Inactive ',
  `address` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(70) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isAdmin` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `created`, `modified`, `status`, `address`, `username`, `name`, `isAdmin`) VALUES
(3, '7f46eee254302ae60e383816ad0e4546', '2021-03-06 20:55:25', '2021-03-06 20:55:25', 1, 'house 4 street38 islamabad', 'usama4745', 'Usama', '0'),
(4, '21232f297a57a5a743894a0e4a801fc3', '2021-03-07 10:22:28', '2021-03-07 10:22:28', 1, 'house 3 street 27', 'admin', 'admin', '1'),
(5, 'd1a0a9e9391af09e978c4c3d11711e75', '2021-03-08 14:14:22', '2021-03-08 14:14:22', 1, 'house 3 street 33', 'adnan2332', 'adnan', '0'),
(6, 'd1a0a9e9391af09e978c4c3d11711e75', '2021-03-08 14:15:11', '2021-03-08 14:15:11', 1, 'house 3 street 33', 'kamal', 'kamal', '0'),
(7, 'b48e955718403d8afa81a5abe6066fc9', '2021-03-08 14:15:53', '2021-03-08 14:15:53', 1, 'house 33', 'hamad', 'hamad', '0'),
(8, '2e69e5be101bd46a30c9431d6e378201', '2021-03-08 14:37:42', '2021-03-08 14:37:42', 1, 'waris', 'waris', 'waris', '0'),
(9, '35e8a6640d5703f5e1a4bc4bf1086fba', '2021-03-09 09:50:25', '2021-03-09 09:50:25', 1, 'new office locaiton', 'usamaadmin', 'usama ahmed', '1'),
(10, 'd98998d8fab522d1c1f2af9a36ef5bdd', '2021-03-09 09:51:44', '2021-03-09 09:51:44', 1, 'usama location', 'usamauser', 'usama ahmed user', '1'),
(11, '434d684b9bfb860012c6106b811308e4', '2021-03-09 09:58:30', '2021-03-09 09:58:30', 1, 'usamaisuser', 'usamaisuser', 'usamaisuser', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_User_Id` (`user_id`);

--
-- Indexes for table `keys`
--
ALTER TABLE `keys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `keys`
--
ALTER TABLE `keys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `fk_User_Id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
