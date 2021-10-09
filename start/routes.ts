/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
 
Route.post('/register/', 'AuthController.register').as('auth.register')
Route.post('/login/', 'AuthController.login').as('auth.login')
Route.post('/otp-confirmation/', 'AuthController.otp').as('auth.otp')

Route.get('/venues/', 'VenuesController.index').as('venues.index').middleware(['auth','verify'])
Route.post('/venues/', 'VenuesController.store').as('venues.store').middleware('auth')
Route.get('/venues/:id', 'VenuesController.show').as('venues.show').middleware('auth')
Route.put('/venues/:id', 'VenuesController.update').as('venues.update').middleware('auth')

Route.get('/fields/', 'FieldsController.index').as('fields.index').middleware(['auth'])
Route.post('/fields/', 'FieldsController.store').as('fields.store').middleware('auth')
Route.get('/fields/:id', 'FieldsController.show').as('fields.show').middleware('auth')
Route.put('/fields/:id', 'FieldsController.update').as('fields.update').middleware('auth')
Route.post('/fields/:id/bookings', 'FieldsController.createBooking').as('fields.createBooking').middleware('auth')

Route.get('/bookings/', 'BookingsController.index').as('bookings.index').middleware('auth')
Route.get('/bookings/:id', 'BookingsController.show').as('bookings.show').middleware('auth')
Route.put('/bookings/:id/join', 'BookingsController.join').as('bookings.join').middleware('auth')
Route.put('/bookings/:id/unjoin', 'BookingsController.unjoin').as('bookings.unjoin').middleware('auth')
Route.get('/schedules/', 'BookingsController.schedules').as('bookings.schedules').middleware('auth')

// manual CRUD
Route.post('/manual/user', 'ManualController.tambahUser').as('manual.tambahUser')
Route.get('/manual/user', 'ManualController.lihatUser').as('manual.lihatUser')
Route.post('/manual/venue', 'ManualController.tambahVenue').as('manual.tambahVenue')
Route.get('/manual/venue', 'ManualController.lihatVenue').as('manual.lihatVenue')
Route.post('/manual/field', 'ManualController.tambahField').as('manual.tambahField')
Route.get('/manual/field', 'ManualController.lihatField').as('manual.lihatField')
Route.post('/manual/booking', 'ManualController.tambahBooking').as('manual.tambahBooking')
Route.get('/manual/booking', 'ManualController.lihatBooking').as('manual.lihatBooking')