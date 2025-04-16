import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CalendarDays, Clock } from 'lucide-react';
import { blogPosts } from './BlogPage';
import { Card, CardContent } from '@/components/ui/card';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.id === Number(id));
  
  
  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true });
    }
  }, [post, navigate]);
  
  if (!post) return null;
  
  return (
    <div className="min-h-screen py-8 px-4 sm:py-16 sm:px-8 lg:px-16">
      <div className="container mx-auto max-w-4xl">
        <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 sm:mb-8">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video rounded-lg overflow-hidden mb-6 sm:mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            <span className="px-3 py-1 text-xs sm:text-sm font-medium bg-primary/10 text-primary rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center text-muted-foreground mb-8 sm:mb-12">
            <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <Card className="glass-panel">
            <CardContent className="pt-4 sm:pt-6">
              <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none">
                {post.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('## ')) {
                    // Handle subheadings
                    return <h2 key={idx} className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">{paragraph.replace('## ', '')}</h2>;
                  } else if (paragraph.startsWith('### ')) {
                    // Handle sub-subheadings
                    return <h3 key={idx} className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">{paragraph.replace('### ', '')}</h3>;
                  } else if (paragraph.startsWith('```')) {
                    // Handle code blocks
                    const code = paragraph.split('```');
                    if (code.length >= 3) {
                      return (
                        <pre key={idx} className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto my-3 sm:my-4">
                          <code>{code[1].includes('\n') ? code[1].split('\n').slice(1).join('\n') : code[1]}</code>
                        </pre>
                      );
                    }
                    return null;
                  } else {
                    // Regular paragraphs
                    return <p key={idx} className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{paragraph}</p>;
                  }
                })}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 sm:mt-12">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                    <Card className="hover-lift h-full">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">{relatedPost.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center mt-3 sm:mt-4 text-sm text-muted-foreground">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          <span>{relatedPost.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
