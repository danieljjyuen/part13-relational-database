blogs table for the application with the following columns:

id (unique, incrementing id)
author (string)
url (string that cannot be empty)
title (string that cannot be empty)
likes (integer with default value zero)

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);