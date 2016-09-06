# API-REST
Basic API in Rest-full, using Node.js, HTTP autentification and Express

Usage : 


In a terminal, make "npm install" (you have ton install npm) then "nodejs server.js"

You can do requests on 8081 port, or change it in the file server.js : 

"app.listen(Number of port you want to listen);"

All datas returned are in JSON format

Routes : 

1.   GET /user/{id}  :

 Response Format example : 
  {
         "id": 1,
         "lastname": "Blu",
         "firstname": "John",
         "email": "john.blu@mail.com",
         "role": "normal"
  }		
  
2.    GET /users  :
 
 Return all users

3.    POST /users :

Add a new user

Sended datas example : 

  {
        "lastname": "Cash",
        "firstname": "Johnny",
         "email": "johnny.cash@etna-alternance.net",
        "password": "secure",
        "role": "normal"
  }

4.    PUT /user/{id} :

Alter an user

Sended datas example : 

   {
          "lastname": "Cash"
   }
      
5.   DELETE /user/{id}  :

Delete a user
