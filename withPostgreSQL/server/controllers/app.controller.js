const db = require('../config/database');

exports.createTodos = async (req, res) => {
  console.log('REQUEST ', req.body);
  const { id, title, done, notes, date, priority, deleted } = req.body;
  const response = await db.query(
    'INSERT INTO todos (id,title, done, notes, date, priority, deleted) VALUES ($1,$2,$3,$4,$5,$6,$7)',
    [id, title, done, notes, date, priority, deleted]
  );

  res.status(201).send({
    message: 'Todo added successfully!',
    body: {
      todo: { id, title, done, notes, date, priority, deleted }
    }
  });
};

exports.listAllTodos = async (req, res) => {
  const response = await db.query('SELECT * FROM todos where deleted=false');
  res.status(200).send(response.rows);
};

exports.updateTodosById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, done, priority, notes, date } = req.body;
  const response = await db.query(
    'UPDATE todos SET title = $2, done = $3, priority = $4, notes = $5, date = $6 WHERE id = $1',
    [id, title, done, priority, notes, date]
  );
  res.status(200).send({ message: 'Todo Updated Successfully!' });
};

exports.deleteTodosById = async (req, res) => {
  const id = parseInt(req.params.id);
  await db.query('UPDATE todos SET deleted = true WHERE id = $1', [id]);
  res.status(200).send({ message: 'Todo deleted successfully!', id });
};

exports.deleteAllTodos = async (req, res) => {
  await db.query('UPDATE todos SET deleted = true');//set soft delete all
  res.status(200).send({ message: 'Todos table deleted successfully!' });
};
