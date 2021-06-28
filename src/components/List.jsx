import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCompleted, reset } from "../store/actions";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  toggleCompleted: (id) => dispatch(toggleCompleted(id)),
  reset: () => dispatch(reset())
});

const List = ({ toggleCompleted, reset, list }) => {

  return (
    <>
      <ul>
        {list.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleCompleted(todo)}
            className={todo.completed ? "strikethrough" : ""}
          >
            {todo.description}
          </li>
        ))}
      </ul>
      <Button onClick={reset}>reset</Button>
    </>
  );
}


export default connect((s) => s, mapDispatchToProps)(List);
