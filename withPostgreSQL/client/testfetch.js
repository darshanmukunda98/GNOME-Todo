import {
  fetchAllTodos,
  postTodo,
  updateTodo,
  deletedById,
  deleteAllTodos
} from './fetch.js';
const todos = await fetchAllTodos();
console.log(todos);
// const msg = await postTodo({ id: 10, title: 'TODO 10' }) // WORKS !!!
// console.log(msg)
// const todos = await updateTodo(10, { title: 'TODO EDITED' })
// console.log(todos)
// const todos = await deletedById(9)
// console.log(todos)
