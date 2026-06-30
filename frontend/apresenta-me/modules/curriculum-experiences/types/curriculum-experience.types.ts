export type CurriculumExperience = {
  id: string;
  curriculumId: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
