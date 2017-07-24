INSERT INTO properties(title, address, price)
VALUES
('Flat one', 'Ilfa i Petrova street, 60, 50', 200),
('Flat two', 'Architektorsaya street, 24, 30', 250),
('Flat three', 'Korolyova street, 12, 5', 180),
('Flat four', 'Derivasovskaya street, 1, 3', 300),
('Flat five', 'Gavannaya street, 4, 6', 280);
INSERT INTO bookings(property_id, firstDate, lastDate, clientName, clientPhone)
VALUES
(1, 1512856800000, 1513288800000, 'John', '1234567890'),
(1, 1508187600000, 1508706000000, 'Acton', '4817301748'),
(1, 1529614800000, 1529960400000, 'Albony', '8461738109'),
(2, 1504213200000, 1504558800000, 'Ackerley', '0572849123'),
(2, 1508878800000, 1509832800000, 'Adamaris', '8461927382'),
(2, 1526763600000, 1528578000000, 'Alcott', '5467384921'),
(3, 1509746400000, 1510178400000, 'Addison', '5192038273'),
(3, 1512511200000, 1523739600000, 'Adney', '1436192832'),
(3, 1529010000000, 1533848400000, 'Alden', '7491837412'),
(3, 1531602000000, 1532898000000, 'Alger', '6192372182'),
(4, 1521324000000, 1521756000000, 'Adolf', '8371928341'),
(4, 1524862800000, 1525554000000, 'Aethelred', '7384657282'),
(5, 1521928800000, 1525467600000, 'Aiken', '7461929341'),
(5, 1527368400000, 1527541200000, 'Ainsley', '1827491834');
INSERT INTO photos(property_id, url)
VALUES
((SELECT _id FROM properties WHERE title = 'Flat one'), 'http://lorempixel.com/400/400/city/1'),
((SELECT _id FROM properties WHERE title = 'Flat two'), 'http://lorempixel.com/400/400/city/2'),
((SELECT _id FROM properties WHERE title = 'Flat three'), 'http://lorempixel.com/400/400/city/3'),
((SELECT _id FROM properties WHERE title = 'Flat four'), 'http://lorempixel.com/400/400/city/4'),
((SELECT _id FROM properties WHERE title = 'Flat five'), 'http://lorempixel.com/400/400/city/5');