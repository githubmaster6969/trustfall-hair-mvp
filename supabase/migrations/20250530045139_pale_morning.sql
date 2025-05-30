/*
  # Remove email uniqueness constraint

  This migration removes the unique constraint on the email column in the user_profiles table
  since we're moving to a guest user flow where multiple profiles might use the same email.

  1. Changes
    - Drop unique constraint on email column
    - Update RLS policies for guest access
*/

-- Drop the unique constraint on email
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_email_key;

-- Update RLS policies for guest access
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Create new policies that don't rely on auth.uid()
CREATE POLICY "Allow read access to profiles"
  ON user_profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Allow update access to profiles"
  ON user_profiles
  FOR UPDATE
  USING (true)
  WITH CHECK (true);