
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BatteryFull, ring as RingIcon } from "lucide-react";

interface SmartRingCardProps {
  name?: string;
  connected?: boolean;
  charging?: boolean;
  chargingPercent?: number;
}

const SmartRingCard = ({
  name = "RELAX",
  connected = true,
  charging = true,
  chargingPercent = 72,
}: SmartRingCardProps) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <Card className="bg-gradient-to-br from-learnzy-purple/10 to-learnzy-purple/5 border-learnzy-purple/20 flex flex-col h-full">
      <CardHeader className="pb-2 flex-row items-center gap-3">
        <RingIcon className="text-learnzy-purple h-6 w-6" />
        <CardTitle className="text-base flex-1">{name} Smart Ring</CardTitle>
        <span className={`text-xs px-2 py-0.5 rounded-full ${connected ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}>
          {connected ? "Connected" : "Disconnected"}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col items-center pt-2 pb-4">
        <div className="w-20 h-20 flex items-center justify-center mb-3 bg-white rounded-full shadow">
          {!imgError ? (
            <img
              src="/placeholder.svg"
              alt="Smart Ring"
              className="object-contain w-full h-full"
              onError={() => setImgError(true)}
            />
          ) : (
            <RingIcon className="w-12 h-12 text-learnzy-purple" />
          )}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <BatteryFull className="h-5 w-5 text-learnzy-purple" />
          <span className="text-2xl font-bold text-learnzy-purple">{chargingPercent}%</span>
        </div>
        <div className="uppercase text-xs text-gray-500 tracking-wide">
          {charging ? "Charging" : "Not Charging"}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartRingCard;
