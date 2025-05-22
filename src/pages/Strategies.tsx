
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Strategies = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#1D4E3D] to-[#0F2E20] p-4 md:p-8">
      <header className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-light text-white mb-2">Winning Strategies</h1>
        <p className="text-white/70 text-sm md:text-base">Master Solitaire with expert tips and tactics</p>
      </header>
      
      <main className="w-full max-w-5xl flex-1">
        <Button variant="outline" asChild className="mb-4 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border-white/10">
          <Link to="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Game
          </Link>
        </Button>
        
        <Alert className="mb-6 bg-amber-500/20 text-amber-200 border-amber-500/40">
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Not every Solitaire game is winnable! Even with perfect play, approximately 15-20% of deals are impossible to solve.
          </AlertDescription>
        </Alert>
        
        <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white mb-6">
          <CardHeader>
            <CardTitle>Essential Strategies for Beginners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Prioritize Exposing Hidden Cards</h3>
                <p className="text-sm">
                  Always focus on revealing face-down cards in the tableau. Each revealed card increases your options and brings you closer to winning. Only move cards to the foundation piles when doing so won't prevent you from exposing hidden cards.
                </p>
                
                <h3 className="text-xl font-medium mt-4 mb-3">Create Empty Columns</h3>
                <p className="text-sm">
                  Empty columns are extremely valuable as they allow you to temporarily store Kings and build new sequences. Try to clear entire columns whenever possible, but only if it helps your overall strategy.
                </p>
                
                <h3 className="text-xl font-medium mt-4 mb-3">Foundation Piles Strategy</h3>
                <p className="text-sm">
                  Be strategic about moving cards to the foundation piles. Aces and twos can usually be moved safely, but higher cards might be needed in the tableau to build sequences. Don't rush to move all cards to the foundations.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">Keep Color Patterns in Mind</h3>
                <p className="text-sm">
                  Remember the alternating color pattern (red-black-red-black) when planning your moves. Sometimes it's better to keep a card in the waste pile if moving it would block future moves due to color constraints.
                </p>
                
                <h3 className="text-xl font-medium mt-4 mb-3">Look Ahead</h3>
                <p className="text-sm">
                  Try to think several moves ahead. Consider what cards you need and how your current move will affect future possibilities. Sometimes the obvious move is not the best one.
                </p>
                
                <h3 className="text-xl font-medium mt-4 mb-3">Use the Undo Feature</h3>
                <p className="text-sm">
                  Don't hesitate to use the undo feature to test different strategies. This is especially useful when you're faced with multiple possible moves and aren't sure which one is best.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white mb-6">
          <CardHeader>
            <CardTitle>Advanced Techniques</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-medium mb-4">The Seven Freecell Method</h3>
            <p className="mb-4">
              This technique, borrowed from FreeCell, involves creating a mental map of where each card could potentially go. By tracking the position and accessibility of each card, expert players can achieve win rates of up to 80-90%.
            </p>
            
            <div className="bg-white/10 p-4 rounded-md mb-6">
              <h4 className="font-medium mb-2">Card Counting in Solitaire</h4>
              <p className="text-sm">
                Keep track of which cards have been seen and which remain in the deck. This helps you make informed decisions about which tableau piles to develop and when to draw from the stock.
              </p>
            </div>
            
            <h3 className="text-xl font-medium mb-4">Tableau Management Strategies</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-medium mb-2">The Empty Column Dance</h4>
                <p className="text-sm">
                  When you have an empty column, use it strategically as a temporary workspace to rearrange cards. This technique allows you to break up and reorganize sequences to access buried cards.
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-medium mb-2">Foundation Balance</h4>
                <p className="text-sm">
                  Try to build foundation piles at roughly the same rate. Advancing one suit too quickly can limit your options later in the game when you need those cards for your tableau.
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-medium mb-2">Stock Pile Management</h4>
                <p className="text-sm">
                  If you can cycle through the stock pile multiple times, be mindful of which cards you pass up. Sometimes it's better to wait for a more strategic moment to play a card.
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-medium mb-2">Kings as Anchors</h4>
                <p className="text-sm">
                  Be careful about which Kings you choose to play. A King with few or no cards that can be built upon it might be better left in the waste pile until you have more options.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <footer className="w-full max-w-5xl mt-8 text-white/50 text-sm">
        <Separator className="mb-4 bg-white/10" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/rules" className="hover:text-white transition-colors">Rules</Link>
            <Link to="/strategies" className="hover:text-white transition-colors">Strategies</Link>
            <Link to="/history" className="hover:text-white transition-colors">History</Link>
          </div>
          <p>© {new Date().getFullYear()} Solitaire - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Strategies;
