import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    // /**
    //  * Do not run when not in a environment specified in Seeder
    //  */
    // if (
    //   (!Seeder.default.environment.includes('development') && Application.inDev) ||
    //   (!Seeder.default.environment.includes('testing') && Application.inTest) ||
    //   (!Seeder.default.environment.includes('production') && Application.inProduction)
    // ) {
    //   return
    // }

    await new Seeder.default(this.client).run()
  }
  public async run() {
    await this.runSeeder(await import('../User'))
    await this.runSeeder(await import('../Todo'))
  }
}
