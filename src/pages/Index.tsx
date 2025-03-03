
import React from 'react';
import GameBoard from '@/components/game/GameBoard';
import { Toaster } from 'sonner';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#1D4E3D] to-[#0F2E20] p-4 md:p-8">
      <Toaster position="top-center" expand={false} richColors />
      
      <header className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-light text-white mb-2">Solitaire</h1>
        <p className="text-white/70 text-sm md:text-base">A minimalist card game experience</p>
      </header>
      
      <main className="w-full max-w-5xl flex-1 flex flex-col items-center">
        <div className="w-full overflow-hidden rounded-xl shadow-2xl">
          <GameBoard />
        </div>
      </main>
      
      <footer className="mt-8 text-white/50 text-sm">
        <p>Drag cards to move them. Click the deck to draw a card.</p>
      </footer>
    </div>
  );
};

export default Index;
