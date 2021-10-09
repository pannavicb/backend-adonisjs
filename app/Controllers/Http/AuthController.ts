import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {

    /**
     * @swagger
     * /register:
     *  post:
     *      tags:
     *          -   Authentication
     *      summary: Registration user API
     *      parameters:
     *          -   name: name
     *              description: name of the user
     *              in: query
     *              required: true
     *              type: string
     *          -   name: email
     *              description: email of the user
     *              in: query
     *              required: true
     *              type: string
     *          -   name: password
     *              description: password of the user
     *              in: query
     *              required: true
     *              type: string
     *          -   name: role
     *              description: role of the user
     *              in: query
     *              required: true
     *              type: string
     *      responses:
     *          200:
     *              description: Inform that registration is success
     *              example:
     *                  message: user registered, please verify OTP code
     */

    public async register({request, response}: HttpContextContract) {
        try {
            const data = await request.validate(UserValidator) 
            const newUser = await User.create(data)

            const otp_code = Math.floor( 100000 + Math.random() * 900000 )
            await Database.table('otp_codes').insert({ otp_code : otp_code, user_id : newUser.id})

            await Mail.send((message) => {
                message
                  .from('admin@example.com')
                  .to(newUser.email)
                  .subject('OTP verification')
                  .htmlView('emails/otp_verification', { otp_code })
            })

            return response.created({message: 'user registered, please verify OTP code', newUser: newUser})
        }
        catch (error) {
            return response.unprocessableEntity({message: error.messages})
        }  
    }
    
    /**
     * @swagger
     * /login:
     *  post:
     *      tags:
     *          -   Authentication
     *      summary: Login user API
     *      parameters:
     *          -   name: email
     *              description: email of the user
     *              in: query
     *              required: true
     *              type: string
     *          -   name: password
     *              description: password of the user
     *              in: query
     *              required: true
     *              type: string
     *      responses:
     *          200:
     *              description: Inform that login is success
     *              example:
     *                  message: user login
     */

    public async login({ request, response, auth }: HttpContextContract) {
        try {
            const email = request.input('email')
            const password = request.input('password')
            const token = await auth.use('api').attempt(email, password)
            
            const loginUser = auth.user?.id 
            console.log(loginUser)

            return response.ok({message: 'user login', token: token})
        }
        catch (error) {
            return response.badRequest({messages: error.message})
        }
    }
    
    /**
     * @swagger
     * /otp-confirmation:
     *  post:
     *      security:
     *          -   bearerAuth: []
     *      tags:
     *          -   Authentication
     *      summary: OTP verification API
     *      parameters:
     *          -   name: email
     *              description: email of the user
     *              in: query
     *              required: true
     *              type: string
     *          -   name: otp_code
     *              description: otp-code of the user
     *              in: query
     *              required: true
     *              type: int
     *      responses:
     *          200:
     *              description: Inform that OTP verification is success
     *              example:
     *                  message: User is success to verify OTP
     */

    public async otp({ request, response }: HttpContextContract) {
        let otp_code = request.input('otp_code')
        let email = request.input('email')
        let user = await User.findBy('email', email)
        let otp = await Database.query().from('otp_codes').where('otp_code', otp_code).first()

        if (user?.id == otp.user_id) { // user? --> meaning that user maybe undefined or null if findBy fails
            user.is_verified = true
            await user?.save()
            return response.created({message: 'User is success to verify OTP'})    
        } else {
            return response.status(400).json({message: 'User is failed to verify OTP'})
        } 
    }
}
