# bootcamp

Primero, instale en el notebook:
    - NodeJS
    - Git
    - WSL (version 2)
    - Ubuntu (instalo la version por default, pues hice un wsl --install)
    - Docker Desktop

Nota: no instale aun VirtualBox, me parece que en esta actividad no es necesario.

Luego, cree contenedor de mongodb, para tener una base de datos sobre la que poder trabajar, y con persistencia local.

Comando utilizado:
docker run --name mongodb-fullstack --hostname mongodb-fullstack -d -p 27017:27017 -v C:\JCode\Bootcamp\my_data\db:/data/db mongo
(mi carpeta de trabajo es C:\JCode\Bootcamp) y en la carpeta my_data quedan los datos persistidos

Cree un repositorio en github (llamado bootcamp)

Inicialize mi carpeta de trabajo con GIT, y le hice link al repositorio remoto de github

Puse en la carpeta de trabajo este Read.me y un .gitignore basado en el .gitignore que baje del github de Enrique
(la idea es excluir el node_modules y la carpeta de datos my_data, y algunos otros archivos que ya venian en el original)
