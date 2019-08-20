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
  { name: "le Monde", level: 21 },
  { name: "le Soleil",level: 19 },
  { name: "la Lune",level: 18 },
  { name: "l'Étoile", level: 17 },
  { name: "la Tour",level: 16 },
  { name: "le Diable",level: 15 },
  { name: "Tempérance", level: 14 },
  { name: "la Mort",level: 13 },
  { name: "le Pendu", level: 12 },
  { name: "La Force", level: 11 },
  { name: "la Roue de Fortune", level: 10 },
  { name: "l'Ermite", level: 9 },
  { name: "la Justice", level: 8 },
  { name: "le Chariot", level: 7 },
  { name: "les Amants", level: 6 },
  { name: "le Pape",level: 5 },
  { name: "l'Empereur", level: 4 },
  { name: "l'Impératrice",level: 3 },
  { name: "la Papesse", level: 2 },
  { name: "et le Bateleur", level: 1 },
  { name: "le Fou", level: 31 }
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
