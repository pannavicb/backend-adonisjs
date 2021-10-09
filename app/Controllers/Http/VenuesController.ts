import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Venue from 'App/Models/Venue'
import Field from 'App/Models/Field'
import Booking from 'App/Models/Booking'

export default class VenuesController {
    
    /**
     * @swagger
     * /venues:
     *  get:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Venues
     *      summary: Get all venues
     *      responses:
     *          201:
     *              description: data is successfully shown
     *              example:
     *                  message: data is successfully shown
     */

    public async index({ response }: HttpContextContract) {
        const venues = await Venue.query().preload('fields').preload('user')
        response.status(200).json({message: 'data is successfully shown', data: venues})
    }

    /**
     * @swagger
     * /venues:
     *  post:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Venues
     *      summary: Create new venues
     *      parameters:
     *          -   name: name
     *              description: name of the venue
     *              in: query
     *              required: true
     *              type: string
     *          -   name: phone
     *              description: phone of the venue
     *              in: query
     *              required: true
     *              type: string
     *          -   name: address
     *              description: address of the venue
     *              in: query
     *              required: true
     *              type: string
     *      responses:
     *          201:
     *              description: data is successfully created
     *              example:
     *                  message: data is successfully created
     */

    public async store({ request, response, auth }: HttpContextContract) {
        
        const loginUserId = auth.user?.id
        const loginUser = await User.findOrFail(loginUserId)

        const newVenue = new Venue()
        newVenue.name = request.input('name')
        newVenue.phone = request.input('phone')
        newVenue.address = request.input('address')

        await loginUser.related('venues').save(newVenue) 
        response.created({ message: 'data is successfully created', data: newVenue})
    }

    /**
     * @swagger
     * /venues/{id}:
     *  get:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Venues
     *      summary: Show a venue based on id
     *      parameters:
     *          -   name: id
     *              description: id of the venue
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
        const venue = await Venue.query().preload('fields').where('id', params.id) //data booking belum tertampilkan
        response.status(200).json({message: 'data is successfully shown', data: venue})
    }

    /**
     * @swagger
     * /venues/{id}:
     *  put:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Venues
     *      summary: Show a venue based on id
     *      parameters:
     *          -   name: id
     *              description: id of the venue
     *              in: path
     *              required: true
     *              type: string
     *          -   name: name
     *              description: name of the venue
     *              in: query
     *              required: true
     *              type: string
     *          -   name: phone
     *              description: phone of the venue
     *              in: query
     *              required: true
     *              type: string
     *          -   name: address
     *              description: address of the venue
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
        const updatedVenue = await Venue.findOrFail(id)
        updatedVenue.name = request.input('name')
        updatedVenue.address = request.input('address')
        updatedVenue.phone = request.input('phone')
        await updatedVenue.save()
        return response.status(200).json({message: 'data is successfully updated', data: updatedVenue})
    }

}