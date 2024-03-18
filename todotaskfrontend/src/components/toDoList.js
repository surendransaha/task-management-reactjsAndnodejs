import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import { 
  Button, Container, Row, Col, Card, CardBody, CardText,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input
 } from "reactstrap";

const ToDoList = () => {

  // To DO  State
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const toggle = () => setModal(!modal);
  //const edittoggle = () => setEditModal(!editModal);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    id: "",
    status: 1
  });

  const [formEditData, setEditFormData] = useState(
    
    {
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      id: "",
      status: 1
    });

  
  const edittoggle = async (item) => {

    const dateVal = item.dueDate ?  new Date(item.dueDate).toISOString().slice(0, 10) : "";

    setEditFormData(
      {
        title: item.title,
        description: item.description,
        dueDate: dateVal,
        priority: item.priority,
        id: item.id,
        status: item.status
      }

    )


    



    setEditModal(!editModal)

  };

  

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      
      const response = await fetch(`http://localhost:8080/api/todo?page=${currentPage}&limit=2`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setTasks(result);
      setTotalPages(result.totalPage);
      setTotalCount(result.totalData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleAddTodo = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Fetch the updated todo list after adding a new item
      fetchData();
      // Close the modal after adding a todo
      toggle();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/todo/update-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formEditData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Fetch the updated todo list after adding a new item
      fetchData();
      // Close the modal after adding a todo
      setEditModal(!editModal)
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...formEditData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData();
  };



  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await fetch('http://localhost:8080/api/todo/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Fetch the updated todo list after updating status
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  return (
    <div>
      <Container className="doTo-heading-bottom">
        <Row xs="1">
          <Col className="bg-light border">

            <h2 className="my-2 text-center">Task List</h2>

            <Button color="primary" onClick={toggle}>
              Add
            </Button>

            <hr/>

            {tasks && tasks.data && tasks.data.map((item) => (

              <Card
              key={item.id}
              className="my-2"
              color="secondary"
              outline
              >
              <CardBody>
                <CardText>
                 <h2> {item.title} </h2>
                 <p> Date: {item.dueDate ? new Date(item.dueDate).toISOString().slice(0, 10) : "--"} </p>
                 <p> Description : {item.description} </p>
                 <p> Priority : {item.priority} </p>
                </CardText>

                <Button color="primary" 
                 
                onClick={() => edittoggle(item)}

                >
              Edit
            </Button>

            <span> </span>

                <Button color={item.status === 1 ? "danger" : "success" }  onClick={() => handleUpdateStatus(item.id, 2)} >
                  { "Remove" }
                </Button>

              </CardBody>
              </Card>

        ))}


<div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  color={currentPage === index + 1 ? "primary" : "secondary"}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}

            </div>
            <p className="text-end">total entires : { totalCount }</p>

            

 

          </Col>
        </Row>
      </Container>


      {/* Model one */}
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add</ModalHeader>
        <ModalBody>
        <Form>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter your title"
                      value={formData.title}
                      onChange={handleChange}
                    />

                    <Label for="description">Description</Label>
                    <Input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Enter your description"
                      value={formData.description}
                      onChange={handleChange}
                    />

                  <Label for="dueDate">Due Date</Label>
                    <Input
                      type="date"
                      name="dueDate"
                      id="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                    />

<Label for="priority">Priority</Label>
                    <Input
                      type="text"
                      name="priority"
                      id="priority"
                      placeholder="Enter your priority"
                      value={formData.priority}
                      onChange={handleChange}
                    />


                  </FormGroup>
                  <Button color="primary" onClick={handleAddTodo}>
                    Add Task
                  </Button>
                </Form>
        </ModalBody>
      </Modal>

      {/* model for edit */}
      
      <Modal isOpen={editModal} toggle={edittoggle} >
        <ModalHeader toggle={edittoggle}>Edit</ModalHeader>
        <ModalBody>
        <Form>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter your title"
                      value={formEditData.title}
                      onChange={handleEditChange}
                    />

                    <Label for="description">Description</Label>
                    <Input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Enter your description"
                      value={formEditData.description}
                      onChange={handleEditChange}
                    />

                  <Label for="dueDate">Due Date</Label>
                    <Input
                      type="date"
                      name="dueDate"
                      id="dueDate"
                      value={formEditData.dueDate}
                      onChange={handleEditChange}
                    />

<Label for="priority">Priority</Label>
                    <Input
                      type="text"
                      name="priority"
                      id="priority"
                      placeholder="Enter your priority"
                      value={formEditData.priority}
                      onChange={handleEditChange}
                    />


                  </FormGroup>
                  <Button color="primary" onClick={handleUpdateTodo}>
                    Update Task
                  </Button>
                </Form>
        </ModalBody>
      </Modal>


    </div>
  );
}

export default ToDoList;
