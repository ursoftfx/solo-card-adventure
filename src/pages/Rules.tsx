
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';

const Rules = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#1D4E3D] to-[#0F2E20] p-4 md:p-8">
      <header className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-light text-white mb-2">Solitaire Rules</h1>
        <p className="text-white/70 text-sm md:text-base">Complete guide to playing Klondike Solitaire</p>
      </header>
      
      <main className="w-full max-w-5xl flex-1">
        <Button variant="outline" asChild className="mb-4 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border-white/10">
          <Link to="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Game
          </Link>
        </Button>
        
        <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white mb-6">
          <CardHeader>
            <CardTitle>Basic Rules of Klondike Solitaire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Klondike Solitaire is played with a standard 52-card deck. The objective is to build four foundation piles, one for each suit, starting with the Ace and building up to the King.
            </p>
            
            <h3 className="text-xl font-medium mt-4">Setup</h3>
            <p>
              The game begins with seven tableau piles. The first pile has one card, the second has two cards, and so on, with each pile having one more card than the previous. The top card of each pile is face-up, while all other cards are face-down. The remaining cards form the stock pile.
            </p>
            
            <h3 className="text-xl font-medium mt-4">Basic Moves</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cards in the tableau can be moved if they create a descending sequence with alternating colors (red and black).</li>
              <li>Only Kings can be placed on empty tableau spots.</li>
              <li>Cards can be moved from the tableau to the foundation piles in ascending order (A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K) by suit.</li>
              <li>You can draw cards from the stock pile when you have no moves available.</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-4">Stock and Waste Piles</h3>
            <p>
              When you click on the stock pile, either one or three cards (depending on the variation) are drawn and placed in the waste pile. The top card of the waste pile is available for play. When the stock pile is empty, the waste pile can be reused as the stock pile, usually for a limited number of times.
            </p>
            
            <h3 className="text-xl font-medium mt-4">Foundation Piles</h3>
            <p>
              The four foundation piles are built up by suit from Ace to King. All cards must be moved to the foundation piles to win the game. Cards in the foundation piles are no longer in play.
            </p>
            
            <h3 className="text-xl font-medium mt-4">Winning the Game</h3>
            <p>
              The game is won when all 52 cards have been moved to the foundation piles. If no more moves are possible and cards remain outside the foundation piles, the game is lost.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white mb-6">
          <CardHeader>
            <CardTitle>Advanced Rules and Variations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-medium">Variations of Solitaire</h3>
            <p>
              While Klondike is the most popular form of Solitaire, there are many variations with different rules:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-medium mb-2">Vegas Solitaire</h4>
                <p className="text-sm">
                  A variation where you bet $52 at the start and win $5 for each card moved to the foundation. Cards are dealt three at a time from the stock, and the stock can only be gone through once.
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-medium mb-2">Spider Solitaire</h4>
                <p className="text-sm">
                  Played with two decks of cards. The goal is to build eight sequences of cards from King to Ace in the same suit.
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-medium mb-2">FreeCell</h4>
                <p className="text-sm">
                  All cards are dealt face-up at the beginning. Four free cells are used as temporary storage for cards. Almost all games are solvable with perfect play.
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-medium mb-2">Pyramid</h4>
                <p className="text-sm">
                  Cards are dealt in the shape of a pyramid. The goal is to remove pairs of cards that add up to 13.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-6">Scoring Systems</h3>
            <p>
              Different Solitaire implementations use various scoring systems:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Standard:</strong> 10 points for each card moved to the foundation, plus bonus points for speed.</li>
              <li><strong>Timed:</strong> Points are deducted as time passes, encouraging quick gameplay.</li>
              <li><strong>Vegas:</strong> Based on money won or lost according to cards moved to the foundation.</li>
              <li><strong>Streak:</strong> Bonus points for consecutive successful moves without drawing from the stock.</li>
            </ul>
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

export default Rules;
