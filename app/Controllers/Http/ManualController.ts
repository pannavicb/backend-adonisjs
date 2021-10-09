import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Venue from 'App/Models/Venue'
import Field from 'App/Models/Field'
import Booking from 'App/Models/Booking'

export default class ManualController {

    public async tambahUser({request, response}: HttpContextContract) {
        const newUser = new User()
        newUser.name = request.input('name')
        newUser.email = request.input('email')
        newUser.password = request.input('password')
        newUser.role = request.input('role')
        await newUser.save()
        response.created({ message: 'data is successfully created', data: newUser})
    }

    public async lihatUser({ request, response }: HttpContextContract) {
        if (request.qs().name != undefined) {
            let name = request.qs().name
            const user = await User.findBy('name', name)
            response.status(200).json({message: 'data is successfully shown', data: user})
        } 
        else {
            const users = await User.query().preload('venues')
            response.status(200).json({message: 'data is successfully shown', data: users})
        }
    }

    public async tambahVenue({ request, response }: HttpContextContract) {
        
        const user = await User.findOrFail(1) // tentukan user yg pembuat venuenya, akan tercatat primary key (id) nya pada tabel venue

        const newVenue = new Venue()
        newVenue.name = request.input('name')
        newVenue.phone = request.input('phone')
        newVenue.address = request.input('address')

        await user.related('venues').save(newVenue) // membuat venue baru by a certain user. 'venues' adalah nama foreign key yg dideclare di hasMany model User
        response.created({ message: 'data is successfully created', data: newVenue})
    }

    public async lihatVenue({ request, response }: HttpContextContract) {
        if (request.qs().name != undefined) {
            let name = request.qs().name
            const venue = await Venue.findBy('name', name)
            response.status(200).json({message: 'data is successfully shown', data: venue})
        } 
        else {
            const venues = await Venue.query().preload('fields').preload('user') // 'user' adalah nama foreign key yg dideclare di belongsTo model Venue 
            response.status(200).json({message: 'data is successfully shown', data: venues})
        }
    }

    public async tambahField({ request, response }: HttpContextContract) {

        const venue = await Venue.findOrFail(1) // tentukan venue yg pembuat fieldnya, akan tercatat primary key (id) nya pada tabel field

        const newField = new Field()
        newField.name = request.input('name')
        newField.type = request.input('type')
        
        await venue.related('fields').save(newField) // membuat field baru by a certain venue. 'fields' adalah nama foreign key yg dideclare di hasMany model Venue
        response.created({ message: 'data is successfully created', data: newField})
    }
    
    public async lihatField({ request, response }: HttpContextContract) {
        if (request.qs().name != undefined) {
            let name = request.qs().name
            const field = await Field.findBy('name', name)
            response.status(200).json({message: 'data is successfully shown', data: field})
        } 
        else {
            const fields = await Field.query().preload('bookings').preload('venue') // 'venue' adalah nama foreign key yg dideclare di belongsTo model Field 
            response.status(200).json({message: 'data is successfully shown', data: fields})
        }
    }

    public async tambahBooking({ request, response }: HttpContextContract) {
        
        const bookingUser = await User.findOrFail(1) //pembooking
        const field = await Field.findOrFail(1) // tentukan field yg pembuat bookingnya, akan tercatat primary key (id) nya pada tabel booking
        
        const names = [{name: 'asep',},{name: 'budi',}] //yang main
        let users = await User.fetchOrCreateMany('name', names)
        let usersId = users.map(user => user.id)

        const newBooking = new Booking()
        newBooking.play_date_start = request.input('play_date_start')
        newBooking.play_date_end = request.input('play_date_end')

        await bookingUser.related('bookings').save(newBooking) // membuat booking baru by a certain user. 'bookings' adalah nama foreign key yg dideclare di hasMany model User
        await field.related('bookings').save(newBooking) // membuat booking baru by a certain field. 'bookings' adalah nama foreign key yg dideclare di hasMany model Field
        await newBooking.related('users').sync(usersId) // mendaftarkan user siapa saja yang terdaftar pada booking 

        response.created({ message: 'data is successfully created', data: newBooking})
    }

    public async lihatBooking({ request, response }: HttpContextContract) {
        if (request.qs().name != undefined) {
            let name = request.qs().name
            const booking = await Booking.findBy('name', name)
            response.status(200).json({message: 'data is successfully shown', data: booking})
        } 
        else {
            const bookings = await Booking.query().preload('field').preload('users') // 'field' adalah nama foreign key yg dideclare di belongsTo model Booking. 'users' dalah ManytoMany key
            response.status(200).json({message: 'data is successfully shown', data: bookings})
        }
    }

}
