/*
  # Initial Schema for GO Pets

  1. New Tables
    - news
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - location (text)
      - emergency (boolean)
      - user_id (uuid, references auth.users)
      - created_at (timestamp)
    
    - pets
      - id (uuid, primary key)
      - name (text)
      - species (text)
      - breed (text)
      - age (integer)
      - description (text)
      - image_url (text)
      - status (text)
      - user_id (uuid, references auth.users)
      - created_at (timestamp)
    
    - organizations
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - contact (text)
      - address (text)
      - website (text)
      - verified (boolean)
      - user_id (uuid, references auth.users)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- News table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  location text,
  emergency boolean DEFAULT false,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read news"
  ON news FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create news"
  ON news FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Pets table
CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  species text NOT NULL,
  breed text,
  age integer,
  description text,
  image_url text,
  status text DEFAULT 'available',
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available pets"
  ON pets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create pet listings"
  ON pets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  contact text NOT NULL,
  address text,
  website text,
  verified boolean DEFAULT false,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view organizations"
  ON organizations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Organizations can manage their own data"
  ON organizations FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);