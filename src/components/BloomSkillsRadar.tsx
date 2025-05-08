
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, PolarRadiusAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BloomSkillProfile } from '@/types';
import { cn } from '@/lib/utils';

interface BloomSkillsRadarProps {
  skills: BloomSkillProfile;
  className?: string;
  showRecommendations?: boolean;
}

const BloomSkillsRadar = ({ skills, className, showRecommendations = true }: BloomSkillsRadarProps) => {
  // Transform the skills object into an array for the radar chart
  const data = [
    { subject: 'Remember', value: skills.remember },
    { subject: 'Understand', value: skills.understand },
    { subject: 'Apply', value: skills.apply },
    { subject: 'Analyze', value: skills.analyze },
    { subject: 'Evaluate', value: skills.evaluate },
    { subject: 'Create', value: skills.create }
  ];

  // Find the strongest and weakest skills
  const sortedSkills = [...data].sort((a, b) => b.value - a.value);
  const strongestSkill = sortedSkills[0];
  const weakestSkill = sortedSkills[sortedSkills.length - 1];

  // Generate recommendations based on weakest skill
  const getRecommendations = (skill: string, value: number): string[] => {
    switch(skill) {
      case 'Remember':
        return [
          'Use flashcards for key terms and concepts',
          'Create mnemonic devices for complex sequences',
          'Practice regular retrieval of information'
        ];
      case 'Understand':
        return [
          'Create concept maps to connect ideas',
          'Explain concepts in your own words',
          'Relate new concepts to familiar ones'
        ];
      case 'Apply':
        return [
          'Work through practice problems',
          'Apply concepts to real-world scenarios',
          'Teach concepts to someone else'
        ];
      case 'Analyze':
        return [
          'Compare and contrast related concepts',
          'Break down complex problems into components',
          'Identify patterns and relationships'
        ];
      case 'Evaluate':
        return [
          'Critique arguments and solutions',
          'Assess the validity of claims',
          'Develop criteria for evaluation'
        ];
      case 'Create':
        return [
          'Design your own problems and solutions',
          'Generate multiple approaches to problems',
          'Combine concepts in novel ways'
        ];
      default:
        return ['Practice more questions in this skill area'];
    }
  };

  const weakestRecommendations = getRecommendations(weakestSkill.subject, weakestSkill.value);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Bloom's Taxonomy Skills Profile</CardTitle>
        <CardDescription>Your cognitive skill development across learning levels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Tooltip />
              <Radar
                name="Skill Level"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
            <p className="text-sm font-medium text-purple-800">
              Strongest: <span className="font-bold">{strongestSkill.subject}</span> ({strongestSkill.value}%)
            </p>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
            <p className="text-sm font-medium text-amber-800">
              Needs improvement: <span className="font-bold">{weakestSkill.subject}</span> ({weakestSkill.value}%)
            </p>
          </div>
          
          {showRecommendations && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Recommendations to improve {weakestSkill.subject}:</h4>
              <ul className="space-y-1">
                {weakestRecommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start">
                    <span className="text-purple-500 mr-2">•</span> 
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BloomSkillsRadar;
