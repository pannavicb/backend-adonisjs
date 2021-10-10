# backend-adonisjs

This is a web API application for sports field booking. This project only contains the backend side without the frontend/view. This project is node js based, developed using AdonisJS framework. The development of AdonisJS framework is run on typescript environment. In the production, the code is converted to javascript. 

This project operates RESTful API. Basic CRUD (Create, Read, Update, Delete) operations are established. The controllers implement Object Relational Model (ORM) concept. ORM sees 1 data row in the database as 1 instance of model object, making the data processing becomes easier to operate. In the development phase, this project uses mysql. In the production, postgre sql is employed.

Several common backend features are implemented: CRUD, authentication (bearer token), sending mail (for OTP verification), etc.

The Entity Relationship Diagram (ERD) can be seen in the following figure:
![alt text](https://github.com/mukhlishga/backend-adonisjs/blob/main/erd.png?raw=true)

This backend project is deployed on http://backend-adonisjs.herokuapp.com/. The API documentation can be seen on https://backend-adonisjs.herokuapp.com/docs/index.html. This documentation is generated using swagger. You can try injecting the APIs in the API documentation. You can use the following bearer token to test some authentication-required APIs.

Bearer token: `MQ.7Og_oLprXb6KwBFse6UvlgmHgNuygnqpwf478yaXOxous6EoP6ZiYRF3WvI1`
