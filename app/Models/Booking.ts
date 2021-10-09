import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Field from 'App/Models/Field'
import User from 'App/Models/User'

/**
 * @swagger
 * definitions:
 *  Booking:
 *    type: object
 *    properties:
 *      id:
 *        type: uint
 *      play_date_start:
 *        type: string
 *      play_date_end:
 *        type: string
 *      user_id:
 *        type: string
 *      field_id:
 *        type: string
 *    required:
 *      - play_date_start
 *      - play_date_end
 *      - user_id
 *      - field_id
 */

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public play_date_start: string

  @column()
  public play_date_end: string

  @column()
  public user_id: number // login user who first books the booking

  @column()
  public field_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @belongsTo(() => Field, {
    foreignKey: 'field_id', // default is fieldId, but it is "field_id" in Booking model
  })
  public field: BelongsTo<typeof Field>
  
  @belongsTo(() => User, {
    foreignKey: 'user_id', // default is userId, but it is "user_id" in Booking model
  })
  public user: BelongsTo<typeof User>
  
  @manyToMany(() => User, {
    pivotTable: 'user_booking', // somehow the default is "booking_user", {
    localKey: 'id',
    pivotForeignKey: 'booking_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  public users: ManyToMany<typeof User>
}
