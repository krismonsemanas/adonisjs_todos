import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const Request = this.app.container.use('Adonis/Core/Request')

    Request.macro('wantsJSON', function () {
      const types = this.types()
      return types[0] && (types[0].includes('/json') || types[0].includes('+json'))
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
