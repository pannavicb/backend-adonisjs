import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, hasMany, HasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Venue from 'App/Models/Venue'
import Booking from 'App/Models/Booking'

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      id:
 *        type: uint
 *      name:
 *        type: string
 *      email:
 *        type: string
 *      password:
 *        type: string
 *      rememberMeToken:
 *        type: string
 *      role:
 *        type: string
 *      is_verified:
 *        type: string
 *    required:
 *      - name
 *      - email
 *      - password
 *      - role
 */

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public role: string

  @column()
  public is_verified: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @hasMany(() => Venue, {
    foreignKey: 'user_id', // default is userId, but it is "user_id" in venues model
  })
  public venues: HasMany<typeof Venue>

  @hasMany(() => Booking, {
    foreignKey: 'user_id', // default is bookingId, but it is "booking_id" in booking model
  })
  public bookings: HasMany<typeof Booking>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
