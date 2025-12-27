-- First, delete any existing admin users
DELETE FROM users WHERE email = 'admin@iiitkottayam.ac.in';

-- This will be done via API instead
-- The password needs to be hashed by bcrypt during user creation
