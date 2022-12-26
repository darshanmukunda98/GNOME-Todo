const db = require('../config/database');

exports.createTodos = async (req, res) => {
  console.log('REQUEST ', req.body);
  const {title} = req.body;
  const response = await db.query(
    // 'INSERT INTO todos (title, done, notes, date, priority) VALUES ($1,$2,$3,$4,$5)',
    'INSERT INTO todos (title) VALUES ($1) RETURNING *',
    [title]
  );
  //console.log('INSERT WITH ID '+JSON.stringify(response.rows[0].id))

  res.status(201).send({
    message: 'Todo added successfully!',
    body: {
      todo: response.rows[0]
    }
  });
};

exports.listAllTodos = async (req, res) => {
  const response = await db.query('SELECT * FROM todos where deleted=false');
  res.status(200).send(response.rows);
};

exports.updateTodosById = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log("ID "+id)
  const { title, done, priority, notes, date } = req.body;
  console.log('REQUEST BODY KEYS'+Object.keys(req.body))
  let column = Object.keys(req.body)[0]
  let value = req.body[column]
  const response = await db.query(
    'UPDATE todos SET  '+column+' = $2 WHERE id = $1',[id,value]
    // 'UPDATE todos SET title = $2, done = $3, priority = $4, notes = $5, date = $6 WHERE id = $1',
    // [id, title, done, priority, notes, date]
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
