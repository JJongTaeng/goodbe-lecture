const BASE_URL = 'http://localhost:3000'
let state = [];

const getTodoList = async () => {
  return state;
};

const addTodoList = async (title) => {
  state.push({
    title,
    success: false,
  })
}

const updateTodoList = async (id, success) => {
  state[id].success = success;
}

const deleteTodoList = async (id) => {
  state.splice(id, 1);
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