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

insert into blogs (author, url, title) values ('author1', 'www.example1.com', 'title1');
insert into blogs (author, url, title) values ('author2', 'www.example2.com', 'title2');