
import { AboutData } from '@/types/about';

interface EducationSectionProps {
  aboutData: AboutData;
}

const EducationSection = ({ aboutData }: EducationSectionProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-display font-bold mb-6">Education</h2>
      <div className="space-y-8">
        {aboutData?.education?.map((edu) => (
          <div key={edu.id} className="border-l-2 border-border pl-5 relative">
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
            <h3 className="text-xl font-semibold">{edu.degree}</h3>
            <p className="text-primary font-medium mb-1">{edu.institution}</p>
            <p className="text-sm text-muted-foreground mb-3">{edu.period}</p>
            <p className="text-muted-foreground">
              {edu.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
