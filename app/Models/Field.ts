import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Venue from 'App/Models/Venue'
import Booking from 'App/Models/Booking'

/**
 * @swagger
 * definitions:
 *  Field:
 *    type: object
 *    properties:
 *      id:
 *        type: uint
 *      name:
 *        type: string
 *      type:
 *        type: string
 *      venue_id:
 *        type: string
 *    required:
 *      - name
 *      - type
 *      - venue_id
 */

export default class Field extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public venue_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Booking, {
    foreignKey: 'field_id', // default is fieldId, but it is "field_id" in Booking model
  })
  public bookings: HasMany<typeof Booking>
  
  @belongsTo(() => Venue, {
    foreignKey: 'venue_id', // default is venueId, but it is "venue_id" in Field model
  })
  public venue: BelongsTo<typeof Venue>
}
