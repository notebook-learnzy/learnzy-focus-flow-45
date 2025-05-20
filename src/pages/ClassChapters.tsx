
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";

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

const classNames = { "11": "Class 11", "12": "Class 12" };

const ClassChapters = () => {
  const { subjectId, classId } = useParams<{ subjectId: string; classId: string }>();
  const navigate = useNavigate();
  const chapters = chaptersBySubjectAndClass[subjectId as string]?.[classId as string] || [];
  const [search, setSearch] = useState("");

  if (!chapters.length) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">No chapters found for this subject/class</h2>
        <Button onClick={() => navigate(`/${subjectId}`)}>Back</Button>
      </div>
    );
  }

  const filtered = chapters.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-3xl">
      <Button
        variant="ghost"
        className="mb-4 text-gray-500"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="mr-2" /> Back
      </Button>
      <h1 className="text-2xl font-bold mb-6">
        {classNames[classId as string] || "Class"} Chapters
      </h1>
      <div className="mb-4">
        <div className="relative">
          <input
            className="w-full rounded-md border px-10 py-2 focus:outline-none focus:ring-2 focus:ring-learnzy-purple text-md"
            placeholder="Search chapters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((chapter) => (
          <Card
            key={chapter.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() =>
              navigate(
                `/academics/${subjectId}/classes/${classId}/chapters/${chapter.id}/sets`
              )
            }
          >
            <CardContent className="p-5">
              <div className="flex items-center">
                <span className="text-lg font-semibold text-learnzy-purple mr-3">{chapter.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-gray-500 p-6 text-center">No matching chapters found.</div>
        )}
      </div>
    </div>
  );
};

export default ClassChapters;
