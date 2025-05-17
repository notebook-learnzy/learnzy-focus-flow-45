
import { wifi } from "lucide-react";

const RelaxStatusIndicator = () => (
  <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#FFBD59]/20 text-[#FFBD59] font-semibold text-xs">
    <span className="inline-block animate-pulse">
      <svg width="16" height="16" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#FFBD59" fillOpacity="0.6"/>
        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">🧘</text>
      </svg>
    </span>
    Relax Connected
  </div>
);
export default RelaxStatusIndicator;
