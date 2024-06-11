import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/pern/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  // background: red;
  // padding: 1rem;
  // font-size: 2rem;
  // font-family: monospace;
  // border-radius: 10px;

  return (
    <Fragment>
      <h1 className="text-center mt-5 bg-blue-500 p-4 text-[2rem] font-mono rounded-xl"> Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control border-2 p-4 outline-none rounded-t-lg rounded-b-lg "
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="bg-blue-600 shadow-sm rounded-lg rounded-br-lg p-4 ">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;