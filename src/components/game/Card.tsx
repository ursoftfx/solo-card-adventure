
import React from 'react';
import { Card as CardType } from '@/lib/solitaire';

interface CardProps {
  card: CardType;
  index?: number;
  style?: React.CSSProperties;
  isDragging?: boolean;
  onClick?: (card: CardType) => void;
  onDragStart?: (card: CardType, clientX: number, clientY: number) => void;
  stackPosition?: number;
  isStacked?: boolean;
}

const suitSymbols: Record<string, string> = {
  'heart': '♥',
  'diamond': '♦',
  'club': '♣',
  'spade': '♠'
};

const Card: React.FC<CardProps> = ({
  card,
  index = 0,
  style = {},
  isDragging = false,
  onClick,
  onDragStart,
  stackPosition = 0,
  isStacked = false
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (card.faceUp && onDragStart) {
      onDragStart(card, e.clientX, e.clientY);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(card);
    }
  };

  const stackOffset = isStacked ? stackPosition * 20 : 0;
  
  const cardStyle: React.CSSProperties = {
    ...style,
    top: stackOffset,
    zIndex: index,
    position: isStacked ? 'absolute' : 'relative',
  };

  return (
    <div 
      className={`playing-card ${card.faceUp ? 'faceUp' : 'faceDown'} ${isDragging ? 'card-dragging' : ''}`}
      style={cardStyle}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      data-card-id={card.id}
    >
      <div className="playing-card-inner">
        {card.faceUp ? (
          <div className={`playing-card-front bg-white border border-gray-200 ${isDragging ? 'shadow-lg' : ''}`}>
            <div className={`flex justify-between px-1`}>
              <div className={`card-value-corner card-suit-${card.suit}`}>
                {card.value}
              </div>
              <div className={`card-suit-corner card-suit-${card.suit}`}>
                {suitSymbols[card.suit]}
              </div>
            </div>
            
            <div className={`flex justify-center items-center text-2xl card-suit-${card.suit}`}>
              {suitSymbols[card.suit]}
            </div>
            
            <div className={`flex justify-between px-1 rotate-180`}>
              <div className={`card-value-corner card-suit-${card.suit}`}>
                {card.value}
              </div>
              <div className={`card-suit-corner card-suit-${card.suit}`}>
                {suitSymbols[card.suit]}
              </div>
            </div>
          </div>
        ) : (
          <div className="playing-card-back" />
        )}
      </div>
    </div>
  );
};

export default Card;
