
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// A mapping of chapters for each subject/class (reuse what's in ClassChapters)
const chaptersBySubjectAndClass: Record<string, Record<string, { id: string, name: string }[]>> = {
  botany: {
    "11": [
      { id: "the-living-world", name: "The Living World" },
      { id: "biological-classification", name: "Biological Classification" },
      { id: "plant-kingdom", name: "Plant Kingdom" },
      { id: "plant-morphology", name: "Morphology of Flowering Plants" },
      { id: "plant-anatomy", name: "Anatomy of Flowering Plants" },
      { id: "cell-bio", name: "Cell: The Unit of Life" },
      { id: "biomolecules", name: "Biomolecules" },
      { id: "cell-cycle", name: "Cell Cycle and Cell Division" },
      { id: "transport-plants", name: "Transport in Plants" },
      { id: "mineral-nutrition", name: "Mineral Nutrition" },
      { id: "photosynthesis", name: "Photosynthesis in Higher Plants" },
      { id: "respiration-plants", name: "Respiration in Plants" },
      { id: "plant-growth", name: "Plant Growth and Development" }
    ],
    "12": [
      { id: "reproduction-organisms", name: "Reproduction in Organisms" },
      { id: "sexual-reproduction-flowering", name: "Sexual Reproduction in Flowering Plants" },
      { id: "inheritance-variation", name: "Principles of Inheritance and Variation" },
      { id: "molecular-inheritance", name: "Molecular Basis of Inheritance" },
      { id: "microbes-human-welfare", name: "Microbes in Human Welfare" },
      { id: "biotechnology-principles", name: "Biotechnology: Principles and Processes" },
      { id: "biotechnology-applications", name: "Biotechnology and Its Applications" },
      { id: "organisms-populations", name: "Organisms and Populations" },
      { id: "ecosystem", name: "Ecosystem" },
      { id: "biodiversity", name: "Biodiversity and Conservation" },
    ]
  },
  zoology: {
    "11": [
      { id: "digestion", name: "Digestion and Absorption" },
      { id: "breathing-gas-exchange", name: "Breathing and Exchange of Gases" },
      { id: "body-fluids-circulation", name: "Body Fluids and Circulation" },
      { id: "excretory-products", name: "Excretory Products and Their Elimination" },
      { id: "locomotion-movement", name: "Locomotion and Movement" },
      { id: "neural-control", name: "Neural Control and Coordination" },
      { id: "chemical-coordination", name: "Chemical Coordination and Integration" },
    ],
    "12": [
      { id: "human-reproduction", name: "Human Reproduction" },
      { id: "reproductive-health", name: "Reproductive Health" },
      { id: "evolution", name: "Evolution" },
      { id: "human-health-disease", name: "Human Health and Disease" },
      { id: "food-production", name: "Strategies for Enhancement in Food Production" },
    ]
  },
  physics: {
    "11": [
      { id: "motion", name: "Laws of Motion" },
      { id: "work-power-energy", name: "Work, Power and Energy" },
      { id: "gravitation", name: "Gravitation" },
    ],
    "12": [
      { id: "electric-charges-fields", name: "Electric Charges and Fields" },
      { id: "current-electricity", name: "Current Electricity" },
      { id: "electro-magnetic", name: "Electromagnetic Induction" },
    ]
  },
  chemistry: {
    "11": [
      { id: "basic-concepts", name: "Some Basic Concepts of Chemistry" },
      { id: "structure-atom", name: "Structure of Atom" },
      { id: "chemical-bonding", name: "Chemical Bonding and Molecular Structure" },
    ],
    "12": [
      { id: "solid-state", name: "The Solid State" },
      { id: "solutions", name: "Solutions" },
      { id: "electrochemistry", name: "Electrochemistry" },
    ]
  },
};

const setLabels = ["A", "B", "C", "D", "E", "F"];
const defaultSetDurations: Record<string, number> = {
  A: 25,
  B: 50,
  C: 50,
  D: 50,
  E: 50,
  F: 50,
};

export default function ChapterSets() {
  const { subjectId, classId, chapterId } = useParams<{subjectId: string; classId: string; chapterId: string}>();
  const navigate = useNavigate();

  // Get the correct chapter from mappings
  const chapters = chaptersBySubjectAndClass[subjectId as string]?.[classId as string] || [];
  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter) {
    return (
      <div className="container mx-auto max-w-2xl pt-10">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} className="mr-2" /> Back
        </Button>
        <h2 className="mt-8 text-center text-lg font-semibold">Chapter not found.</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl pb-20 pt-2 px-3">
      <Button variant="ghost" className="mb-2 sm:mb-4 text-gray-500" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} className="mr-2" /> Back
      </Button>
      <h1 className="text-2xl font-bold mb-2 sm:mb-4">{chapter.name}</h1>
      <p className="mb-3 sm:mb-8 text-sm sm:text-md text-gray-500">Select a Practice Set</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
        {setLabels.map((set) => {
          const unlocked = set === "A"; // Only set A is unlocked, mock logic
          const setDesc = { q: 50, t: defaultSetDurations[set] };
          return (
            <Card
              key={set}
              className={cn(
                "transition-shadow cursor-pointer",
                unlocked
                  ? "hover:shadow-md bg-learnzy-purple/5 border-learnzy-purple/20"
                  : "opacity-60 bg-gray-100 border-gray-200 cursor-not-allowed"
              )}
              onClick={() =>
                unlocked &&
                navigate(`/academics/${subjectId}/classes/${classId}/chapters/${chapter.id}/sets/${set}/prep`)
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl font-bold text-learnzy-purple">{set}</span>
                  <span className="text-xs text-gray-500 font-normal">Set</span>
                  {!unlocked && <Lock size={16} className="ml-2 text-gray-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-700">
                    {setDesc.q} Questions
                  </span>
                  <span className="text-xs text-gray-400">
                    Duration: {setDesc.t} min
                  </span>
                  {!unlocked && (
                    <span className="text-xs text-red-500 mt-1 sm:mt-2">
                      Complete previous sets to unlock
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
