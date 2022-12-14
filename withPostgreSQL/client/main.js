
(async ()=>{

async function fetchDatafromDB() {
  const url = 'http://localhost:3000/api/todos';
  const response = await fetch(url);
  data = await response.json();
  // console.log(data)
  return data;
}
async function postTodo(todoTitle) {
  console.log(todoTitle);
  const url = 'http://localhost:3000/api/todos';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todoTitle)
  });
  const result = await res.json();

  return result;
}
async function updateTodo(id, body) {
  console.log('ID ' + id + ' BODY' + body);
  const url = `http://localhost:3000/api/todos/${id}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const result = await res.json();

  console.log('RESULT' + result);

  return result;
}
async function deletedById(id) {
  const url = 'http://localhost:3000/api/todos/' + id;
  const res = await fetch(url, {
    method: 'DELETE'
  });
  const result = await res.json();

  console.log('RESULT' + result);

  return result;
}
async function deleteAllTodos() {
  const url = 'http://localhost:3000/api/todos/';
  const res = await fetch(url, {
    method: 'DELETE'
  });
  const result = await res.json();

  console.log('RESULT' + result);

  return result;
}

  let toggleDoneState = false;
  const priorities = ['None', 'High', 'Medium', 'Low'];
  //let data = fetchDatafromLocalStorage();
  let data;
data = await fetchDatafromDB()
console.log(data)
  /* console.log(data); */ renderTasks(data);


//renderTasks(data);
startApp();
toggleFooter();
//console.log(data);

function renderTasks(data) {
  //console.log(data)
  data.forEach((task) => {
    //console.log(task)
    renderTodoItem(createTodoItemElement(task));
  });
}

function startApp() {
  const form = document.querySelector('.input-container');
  form.addEventListener('submit', takeInput);

  const clearAllButton = document.querySelector('.actionbar__clear-all');
  clearAllButton.addEventListener('click', clearAllTasks);

  const toggleTasksButton = document.querySelector('.actionbar__show-toggle');
  toggleTasksButton.addEventListener('click', toggleDoneTasks);
}

function fetchDatafromLocalStorage() {
  let data = [];
  if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify([]));
  }
  data = JSON.parse(localStorage.getItem('data')).filter(
    (task) => !task.delete
  );
  return data;
}

function createTodoItem(todoTitle) {
  return {
    done: false,
    title: todoTitle,
    notes: '',
    date: '',
    priority: 0,
    deleted: false
  };
}
// validate input
// if (!isValidInput(input)) return
// else:
// const todoItem = createTodoItem(input.value) // create todoitem
// storeTodoItem(todoItem) // store todoitem
// const todoItemElement = createTodoItemElement(todoItem) // create todoItem element
// renderTodoItem(todoItem) // render todoitem

// input.value = ''
function storeCreateRender(input) {
  //let todoItem = createTodoItem(input);
  console.log('INPUT ' + input);
  let res = postTodo({ title: input });
  console.log('RES ' + res);
  //storeTodoItem(todoItem);
  let todoItem = res.body.todo;
  console.log(todoItem);
  const todoItemElement = createTodoItemElement(todoItem);
  renderTodoItem(todoItemElement);
  toggleClearButton();
}

function takeInput(event) {
  event.preventDefault();
  const input = document.querySelector('.input-container__input');
  if (input.value !== '') {
    storeCreateRender(input.value);
  }
  input.value = '';
}

function storeTodoItem(todoItem) {
  data.push(todoItem);
  localStorage.setItem('data', JSON.stringify(data));
}

function createTodoItemElement(todoItem) {
  //console.log(todoItem)
  const id = todoItem.id;
  const taskForm = document.createElement('div');
  taskForm.setAttribute('id', id);
  taskForm.classList.add('list-item');
  taskForm.classList.add(
    `list-item--priority-${priorities[todoItem.priority].toLowerCase()}`
  );
  //console.log('TITLE' + todoItem.title);
  const todoFields = [...createTodoFields(todoItem)];
  taskForm.append(...todoFields);

  console.log(taskForm);
  return taskForm;
}

function renderTodoItem(todoItemElement) {
  const tasks = document.querySelector('.list');
  tasks.appendChild(todoItemElement);
}

function createTodoFields(todoItem) {
  /* PRIMARY CONTENT */
  const primaryContent = document.createElement('div');
  primaryContent.classList.add('list-item__primary-content');

  const span1 = document.createElement('span');
  span1.classList.add('list-item__title');
  span1.append(createDoneCheckbox(todoItem), createTitleField(todoItem));

  const span2 = document.createElement('span');
  span2.append(createDueDateSpan(todoItem), createExpandButton(todoItem));
  primaryContent.append(span1, span2);
  /* SECONDARY CONTENT */
  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add(
    'list-item__secondary-content',
    'list-item--hide'
  );

  const div1 = document.createElement('div');
  div1.classList.add('list-item__notes-content');
  div1.append(...createNotesTextarea(todoItem));

  const div2 = document.createElement('div');
  div2.classList.add('list-item__priority-content');
  const div = document.createElement('div');
  div.append(...createDateField(todoItem), ...createPriorityDropdown(todoItem));
  div2.append(div, createDeleteButton());
  secondaryContent.append(div1, div2);

  return [primaryContent, secondaryContent];
}

function createTitleField(todoItem, event) {
  const taskTitle = document.createElement('input');
  taskTitle.setAttribute('value', todoItem.title);
  todoItem.done
    ? taskTitle.classList.add('list-item__input--strike')
    : taskTitle.classList.add('list-item__input');
  taskTitle.addEventListener('blur', editTodoTitle); // add ()=> {} passing id and calling editTodoTitle
  return taskTitle;
}

function editTodoTitle(event) {
  const parent = event.target.parentNode.parentNode.parentNode;
  // const [todo] = data.filter((x) => x.id === Number(parent.id)); // use find() instead of filter
  // todo.title = event.target.value;
  // localStorage.setItem('data', JSON.stringify(data));
  let id = parent.id;
  let value = event.target.value;
  console.log('ID ' + id + ' VALUE ' + value);
  updateTodo(id, { title: value }).then((res) => console.log(res));
}

function createDoneCheckbox(todoItem) {
  const check = document.createElement('input');
  check.setAttribute('type', 'checkbox');
  check.classList.add('list-item__checkbox');
  check.checked = todoItem.done;
  check.addEventListener('click', toggleDoneCheckbox);
  return check;
}

function toggleDoneCheckbox(event) {
  const parent = event.target.parentNode.parentNode.parentNode;
  // const [todo] = data.filter((x) => x.id === Number(parent.id));
  console.log('EVENT TARGET ');
  console.log(event.target);
  let id = parent.id;
  let value = event.target.checked;
  //event.target.checked = !event.target.checked
  // if (event.target.checked) {
  //   value = true;
  //   event.target.checked = true
  // } else {
  //   value = false;
  //  event.target.checked = false
  // }

  console.log('ID ' + id + ' VALUE ' + value);
  updateTodo(id, { done: value }).then((res) => console.log(res));
  // todo.done = !todo.done;
  event.target.nextElementSibling.classList.toggle('list-item__input--strike');
  // localStorage.setItem('data', JSON.stringify(data));
  toggleDoneTasks();
}

function createDueDateSpan(todoItem) {
  const span = document.createElement('span');
  span.classList.add('list-item__due-date');
  span.innerText = todoItem.date;
  return span;
}

function createExpandButton() {
  const button = document.createElement('button');
  button.classList.add('list-item__expander');
  button.innerText = '???';
  button.addEventListener('click', clickExpandButton);
  return button;
}

function clickExpandButton(event) {
  const parent = event.target.parentNode.parentNode.parentNode;
  const secondaryContent = parent.querySelector(
    '.list-item__secondary-content'
  );
  const expander = parent.querySelector('.list-item__expander');

  secondaryContent.classList.toggle('list-item--hide');
  expander.classList.toggle('list-item__expander--expand');
}

function createNotesTextarea(todoItem) {
  const notesLabel = document.createElement('p');
  notesLabel.classList.add('list-item__label');
  notesLabel.innerText = 'Notes';

  const notes = document.createElement('textarea');
  notes.setAttribute('type', 'text');
  notes.classList.add('list-item__textarea');
  notes.innerText = todoItem.notes;
  notes.addEventListener('blur', setNotes);
  return [notesLabel, notes];
}

function setNotes(event) {
  const parent = event.target.parentNode.parentNode.parentNode;
  // const [todo] = data.filter((x) => x.id === Number(parent.id));
  // todo.notes = event.target.value;
  let id = parent.id;
  let value = event.target.value;
  console.log('ID ' + id + ' VALUE ' + value);
  updateTodo(id, { notes: value }).then((res) => console.log(res));
  // localStorage.setItem('data', JSON.stringify(data));
}

function createDateField(todoItem) {
  const dateLabel = document.createElement('p');
  dateLabel.classList.add('list-item__label');
  dateLabel.innerText = 'Due Date';

  const date = document.createElement('input');
  date.setAttribute('type', 'date');
  date.setAttribute('value', todoItem.date);
  date.classList.add('list-item__selector');
  date.addEventListener('change', setDate);
  return [dateLabel, date];
}

function setDate(event) {
  const parent = event.target.parentNode.parentNode.parentNode.parentNode;
  const dateLabel = parent.querySelector('.list-item__due-date');
  // const [todo] = data.filter((x) => x.id === Number(parent.id));
  let id = parent.id;
  let value = event.target.value;
  // todo.date = event.target.value;
  dateLabel.innerText = value;

  console.log('ID ' + id + ' VALUE ' + value);
  updateTodo(id, { date: value }).then((res) => console.log(res));

  // localStorage.setItem('data', JSON.stringify(data));
}

function createPriorityDropdown(todoItem) {
  const priorityLabel = document.createElement('p');
  priorityLabel.classList.add('list-item__label');
  priorityLabel.innerText = 'Priority';
  const priority = document.createElement('select');
  priority.classList.add('list-item__selector');

  const [none, high, medium, low] = priorityOptions(todoItem);
  priority.append(none, high, medium, low);
  priority.addEventListener('change', setPriority);
  return [priorityLabel, priority];
}

function priorityOptions(todoItem) {
  // use map
  const none = document.createElement('option');
  none.value = 0;
  none.selected = todoItem.priority === 0;
  none.textContent = 'None';

  const high = document.createElement('option');
  high.value = 1;
  high.selected = todoItem.priority === 1;
  high.textContent = 'High';

  const medium = document.createElement('option');
  medium.value = 2;
  medium.selected = todoItem.priority === 2;
  medium.textContent = 'Medium';

  const low = document.createElement('option');
  low.value = 3;
  low.selected = todoItem.priority === 3;
  low.textContent = 'Low';

  return [none, high, medium, low];
}

function setPriority(event) {
  const parent = event.target.parentNode.parentNode.parentNode.parentNode;
  // const [todo] = data.filter((x) => x.id === Number(parent.id));
  let id = parent.id;
  let value = Number(event.target.value);
  console.log('ID ' + id + ' VALUE ' + value);
  updateTodo(id, { priority: value }).then((res) => console.log(res));

  //todo.priority = Number(event.target.value);

  for (const priority of priorities) {
    const priorityClass = 'list-item--priority-' + priority.toLowerCase();

    if (parent.classList.contains(priorityClass)) {
      parent.classList.remove(priorityClass);
    }
  }

  parent.classList.add(
    //`list-item--priority-${priorities[todo.priority].toLowerCase()}`
    `list-item--priority-${priorities[value].toLowerCase()}`

  );

  // localStorage.setItem('data', JSON.stringify(data));
}

function createDeleteButton() {
  const del = document.createElement('button');
  del.classList.add('list-item__button', 'list-item__button--danger');
  del.innerText = 'Delete';

  del.addEventListener('click', deleteTodo);
  return del;
}

function deleteTodo(event) {
  const parent = event.target.parentNode.parentNode.parentNode;
  parent.parentElement.removeChild(parent);
  // const [todo] = data.filter((x) => x.id === Number(parent.id));
  let id = parent.id;
  
  deletedById(id).then(res=>console.log(res))
  // todo.delete = true;
  // localStorage.setItem('data', JSON.stringify(data));
  toggleClearButton();
}

function clearAllTasks() {
  // localStorage.removeItem('data');
  // data = [];
  deleteAllTodos().then(res=>console.log(res))
  document.querySelector('.list').innerHTML = ''; // re-render instead of altering DOM
  toggleFooter();
}

function toggleClearButton() {
  const clearAllTasksButton = document.querySelector('.actionbar__clear-all');
  clearAllTasksButton.style.visibility = data.length ? 'visible' : 'hidden';
}

function toggleDoneTasks(event) {
  const footer = document.querySelector('.actionbar');
  const showTasksButton = document.querySelector('.actionbar__show-toggle');

  const doneTodos = data.filter((todo) => !todo.done);
  const completedTasksCount = data.length - doneTodos.length;

  if (completedTasksCount > 0) {
    footer.style.visibility = 'visible';
  } else {
    footer.style.visibility = 'hidden';
  }

  if (event) {
    toggleDoneState = !toggleDoneState;
  }
  // make it a pure event handler
  const todoList = document.querySelector('.list');
  todoList.innerHTML = '';

  showTasksButton.innerHTML = `Done (${completedTasksCount})`;
  if (toggleDoneState) {
    renderTasks(doneTodos);
  } else {
    renderTasks(data);
  }
}

function toggleFooter() {
  toggleDoneTasks();
  toggleClearButton();
}
})()
