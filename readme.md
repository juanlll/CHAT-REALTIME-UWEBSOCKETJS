## CHAT-REALTIME-UWEBSOCKETJS

Es un proyecto personal acompañado de un conjunto de video tutoriales en youtube.
* Videos:
1   - https://www.youtube.com/watch?v=g68qEPoLvAI&t=521s
2.1 - https://www.youtube.com/watch?v=yJNeMV_MRRU
2.2 - https://www.youtube.com/watch?v=50kOebbmpSQ
2.3 - https://www.youtube.com/watch?v=mpdbLIPEH4I

La intención de desarrollar este proyecto fue el experimentar con las tecnologia uwebsockets, por un articulo publicado en medium que me motivo a probar, y al no encontrar información en español como tan especifica de la implementacíon basica, me surgio la idea de hacer unos videos tutoriales explicando a grandes rasgos la implementación basica.

Por defecto se usa docker para facilitar el proceso de desarrollo y despligue, hace uso de dos imagenes de dockerhub, node y mongo.

1# Paso : Clonar el repositorio y seleccionar
```sh
git clone <url-repository-github> 
cd <repository-name>
```

2# Ejecutar los contenedores de docker (SE REQUIERE TENER INSTALADO DOCKER EN SU EQUIPO)

```sh
docker-compose up -d 
```
El Servicio de websocket queda levantado en el puerto 5000 y El Index.html lo puede abrir desde el navegador sin ningun servidor.
```sh
127.0.0.1:5000
```

## License

MIT
