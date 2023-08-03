const db = require('../models/index');
class ToDoController {
	async createTask(req: any, res: any) {
		const { nanoid, title } = req.body;
		db.Todo.create({
			nanoid: nanoid,
			title: title,
		})
			.then((result: any) => {
				res.end('200');
			})
			.catch((error: any) => {
				res.end('error');
			});
	}
	async deleteTask(req: any, res: any) {}
	async editTask(req: any, res: any) {}
	async getTasks(req: any, res: any) {}
}

module.exports = new ToDoController();
