
import React from 'react';
import { ActionCard as ActionCardType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, BookOpen, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCardsProps {
  cards: ActionCardType[];
  className?: string;
  onSchedule?: (card: ActionCardType) => void;
  onComplete?: (card: ActionCardType) => void;
}

const ActionCards = ({ cards, className, onSchedule, onComplete }: ActionCardsProps) => {
  const getActionIcon = (type: string) => {
    switch (type) {
      case 'revision':
        return <BookOpen size={16} className="text-learnzy-orange" />;
      case 'wellness':
        return <Heart size={16} className="text-learnzy-mint" />;
      default:
        return <BookOpen size={16} className="text-learnzy-purple" />;
    }
  };
  
  const getCardClass = (type: string, priority: number) => {
    if (priority === 1) return "border-red-200 bg-red-50";
    if (type === 'revision') return "border-orange-200 bg-orange-50";
    if (type === 'wellness') return "border-green-200 bg-green-50";
    return "border-gray-200 bg-gray-50";
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Recommended Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cards.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No recommendations available</p>
          ) : (
            cards.map(card => (
              <div 
                key={card.id} 
                className={cn(
                  "border rounded-lg p-3",
                  card.completed ? "border-gray-200 bg-gray-50" : getCardClass(card.action_type, card.priority)
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getActionIcon(card.action_type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={cn(
                        "font-medium",
                        card.completed && "text-gray-500"
                      )}>
                        {card.title}
                      </h3>
                      {card.priority === 1 && !card.completed && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                          High Priority
                        </span>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm text-gray-500 mt-1",
                      card.completed && "text-gray-400"
                    )}>
                      {card.description}
                    </p>
                    
                    <div className="mt-2 flex justify-end">
                      {card.completed ? (
                        <div className="flex items-center text-green-600 text-sm">
                          <CheckCircle size={14} className="mr-1" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          {onSchedule && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs"
                              onClick={() => onSchedule(card)}
                            >
                              <Calendar size={12} className="mr-1" />
                              Schedule
                            </Button>
                          )}
                          
                          {onComplete && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs"
                              onClick={() => onComplete(card)}
                            >
                              <CheckCircle size={12} className="mr-1" />
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionCards;
