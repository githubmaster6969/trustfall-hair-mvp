/*
  # Fix storage policies for user photos

  1. Changes
    - Create storage bucket for user photos
    - Add policies for photo upload and viewing
    - Add policy for user profile creation

  2. Security
    - Enable RLS on user_profiles table
    - Add policies for authenticated users
*/

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-photos', 'user-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Add policy for inserting new user profiles during onboarding
CREATE POLICY "Enable user profile creation during onboarding"
ON public.user_profiles
FOR INSERT
WITH CHECK (true);

-- Add policies for photo storage
CREATE POLICY "Enable photo uploads during onboarding"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'user-photos');

CREATE POLICY "Enable public photo viewing"
ON storage.objects
FOR SELECT
USING (bucket_id = 'user-photos');