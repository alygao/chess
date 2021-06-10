USE chess;

INSERT INTO `Game` VALUES (1, 'b', '2010-10-10');
INSERT INTO `Game` VALUES (2, 'w', '2011-11-11');
INSERT INTO `Game` VALUES (3, 'w', '2011-11-11');

INSERT INTO `Move` VALUES (1, 0, 'd4', 'very nice');
INSERT INTO `Move` VALUES (1, 1, 'd5', 'wow');
INSERT INTO `Move` VALUES (1, 2, 'c4', 'wow');
INSERT INTO `Move` VALUES (1, 3, 'e6', 'wow');

INSERT INTO `Move` VALUES (2, 0, 'd4', 'very nice');
INSERT INTO `Move` VALUES (2, 1, 'd5', 'wow');
INSERT INTO `Move` VALUES (2, 2, 'a4', 'wow');
INSERT INTO `Move` VALUES (2, 3, 'e6', 'wow');

INSERT INTO `Move` VALUES (3, 0, 'a4', 'very nice');

INSERT INTO `Event` VALUES (1, 'cs348 chess tournament');
INSERT INTO `Event` VALUES (2, 'world championship');

INSERT INTO `EventGames` VALUES (1, 1);
INSERT INTO `EventGames` VALUES (2, 2);

INSERT INTO `Player` VALUES (1, 'jason', NULL, NULL);
INSERT INTO `Player` VALUES (2, 'john', 'john', 'password');
INSERT INTO `Player` VALUES (3, 'alyssa', NULL, NULL);
INSERT INTO `Player` VALUES (4, 'colin', NULL, NULL);

INSERT INTO `PlayedIn` VALUES (1, 1, 1500, TRUE);
INSERT INTO `PlayedIn` VALUES (2, 1, 1700, FALSE);
INSERT INTO `PlayedIn` VALUES (3, 2, 1800, TRUE);
INSERT INTO `PlayedIn` VALUES (4, 2, 1900, FALSE);

INSERT INTO `UserFavorited` VALUES (1, 2);