
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  RotateCcw, 
  RefreshCw, 
  FastForward,
  Sparkles
} from 'lucide-react';

interface ControlsProps {
  onNewGame: () => void;
  onAutoComplete: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onNewGame,
  onAutoComplete,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) => {
  const handleNewGame = () => {
    onNewGame();
    toast('New game started');
  };

  const handleAutoComplete = () => {
    onAutoComplete();
    toast('Auto-completing game');
  };

  const handleShowHint = () => {
    toast('Loading hint video...');
    onRedo();
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button 
        variant="outline"
        className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/20"
        onClick={handleNewGame}
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        New Game
      </Button>
      
      <Button 
        variant="outline"
        className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/20"
        onClick={handleAutoComplete}
      >
        <FastForward className="mr-2 h-4 w-4" />
        Auto Complete
      </Button>
      
      <Button 
        variant="outline"
        className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/20"
        onClick={onUndo}
        disabled={!canUndo}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Undo
      </Button>
      
      <Button 
        variant="outline"
        className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/20"
        onClick={handleShowHint}
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Get Hint
      </Button>
    </div>
  );
};

export default Controls;
