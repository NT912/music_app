-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 06, 2024 at 05:18 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music_player`
--

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `id` int(11) NOT NULL,
  `track_name` varchar(100) NOT NULL,
  `singer` varchar(100) NOT NULL,
  `tracks_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`id`, `track_name`, `singer`, `tracks_path`) VALUES
(1, 'Chốn sa mạc', 'Minh Tốc & Lam', '/Users/nhattruong/Desktop/ngunghia/uploads/Chốn Sa Mạc - Minh Tốc và Lam.mp3'),
(2, 'Chuyến xe trung chuyển', 'The Cassette', '/Users/nhattruong/Desktop/ngunghia/uploads/Chuyến Xe Trung Chuyển - The Cassette.mp3'),
(3, 'Đại lộ mặt trời', 'chillies', '/Users/nhattruong/Desktop/ngunghia/uploads/Đại Lộ Mặt Trời - Chillies.mp3'),
(4, 'Em đừng khóc', 'Chillies', '/Users/nhattruong/Desktop/ngunghia/uploads/Em Đừng Khóc - Chillies.mp3'),
(5, 'Giấc mơ khác', 'Chillies', '/Users/nhattruong/Desktop/ngunghia/uploads/GIẤC MƠ KHÁC - CHILLIES.mp3'),
(6, 'NỨT (đôi chân đôi tay đôi mắt trái tim)', 'Ngọt', '/Users/nhattruong/Desktop/ngunghia/uploads/NỨT (đôi chân đôi tay đôi mắt trái tim) - Ngọt.mp3'),
(7, 'Soạn', 'The Cassette', '/Users/nhattruong/Desktop/ngunghia/uploads/Soạn - The Cassette.mp3'),
(8, 'Tầng mây thứ 8', 'Chillies', '/Users/nhattruong/Desktop/ngunghia/uploads/Tầng Mây Thứ 8 - Chillies.mp3'),
(9, 'Treo (2:00 AM)', 'The Cassette', '/Users/nhattruong/Desktop/ngunghia/uploads/Treo (2_00 AM) - The Cassette.mp3'),
(10, 'Bát cơm mặn', 'Ong bây bi', '/Users/nhattruong/Desktop/ngunghia/uploads/Bát Cơm Mặn - Ong Bây Bi.mp3'),
(11, 'Gặp Lại Năm Ta 60', 'Ong Bây Bi', '/Users/nhattruong/Desktop/ngunghia/uploads/Gặp Lại Năm Ta 60 - Ong Bây Bi.mp3'),
(12, 'GIẤC MƠ 20', 'MICROWAVE', '/Users/nhattruong/Desktop/ngunghia/uploads/GIẤC MƠ 20 - MICROWAVE.mp3'),
(13, 'Khóa Ly Biệt', 'Voi Bản Đôn', '/Users/nhattruong/Desktop/ngunghia/uploads/Khóa Ly Biệt - Voi Bản Đôn.mp3'),
(14, 'Nửa Thập Kỷ', 'Hoàng Dũng', '/Users/nhattruong/Desktop/ngunghia/uploads/Nửa Thập Kỷ - Hoàng Dũng .mp3'),
(15, 'Quá Khứ Còn Lại Gì', 'HippoHappy', '/Users/nhattruong/Desktop/ngunghia/uploads/Quá Khứ Còn Lại Gì - HippoHappy.mp3'),
(16, 'soạn', 'The Cassette', '/Users/nhattruong/Desktop/ngunghia/uploads/track_file-1717683467607.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`) VALUES
(1, 'truong', '123'),
(2, 'danh', '123'),
(3, 'sang', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
