import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Venue from 'App/Models/Venue'
import Field from 'App/Models/Field'
import Booking from 'App/Models/Booking'

export default class VenuesController {
    
    /**
     * @swagger
     * /fields:
     *  get:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Fields
     *      summary: Get all fields
     *      responses:
     *          201:
     *              description: data is successfully shown
     *              example:
     *                  message: data is successfully shown
     */

    public async index({ response }: HttpContextContract) {
        const fields = await Field.query().preload('bookings').preload('venue')
        response.status(200).json({message: 'data is successfully shown', data: fields})
    }

    /**
     * @swagger
     * /fields:
     *  post:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Fields
     *      summary: Create new fields
     *      parameters:
     *          -   name: venue
     *              description: name of the field
     *              in: query
     *              required: true
     *              type: string
     *          -   name: name
     *              description: name of the field
     *              in: query
     *              required: true
     *              type: string
     *          -   name: type
     *              description: type of the field
     *              in: query
     *              required: true
     *              type: string
     *      responses:
     *          201:
     *              description: data is successfully created
     *              example:
     *                  message: data is successfully created
     */

    public async store({ request, response }: HttpContextContract) {
        
        const venue = await Venue.findBy('name', request.input('venue'))
        
        const newField = new Field()
        newField.name = request.input('name')
        newField.type = request.input('type')
        
        await venue?.related('fields').save(newField)
        response.created({ message: 'data is successfully created', data: newField})
    }

    /**
     * @swagger
     * /fields/{id}:
     *  get:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Fields
     *      summary: Show a field based on id
     *      parameters:
     *          -   name: id
     *              description: id of the field
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
        const field = await Field.query().preload('bookings').preload('venue').where('id', params.id)
        response.status(200).json({message: 'data is successfully shown', data: field})
    }

    /**
     * @swagger
     * /fields/{id}:
     *  put:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Fields
     *      summary: Show a field based on id
     *      parameters:
     *          -   name: id
     *              description: id of the venue
     *              in: path
     *              required: true
     *              type: string
     *          -   name: venue
     *              description: name of the venue
     *              in: query
     *              required: true
     *              type: string
     *          -   name: name
     *              description: name of the field
     *              in: query
     *              required: true
     *              type: string
     *          -   name: type
     *              description: type of the field
     *              in: query
     *              required: true
     *              type: string
     *      responses:
     *          201:
     *              description: data is successfully updated
     *              example:
     *                  message: data is successfully updated
     */

    public async update({ request, response, params }: HttpContextContract) {
        let id = params.id
        const updatedfield = await Field.findOrFail(id)
        updatedfield.name = request.input('name')
        updatedfield.type = request.input('type')
        await updatedfield.save()
        return response.status(200).json({message: 'data is successfully updated', data: updatedfield})
    }

    /**
     * @swagger
     * /fields/{id}/bookings:
     *  post:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Fields
     *      summary: Book a field
     *      parameters:
     *          -   name: id
     *              description: id of the field
     *              in: path
     *              required: true
     *              type: string
     *          -   name: play_date_start
     *              description: play_date_start of the booking
     *              in: query
     *              required: true
     *              type: string
     *          -   name: play_date_end
     *              description: play_date_end of the booking
     *              in: query
     *              required: true
     *              type: string
     *          -   name: field
     *              description: name of the field
     *              in: query
     *              required: true
     *              type: string
     *          -   name: venue
     *              description: name of the venue
     *              in: query
     *              required: true
     *              type: string
     *      responses:
     *          201:
     *              description: data is successfully created
     *              example:
     *                  message: data is successfully created
     */

    public async createBooking({ request, response, auth }: HttpContextContract) {
        
      const loginUserId = auth.user?.id
      const loginUser = await User.findOrFail(loginUserId)

      const bookingField = await Field.findBy('name', request.input('field'))
      
      const newBooking = new Booking()
      newBooking.play_date_start = request.input('play_date_start')
      newBooking.play_date_end = request.input('play_date_end')

      await loginUser.related('bookings').save(newBooking)
      await bookingField?.related('bookings').save(newBooking) 
      
      response.created({ message: 'data is successfully created', data: newBooking})
      
  }

}