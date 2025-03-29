/*
  # Create reports table and storage

  1. New Tables
    - `reports`
      - `id` (uuid, primary key)
      - `type` (text, either 'lost' or 'stray')
      - `pet_name` (text, nullable)
      - `species` (text)
      - `description` (text)
      - `location` (text)
      - `last_seen` (date)
      - `image_url` (text, nullable)
      - `contact` (text)
      - `status` (text, default 'open')
      - `user_id` (uuid, references users.id)
      - `created_at` (timestamp with time zone)

  2. Storage
    - Create bucket for pet images

  3. Security
    - Enable RLS on reports table
    - Add policies for authenticated users
*/

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('lost', 'stray')),
  pet_name text,
  species text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  last_seen date NOT NULL,
  image_url text,
  contact text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reports"
  ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports"
  ON reports
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);