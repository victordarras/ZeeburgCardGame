let DECK = shuffle([
  { family: 'HEART', level: 'K' },
  { family: 'HEART', level: 'Q' },
  { family: 'HEART', level: 'C' },
  { family: 'HEART', level: 'J' },
  { family: 'HEART', level: '1' },
  { family: 'HEART', level: '2' },
  { family: 'HEART', level: '3' },
  { family: 'HEART', level: '4' },
  { family: 'HEART', level: '5' },
  { family: 'HEART', level: '6' },
  { family: 'HEART', level: '7' },
  { family: 'HEART', level: '8' },
  { family: 'HEART', level: '9' },
  { family: 'HEART', level: '10' },
  //
  { family: 'SPADE', level: 'K' },
  { family: 'SPADE', level: 'Q' },
  { family: 'SPADE', level: 'C' },
  { family: 'SPADE', level: 'J' },
  { family: 'SPADE', level: '1' },
  { family: 'SPADE', level: '2' },
  { family: 'SPADE', level: '3' },
  { family: 'SPADE', level: '4' },
  { family: 'SPADE', level: '5' },
  { family: 'SPADE', level: '6' },
  { family: 'SPADE', level: '7' },
  { family: 'SPADE', level: '8' },
  { family: 'SPADE', level: '9' },
  { family: 'SPADE', level: '10' },
  //
  { family: 'CLUB', level: 'K' },
  { family: 'CLUB', level: 'Q' },
  { family: 'CLUB', level: 'C' },
  { family: 'CLUB', level: 'J' },
  { family: 'CLUB', level: '1' },
  { family: 'CLUB', level: '2' },
  { family: 'CLUB', level: '3' },
  { family: 'CLUB', level: '4' },
  { family: 'CLUB', level: '5' },
  { family: 'CLUB', level: '6' },
  { family: 'CLUB', level: '7' },
  { family: 'CLUB', level: '8' },
  { family: 'CLUB', level: '9' },
  { family: 'CLUB', level: '10' },
  //
  { family: 'DIAMOND', level: 'K' },
  { family: 'DIAMOND', level: 'Q' },
  { family: 'DIAMOND', level: 'C' },
  { family: 'DIAMOND', level: 'J' },
  { family: 'DIAMOND', level: '1' },
  { family: 'DIAMOND', level: '2' },
  { family: 'DIAMOND', level: '3' },
  { family: 'DIAMOND', level: '4' },
  { family: 'DIAMOND', level: '5' },
  { family: 'DIAMOND', level: '6' },
  { family: 'DIAMOND', level: '7' },
  { family: 'DIAMOND', level: '8' },
  { family: 'DIAMOND', level: '9' },
  { family: 'DIAMOND', level: '10' }
]);

let MOBS = shuffle([
  { name: "Le Monde", level: 21 },
  { name: "L'Ange'", level: 20 },
  { name: "Le Soleil",level: 19 },
  { name: "La Lune",level: 18 },
  { name: "L'Étoile", level: 17 },
  { name: "La Tour",level: 16 },
  { name: "Le Diable",level: 15 },
  { name: "La Tempérance", level: 14 },
  { name: "La Mort",level: 13 },
  { name: "Le Pendu", level: 12 },
  { name: "La Force", level: 11 },
  { name: "La Roue de Fortune", level: 10 },
  { name: "L'Ermite", level: 9 },
  { name: "La Justice", level: 8 },
  { name: "Le Chariot", level: 7 },
  { name: "Les Amants", level: 6 },
  { name: "Le Pape",level: 5 },
  { name: "L'Empereur", level: 4 },
  { name: "L'Impératrice",level: 3 },
  { name: "La Papesse", level: 2 },
  { name: "Le Bateleur", level: 1 },
  { name: "Le Fou", level: 31 }
])

function shuffle(cards) {
  const newDeck = [];
  while (cards.length > 0) {
    let ran = Math.floor(Math.random() * cards.length);
    newDeck.push( cards.splice(ran, 1)[0] )
  }
  return newDeck;
}

export default { MOBS , DECK }
