USE chess;

INSERT INTO `Event` VALUES (1, 'cs348 chess tournament');
INSERT INTO `Event` VALUES (2, 'world championship');

INSERT INTO `Game` VALUES (1, 'b', '2010-10-10', 1);
INSERT INTO `Game` VALUES (2, 'w', '2011-11-11', 2);
INSERT INTO `Game` VALUES (3, 'w', '2011-11-11', 1);
INSERT INTO `Game` VALUES (4, 'b', '2011-11-11', 2);
INSERT INTO `Game` VALUES (5, 't', '2011-11-11', 1);
INSERT INTO `Game` VALUES (6, 't', '2011-11-11', 2);

-- Moves for Game 1
INSERT INTO `Move` VALUES (1, 0, 'd4', 'very nice', 'd4', 'd2', 'P');
INSERT INTO `Move` VALUES (1, 1, 'd5', 'wow', 'd5', 'd7', 'P');
INSERT INTO `Move` VALUES (1, 2, 'c4', 'wow', 'c4', 'c2', 'P');
INSERT INTO `Move` VALUES (1, 3, 'e6', 'wow', 'e6', 'e7', 'P');
INSERT INTO `Move` VALUES (1, 4, 'd3', 'wow', 'd3', 'd1', 'Q');
INSERT INTO `Move` VALUES (1, 5, 'd7', 'wow', 'd7', 'e8', 'K');

-- Moves for Game 2
INSERT INTO `Move` VALUES (2, 0, 'd4', 'very nice', 'd4', 'd2', 'P');
INSERT INTO `Move` VALUES (2, 1, 'd5', 'wow', 'd5', 'd7', 'P');
INSERT INTO `Move` VALUES (2, 2, 'c4', 'wow', 'c4', 'c2', 'P');
INSERT INTO `Move` VALUES (2, 3, 'a5', 'nice', 'a5', 'a7', 'P');
INSERT INTO `Move` VALUES (2, 4, 'f4', 'wow', 'f4', 'c1', 'B');
INSERT INTO `Move` VALUES (2, 5, 'a7', 'wow', 'a7', 'a8', 'R');

-- Moves for Game 3
INSERT INTO `Move` VALUES (3, 0, 'a4', 'very nice', 'a4', 'a2', 'P');
INSERT INTO `Move` VALUES (3, 1, 'h5', 'very nice', 'h5', 'h7', 'P');
INSERT INTO `Move` VALUES (3, 2, 'a3', 'very nice', 'a3', 'a1', 'R');
INSERT INTO `Move` VALUES (3, 3, 'f6', 'very nice', 'f6', 'g8', 'K');



INSERT INTO `Player` VALUES (1, 'jason', NULL, NULL);
INSERT INTO `Player` VALUES (2, 'john', 'john123', 'password');
INSERT INTO `Player` VALUES (3, 'alyssa', 'alyssa123', '123456');
INSERT INTO `Player` VALUES (4, 'colin', NULL, NULL);

INSERT INTO `PlayedIn` VALUES (1, 1, 1500, TRUE);
INSERT INTO `PlayedIn` VALUES (2, 1, 1700, FALSE);
INSERT INTO `PlayedIn` VALUES (3, 2, 1800, TRUE);
INSERT INTO `PlayedIn` VALUES (4, 2, 1900, FALSE);
INSERT INTO `PlayedIn` VALUES (2, 3, 1800, TRUE);
INSERT INTO `PlayedIn` VALUES (3, 3, 1900, FALSE);
INSERT INTO `PlayedIn` VALUES (1, 4, 1800, FALSE);
INSERT INTO `PlayedIn` VALUES (4, 4, 1900, TRUE);
INSERT INTO `PlayedIn` VALUES (2, 5, 1800, TRUE);
INSERT INTO `PlayedIn` VALUES (4, 5, 1900, FALSE);
INSERT INTO `PlayedIn` VALUES (2, 6, 1800, FALSE);
INSERT INTO `PlayedIn` VALUES (4, 6, 1900, TRUE);

INSERT INTO `PlayerFavourited` VALUES ('john123', 2);
INSERT INTO `PlayerFavourited` VALUES ('john123', 3);
INSERT INTO `PlayerFavourited` VALUES ('john123', 4);
INSERT INTO `PlayerFavourited` VALUES ('alyssa123', 2);
INSERT INTO `PlayerFavourited` VALUES ('alyssa123', 4);