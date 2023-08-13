import { Request, Response } from 'express';
import Todo from '../models/todo';
import { z } from 'zod';

const taskSchemaBody = z.object({
	id: z.number().optional(),
	title: z.string(),
	done: z.boolean(),
});

const taskSchemaParams = z.object({
	id: z.string(),
});

class ToDoController {
	async getTasks(req: Request, res: Response) {
		const tasks = await Todo.findAll({ raw: true });

		res.json(tasks);
	}

	async createTask(req: Request, res: Response) {
		const task = taskSchemaBody.parse(req.body);

		const newTask = await Todo.create({
			title: task.title,
			done: task.done,
		});

		res.json(newTask.id);
	}

	async deleteTask(req: Request, res: Response) {
		const taskId = taskSchemaParams.parse(req.params);

		Todo.destroy({
			where: {
				id: taskId.id,
			},
		});
	}

	async updateTask(req: Request, res: Response) {
		const task = taskSchemaBody.parse(req.body);

		Todo.update(
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
