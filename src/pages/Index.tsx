
import React from 'react';
import GameBoard from '@/components/game/GameBoard';
import { Toaster } from 'sonner';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#1D4E3D] to-[#0F2E20] p-4 md:p-8">
      <Toaster position="top-center" expand={false} richColors />
      
      <header className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-light text-white mb-2">Solitaire</h1>
        <p className="text-white/70 text-sm md:text-base">A minimalist card game experience</p>
      </header>
      
      <main className="w-full max-w-5xl flex-1 flex flex-col items-center">
        {/* Game Section - Moved to top of content */}
        <div className="w-full overflow-hidden rounded-xl shadow-2xl mb-8">
          <GameBoard />
        </div>
        
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
          
          <Tabs defaultValue="how-to-play" className="w-full mb-4">
            <TabsList className="grid grid-cols-3 mb-2 bg-white/5 backdrop-blur-md text-white border-white/10">
              <TabsTrigger value="how-to-play">How To Play</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="how-to-play" className="bg-white/5 backdrop-blur-md p-4 rounded-md border border-white/10 text-white">
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
            </TabsContent>
            
            <TabsContent value="strategy" className="bg-white/5 backdrop-blur-md p-4 rounded-md border border-white/10 text-white">
              <h3 className="font-medium mb-2">Winning Strategies:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Always try to expose hidden cards in the tableau first</li>
                <li>Create empty tableau spots (only Kings can be placed here)</li>
                <li>Move cards to the foundation piles only when it won't block other moves</li>
                <li>Think several moves ahead before making decisions</li>
                <li>Use undo feature to test different strategies</li>
              </ul>
              <p className="mt-3">Patience is key when playing Solitaire. Not all games are winnable, but proper strategy greatly increases your chances of success. Studies suggest that approximately 80% of Solitaire games can be won with optimal play.</p>
            </TabsContent>
            
            <TabsContent value="history" className="bg-white/5 backdrop-blur-md p-4 rounded-md border border-white/10 text-white">
              <h3 className="font-medium mb-2">Origins of Solitaire:</h3>
              <p className="mb-3">
                Solitaire has a rich history dating back to the late 18th century in Northern Europe, particularly in Baltic and Scandinavian regions. The game gained popularity in France during Napoleon's era, where it was reportedly played by the emperor during his exile.
              </p>
              <p className="mb-3">
                The name "Solitaire" comes from the French word meaning "solitary" or "alone." In the United Kingdom, the game is often called "Patience," reflecting the temperament needed to play successfully.
              </p>
              <p>
                Solitaire reached unprecedented popularity in the digital age when Microsoft included it with Windows 3.0 in 1990. This digital version introduced the game to millions worldwide and helped establish it as one of the most recognized card games in history.
              </p>
            </TabsContent>
          </Tabs>
          
          <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Benefits of Playing Solitaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Mental Benefits:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Improves concentration and focus</li>
                    <li>Enhances pattern recognition skills</li>
                    <li>Helps practice strategic thinking</li>
                    <li>Provides stress relief and relaxation</li>
                    <li>Exercises short-term memory</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Accessibility:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Playable anytime, anywhere</li>
                    <li>No opponents needed</li>
                    <li>Simple rules but deep gameplay</li>
                    <li>Suitable for all age groups</li>
                    <li>Adjustable difficulty levels</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
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
        
        <div className="w-full mt-8">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Is every Solitaire game winnable?</h3>
                  <p className="text-sm text-white/80">No, not every deal is winnable. Studies suggest that approximately 80-90% of Solitaire games are theoretically winnable with optimal play, but some combinations are impossible to solve.</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">What's the difference between Solitaire and Klondike?</h3>
                  <p className="text-sm text-white/80">There is no difference. Klondike is the specific variant of Solitaire that most people are familiar with, featuring seven tableau piles and four foundation piles.</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Are there other Solitaire variants?</h3>
                  <p className="text-sm text-white/80">Yes, there are many Solitaire variants including FreeCell, Spider, Pyramid, Golf, Yukon, and dozens more. Each has its own rules and strategies.</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">What's the highest score possible?</h3>
                  <p className="text-sm text-white/80">In traditional scoring, the theoretical maximum score depends on how quickly you complete the game and how many cards you move directly to foundation piles.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="w-full max-w-5xl mt-8 text-white/50 text-sm">
        <Separator className="mb-4 bg-white/10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <h3 className="font-medium mb-2 text-white/70">About Our Solitaire</h3>
            <p className="text-xs">Our Solitaire game offers a classic card game experience with modern features. Enjoy smooth gameplay, undo functionality, and helpful hints to improve your skills.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-white/70">Related Card Games</h3>
            <ul className="text-xs space-y-1">
              <li>FreeCell - Strategic Solitaire variant</li>
              <li>Spider Solitaire - Multi-deck challenge</li>
              <li>Pyramid Solitaire - Matching pairs game</li>
              <li>Tri-Peaks - Fast-paced card removing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-white/70">Why Play Online?</h3>
            <ul className="text-xs space-y-1">
              <li>No setup or cleanup required</li>
              <li>Automatic card dealing and sorting</li>
              <li>Helpful features like undo and hints</li>
              <li>Play anywhere on any device</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>Drag cards to move them. Click the deck to draw a card.</p>
          <p className="mt-2 md:mt-0">© {new Date().getFullYear()} Solitaire - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
