'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';


    todoData.forEach(function (item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function () {
            todoData.splice(i, 1);
            localStorage.setItem('todos', todoData);
            // let todos;
            // if (localStorage.getItem('todos') === null) {
            //     todos = [];
            // } else {
            //     todos = JSON.parse(localStorage.getItem('todos'));
            // }
            //localStorage.removeItem(todoData);

            if (localStorage.getItem('todos').length === 15) {
                localStorage.removeItem('todos');
            }
            render();
        });

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            localStorage.setItem('todos', JSON.stringify(todoData));
            render();
        });
    });
};

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null || localStorage.getItem('todos') === '' || localStorage.getItem('todos').length === 15) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null || localStorage.getItem('todos') === '' || localStorage.getItem('todos').length === 15) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        // todos.forEach(function (item) {
        //     todoData.push(todos);
        // });

        for (let i = 0; i < todos.length; i++) {
            todoData.push(todos[i]);
        }
    }
}
document.addEventListener("DOMContentLoaded", getTodos);
document.addEventListener("DOMContentLoaded", render);

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value === '' || headerInput.value[0] === ' ') {
        return;
    } else {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);
        saveLocalTodos(newTodo);
        headerInput.value = '';
        render();
    }
});



render();
