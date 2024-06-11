import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todo function

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`${process.env.REACT_APP_BASE_URL}/pern/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

const getTodos = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/pern/todos`, {
      method: "GET"
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Attempt to parse the response as JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const jsonData = await response.json();
      setTodos(jsonData);
    } else {
      const text = await response.text(); // Get the raw response text
      console.error('Unexpected response format:', text);
      throw new Error('Received non-JSON response');
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
};


  useEffect(() => {
    getTodos();
  }, []);



  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead >
          <tr className="flex gap-56 border items-center justify-center p-3">
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map(todo => (
            <tr key={todo.todo_id} className="border flex gap-20 items-center justify-center p-4 text-[19px] font-mono">
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger bg-red-500 p-3 rounded-2xl"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;