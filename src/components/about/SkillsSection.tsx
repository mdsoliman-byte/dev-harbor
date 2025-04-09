
import { AboutData } from '@/types/about';

interface SkillsSectionProps {
  aboutData: AboutData;
}

const SkillsSection = ({ aboutData }: SkillsSectionProps) => {
  return (
    <section>
      <h2 className="text-2xl font-display font-bold mb-6">Interests & Specializations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {aboutData?.skills?.map((skill) => (
          <div key={skill.id} className="bg-secondary/30 rounded-lg p-5 border border-border">
            <h3 className="font-semibold mb-2">{skill.title}</h3>
            <p className="text-sm text-muted-foreground">
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
