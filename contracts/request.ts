declare module '@ioc:Adonis/Core/Request' {
  interface RequestContract {
    wantsJSON(): boolean
  }
}
