import { Request, Response } from 'express';
import { z } from 'zod';
const database = require('../models/index');

const taskSchema = z.object({
	title: z.string().optional(),
	id: z.string().optional(),
	done: z.boolean().optional(),
});

class ToDoController {
	async getTasks(req: Request, res: Response) {
		const result = await database.Todo.findAll({ raw: true });
		res.json(result);
	}

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

	async updateTask(req: Request, res: Response) {
		console.log(req.params.id, typeof req.params.id);
		console.log(req.body.title, typeof req.body.title);
		console.log(req.body.done, typeof req.body.done);

		const reqId = taskSchema.parse(req.params);
		const reqProps = taskSchema.parse(req.body);
		database.Todo.update(
			{ title: reqProps.title, done: reqProps.done },
			{
				where: {
					id: reqId.id,
				},
			}
		);
	}
}

module.exports = new ToDoController();
