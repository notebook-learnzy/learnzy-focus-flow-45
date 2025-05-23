
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, TrendingUp, Star } from "lucide-react";
import { useSM2Data } from '@/hooks/useSM2Data';
import { accuracyToQuality, formatInterval, getNextSet } from '@/utils/sm2Algorithm';
import { useNavigate, useParams } from 'react-router-dom';

interface SM2ResultsCardProps {
  accuracy: number;
  chapterId: string;
  setId: string;
}

export default function SM2ResultsCard({ accuracy, chapterId, setId }: SM2ResultsCardProps) {
  const { updateSM2Data, getNextSetData } = useSM2Data();
  const [sm2Result, setSM2Result] = useState<any>(null);
  const [nextSetInfo, setNextSetInfo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Update SM2 data when component mounts
    const result = updateSM2Data(chapterId, setId, accuracy);
    setSM2Result(result);
    
    // Get next set information
    const nextInfo = getNextSetData(chapterId, setId);
    setNextSetInfo(nextInfo);
  }, [accuracy, chapterId, setId, updateSM2Data, getNextSetData]);

  if (!sm2Result) return null;

  const quality = accuracyToQuality(accuracy);
  const qualityLabels = ['Poor', 'Weak', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const qualityColors = ['text-red-600', 'text-orange-600', 'text-yellow-600', 'text-blue-600', 'text-green-600', 'text-emerald-600'];

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <TrendingUp size={20} />
          SM2 Spaced Repetition Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Set Results */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              <span className="font-semibold">Set {setId} Completed!</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border">
                <div className="text-sm text-gray-600">Accuracy</div>
                <div className="text-xl font-bold text-blue-600">{accuracy}%</div>
              </div>
              
              <div className="bg-white p-3 rounded-lg border">
                <div className="text-sm text-gray-600">Quality Score</div>
                <div className={`text-xl font-bold ${qualityColors[quality]}`}>
                  {quality} - {qualityLabels[quality]}
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-lg border">
                <div className="text-sm text-gray-600">Ease Factor</div>
                <div className="text-xl font-bold text-purple-600">
                  {sm2Result.easeFactor.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-lg border">
                <div className="text-sm text-gray-600">Next Review</div>
                <div className="text-sm font-bold text-amber-600">
                  {formatInterval(sm2Result.interval)}
                </div>
              </div>
            </div>
          </div>

          {/* Next Set Information */}
          <div className="space-y-4">
            {nextSetInfo.nextSet ? (
              <>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500" size={20} />
                  <span className="font-semibold">Next Set Unlocked!</span>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-sm text-gray-600 mb-2">Ready to practice</div>
                  <div className="text-lg font-bold text-green-600 mb-3">
                    Set {nextSetInfo.nextSet}
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => navigate(`/academics/botany/classes/11/chapters/${chapterId}/sets/${nextSetInfo.nextSet}/prep`)}
                  >
                    Start Set {nextSetInfo.nextSet}
                  </Button>
                </div>
              </>
            ) : (
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="text-blue-600" size={20} />
                  <span className="font-semibold">Chapter Complete!</span>
                </div>
                <div className="text-sm text-gray-600">
                  You've completed all sets for this chapter. Great job!
                </div>
              </div>
            )}
            
            <div className="bg-blue-100 p-3 rounded-lg">
              <div className="text-xs text-blue-800 font-medium mb-1">Algorithm Impact</div>
              <div className="text-xs text-blue-700">
                {quality >= 4 
                  ? "Excellent performance! Your review interval has been extended."
                  : quality >= 3
                    ? "Good work! Standard progression maintained."
                    : "Consider reviewing this material again sooner for better retention."
                }
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
