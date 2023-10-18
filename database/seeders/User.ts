import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'superadmin@gmail.com',
      password: '123456789',
      firstName: 'Super',
      lastName: 'Admin',
    })
  }
}
