/*
  # Add user onboarding policies

  1. Security Changes
    - Add INSERT policy for user_profiles table to allow new profile creation
    - Add storage policies for user-photos bucket to allow photo uploads

  2. Changes
    - Adds INSERT policy for user_profiles table
    - Creates storage bucket and policies for user photos
*/

-- Create storage bucket if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'user-photos'
  ) THEN
    INSERT INTO storage.buckets (id, name)
    VALUES ('user-photos', 'user-photos');
  END IF;
END $$;

-- Enable RLS on the storage bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Add storage policy for uploading photos
CREATE POLICY "Anyone can upload user photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'user-photos'
);

-- Add policy for inserting new user profiles
CREATE POLICY "Anyone can create a user profile"
ON public.user_profiles
FOR INSERT
WITH CHECK (true);

-- Add policy for reading uploaded photos
CREATE POLICY "Anyone can view user photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'user-photos');