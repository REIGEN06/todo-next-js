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
				title: 'qwe',
			},
		}).then((res: any) => {
			console.log(res);
			res.send('ok');
		});
	}
	async editTask(req: any, res: any) {
		db.Todo.update(
			{ nanoid: '666' },
			{
				where: {
					title: 'sdfs',
				},
			}
		).then((res: any) => {
			console.log(res);
			res.send('ok');
		});
	}
	async getTasks(req: any, res: any) {
		const result = await db.Todo.findAll({ raw: true });
		res.json(result);
	}
}

module.exports = new ToDoController();
