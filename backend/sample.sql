-- sample.sql

-- Enable required extension (in case it's not enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Insert a test user
INSERT INTO users (id, name, email, password_hash)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'Danish Belal',
  'danishexplore019@gmail.com',
  '$2b$10$n2MGzX1JxQnBEOsEFJuI3eBN1/vH/.26R0qVyzHMeAbmSZe2zIEda' -- Password: Danish*111
);

-- Insert a sample project linked to the user
INSERT INTO projects (id, user_id, name, description)
VALUES (
  'a17f5d88-0fa7-4e69-977e-b203a3123f34',
  '550e8400-e29b-41d4-a716-446655440000',
  'Demo Project',
  'This is a demo project created for testing purposes.'
);

-- Insert a sample task under the project
INSERT INTO tasks (id, project_id, title, description, status, priority, deadline)
VALUES (
  'c26e9407-b82c-4033-88d1-4c7c142bdf13',
  'a17f5d88-0fa7-4e69-977e-b203a3123f34',
  'Initial Setup',
  'Setup backend and frontend environments',
  'Pending',
  'High',
  '2025-06-30'
);

-- Insert a sample comment on the task
INSERT INTO comments (id, task_id, user_id, content)
VALUES (
  'd36a158a-6f61-4661-93f6-9eaaef017219',
  'c26e9407-b82c-4033-88d1-4c7c142bdf13',
  '550e8400-e29b-41d4-a716-446655440000',
  'Please make sure you run `npm install` before starting.'
);
