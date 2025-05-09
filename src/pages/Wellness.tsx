
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SedentaryMetricsCard from "@/components/SedentaryMetricsCard";
import SleepMetricsCard from "@/components/SleepMetricsCard";
import WellnessRewards from "@/components/WellnessRewards";
import JournalSection from "@/components/JournalSection";

const Wellness = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Wellness</h1>
      
      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SedentaryMetricsCard />
            <SleepMetricsCard />
          </div>
        </TabsContent>
        
        <TabsContent value="rewards">
          <WellnessRewards />
        </TabsContent>
        
        <TabsContent value="journal">
          <JournalSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wellness;
