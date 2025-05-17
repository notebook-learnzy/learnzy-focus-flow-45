
import { Wifi } from "lucide-react";

const RelaxStatusIndicator = () => (
  <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#FFBD59]/20 text-[#FFBD59] font-semibold text-xs">
    <span className="inline-block animate-pulse">
      <Wifi className="w-4 h-4" />
    </span>
    Relax Connected
  </div>
);
export default RelaxStatusIndicator;
