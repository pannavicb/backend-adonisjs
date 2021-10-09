import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
// import Venue from 'App/Models/Venue'
// import Field from 'App/Models/Field'
import Booking from 'App/Models/Booking'

export default class BookingsController {
    
    /**
     * @swagger
     * /bookings:
     *  get:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Bookings
     *      summary: Get all bookings
     *      responses:
     *          201:
     *              description: data is successfully shown
     *              example:
     *                  message: data is successfully shown
     */

    public async index({ response }: HttpContextContract) {
        const bookings = await Booking.query().preload('field').preload('users')
        response.status(200).json({message: 'data is successfully shown', data: bookings})
    }

    /**
     * @swagger
     * /bookings/{id}:
     *  get:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Bookings
     *      summary: Show a booking based on id
     *      parameters:
     *          -   name: id
     *              description: id of the booking
     *              in: path
     *              required: true
     *              type: string
     *      responses:
     *          201:
     *              description: data is successfully shown
     *              example:
     *                  message: data is successfully shown
     */

    public async show({ response, params }: HttpContextContract) {
        const booking = await Booking.query().preload('field').preload('users').where('id', params.id)
        response.status(200).json({message: 'data is successfully shown', data: booking})
    }

    /**
     * @swagger
     * /bookings/{id}/join:
     *  put:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Bookings
     *      summary: Join a booking based on id
     *      parameters:
     *          -   name: id
     *              description: id of the booking
     *              in: path
     *              required: true
     *              type: string
     *      responses:
     *          201:
     *              description: data is successfully shown
     *              example:
     *                  message: data is successfully shown
     */

    public async join({ response, params, auth }: HttpContextContract) {
        const loginUserId = auth.user?.id
        const booking = await Booking.findOrFail(params.id)
        await booking.related('users').sync([loginUserId]) 
        return response.created({message: 'you successfully join the booking'})    
    }

    /**
     * @swagger
     * /bookings/{id}/unjoin:
     *  put:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Bookings
     *      summary: Unjoin a booking based on id
     *      parameters:
     *          -   name: id
     *              description: id of the booking
     *              in: path
     *              required: true
     *              type: string
     *      responses:
     *          201:
     *              description: data is successfully shown
     *              example:
     *                  message: data is successfully shown
     */

    public async unjoin({ response, params, auth }: HttpContextContract) {
        const loginUserId = auth.user?.id
        const booking = await Booking.findOrFail(params.id)
        await booking.related('users').detach([loginUserId]) 
        return response.created({message: 'you successfully unjoin the booking'})    
    }

    /**
     * @swagger
     * /schedules:
     *  get:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Bookings
     *      summary: Get schedule of the login user
     *      responses:
     *          201:
     *              description: data is successfully shown
     *              example:
     *                  message: data is successfully shown
     */

    public async schedules({response, auth}: HttpContextContract) {
        
        const loginUserId = auth.user?.id

        const schedule = await Booking.query().whereHas('users', usersQuery => usersQuery.wherePivot('user_id', loginUserId))
        response.status(200).json({message: 'data is successfully shown', data: schedule})
    }

}