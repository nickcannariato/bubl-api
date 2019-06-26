# bubl-api

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> An API for Bubl -- A Lambda School Build Week project

## Table of Contents

- [API](#api)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## API

### Auth

- `POST api/auth/register` <= Register a new user
- `POST api/auth/login` <= Log a user in with username/password and return a JWT

### Schools

Schools resource is unsecured unless noted (because when you register you need to get the list of schools)

- `GET api/schools/` <= gets an array of all schools
- `POST api/schools/` <= Create a school
- `GET api/schools/:school_audit_id` <= Get a specific school
- `PUT api/schools/:school_audit_id` <= Update a specific school (Requires admin permissions)
- `DELETE api/schools/:school_audit_id` <= Delete a specific school (Requires admin permissions)

### Users

- `GET api/users` <= Get all users associated with the authenticated users' school
- `GET api/users/:user_audit_id` <= Get a specific user's information
- `PUT api/users/:user_audit_id` <= Update a specific user's information
- `DELETE api/users/:user_audit_id` <= Delete a specific user

### Bubls

- `GET api/bubls/` <= Get’s all of the bubls in the school that the requesting user is associated with
- `POST api/bubls/` <= Create a new Bubl in the school that the requesting user is associated with
- `GET api/bubls/:bubl_audit_id` <= Get a specific Bubl
- `PUT api/bubls/:bubl_audit_id` <= Update a specific Bubl’s information
- `DELETE api/bubls/:bubl_audit_id` <= Delete a specific Bubl

### Posts

- `GET api/posts/:bubl_audit_id` <= Get all of the posts for a specific Bubl
- `POST api/posts/:bubl_audit_id` <= Create a new post in a specific Bubl
- `GET api/posts/:bubl_audit_id/:post_audit_id` <= Get a specific Post
- `PUT api/posts/:bubl_audit_id/:post_audit_id` <= Update a specific Post
- `DELETE api/posts/:buble_audit_id/:post_audit_id` <= Delete a specific Post
- `GET api/posts/:bubl_audit_id/:post_audit_id/comments` <= Get comments associated with a post

### Comments

- `POST api/comments/:post_audit_id` <= Add a comment to a Post
- `DELETE api/comments/:comment_audit_id` <= Delete a comment

## Maintainers

[@t-tullis](https://github.com/t-tullis)  
[@nickcannariato](https://github.com/nickcannariato)  
[@BrandonGardener2](https://github.com/brandongardener2)

## Contribute

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2019 Team Bubl
