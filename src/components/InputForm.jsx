import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { addTodo } from "../store/actions";

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch(addTodo(todo))
});

const InputForm = ({ addTodo }) => {

  // [description is the value, setDescription is the setter fx] 
  const [description, setDescription] = useState('')
  const [user, setUser] = useState()

  const handleChange = (event) => {
    setDescription(event.target.value);
    //description = event.target.value
  };

  useEffect(() => {
    console.log("updated description or user!")
    console.log(description)
    console.log(user)
  }, [description, user])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://randomuser.me/api')
      const data = await response.json()

      setUser(data.results[0])
    }

    fetchData()

    return () => { console.log('unmounting component') }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = {
      description,
      id: uniqid(),
      completed: false
    };

    console.log(todo);
    addTodo(todo);
    setDescription('');
  };


  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Control
        type="text"
        placeholder="New task..."
        value={description}
        onChange={(event) => handleChange(event)}
      />
      <Form.Control type="submit" />
    </Form>
  );
}

export default connect((s) => s, mapDispatchToProps)(InputForm);
