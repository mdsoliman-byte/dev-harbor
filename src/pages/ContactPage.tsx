
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your message has been sent!', {
        description: 'I will get back to you as soon as possible.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            I'm always interested in new opportunities, collaborations, or just having a chat about technology.
            Feel free to reach out through the form below or via my social media.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <div className="bg-secondary/30 rounded-lg p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Available for remote work and local collaborations in the Bay Area.
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:contact@johndoe.dev" className="text-muted-foreground hover-underline">
                      contact@johndoe.dev
                    </a>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  I check my emails daily and aim to respond within 24 hours.
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a href="tel:+1234567890" className="text-muted-foreground hover-underline">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Available during business hours (9 AM - 5 PM PST).
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">What types of projects do you work on?</h4>
                  <p className="text-sm text-muted-foreground">
                    I specialize in frontend development for web applications, with a focus on React, TypeScript, and modern UI frameworks.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">What is your availability?</h4>
                  <p className="text-sm text-muted-foreground">
                    I'm currently available for freelance projects, part-time collaborations, and consulting work.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Do you work remotely?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, I'm experienced in remote work and have successfully collaborated with teams across different time zones.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-secondary/30 rounded-xl p-8 border border-border"
          >
            <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={6}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting this form, you agree to my privacy policy and terms of service.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
