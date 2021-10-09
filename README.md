# backend-adonisjs

This is a web API application of sport field ticketing. This project only contains the backend-side without the front-end/view. The API is deployed on http://backend-adonisjs.herokuapp.com/. The API documentation can be seen on https://backend-adonisjs.herokuapp.com/docs/index.html. The documentation is generated using swagger.

This project is node js based, developed using Adonis js framework. The development of Adonis js framework is run on typescript environment. In the production, the code is converted to javascript. 

This project operates RESTful API. Basic CRUD (Create, Read, Update, Delete) operations are implemented. Object Relational Model (ORM) concept is applied. ORM sees 1 data row in the database as 1 instance of model object, making the data operation becomes easier to do. In the development phase, this project uses mysql. In the production, postgre sql is employed.

Several general backend features are implemented: CRUD, authentication (bearer token), sending mail (for OTP verification), etc.
