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

Cree un repositorio en github (llamado bootcamp)

Inicialize mi carpeta de trabajo con GIT, y le hice link al repositorio remoto de github

Puse en la carpeta de trabajo este Read.me y un .gitignore basado en el .gitignore que baje del github de Enrique
(para poder excluir el node_modules y la carpeta de datos my_data, y algunos otros archivos que ya venian en el original)

Luego vuelco archivos utiles (basic_server_mongodb.js para empezar a llenar la coleccion en mongodb)
Utilice la version inicial de Enrique de server.js como base para construir la API.

Alli, empiezo a trabajar sobre server.js para hacer los 2 metodos GET, el PUT y el DELETE.

Cree una coleccion de llamadas en Postman para ir probando los metodos de la Api.

Metodos:

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
