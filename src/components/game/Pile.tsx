
import React from 'react';
import Card from './Card';
import { Card as CardType, PileType } from '@/lib/solitaire';

interface PileProps {
  cards: CardType[];
  type: PileType;
  index: number;
  onCardClick?: (card: CardType) => void;
  onCardDragStart?: (cards: CardType[], sourceType: PileType, sourceIndex: number, clientX: number, clientY: number) => void;
  isDropTarget?: boolean;
  onDropTargetHover?: (type: PileType, index: number, isHovering: boolean) => void;
}

const Pile: React.FC<PileProps> = ({
  cards,
  type,
  index,
  onCardClick,
  onCardDragStart,
  isDropTarget,
  onDropTargetHover
}) => {
  const handleCardClick = (card: CardType) => {
    if (onCardClick) {
      onCardClick(card);
    }
  };

  const handleCardDragStart = (card: CardType, clientX: number, clientY: number) => {
    if (!onCardDragStart) return;
    
    if (type === 'waste' || type === 'foundation') {
      // For waste and foundation, only drag the top card
      if (cards.length > 0 && cards[cards.length - 1].id === card.id) {
        onCardDragStart([card], type, index, clientX, clientY);
      }
    } else if (type === 'tableau') {
      // For tableau piles, drag the card and all cards on top of it
      const cardIndex = cards.findIndex(c => c.id === card.id);
      if (cardIndex >= 0 && cards[cardIndex].faceUp) {
        const draggedCards = cards.slice(cardIndex);
        onCardDragStart(draggedCards, type, index, clientX, clientY);
      }
    }
  };

  const handleMouseEnter = () => {
    if (onDropTargetHover) {
      onDropTargetHover(type, index, true);
    }
  };

  const handleMouseLeave = () => {
    if (onDropTargetHover) {
      onDropTargetHover(type, index, false);
    }
  };

  let pileClassName = 'solitaire-pile';
  
  if (type === 'foundation') {
    pileClassName += ' solitaire-foundation-pile';
  } else if (type === 'tableau') {
    pileClassName += ' solitaire-tableau-pile';
  } else if (type === 'waste') {
    pileClassName += ' solitaire-waste-pile';
  } else if (type === 'stock') {
    pileClassName += ' solitaire-stock-pile';
  }
  
  if (isDropTarget) {
    pileClassName += ' solitaire-droppable-highlight';
  }

  return (
    <div 
      className={pileClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-pile-type={type}
      data-pile-index={index}
    >
      {type === 'tableau' ? (
        <div className="relative pt-5">
          {cards.map((card, idx) => (
            <Card
              key={card.id}
              card={card}
              index={idx + 1}
              onClick={handleCardClick}
              onDragStart={handleCardDragStart}
              stackPosition={idx}
              isStacked={true}
            />
          ))}
        </div>
      ) : (
        <>
          {cards.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              {type === 'foundation' && (
                <div className="text-white/20 text-4xl">A</div>
              )}
              {type === 'stock' && cards.length === 0 && (
                <div className="text-white/20 text-4xl" onClick={() => handleCardClick({} as CardType)}>↻</div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              {type === 'waste' && (
                <Card
                  card={cards[cards.length - 1]}
                  index={cards.length}
                  onClick={handleCardClick}
                  onDragStart={handleCardDragStart}
                />
              )}
              {type === 'foundation' && (
                <Card
                  card={cards[cards.length - 1]}
                  index={cards.length}
                  onClick={handleCardClick}
                  onDragStart={handleCardDragStart}
                />
              )}
              {type === 'stock' && (
                <Card
                  card={cards[cards.length - 1]}
                  index={cards.length}
                  onClick={handleCardClick}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Pile;
