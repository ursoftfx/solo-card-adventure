
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { Timeline, TimelineItem, TimelineIcon, TimelineContent } from '@/components/Timeline';

const History = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#1D4E3D] to-[#0F2E20] p-4 md:p-8">
      <header className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-light text-white mb-2">The History of Solitaire</h1>
        <p className="text-white/70 text-sm md:text-base">From royal courts to digital screens</p>
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
            <CardTitle>Origins and Early History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Solitaire, also known as "Patience" in many parts of Europe, has a rich history dating back to the 18th century. The game's exact origins are somewhat mysterious, but historical evidence suggests it emerged in the Baltic region of Northern Europe.
            </p>
            
            <div className="my-6">
              <Timeline>
                <TimelineItem>
                  <TimelineIcon className="bg-emerald-600" />
                  <TimelineContent className="border-l border-white/10 pl-6 pb-8">
                    <h3 className="font-medium text-white text-lg">Late 18th Century</h3>
                    <p className="text-white/70 mt-1">
                      The earliest written references to Solitaire appear in German game anthologies. The game was known as "Patience" and was particularly popular among the nobility and aristocracy.
                    </p>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineIcon className="bg-emerald-600" />
                  <TimelineContent className="border-l border-white/10 pl-6 pb-8">
                    <h3 className="font-medium text-white text-lg">Early 19th Century</h3>
                    <p className="text-white/70 mt-1">
                      Solitaire gained popularity in France during Napoleon's era. Legend has it that Napoleon played Solitaire during his exile on St. Helena to pass the time and maintain mental sharpness.
                    </p>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineIcon className="bg-emerald-600" />
                  <TimelineContent className="border-l border-white/10 pl-6 pb-8">
                    <h3 className="font-medium text-white text-lg">Victorian Era (1837-1901)</h3>
                    <p className="text-white/70 mt-1">
                      The game became extremely popular throughout England during Queen Victoria's reign. The first English-language book on Solitaire, "Illustrated Games of Patience," was published by Lady Adelaide Cadogan in 1874.
                    </p>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineIcon className="bg-emerald-600" />
                  <TimelineContent className="border-l border-white/10 pl-6">
                    <h3 className="font-medium text-white text-lg">Early 20th Century</h3>
                    <p className="text-white/70 mt-1">
                      Solitaire crossed the Atlantic and gained widespread popularity in the United States. Many new variations were created and documented during this period, including Klondike, which would later become the standard version known today.
                    </p>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </div>
            
            <p>
              The name "Solitaire" comes from the French word meaning "solitary" or "alone," highlighting the game's single-player nature. In the United Kingdom, it has traditionally been called "Patience," reflecting the temperament needed to play successfully.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white mb-6">
          <CardHeader>
            <CardTitle>The Digital Revolution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Solitaire experienced an unprecedented surge in popularity with the advent of personal computers. What was once a casual card game became one of the most played computer games in history, introducing millions of people to digital gaming.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-4 rounded-md">
                <h3 className="font-medium mb-2">Microsoft Windows Solitaire (1990)</h3>
                <p className="text-sm">
                  The inclusion of Solitaire in Windows 3.0 marked a turning point in the game's history. Designed by Wes Cherry, an intern at Microsoft, the game was included as a friendly way to teach users how to use a mouse through drag-and-drop actions. It quickly became one of the most used applications in Windows.
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-md">
                <h3 className="font-medium mb-2">Beyond Windows</h3>
                <p className="text-sm">
                  Following Microsoft's lead, Solitaire became a staple on virtually every operating system and digital platform. The game has been ported to mobile phones, tablets, gaming consoles, and even smart watches, making it one of the most accessible games ever created.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Competitive Solitaire</h3>
            <p className="mb-4">
              While traditionally a solitary pastime, Solitaire has developed competitive aspects in the digital age. Speed competitions, tournaments with standardized deals, and online leaderboards have transformed the once-solitary game into a competitive activity.
            </p>
            
            <div className="bg-white/10 p-4 rounded-md mb-6">
              <h4 className="font-medium mb-2">Microsoft Solitaire Collection</h4>
              <p className="text-sm">
                In 2015, Microsoft celebrated the 25th anniversary of Windows Solitaire by inducting the game into the World Video Game Hall of Fame, acknowledging its significant impact on gaming culture and its role in introducing casual gaming to millions of people worldwide.
              </p>
            </div>
            
            <h3 className="text-xl font-medium mb-3">Cultural Impact</h3>
            <p>
              Solitaire has become more than just a game—it's a cultural icon. Office workers playing Solitaire became a symbol of workplace procrastination in the 1990s and early 2000s. The game has been referenced in films, television shows, and literature as a universal symbol of passing time or solitary contemplation.
            </p>
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

export default History;
