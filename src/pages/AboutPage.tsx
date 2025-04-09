
import { useQuery } from '@tanstack/react-query';
import { fetchAboutData } from '@/services/api/about';
import { AboutData } from '@/types/about';
import AboutHero from '@/components/about/AboutHero';
import AboutContent from '@/components/about/AboutContent';
import AboutLoader from '@/components/about/AboutLoader';

const AboutPage = () => {
  const { data: aboutData, isLoading, error } = useQuery<AboutData>({
    queryKey: ['aboutData'],
    queryFn: fetchAboutData
  });
  
  if (isLoading) {
    return <AboutLoader />;
  }
  
  if (error) {
    console.error('Error loading about data:', error);
  }
  
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {aboutData && <AboutHero aboutData={aboutData} />}
          {aboutData && <AboutContent aboutData={aboutData} />}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
