export type Suit = 'heart' | 'diamond' | 'club' | 'spade';
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
export type Color = 'red' | 'black';

export interface Card {
  id: string;
  suit: Suit;
  value: Value;
  faceUp: boolean;
  color: Color;
  order: number;
}

export type PileType = 'stock' | 'waste' | 'foundation' | 'tableau';

export interface GameState {
  stock: Card[];
  waste: Card[];
  foundation: Card[][];
  tableau: Card[][];
  draggedCards: Card[] | null;
  sourcePile: { type: PileType; index: number } | null;
  moves: number;
  startTime: number | null;
  endTime: number | null;
  isWon: boolean;
}

const SUITS: Suit[] = ['heart', 'diamond', 'club', 'spade'];
const VALUES: Value[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const VALUE_ORDER: Record<Value, number> = {
  'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
  '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
};

const getSuitColor = (suit: Suit): Color => {
  return suit === 'heart' || suit === 'diamond' ? 'red' : 'black';
};

export const createDeck = (): Card[] => {
  const deck: Card[] = [];

  SUITS.forEach(suit => {
    VALUES.forEach(value => {
      deck.push({
        id: `${suit}-${value}`,
        suit,
        value,
        faceUp: false,
        color: getSuitColor(suit),
        order: VALUE_ORDER[value]
      });
    });
  });

  return deck;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const initializeGame = (): GameState => {
  const deck = shuffleDeck(createDeck());
  const tableau: Card[][] = Array(7).fill(null).map(() => []);
  let currentDeck = [...deck];
  
  // Deal cards to tableau
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      const card = currentDeck.pop()!;
      if (i === j) {
        card.faceUp = true;
      }
      tableau[j].push(card);
    }
  }
  
  return {
    stock: currentDeck,
    waste: [],
    foundation: [[], [], [], []],
    tableau,
    draggedCards: null,
    sourcePile: null,
    moves: 0,
    startTime: Date.now(),
    endTime: null,
    isWon: false
  };
};

export const drawCard = (state: GameState): GameState => {
  if (state.stock.length === 0) {
    if (state.waste.length === 0) return state;
    
    // Reset stock from waste
    return {
      ...state,
      stock: [...state.waste].reverse().map(card => ({ ...card, faceUp: false })),
      waste: [],
      moves: state.moves + 1
    };
  }
  
  const newStock = [...state.stock];
  const card = newStock.pop()!;
  
  return {
    ...state,
    stock: newStock,
    waste: [...state.waste, { ...card, faceUp: true }],
    moves: state.moves + 1
  };
};

export const canPlaceOnFoundation = (card: Card, topCard: Card | undefined): boolean => {
  if (!card.faceUp) return false;
  
  // Empty foundation pile can only receive an Ace
  if (!topCard) return card.value === 'A';
  
  // Cards must be same suit and in ascending order
  return (
    topCard.suit === card.suit && 
    VALUE_ORDER[card.value] === VALUE_ORDER[topCard.value] + 1
  );
};

export const canPlaceOnTableau = (card: Card, topCard: Card | undefined): boolean => {
  if (!card.faceUp) return false;
  
  // Empty tableau pile can only receive a King
  if (!topCard) return card.value === 'K';
  
  // Cards must be alternating colors and in descending order
  return (
    topCard.faceUp &&
    topCard.color !== card.color && 
    VALUE_ORDER[card.value] === VALUE_ORDER[topCard.value] - 1
  );
};

export const moveCard = (
  state: GameState,
  cards: Card[],
  source: { type: PileType; index: number },
  destination: { type: PileType; index: number }
): GameState => {
  if (cards.length === 0) return state;
  
  const newState = {
    ...state,
    stock: [...state.stock],
    waste: [...state.waste],
    foundation: state.foundation.map(pile => [...pile]),
    tableau: state.tableau.map(pile => [...pile]),
    moves: state.moves + 1
  };
  
  // Remove cards from source pile
  if (source.type === 'waste') {
    newState.waste.pop();
  } else if (source.type === 'foundation') {
    newState.foundation[source.index].pop();
  } else if (source.type === 'tableau') {
    const sourceIndex = newState.tableau[source.index].findIndex(c => c.id === cards[0].id);
    newState.tableau[source.index].splice(sourceIndex);
    
    // Flip the new top card if needed
    if (newState.tableau[source.index].length > 0 && !newState.tableau[source.index][newState.tableau[source.index].length - 1].faceUp) {
      newState.tableau[source.index][newState.tableau[source.index].length - 1].faceUp = true;
    }
  }
  
  // Add cards to destination pile
  if (destination.type === 'foundation') {
    newState.foundation[destination.index].push(cards[0]);
  } else if (destination.type === 'tableau') {
    newState.tableau[destination.index] = [...newState.tableau[destination.index], ...cards];
  }
  
  // Check if game is won
  newState.isWon = checkWinCondition(newState);
  if (newState.isWon && !newState.endTime) {
    newState.endTime = Date.now();
  }
  
  return newState;
};

export const checkWinCondition = (state: GameState): boolean => {
  // Game is won when all foundation piles have 13 cards (A through K of one suit)
  return state.foundation.every(pile => pile.length === 13);
};

export const autoComplete = (state: GameState): GameState => {
  let currentState = { ...state };
  let madeMove = true;
  
  // Keep making moves until no more moves are possible
  while (madeMove) {
    madeMove = false;
    
    // Try to move from tableau to foundation
    for (let i = 0; i < currentState.tableau.length; i++) {
      const tableauPile = currentState.tableau[i];
      if (tableauPile.length === 0) continue;
      
      const topCard = tableauPile[tableauPile.length - 1];
      if (!topCard.faceUp) continue;
      
      for (let j = 0; j < currentState.foundation.length; j++) {
        const foundationPile = currentState.foundation[j];
        
        if (canPlaceOnFoundation(topCard, foundationPile[foundationPile.length - 1])) {
          currentState = moveCard(
            currentState,
            [topCard],
            { type: 'tableau', index: i },
            { type: 'foundation', index: j }
          );
          madeMove = true;
          break;
        }
      }
      
      if (madeMove) break;
    }
    
    // Try to move from waste to foundation
    if (!madeMove && currentState.waste.length > 0) {
      const wasteCard = currentState.waste[currentState.waste.length - 1];
      
      for (let j = 0; j < currentState.foundation.length; j++) {
        const foundationPile = currentState.foundation[j];
        
        if (canPlaceOnFoundation(wasteCard, foundationPile[foundationPile.length - 1])) {
          currentState = moveCard(
            currentState,
            [wasteCard],
            { type: 'waste', index: 0 },
            { type: 'foundation', index: j }
          );
          madeMove = true;
          break;
        }
      }
    }
  }
  
  // Check if game is won after auto-completing
  currentState.isWon = checkWinCondition(currentState);
  if (currentState.isWon && !currentState.endTime) {
    currentState.endTime = Date.now();
  }
  
  return currentState;
};
