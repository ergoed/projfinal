Grand Mongo Documentation
This API is a JSON RESTful API. The client is expected to send application/json as Content-Type HTTP Header and JSON formatted bodies.

Overview
This API is a mix of problems.

Create one Post
Add a new Post object into the system.

Request
POST /api/posts The Post object must be provided in the body.

Example
curl --request POST --data '{"title": "Tomato sauce", "body": "take 4 tomatoes..."}' https://example.tld/api/posts

Response

201 Created
The Post has been successfully created, the response body contains the saved version.

Example
{
    "__v": 0,
    "imgSRC":"image source",
    "body": "This is a d description ",
    "date": "125437849",
    "creator":{
                       "name":"john",
                       "avatarSRC":"img source",
                     "uid":"59664afc9d9bbc071bjdudje"
                     },
     "mII':"wedding2gg"

}

Read all the posts
Read all the Posts in the database.

Request
GET /api/posts

Example
curl --request GET https://example.tld/api/posts

Response

200 OK
The response body is an array of Post objects.

Example
[
    {
    "_id":"59664afc9d9bbc071bddfa08",
    "__v": 0,
    "imgSRC":"image source",
    "body": "This is a d description ",
    "date": "125437849",
    "creator":{
                       "name":"john",
                       "avatarSRC":"img source",
                       "uid":"59664afc9d9bbc071bjdudje"
                     }
    }
     "mII':"wedding2gg"
]

Read one post
Read a Post given its _id.

Request
GET /api/posts/:post_id

Example
curl --request GET https://example.tld/api/posts/59664afc9d9bbc071bddfa08

Response

200 OK
The response body is a Post object.

{
    "_id":"59664afc9d9bbc071bddfa08",
    "__v": 0,
    "imgSRC":"image source",
    "body": "This is a d description ",
    "date": "125437849",
    "creator":{
                       "name":"john",
                       "avatarSRC":"img source",
                       "uid":"59664afc9d9bbc071bjdudje"
                     }
     "mII':"wedding2gg"
}

404 Not Found
No Post could be found matching the requested _id.

Replace a post
Replace a Post with a complete Post object provided in the request.

Request
PUT /api/posts/:post_id The Post object must be provided in the body.

Example
curl --request PUT --data '{"title": "Avocado Salad", "__v": 0}' https://example.tld/api/posts/59664afc9d9bbc071bddfa08

Response

200 OK
The response body

Update a post
Update a Post with a partial Post object provided in the request.

Request
PATCH /api/posts/:post_id The partial Post object must be provided in the body.

Example
curl --request PATCH --data '{"body": "take as much avocado as you can, then..."}' https://example.tld/api/posts/59664afc9d9bbc071bddfa08

Response

200 OK
The response body is the new version of the Post object.

Example
    {
    "_id":"59664afc9d9bbc071bhh57",
    "__v": 0,
    "imgSRC":"image source",
    "body": "This is a d description ",
    "date": "125437849",
    "creator":{
                       "name":"john",
                       "avatarSRC":"img source",
                       "uid":"59664afc9d9bbc071bjdudje"
                     }
     "mII':"wedding2gg"
    }

404 Not Found
No Post could be found matching the requested _id.

Delete a post
Delete a Post from the database.

Request
DELETE /api/posts/:post_id

Example
curl --request DELETE https://example.tld/api/posts/59664afc9d9bbc071bddfa08

Response

200 OK
The response body is the removed Post object.

404 Not Found
No Post could be found matching the requested _id.

Guest messages

Create one Message
Add a new Message object into the system.

Request
POST /api/guestmessages The Post object must be provided in the body.

Example
curl --request POST --data '{"title": "Hi", "body": "all the best..."}' https://example.tld/api/guestmessages

Response

201 Created
The Message has been successfully created, the response body contains the saved

   {
    "__v": 0,
    "body": "This is a d description ",
    "title": "wrong order!",
    "creator":{
                       "name":"john",
                       "avatarSRC":"img source",
                       "uid":"59664afc9d9bbc071bjdudje"
                     },
         "id":"59664afc9d9bbc071bddfa08",
     "mII':"wedding2gg"
    }

Read all the posts
Read all the Posts in the database.

Request
GET /api/posts

Example
curl --request GET https://example.tld/api/posts

Response

200 OK
The response body is an array of Post objects.

Example
[
    {
    "_id":"59664afc9d9bbc071bddfa08",
    "__v": 0,
    "body": "This is a d description ",
    "date": "125437849",
    "creator":{
                       "name":"john",
                       "avatarSRC":"img source",
                       "uid":"59664afc9d9bbc071bjdudje"
                     }
     "mII':"wedding2gg"
    }
]

Wedding

Read one wedding
Read a Wedding given its _id.

Request
GET /api/weddings/:mID

Example
curl --request GET https://example.tld/api/weddings/:mID

Response

200 OK
The response body is a Post object.

{
    "_id":"59664afc9d9bbc071bddfa08",
    "__v": 0,
    "title":"my wedding",
    "date":"015-03-25:11:00"
    "body": "This is a d description ",
    "place1": "1'25437849,3'4568800",
    "place2": "1'23437849,3'2568800",
    "table":{
                       "number":"1",
                       "people":" John, Sarah",
                 },
     "mII':"wedding2gg"
}

404 Not Found
No Post could be found matching the requested _id.


Create one User
Add a new User object into the system.

Request
POST /api/users The User object must be provided in the body.

Example
curl --request POST --data '{"title": "Tomato sauce", "body": "take 4 tomatoes..."}' https://example.tld/api/posts

Response

201 Created
The Post has been successfully created, the response body contains the saved version.

Example
{
    "__v": 0,
    "avatatSRC":"image source",
    "name": "name ",
    "password": "password",
    "creator":
     "id":"59664afc9d9bbc071bjdudje"
}

Read all Users
Read all the Users in the database.

Request
GET /api/posts

Example
curl --request GET https://example.tld/api/posts

Response

200 OK
The response body is an array of Post objects.

Example

{
    "__v": 0,
    "avatatSRC":"image source",
    "name": "name ",
    "hash": "hgyvvhhggggg59664afc9d9bbc071bjdudje",
     "_id":"59664afc9d9bbc071bjdudje"
}

Read one User
Read a User given its _id.

Request
GET /api/users/:_id

Example
curl --request GET https://example.tld/api/users/59664afc9d9bbc071bddfa08

Response

200 OK
The response body is a User object.

{
    "__v": 0,
    "avatatSRC":"image source",
    "name": "name ",
    "hash": "hgyvvhhggggg59664afc9d9bbc071bjdudje",
     "_id":"59664afc9d9bbc071bjdudje"
}

404 Not Found
No Post could be found matching the requested _id.

Update a User
Update a User with a partial User object provided in the request.

Request
PATCH /api/User/:_id The partial Post object must be provided in the body.

Example
curl --request PATCH --data '{"body": "take as much avocado as you can, then..."}' https://example.tld/api/posts/59664afc9d9bbc071bddfa08

Response
 
200 OK
The response body is the new version of the Post object.

Example

{
    "__v": 0,
    "avatatSRC":"image source",
    "name": "name ",
    "hash": "hgyvvhhggggg59664afc9d9bbc071bjdudje",
     "_id":"59664afc9d9bbc071bjdudje"
}
