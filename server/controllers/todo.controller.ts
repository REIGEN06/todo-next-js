const database = require('../models/index');
import { Request, Response } from 'express';
import { z } from 'zod';

const taskSchema = z.object({
	title: z.string().optional(),
	id: z.number().optional(),
	done: z.boolean().optional(),
});

class ToDoController {
	async getTasks(req: Request, res: Response) {
		const tasks = await database.Todo.findAll({ raw: true });

		res.json(tasks);
	}

	async createTask(req: Request, res: Response) {
		const task = taskSchema.parse(req.body);

		const newTask = await database.Todo.create({
			title: task.title,
			done: task.done,
		});

		res.json(newTask.id);
	}

	async deleteTask(req: Request, res: Response) {
		const taskId = taskSchema.parse(req.params);

		database.Todo.destroy({
			where: {
				id: taskId.id,
			},
		});
	}

	async updateTask(req: Request, res: Response) {
		const task = taskSchema.parse(req.body);

		database.Todo.update(
			{ title: task.title, done: task.done },
			{
				where: {
					id: task.id,
				},
			}
		);
	}
}

module.exports = new ToDoController();
