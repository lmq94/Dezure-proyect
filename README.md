2-Respuestas a las preguntas teoricas:

a-Un Middleware otorga permite la modularizacion del codigo y la facilidad de ejecutar este en distintas parte de la aplicacion ya que en el contexto de una api este actua en el medio de las peticiones (Entre cliente y servidor) realizando tareas de validacion, seguridad, etc.
Puede encadenarce entre si y ejecutarse en secuenta (en algunos endpoint hice esto).

b-La inyección SQL es un tipo de ataque informático en el que un atacante aprovecha vulnerabilidades en la entrada de datos de una aplicación web para ejecutar comandos SQL no autorizados en la base de datos subyacente.
  Una manera de exitar esto es Usar consultas parametrizadas o preparadas usando un ORM (Object Relational Mappig) que es una de sus muchas funciones respecto a la persistencia de datos.

c-Una transacción SQL es una secuencia de operaciones que se realizan como una unidad atómica, para garanizar la integridad de los datos, si no se ejecuta toda la operacion total (todas sus partes) se vuelve todo para atras. Supongamos que tenemos 2 tablas: cliente y pedido, 
iniciamos una transaccion SQL creando un cliente y con ese cliente un pedido, si en algun punto sale un error (por ejemplo al insertar el pedido) se volvera todo para atras.

d-El paralelismo no se aprovecha directamente con async/await, ya que async/await se centra en la programación asíncrona, pero en Node.js  gracias a Promise.all() 2 empiezan a ejecutarse al mismo tiempo y se espera a que terminen para continuar

COSAS A TENER EN CUENTA CON LA API:

-EJECUTAR EL COMANDO npm instal para descargar todas las dependencias
-Crear una base de datos en localhost puerto 5432 (por defecto de PostgreSQL) 
-Correr las migraciones con el comando npx sequelize-cli db:migrate
-Crear un usuario y logearse (los 2 enpoints para esto no requiere autentificacion)
-Copiar manualmente el token (me disculpo por esto) y ponerlo en el input "Authorizate" arriba a la derecha, una vez hecho esto estaras autentificado para usar todos los endpoints
-El paginado del enpoints para obtener todos los producto es hasta 10, puede seleccionar la pagina que quiera ver (si hay mas de 1)
-El endpoint para hacer consultas al chatGPT puede ser lo mas problematico, requiere poner en .env una apiKEY de OpenAI valida para hacer consultas
