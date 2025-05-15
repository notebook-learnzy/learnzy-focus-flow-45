
import React, { useState } from "react";
import ShivBacklogFeed from "@/components/backlog/ShivBacklogFeed";
import BacklogList from "@/components/backlog/BacklogList";
import BacklogCenter from "@/components/backlog/BacklogCenter";
import { Button } from "@/components/ui/button";

const Backlog = () => {
  const [showCenter, setShowCenter] = useState(false);

  return (
    <div className="min-h-[100vh] w-full max-w-2xl mx-auto px-2 sm:px-0 pt-5 pb-24" style={{ background: "#FFFDFA" }}>
      <h1 className="text-3xl font-extrabold font-sans text-gray-900 mb-2 tracking-tight">Backlog Tracker</h1>
      <div className="text-md text-gray-700 mb-5 font-medium">
        Shiv will help you manage backlogs in a friendly, pressure-free way.<br />
        <span className="text-[#FFBD59]">Tips: Follow Shiv’s suggestions, don’t panic about overdue topics!</span>
      </div>

      {/* Shiv Feed */}
      <ShivBacklogFeed
        onAccept={() => alert("Accepted Shiv's suggestion!")}
        onReschedule={() => alert("Reschedule dialog coming soon!")}
        onSkip={() => alert("Shiv will remind you later!")}
      />

      {/* Shiv's Top Priorities/Center Button */}
      <div className="flex justify-end mb-4">
        <Button size="sm" className="rounded-full bg-[#FFBD59] text-gray-900 hover:bg-[#ffe29d] px-5 font-semibold shadow"
          onClick={() => setShowCenter(true)}
        >
          🧠 Shiv’s Priorities
        </Button>
      </div>
      {showCenter && (
        <BacklogCenter />
      )}

      {/* Expandable Backlog List */}
      <BacklogList />

      <div className="mt-8 text-xs text-center text-gray-400">
        Built for NEET students. <span aria-label="Shiv">🧠</span> reduces stress!
      </div>
    </div>
  );
};

export default Backlog;
