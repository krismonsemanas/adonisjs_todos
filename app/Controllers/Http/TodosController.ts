import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import ApiResponseFormatter from 'App/Helpers/ApiResponseFormatter'
import Todo from 'App/Models/Todo'
import StoreTodoRequestValidator from 'App/Validators/StoreTodoRequestValidator'
import UpdateTodoRequestValidator from 'App/Validators/UpdateTodoRequestValidator'

export default class TodosController {
  public async index({ response }: HttpContextContract) {
    const todos = await Todo.query()
    return response.json(ApiResponseFormatter.success(todos, 'Berhasil mengambil data'))
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreTodoRequestValidator)

    const created = await Database.transaction(async (trx) => {
      const todo = new Todo()
      todo.title = payload.title
      todo.dueDate = payload.dueDate

      todo.useTransaction(trx)
      return await todo.save()
    })

    if (created) {
      return response
        .status(201)
        .json(ApiResponseFormatter.success(created, 'Berhasil menambahkan data', 201))
    }
    return response.status(400).json(ApiResponseFormatter.error('Gagal menambahkan data', 400))
  }

  @bind()
  public async show({ response }: HttpContextContract, todo: Todo) {
    return response
      .status(200)
      .json(ApiResponseFormatter.success(todo, 'Berhasil mengambil data', 200))
  }

  @bind()
  public async update({ request, response }: HttpContextContract, todo: Todo) {
    const payload = await request.validate(UpdateTodoRequestValidator)

    const updated = await Database.transaction(async (trx) => {
      todo.title = payload.title
      todo.dueDate = payload.dueDate

      todo.useTransaction(trx)
      return await todo.save()
    })

    if (updated) {
      return response
        .status(200)
        .json(ApiResponseFormatter.success(updated, 'Berhasil mengupdate data', 200))
    }
    return response.status(400).json(ApiResponseFormatter.error('Gagal mengupdate data', 400))
  }

  @bind()
  public async destroy({ response }: HttpContextContract, todo: Todo) {
    const deleted = Database.transaction(async (trx) => {
      todo.useTransaction(trx)
      return await todo.delete()
    })

    if (deleted) {
      return response
        .status(200)
        .json(ApiResponseFormatter.success(deleted, 'Berhasil menghapus data', 200))
    }
    return response.status(400).json(ApiResponseFormatter.error('Gagal menghapus data', 400))
  }

  @bind()
  public async complete({ response }: HttpContextContract, todo: Todo) {
    const completed = await Database.transaction(async (trx) => {
      todo.isComplete = !todo.isComplete
      todo.useTransaction(trx)
      await todo.save()
      return todo
    })

    if (completed) {
      return response.json(
        ApiResponseFormatter.success(completed, 'Berhasil merubah status selesi')
      )
    }

    return response
      .status(400)
      .json(ApiResponseFormatter.error('Gagal merubah status selesai', 400))
  }
}
