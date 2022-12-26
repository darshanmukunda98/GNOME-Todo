export async function fetchAllTodos() {
  const url = 'http://localhost:3001/api/todos';
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export async function postTodo(todoTitle) {
  const url = 'http://localhost:3001/api/todos';
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

export async function updateTodo(id, body) {
  const url = `http://localhost:3001/api/todos/${id}`;
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

export async function deletedById(id) {
  const url = 'http://localhost:3001/api/todos/' + id;
  const res = await fetch(url, {
    method: 'DELETE'
  });
  const result = await res.json();

  console.log('RESULT' + result);

  return result;
}

export async function deleteAllTodos() {
  const url = 'http://localhost:3001/api/todos/';
  const res = await fetch(url, {
    method: 'DELETE'
  });
  const result = await res.json();

  console.log('RESULT' + result);

  return result;
}
