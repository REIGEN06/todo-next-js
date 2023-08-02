const db = require('../models/index');
class ToDoController {
	async createTask(req: any, res: any) {
		const { id, title } = req.body;

		db.Todo.create({
			nanoid: id,
			title: title,
		})
			.then((result: any) => {
				console.log(result);
				res.end('ok');
			})
			.catch((error: any) => {
				console.log(error);
				res.end('error');
			});
		// const jane = db.Todo.build({ nanoid: '5', title: 'bebra' });
		// await jane.save();
		res.json([id, title]);
	}
	async deleteTask(req: any, res: any) {}
	async editTask(req: any, res: any) {}
	async getTasks(req: any, res: any) {}
}

module.exports = new ToDoController();
