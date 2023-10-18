import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import ApiResponseFormatter from 'App/Helpers/ApiResponseFormatter'
import User from 'App/Models/User'
import RegisterRequestValidator from 'App/Validators/RegisterRequestValidator'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.query().where('email', email).firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized(ApiResponseFormatter.error('Invalid credentials', 401))
    }

    const token = await auth.use('api').generate(user, {
      expiresIn: '14 days',
    })

    return response.json(ApiResponseFormatter.success(token, 'Token generated', 200))
    // return response.json(user.password)
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterRequestValidator)

    const registered = await Database.transaction(async (trx) => {
      const user = new User()
      ;(user.email = payload.email), (user.password = payload.password)
      ;(user.firstName = payload.first_name), (user.lastName = payload.last_name)

      user.useTransaction(trx)
      await user.save()

      return user
    })

    if (registered) {
      const token = await auth.use('api').login(registered, {
        expiresIn: '14 days',
      })
      return response.json(
        ApiResponseFormatter.success(token.toJSON(), 'Berhasil register dan generate token')
      )
    }

    return response.badRequest(
      ApiResponseFormatter.error('Berhasil register dan generate token', 400)
    )
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()

    return response.json(ApiResponseFormatter.success(true, 'Token revoked'))
  }
}
