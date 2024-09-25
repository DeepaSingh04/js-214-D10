const apiUrl = "https://jsonplaceholder.typicode.com/todos";
const limit = 10; // Number of todos per page
let currentPage = 1;

// Function to fetch todos from the API
async function fetchTodos(page) {
  try {
    const response = await fetch(`${apiUrl}?_page=${page}&_limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch todos");
    const todos = await response.json();
    displayTodos(todos);
    generatePaginationButtons();
  } catch (error) {
    document.getElementById("todo-list").innerHTML = `<p class="error">${error.message}</p>`;
  }
}

// Function to display todos in the DOM
function displayTodos(todos) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = todos
    .map(todo => `
      <div class="todo-card">
        <h3>Todo ID: ${todo.id}</h3>
        <p><strong>Title:</strong> ${todo.title}</p>
        <p><strong>Completed:</strong> ${todo.completed ? 'Yes' : 'No'}</p>
      </div>
    `).join('');
}

// Function to generate pagination buttons
function generatePaginationButtons() {
  const totalPages = 20; // Assuming there are 200 todos and limit is 10 per page
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("pagination-button");
    if (i === currentPage) button.classList.add("active");

    button.addEventListener("click", () => {
      currentPage = i;
      fetchTodos(currentPage);
    });

    pagination.appendChild(button);
  }
}

// Fetch todos for the initial page (Page 1) on load
fetchTodos(currentPage);
