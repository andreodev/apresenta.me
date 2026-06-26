CREATE TABLE IF NOT EXISTS curriculum_experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  curriculum_id UUID NOT NULL REFERENCES curriculums(id) ON DELETE CASCADE,

  company VARCHAR(160) NOT NULL,
  position VARCHAR(160) NOT NULL,
  start_date VARCHAR(50) NOT NULL,
  end_date VARCHAR(50),
  description TEXT NOT NULL,

  sort_order INT NOT NULL DEFAULT 0,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);