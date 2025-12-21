-- Database schema for PandaPaths website

-- Leads table for contact form submissions
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  project_description TEXT NOT NULL,
  budget VARCHAR(50),
  timeline VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Career subscribers table
CREATE TABLE IF NOT EXISTS career_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_career_subscribers_email ON career_subscribers(email);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
