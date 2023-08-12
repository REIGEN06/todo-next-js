const todoController = require('../controllers/todo.controller');
const Router = require('express');
const router = new Router();

router.post('/task', todoController.createTask);
router.delete('/task/:id', todoController.deleteTask);
router.put('/task/:id', todoController.updateTask);
router.get('/tasks', todoController.getTasks);

module.exports = router;
