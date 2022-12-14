# bootcamp

Primero, instale en el notebook:
    - Visual Studio Code
    - NodeJS
    - Git
    - WSL (version 2)
    - Ubuntu (instalo la version por default, pues hice un wsl --install)
    - Docker Desktop
    - Postman

Nota: no instale aun VirtualBox, me parece que en esta actividad no es necesario.

Luego, cree contenedor de mongodb, para tener una base de datos sobre la que poder trabajar, y con persistencia local.

Comando utilizado:
docker run --name mongodb-fullstack --hostname mongodb-fullstack -d -p 27017:27017 -v C:\JCode\Bootcamp\my_data\db:/data/db mongo
(mi carpeta de trabajo es C:\JCode\Bootcamp) y en la carpeta my_data quedan los datos persistidos


Cree un repositorio publico en github (llamado bootcamp).

Inicialize mi carpeta de trabajo con GIT, y le hice link al repositorio remoto de github

Puse en la carpeta de trabajo este Read.me y un .gitignore basado en el .gitignore que baje del github de Enrique
(para poder excluir el node_modules y la carpeta de datos my_data, y algunos otros archivos que ya venian en el original)

Luego vuelco archivos utiles (basic_server_mongodb.js para empezar a llenar la coleccion en mongodb)
Utilice la version inicial de Enrique de server.js como base para construir la API

Alli, empiezo a trabajar sobre server.js para hacer los 2 metodos GET, el PUT y el DELETE.

Cree una coleccion de llamadas en Postman para ir probando los metodos de la Api.

Adjunto un documento PDF con Screenshots de lo realizado (Screenshots.pdf)

Documentacion de la API:

GET /query/all
    Ejemplo de uso: http://0.0.0.0:8080/query/all
    Si la collecion tiene datos => (200 OK),  devuelve todos los mensajes de la coleccion
    Si la collection esta vacia => (200 OK), devuelve "No data found in collection"

GET /query?host
    Ejemplo de uso: http://0.0.0.0:8080/query?host=LAPTOP-GM0OSER6
    Si no recibe el parametro ?host => (400 BAD REQUEST), devuelve "Missing parameter :host"
    Si encuentra datos para el parametro ?host => (200 OK), devuelve todos los mensajes encontrados para dicho parametro
    Si no encuentra datos para el parametro ?host => (200 OK), devuelve "No data found with received parameter"

PUT /:host'
    Ejemplo de uso: http://0.0.0.0:8080/TOSHIBA
    Si encuentra datos para el parametro :host => (200 OK), devuelve "n Record(s) updated successfully" donde n es la cantidad de mensajes updateados
    Si no encuentra datos para el parametro :host => (201 CREATED), inserta un mensaje nuevo y devuelve "No data for parameter :host, new message inserted in database"

DELETE /:host'
    Ejemplo de uso: http://0.0.0.0:8080/LAPTOP-GM0OSER6
    Si encuentra datos para el parametro :host => (200 OK), devuelve "n Record(s) deleted successfully", donde n es la cantidad de mensajes borrados
    Si no encuentra datos para el parametro :host => (204 NO CONTENT), sin mensaje


Dockerizacion de API

Primero, creamos la imagen de la API, cuyo codigo a ejecutar es el server.js, con el siguiente comando:
docker build . -t jpanzera/node-api

Luego, corremos un contenedor con la API, con el siguiente comando:
docker run --name jpanzeranodeapi -p 8080:8080 -d jpanzera/node-api

Aclaracion de la url de conexion hacia mongodb
Para el string de conexion desde la API dockerizada hacia el contenedor de mongodb, utilice la IP que obtuve
desde docker inspect, dado que con el nombre del contenedor no funciono (quizas sea un tema de Windows).
Vi que con docker compose se podian desplegar varios contenedores a la vez, dando nombres de servicio a cada contenedor, y que 
eso solucionaria el tema de poder usar el nombre del contenedor en  el string de conexion. 
(En realidad trabaje en 2 notebooks para verificar que no fuera un tema especifico de alguna maquina en particular, 
en uno de ellos el contenedor de mongo se llama mongodb-fullstack, y en el otro mongodb-container, para el string de conexion sin embargo tuve que usar la IP en ambos notebooks, en lugar del nombre del contenedor )



Branches en Git/Github

A modo de ejemplo de uso de branches, se crea un nuevo branch llamado put_optimize
Su proposito es optimizar el metodo PUT, ya que la primer version primero consultaba en la coleccion para ver si habia datos
para actualizar o no.
El metodo updateMany utilizado devuelve la cantidad de mensajes actualizados, por lo que no es necesario consultar previamente.

Se crea un pull request para esta branch, y se hace merge con main. Se deja la branch en Github a modo de evidencia.

