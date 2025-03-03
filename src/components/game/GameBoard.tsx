import React, { useState, useEffect, useRef } from 'react';
import Pile from './Pile';
import Card from './Card';
import Controls from './Controls';
import Stats from './Stats';
import { 
  GameState,
  PileType,
  Card as CardType,
  initializeGame,
  drawCard,
  moveCard,
  canPlaceOnFoundation,
  canPlaceOnTableau,
  autoComplete
} from '@/lib/solitaire';
import { toast } from 'sonner';
import UnityAdsService from '@/services/UnityAdsService';

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [history, setHistory] = useState<GameState[]>([]);
  const [future, setFuture] = useState<GameState[]>([]);
  const [draggedCards, setDraggedCards] = useState<CardType[] | null>(null);
  const [dragSource, setDragSource] = useState<{ type: PileType; index: number } | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dropTarget, setDropTarget] = useState<{ type: PileType; index: number } | null>(null);
  const [isWinAnimationActive, setIsWinAnimationActive] = useState(false);
  const [gameCount, setGameCount] = useState(0);

  const boardRef = useRef<HTMLDivElement>(null);
  const adsService = useRef<UnityAdsService>(UnityAdsService.getInstance());

  useEffect(() => {
    newGame();
    
    const initAds = async () => {
      console.log('Initializing Unity Ads');
      await adsService.current.initialize();
    };
    
    initAds();
    
    return () => {
      adsService.current.cleanup();
    };
  }, []);

  useEffect(() => {
    if (draggedCards) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedCards]);

  useEffect(() => {
    if (gameState.isWon && !isWinAnimationActive) {
      setIsWinAnimationActive(true);
      toast.success('Congratulations! You won!', {
        duration: 5000,
      });
      
      setTimeout(() => {
        adsService.current.showInterstitial();
      }, 1500);
    }
  }, [gameState.isWon]);

  const newGame = () => {
    if (gameCount > 0) {
      adsService.current.showInterstitial(() => {
        console.log('New game started after ad');
        startNewGame();
      });
    } else {
      startNewGame();
      setGameCount(prev => prev + 1);
    }
  };
  
  const startNewGame = () => {
    const initialState = initializeGame();
    setGameState(initialState);
    setHistory([]);
    setFuture([]);
    setDraggedCards(null);
    setDragSource(null);
    setDropTarget(null);
    setIsWinAnimationActive(false);
  };

  const saveToHistory = (state: GameState) => {
    setHistory(prev => [...prev, gameState]);
    setFuture([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    
    const previousState = history[history.length - 1];
    setFuture(prev => [gameState, ...prev]);
    setGameState(previousState);
    setHistory(prev => prev.slice(0, prev.length - 1));
  };

  const redo = () => {
    if (future.length === 0) {
      adsService.current.showRewardedAd(
        () => {
          toast.success('Here\'s a hint: Look for cards you can move to the foundation piles');
        },
        () => {
          toast.error('Watch the full ad to get a hint');
        }
      );
      return;
    }
    
    const nextState = future[0];
    setHistory(prev => [...prev, gameState]);
    setGameState(nextState);
    setFuture(prev => prev.slice(1));
  };

  const handleCardClick = (card: CardType) => {
    if (gameState.stock.length > 0 && gameState.stock[gameState.stock.length - 1].id === card.id) {
      saveToHistory(gameState);
      setGameState(drawCard(gameState));
      return;
    }
    
    if (gameState.stock.length === 0 && gameState.waste.length > 0 && !card.id) {
      saveToHistory(gameState);
      setGameState(drawCard(gameState));
      return;
    }
    
    if (card.faceUp) {
      for (let i = 0; i < gameState.foundation.length; i++) {
        const foundationPile = gameState.foundation[i];
        if (canPlaceOnFoundation(card, foundationPile[foundationPile.length - 1])) {
          if (gameState.waste.length > 0 && gameState.waste[gameState.waste.length - 1].id === card.id) {
            saveToHistory(gameState);
            setGameState(moveCard(
              gameState,
              [card],
              { type: 'waste', index: 0 },
              { type: 'foundation', index: i }
            ));
            return;
          }
          
          for (let j = 0; j < gameState.tableau.length; j++) {
            const tableauPile = gameState.tableau[j];
            if (tableauPile.length > 0 && tableauPile[tableauPile.length - 1].id === card.id) {
              saveToHistory(gameState);
              setGameState(moveCard(
                gameState,
                [card],
                { type: 'tableau', index: j },
                { type: 'foundation', index: i }
              ));
              return;
            }
          }
        }
      }
    }
  };

  const handleCardDragStart = (
    cards: CardType[],
    sourceType: PileType,
    sourceIndex: number,
    clientX: number,
    clientY: number
  ) => {
    if (cards.length === 0) return;
    
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const cardElement = document.querySelector(`[data-card-id="${cards[0].id}"]`) as HTMLElement;
    if (!cardElement) return;
    
    const cardRect = cardElement.getBoundingClientRect();
    
    setDraggedCards(cards);
    setDragSource({ type: sourceType, index: sourceIndex });
    setDragPosition({ x: clientX, y: clientY });
    setDragOffset({
      x: clientX - cardRect.left,
      y: clientY - cardRect.top
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggedCards) return;
    
    setDragPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    if (!draggedCards || !dragSource) {
      setDraggedCards(null);
      setDragSource(null);
      setDropTarget(null);
      return;
    }
    
    if (dropTarget) {
      const topDraggedCard = draggedCards[0];
      const destinationType = dropTarget.type;
      const destinationIndex = dropTarget.index;
      
      let isValid = false;
      let destinationPile: CardType[] = [];
      
      if (destinationType === 'foundation') {
        destinationPile = gameState.foundation[destinationIndex];
        isValid = draggedCards.length === 1 && canPlaceOnFoundation(
          topDraggedCard,
          destinationPile.length > 0 ? destinationPile[destinationPile.length - 1] : undefined
        );
      } else if (destinationType === 'tableau') {
        destinationPile = gameState.tableau[destinationIndex];
        isValid = canPlaceOnTableau(
          topDraggedCard,
          destinationPile.length > 0 ? destinationPile[destinationPile.length - 1] : undefined
        );
      }
      
      if (isValid) {
        saveToHistory(gameState);
        setGameState(moveCard(
          gameState,
          draggedCards,
          dragSource,
          dropTarget
        ));
      }
    }
    
    setDraggedCards(null);
    setDragSource(null);
    setDropTarget(null);
  };

  const handleDropTargetHover = (type: PileType, index: number, isHovering: boolean) => {
    if (!draggedCards) return;
    
    if (isHovering) {
      setDropTarget({ type, index });
    } else if (dropTarget?.type === type && dropTarget.index === index) {
      setDropTarget(null);
    }
  };

  const handleAutoComplete = () => {
    saveToHistory(gameState);
    setGameState(autoComplete(gameState));
  };

  const renderDraggedCards = () => {
    if (!draggedCards) return null;
    
    const style: React.CSSProperties = {
      position: 'fixed',
      left: dragPosition.x - dragOffset.x,
      top: dragPosition.y - dragOffset.y,
      zIndex: 1000,
      pointerEvents: 'none'
    };
    
    return (
      <div style={style} className="dragged-cards-container">
        {draggedCards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            isDragging={true}
            style={{ top: index * 20 }}
            stackPosition={index}
            isStacked={true}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex justify-center">
        <Stats
          moves={gameState.moves}
          startTime={gameState.startTime}
          endTime={gameState.endTime}
          isWon={gameState.isWon}
        />
      </div>
      
      <div className="game-board" ref={boardRef}>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-7 gap-2">
            <div className="col-span-1">
              <Pile
                cards={gameState.stock}
                type="stock"
                index={0}
                onCardClick={handleCardClick}
              />
            </div>
            
            <div className="col-span-1">
              <Pile
                cards={gameState.waste}
                type="waste"
                index={0}
                onCardClick={handleCardClick}
                onCardDragStart={handleCardDragStart}
                isDropTarget={dropTarget?.type === 'waste' && dropTarget.index === 0}
              />
            </div>
            
            <div className="col-span-1" />
            
            {gameState.foundation.map((pile, index) => (
              <div key={`foundation-${index}`} className="col-span-1">
                <Pile
                  cards={pile}
                  type="foundation"
                  index={index}
                  onCardClick={handleCardClick}
                  onCardDragStart={handleCardDragStart}
                  isDropTarget={dropTarget?.type === 'foundation' && dropTarget.index === index}
                  onDropTargetHover={handleDropTargetHover}
                />
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {gameState.tableau.map((pile, index) => (
              <div key={`tableau-${index}`} className="col-span-1">
                <Pile
                  cards={pile}
                  type="tableau"
                  index={index}
                  onCardClick={handleCardClick}
                  onCardDragStart={handleCardDragStart}
                  isDropTarget={dropTarget?.type === 'tableau' && dropTarget.index === index}
                  onDropTargetHover={handleDropTargetHover}
                />
              </div>
            ))}
          </div>
        </div>
        
        {renderDraggedCards()}
      </div>
      
      <div className="flex justify-center">
        <Controls
          onNewGame={newGame}
          onAutoComplete={handleAutoComplete}
          onUndo={undo}
          onRedo={redo}
          canUndo={history.length > 0}
          canRedo={future.length > 0}
        />
      </div>
    </div>
  );
};

export default GameBoard;
