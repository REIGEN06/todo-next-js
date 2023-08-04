const db = require('../models/index');
class ToDoController {
	async createTask(req: any, res: any) {
		const { title } = req.body;
		const newTask = await db.Todo.create({
			title: title,
		});
		res.json(newTask.id);
	}
	async deleteTask(req: any, res: any) {
		db.Todo.destroy({
			where: {
				id: req.params.id,
			},
		});
	}
	async editTask(req: any, res: any) {
		console.log(req.body.title);

		db.Todo.update(
			{ title: req.body.title },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	async getTasks(req: any, res: any) {
		const result = await db.Todo.findAll({ raw: true });
		res.json(result);
	}
}

module.exports = new ToDoController();
