# API-REST
API de base au format REST, en utilisant Node.js, autentification HTTP, Sequelize et express

Utilisation:

Dans un terminal,après avoir cloné le dossier, tapez "npm install" (vous avez avoir isntallé npm) puis "nodejs server.js"

Vous pouvez faire des demandes sur le port 8081, ou le modifier dans le fichier server.js:

"App.listen (Numéro de port que vous voulez écouter);"

Toutes les données retournées sont au format JSON

Routes:

- GET / user / {id}:

Format de réponse: { "id": 1, "nom": "Blu", "firstname": "John", "email": "john.blu@mail.com", "rôle": "normal"}

- GET / utilisateurs:

Retourne tous les utilisateurs

- POST / utilisateurs:

Ajouter un nouvel utilisateur

Exemple de données envoyées:

{ "Nom": "Cash", "firstname": "Johnny", "email": "johnny.cash@etna-alternance.net", "password": "sécuriser", "rôle": "normal"}

- PUT / user / {id}:
Modifier un utilisateur

Exemple de données envoyées:

{ 
"Nom": "Cash"
}

- DELETE / user / {id}:

Supprimer un utilisateur


# API-REST
Basic API in Rest-full, using Node.js, HTTP autentification and Express

Usage : 


In a terminal, make "npm install" (you have ton install npm) then "nodejs server.js"

You can do requests on 8081 port, or change it in the file server.js : 

"app.listen(Number of port you want to listen);"

All datas returned are in JSON format

Routes : 

- GET /user/{id}  :

 Response Format example : 
  {
         "id": 1,
         "lastname": "Blu",
         "firstname": "John",
         "email": "john.blu@mail.com",
         "role": "normal"
  }		
  
-    GET /users  :
 
 Return all users

-    POST /users :

Add a new user

Sended datas example : 

  {
        "lastname": "Cash",
        "firstname": "Johnny",
         "email": "johnny.cash@etna-alternance.net",
        "password": "secure",
        "role": "normal"
  }

-    PUT /user/{id} :

Alter an user

Sended datas example : 

   {
          "lastname": "Cash"
   }
      
-  DELETE /user/{id}  :

Delete a user
