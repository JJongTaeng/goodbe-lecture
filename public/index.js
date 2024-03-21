const BASE_URL = 'http://localhost:3000'
let state = [];

const getTodoList = async () => {
  const response = await fetch(BASE_URL + '/todo', {
    method: 'GET',
  });
  return await response.json()
};

const addTodoList = async (title) => {
  const response = await fetch(BASE_URL + '/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      success: false,
    })
  })
}

const updateTodoList = async (id, success) => {
  const response = await fetch(BASE_URL + '/todo/' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      success
    }),
  })
}

const deleteTodoList = async (id) => {
  const response = await fetch(BASE_URL + '/todo/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE'
  })
}

const render = async () => {
  state = await getTodoList();
  const todoListUl = document.querySelector('.todo-list');
  const successListUl = document.querySelector('.success-list');
  todoListUl.innerHTML = ''
  successListUl.innerHTML = ''

  state.forEach((item, index) => {
    if(!item.success) {
      todoListUl.innerHTML += `<li><input type="checkbox" data-id="${index}" />${item.title}</li>`
    } else {
      successListUl.innerHTML += `<li><input type="checkbox" data-id="${index}" checked /><s>${item.title}</s></li>`
    }
  })
}

render();

(async () => {
  const form = document.querySelector('form');
  const todoListUl = document.querySelector('.todo-list');
  const successListUl = document.querySelector('.success-list');

  todoListUl.addEventListener('click', (e) => {
    if(e.target.tagName === 'INPUT') {
      updateTodoList(e.target.dataset['id'], true);
    }
    render()
  })

  successListUl.addEventListener('click', (e) => {
    if(e.target.tagName === 'INPUT') {
      updateTodoList(e.target.dataset['id'], false);
    }
    render()
  })


  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    await addTodoList(title);
    render()

    e.target.title.value = ''
  })
})()