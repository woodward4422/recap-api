# Recap API

### Overview

Recap is an authenticated REST API that is used to communicate with a MongoDB database and an AWS Lambda function which will communicate with AVS(Alexa Voice Services) and ASK(Alexa Skills Kit) to buildout an Amazon Alexa Skill. The Recap Alexa Skill is a skill that allows you to keep tweet length meeting recaps to be used for reference in the future.

## Obtaining an authorization token

A POST request to /users/new can be made with a 'username' field in the body of the request. A password is not used in the authentication process since authenticated request will follow under a two factor authentication system through Amazon's customer profile API for Alexa(All authenticated Alexa accounts will be able to make a request to the recap-api):
_Sample Request_

```js
// GET https://recap-api.herukuapp.com/users/new

{
"username": USER_NAME_HERE,
}
```

Login is handled exactly like register, and depending if the username exists, it will either return :
_Sample Request_

```


```

On a successful request, you should recieve back a JWT token that will need to be passed into the _Authorization Header_ for future requests.

## Making a resource request

A GET request to /memos can be made with a valid JWT token in the auth headers. There is no need to pass a user ID since the middleware will be able to associate the valid JWT token with a user. Make sure to set the Authorization Header to your JWT token. Authorization should look something like `authorization: YOUR_JWT_TOKEN`

All other requests follow the same exact pattern. I know you might be wondering why we dont have to pass around :id in the parameters to equate users to memos and vice versa, but the magic is in the magic of the API that is able to associate the JWT that is passed in authentication header to a User. The User then will be used to associate to memos

_Make sure to always pass a valid JWT in the authorization headers_

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

| Verb   |    Endpoint    |                        Description |
| ------ | :------------: | ---------------------------------: |
| POST   |   /users/new   |                     Creates a User |
| POST   |  /users/login  |                Get a specific User |
| DELETE |     /users     |            Deletes a specific User |
| PUT    |     /users     |            Updates a specific User |
| GET    |     /memos     | Gets all memos for a specific user |
| GET    | /memos/:memoID |     Get a specific memo for a user |
| POST   |   /memos/new   |                      Create a memo |
