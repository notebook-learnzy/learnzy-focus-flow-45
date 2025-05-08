
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BloomSkillProfile } from '@/types';

interface BloomSkillsRadarProps {
  skills: BloomSkillProfile;
  className?: string;
}

const BloomSkillsRadar = ({ skills, className }: BloomSkillsRadarProps) => {
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

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Bloom's Taxonomy Skills Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
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
        </div>
      </CardContent>
    </Card>
  );
};

export default BloomSkillsRadar;
