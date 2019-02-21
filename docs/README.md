# Recap API

### Overview

Recap is an authenticated REST API that is used to communicate with a MongoDB database and an AWS Lambda function which will communicate with AVS(Alexa Voice Services) and ASK(Alexa Skills Kit) to buildout an Amazon Alexa Skill. The Recap Alexa Skill is a skill that allows you to keep tweet length meeting recaps to be used for reference in the future.

### Examples

All example use cases of the API map to an according Alexa intent request. For example, a user triggers the intent handler for the intent that handles the creation of a new memo, and then the POST memo/new route will be called to create a memo for the current user(passed from the Alexa userID per device).

**"Hey Alexa, open recap"**

On initial launch, the user will be prompted in the skill to allow the use of an email and name from their Amazon account(Customer Profile API). If given proper permissions, a new user will be created by hitting the **POST users/new route**

**"Alexa, add a memo to my meeting with John"**

This is an intent that will be triggered and with the slot values corrected of a memo title of "Meeting with John". This information will be stored locally until the user provides Alexa with the actual memo content. Once the memo content is fulfilled, then it will hit the **POST /memos/new**

**"Alexa, get my memo from my meeting with John"**

This will trigger the get memo intent in which will hit the **GET /memo** route to retrieve memos for the user and will search for the memo with the title "meeting with John" and the memo content will be passed to Alexa as a response to the user, or an error prompt if there is no memo with the said title.

### Authentification

The create user process will be handled with the use of the customer profile api which provides the proper credentials to be passed to the api for authentication purposes. On the first session of the skill, a user will be automatically registered to the database. All requests have to be authenticated with a JWT token. Successful user registration and skill invocations will pass back JWT tokens for authenticated further requests.

### Endpoints

Recap-API follows a RESTful Architecture

| Verb |    Endpoint    |                        Description |
| ---- | :------------: | ---------------------------------: |
| POST |   /users/new   |                     Creates a User |
| GET  | /users/:userID |                Get a specific user |
| GET  |     /memos     | Gets all memos for a specific user |
| GET  | /memos/:memoID |     Get a specific memo for a user |
| POST |   /memos/new   |                      Create a memo |
