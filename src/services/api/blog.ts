
import api from './config';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: {
    name: string;
    avatar: string;
  };
  published_date: string;
  category: string;
  tags: string[];
  is_featured: boolean;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await api.get('blog/data/');
    console.log('Blog posts:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return defaultBlogPosts;
  }
};

export const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
  try {
    const response = await api.get(`blog/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    const post = defaultBlogPosts.find(post => post.slug === slug);
    if (post) return post;
    throw error;
  }
};

export const fetchBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const response = await api.get('blog/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return defaultBlogCategories;
  }
};

export const createBlogPost = async (data: Partial<BlogPost>): Promise<BlogPost> => {
  try {
    const response = await api.post('blog/create/', data);
    return response.data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (slug: string, data: Partial<BlogPost>): Promise<BlogPost> => {
  try {
    const response = await api.put(`blog/${slug}/update/`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog post with slug ${slug}:`, error);
    throw error;
  }
};

export const deleteBlogPost = async (slug: string): Promise<void> => {
  try {
    await api.delete(`blog/${slug}/delete/`);
  } catch (error) {
    console.error(`Error deleting blog post with slug ${slug}:`, error);
    throw error;
  }
};

// Default blog data
const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    excerpt: "Learn the basics of React and build your first component.",
    content: "# Getting Started with React\n\nReact is a JavaScript library for building user interfaces...",
    featured_image: "/placeholder.svg",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg"
    },
    published_date: "2023-01-15",
    category: "Development",
    tags: ["React", "JavaScript", "Frontend"],
    is_featured: true
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    slug: "advanced-typescript-patterns",
    excerpt: "Dive deep into TypeScript advanced patterns and techniques.",
    content: "# Advanced TypeScript Patterns\n\nTypeScript offers many advanced features...",
    featured_image: "/placeholder.svg",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg"
    },
    published_date: "2023-02-10",
    category: "Development",
    tags: ["TypeScript", "JavaScript", "Advanced"],
    is_featured: false
  },
  {
    id: 3,
    title: "UI Design Principles",
    slug: "ui-design-principles",
    excerpt: "Learn the core principles of effective UI design.",
    content: "# UI Design Principles\n\nGood UI design is essential for creating effective applications...",
    featured_image: "/placeholder.svg",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg"
    },
    published_date: "2023-03-22",
    category: "Design",
    tags: ["UI", "Design", "UX"],
    is_featured: false
  }
];

const defaultBlogCategories: BlogCategory[] = [
  { id: 1, name: "Development", slug: "development" },
  { id: 2, name: "Design", slug: "design" },
  { id: 3, name: "DevOps", slug: "devops" },
  { id: 4, name: "Career", slug: "career" }
];
