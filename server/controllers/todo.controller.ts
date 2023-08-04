import { Request, Response } from 'express';
import { z } from 'zod';
const database = require('../models/index');

const taskSchema = z.object({
	title: z.string().optional(),
	id: z.string().optional(),
});

class ToDoController {
	async createTask(req: Request, res: Response) {
		const reqBody = taskSchema.parse(req.body);
		const newTask = await database.Todo.create({
			title: reqBody.title,
		});
		res.json(newTask.id);
	}
	async deleteTask(req: Request, res: Response) {
		const reqParams = taskSchema.parse(req.params);
		database.Todo.destroy({
			where: {
				id: reqParams.id,
			},
		});
	}
	async editTask(req: Request, res: Response) {
		const reqParams = taskSchema.parse(req.params);
		const reqBody = taskSchema.parse(req.body);
		database.Todo.update(
			{ title: reqBody.title },
			{
				where: {
					id: reqParams.id,
				},
			}
		);
	}
	async getTasks(req: Request, res: Response) {
		const result = await database.Todo.findAll({ raw: true });
		res.json(result);
	}
}

module.exports = new ToDoController();
