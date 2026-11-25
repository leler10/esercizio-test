INSERT INTO palchi (id, nome, zona) VALUES
  (1, 'Main Stage',        'Piazza Centrale'),
  (2, 'Arena Elettronica', 'Parco Nord'),
  (3, 'Palco Acustico',    'Giardini'),
  (4, 'Underground Club',  'Ex Mattatoio');

INSERT INTO esibizioni (id, artista, genere, slot, palco_id) VALUES
  (1, 'The Rockers',   'rock',        3, 1),
  (2, 'I Pinguini',    'pop',         1, 1),
  (3, 'Nuova Onda',    'indie',       2, 1),
  (4, 'DJ Matrix',     'elettronica', 1, 2),
  (5, 'Synth Wave',    'elettronica', 4, 2),
  (6, 'Solo Chitarra', 'indie',       2, 3);
