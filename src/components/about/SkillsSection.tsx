
import { AboutData } from '@/types/about';
import { Terminal, Code, BarChart, Database, PenTool, Smartphone, Award } from 'lucide-react';

interface SkillsSectionProps {
  aboutData: AboutData;
}

const SkillsSection = ({ aboutData }: SkillsSectionProps) => {
  // Map skill icons to Lucide components
  const getIconComponent = (iconName?: string) => {
    switch(iconName) {
      case 'Terminal': return <Terminal className="h-6 w-6 text-primary" />;
      case 'Code': return <Code className="h-6 w-6 text-primary" />;
      case 'BarChart': return <BarChart className="h-6 w-6 text-primary" />;
      case 'Database': return <Database className="h-6 w-6 text-primary" />;
      case 'PenTool': return <PenTool className="h-6 w-6 text-primary" />;
      case 'Smartphone': return <Smartphone className="h-6 w-6 text-primary" />;
      default: return <Award className="h-6 w-6 text-primary" />; // Default icon
    }
  };

  // Group skills by category if available
  const groupedSkills = aboutData?.skills?.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof aboutData.skills>);

  // If no categories, just show all skills
  const hasCategories = Object.keys(groupedSkills || {}).length > 1;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-display font-bold mb-6">Skills & Expertise</h2>
      
      {hasCategories ? (
        // Display skills grouped by category
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    className="bg-secondary/30 rounded-lg p-5 border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {getIconComponent(skill.icon)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{skill.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Display skills without categories
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aboutData?.skills?.map((skill) => (
            <div 
              key={skill.id} 
              className="bg-secondary/30 rounded-lg p-5 border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  {getIconComponent(skill.icon)}
                </div>
                <div>
                  <h4 className="font-semibold">{skill.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
