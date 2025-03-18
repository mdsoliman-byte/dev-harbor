
import { useTheme } from '@/components/ThemeProvider';
import HeroSection from '@/components/home/HeroSection';
import ProfileSection from '@/components/home/ProfileSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import SkillsSection from '@/components/home/SkillsSection';
import CallToActionSection from '@/components/home/CallToActionSection';

const HomePage = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen overflow-hidden">
      <HeroSection />
      <ProfileSection />
      <ProjectsSection />
      <SkillsSection />
      <CallToActionSection />
    </div>
  );
};

export default HomePage;
