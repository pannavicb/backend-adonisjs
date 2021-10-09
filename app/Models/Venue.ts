import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Field from 'App/Models/Field'
import User from 'App/Models/User'

/**
 * @swagger
 * definitions:
 *  Venue:
 *    type: object
 *    properties:
 *      id:
 *        type: uint
 *      name:
 *        type: string
 *      phone:
 *        type: string
 *      address:
 *        type: string
 *      user_id:
 *        type: string
 *    required:
 *      - name
 *      - phone
 *      - address
 *      - user_id
 */

export default class Venue extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public address: string

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Field, {
    foreignKey: 'venue_id', // default is venueId, but it is "venue_id" in Field model
  })
  public fields: HasMany<typeof Field>
  
  @belongsTo(() => User, {
    foreignKey: 'user_id', // default is userId, but it is "user_id" in Venue model
  })
  public user: BelongsTo<typeof User>
}
