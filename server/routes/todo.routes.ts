const Router = require('express');
const router = new Router();
const todoController = require('../controllers/todo.controller');

router.post('/task', todoController.createTask);
router.delete('/task/:id', todoController.deleteTask);
router.put('/task/:id', todoController.updateTask);
router.get('/tasks', todoController.getTasks);

module.exports = router;
