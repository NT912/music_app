CREATE DATABASE music_player;

USE music_player;

CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    track_name VARCHAR(100) NOT NULL,
    singer VARCHAR(100) NOT NULL,
    tracks_path VARCHAR(255) NOT NULL
);

CREATE TABLE saved_tracks (
    id INT,
    id_user INT,
    PRIMARY KEY (id, id_user),
    FOREIGN KEY (id) REFERENCES tracks(id),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);
