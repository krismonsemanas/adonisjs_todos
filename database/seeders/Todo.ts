import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Todo from 'App/Models/Todo'
import { DateTime } from 'luxon'

export default class TodoSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Todo.createMany([
      {
        title: 'Design UI/UX',
        isComplete: false,
        dueDate: DateTime.fromSQL('2023-10-20'),
      },
      {
        title: 'Coding',
        isComplete: false,
        dueDate: DateTime.fromSQL('2023-10-20'),
      },
      {
        title: 'Maintenance',
        isComplete: false,
        dueDate: DateTime.fromSQL('2023-10-20'),
      },
    ])
  }
}
