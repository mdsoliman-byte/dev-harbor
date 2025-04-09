
import { AboutData } from '@/types/about';

interface ExperienceSectionProps {
  aboutData: AboutData;
}

const ExperienceSection = ({ aboutData }: ExperienceSectionProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-display font-bold mb-6">Experience</h2>
      <div className="space-y-8">
        {aboutData?.experience?.map((exp) => (
          <div key={exp.id} className="border-l-2 border-border pl-5 relative">
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
            <h3 className="text-xl font-semibold">{exp.position}</h3>
            <p className="text-primary font-medium mb-1">{exp.company}</p>
            <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              {exp.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
