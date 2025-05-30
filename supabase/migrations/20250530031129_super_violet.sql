/*
  # Create User Profiles Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text, unique)
      - `location` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `front_photo_url` (text)
      - `side_photo_url` (text)
      - `top_photo_url` (text, nullable)
      - `back_photo_url` (text, nullable)
      - `blur_face` (boolean)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to update their own data
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  front_photo_url text NOT NULL,
  side_photo_url text NOT NULL,
  top_photo_url text,
  back_photo_url text,
  blur_face boolean DEFAULT false
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);