<h1 align="center"> Movies database API </h1>
<h3 align="center"> Practicando ExpressJS </h3>

- Clonar este repo

- Instalar todas las dependencias.

- Crear un servidor HTTP con ExpressJS. El mismo debe tener los siguientes endpoints:
  - GET '/api' --> Devuelve la información general de la base de datos.
  - GET '/api/movies' --> Devuelve una collection en formato JSON con todas las películas de la DB.
  - GET '/api/movies/:id' --> Devuelve una película según su ID.
  - POST '/api/movies' --> Crea una nueva película en la base de datos y responde al cliente con el código según corresponda.
  - PATCH '/api/movies/:id' --> Actualiza parcialmente la información de la película indicada por el ID.

#### En el package.json figura jsonfile, dependencia que pueden usar para simplificar la escritura de datos a la DB.