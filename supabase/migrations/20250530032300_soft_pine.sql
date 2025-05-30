/*
  # Add storage policies for user photos

  1. Storage Policies
    - Enable authenticated users to upload their photos
    - Allow public read access to photos
    - Restrict file types to images only
    - Set maximum file size to 5MB
*/

-- Create storage policy for user photos
BEGIN;

-- Create policy to allow authenticated users to upload photos
CREATE POLICY "Allow authenticated users to upload photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'user-photos' AND
  (LOWER(RIGHT(name, 4)) = '.jpg' OR
   LOWER(RIGHT(name, 4)) = '.png' OR
   LOWER(RIGHT(name, 5)) = '.jpeg' OR
   LOWER(RIGHT(name, 4)) = '.gif') AND
  octet_length(content) < 5000000
);

-- Create policy to allow authenticated users to update their own photos
CREATE POLICY "Allow users to update their own photos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'user-photos' AND auth.uid()::text = (regexp_match(name, '^([^/]+)'))[1])
WITH CHECK (bucket_id = 'user-photos' AND auth.uid()::text = (regexp_match(name, '^([^/]+)'))[1]);

-- Create policy to allow authenticated users to delete their own photos
CREATE POLICY "Allow users to delete their own photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'user-photos' AND auth.uid()::text = (regexp_match(name, '^([^/]+)'))[1]);

-- Create policy to allow public read access to photos
CREATE POLICY "Allow public read access to photos"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'user-photos');

COMMIT;