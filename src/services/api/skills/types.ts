
// Skills types
export interface Skill {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  isEditing?: boolean; // UI state field for admin dashboard
}

// Parameters for filtering skills
export interface SkillParams {
  category?: string;
  search?: string;
  sortBy?: 'title' | 'category' | 'id';
  sortOrder?: 'asc' | 'desc';
}
