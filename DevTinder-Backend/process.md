-- created MONGODB ATLAS 
-- connected to Compass 
-- connected to web using Mongoose 
-- Schema,Model for each collection
-- PostMan routes
-- Model validation (DB LEVEL) ,(API LEVEL)
-- usage of Validator package
-- custom validate function
-- Password is hashed before it is stored in the DB
-- bcrypt - for hashing the password
-- JWT for authentication [jwt is sent within cookie,the cookie is then parsed using Cookie-parser ]
-- establishing connections for user
-- from user - to user
        - Constraints -
-- if fromUser-toUser already exists connection is not allowed,
-- if no toUser exists connection is not allowed,
-- fromUser-fromUser then it is invalid connection is not allowed,
-- invalid status is not allowed (Interested,Ignored) (Accepted,Rejected)

send request --> (ignored,Interested) fromId -- toId

review request -->(Accepted,Rejected) by toId for all the request received

get all the requests of an user

get all the connections of an user 

get the feed of an user -- users on feed =total - already sent + already connected
-- skip() , limit() ---> pagination



