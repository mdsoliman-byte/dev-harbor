
import { AboutData } from '@/types/about';

interface AboutBioProps {
  aboutData: AboutData;
}

const AboutBio = ({ aboutData }: AboutBioProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-display font-bold mb-6">About Me</h2>
      <div className="space-y-4 text-muted-foreground">
        {aboutData?.bio?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
};

export default AboutBio;
