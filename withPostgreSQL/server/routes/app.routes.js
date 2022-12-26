const router = require('express-promise-router')();
const appController = require('../controllers/app.controller');

router.post('/todos', appController.createTodos);

router.get('/todos', appController.listAllTodos);

router.put('/todos/:id', appController.updateTodosById);

router.delete('/todos/:id', appController.deleteTodosById);

router.delete('/todos', appController.deleteAllTodos);

module.exports = router;
