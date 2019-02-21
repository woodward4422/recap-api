# Recap API

### Overview

Recap is an authenticated REST API that is used to communicate with a MongoDB database and an AWS Lambda function which will communicate with AVS(Alexa Voice Services) and ASK(Alexa Skills Kit) to buildout an Amazon Alexa Skill. The Recap Alexa Skill is a skill that allows you to keep tweet length meeting recaps to be used for reference in the future.

### Examples

### Authentification

### Endpoints

Recap-API follows a RESTful Architecture

| Verb |    Endpoint    |                        Description |
| ---- | :------------: | ---------------------------------: |
| POST |   /users/new   |                     Creates a User |
| GET  | /users/:userID |                Get a specific user |
| GET  |     /memos     | Gets all memos for a specific user |
| GET  | /memos/:memoID |     Get a specific memo for a user |
| POST |   /memos/new   |                      Create a memo |
