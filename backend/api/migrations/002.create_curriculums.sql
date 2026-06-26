CREATE TABLE IF NOT EXISTS curriculums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  slug VARCHAR(100) NOT NULL UNIQUE,

  full_name VARCHAR(160) NOT NULL,
  headline VARCHAR(200),
  about TEXT,

  phone VARCHAR(30),
  city VARCHAR(100),
  state VARCHAR(100),

  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,

  pdf_url TEXT,

  is_public BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);