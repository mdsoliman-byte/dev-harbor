
import api from './config';

export interface ContactData {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  social_links: {
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  form_settings: {
    submit_button_text: string;
    success_message: string;
    error_message: string;
  };
}

export interface ContactFormSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const fetchContactData = async (): Promise<ContactData> => {
  try {
    const response = await api.get('contact/data/');
    console.log('Contact data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching contact data:', error);
    return defaultContactData;
  }
};

export const updateContactData = async (data: ContactData): Promise<ContactData> => {
  try {
    const response = await api.put('contact/update/', data);
    console.log('Contact data updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating contact data:', error);
    throw error;
  }
};

export const submitContactForm = async (data: ContactFormSubmission): Promise<{ success: boolean, message: string }> => {
  try {
    const response = await api.post('contact/submit/', data);
    return { success: true, message: response.data.message || 'Your message has been sent successfully!' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, message: 'Failed to send your message. Please try again later.' };
  }
};

// Default contact data
const defaultContactData: ContactData = {
  title: "Get in Touch",
  description: "Have a question or want to work together? Drop me a message and I'll get back to you soon.",
  email: "contact@example.com",
  phone: "+1 (123) 456-7890",
  address: "123 Main Street, New York, NY 10001",
  social_links: {
    twitter: "https://twitter.com/example",
    facebook: "https://facebook.com/example",
    linkedin: "https://linkedin.com/in/example",
    instagram: "https://instagram.com/example"
  },
  form_settings: {
    submit_button_text: "Send Message",
    success_message: "Your message has been sent successfully!",
    error_message: "Failed to send your message. Please try again later."
  }
};
