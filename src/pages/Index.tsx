
import React from 'react';
import GameBoard from '@/components/game/GameBoard';
import { Toaster } from 'sonner';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#1D4E3D] to-[#0F2E20] p-4 md:p-8">
      <Toaster position="top-center" expand={false} richColors />
      
      <header className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-light text-white mb-2">Solitaire</h1>
        <p className="text-white/70 text-sm md:text-base">A minimalist card game experience</p>
      </header>
      
      <main className="w-full max-w-5xl flex-1 flex flex-col items-center">
        <div className="w-full mb-6">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">About Solitaire</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Solitaire, also known as Klondike, is one of the most popular single-player card games in the world. 
                The objective is to move all cards to the foundation piles, arranged by suit from Ace to King.
              </p>
              <p>
                This version features a clean, minimalist design that focuses on smooth gameplay and intuitive controls.
                Enjoy the classic game with modern touches like undo/redo functionality and auto-complete.
              </p>
            </CardContent>
          </Card>
          
          <Collapsible className="w-full mb-4">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border-white/10">
                How To Play
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white/5 backdrop-blur-md p-4 mt-1 rounded-md border border-white/10 text-white">
              <h3 className="font-medium mb-2">Game Rules:</h3>
              <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
                <li>Build tableau piles in descending order with alternating colors (red and black)</li>
                <li>Build foundation piles in ascending order by suit, starting with Aces</li>
                <li>Only Kings can be placed on empty tableau spots</li>
                <li>Click the deck to draw cards when you run out of moves</li>
                <li>The game is won when all cards are moved to the foundation piles</li>
              </ul>
              <h3 className="font-medium mb-2">Controls:</h3>
              <ul className="list-disc pl-5 text-sm">
                <li>Drag cards to move them between piles</li>
                <li>Click on stock pile to draw new cards</li>
                <li>Use the auto-complete button when endgame is clear</li>
                <li>Undo moves if you make a mistake</li>
                <li>Click 'Get Hint' if you're stuck (may show an ad)</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible className="w-full mb-6">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border-white/10">
                Tips & Strategy
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white/5 backdrop-blur-md p-4 mt-1 rounded-md border border-white/10 text-white">
              <h3 className="font-medium mb-2">Winning Strategies:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Always try to expose hidden cards in the tableau first</li>
                <li>Create empty tableau spots (only Kings can be placed here)</li>
                <li>Move cards to the foundation piles only when it won't block other moves</li>
                <li>Think several moves ahead before making decisions</li>
                <li>Use undo feature to test different strategies</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        <div className="w-full overflow-hidden rounded-xl shadow-2xl">
          <GameBoard />
        </div>
      </main>
      
      <footer className="w-full max-w-5xl mt-8 text-white/50 text-sm">
        <Separator className="mb-4 bg-white/10" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>Drag cards to move them. Click the deck to draw a card.</p>
          <p className="mt-2 md:mt-0">© {new Date().getFullYear()} Solitaire - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
