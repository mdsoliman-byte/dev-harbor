
import { motion } from 'framer-motion';
import { AboutData } from '@/types/about';
import AboutBio from './AboutBio';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';

interface AboutContentProps {
  aboutData: AboutData;
}

const AboutContent = ({ aboutData }: AboutContentProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:w-2/3"
    >
      <AboutBio aboutData={aboutData} />
      <ExperienceSection aboutData={aboutData} />
      <EducationSection aboutData={aboutData} />
      <SkillsSection aboutData={aboutData} />
    </motion.div>
  );
};

export default AboutContent;
