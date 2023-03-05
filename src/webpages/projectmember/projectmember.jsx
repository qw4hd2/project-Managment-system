import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {
  MDBBadge,
} from "mdb-react-ui-kit";
import Header from "../include/header.js";
import { FaSearch } from "react-icons/fa";
import "./../css/style.css";
import axios from 'axios';
import { getUserSearchResults, postProjectMemberRequest, fetchProject, assignTask, taskAssignToMember } from "./dataRequest.js";
export default function App() {
  // projectAdmin
  const userId = sessionStorage.getItem('user');
  const [getSearch, setSearchuser] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [getProject, setProject] = useState('');
  const [getTask, setTask] = useState('');
  const [showTask, setShowTask] = useState('');
  const [show, setShow] = useState({ index: 0, value: '', status: false });
  const [click, setClick] = useState({ index: 0, value: "" });
  const [showmemeberId, setmemberID] = useState('')
  // projectId
  const { id } = useParams();


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = () => {
    getUserSearchResults(searchTerm).then((response) => {
      setSearchuser(response);
    });
  };

  const handleClickRequest = async () => {
    if (click.value == "") { } else {
      postProjectMemberRequest(userId, id, click.value).then((response) => {
        console.log(JSON.stringify(response));
      });
    }
  }
  const handleFetchProject = async () => {
    fetchProject(id).then((response) => {
      setProject(response);
      const memberIdsent=response.team[0].userId._id;
      taskAssignToMember(id,memberIdsent).then((response)=>{
        setmemberID(response)
        console.log(response)
      })
      
    })
  }
  async function TaskValue() {
    assignTask(id, userId, show.value, getTask).then((response) => {
      setShowTask(response);
    })
  }
  useEffect(() => {
    handleFetchProject()
    
  }, []);
  return (
    <>
      <Header />
      <section className="container-fluid gradient-custom-2 mt-1">
        <div className="container py-5">
          <div className=" row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-sm-12 col-md-12">
              <div className="card mask-custom">
                <div className="card-body p-4 text-white">
                  <div className="text-center pt-3 pb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check"
                      width="60"
                    />
                    <h2 className="my-4">Task List</h2>
                    <div className="d-flex">
                      <div>
                        <div className="form-outline d-flex">
                          <input type="search" id="form1" className="form-control" onChange={handleInputChange} />
                          <button className="btn btn-primary" onClick={handleButtonClick}><FaSearch /></button>
                        </div>
                        {getSearch ? <>
                          {getSearch.map((result, index) => (
                            <div key={index} className="bg-info rounded" onClick={e => setClick({ index: index, value: result._id })}>{result.userName}<button className="btn btn-success btn-block" onClick={handleClickRequest}>request</button></div>
                          ))}
                        </> : <> </>}
                      </div>
                      <div>

                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table  text-white">
                      <thead>
                        <tr>
                          <th scope="col">Team Member</th>
                          <th scope="col">Task</th>
                          <th scope="col">status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      {getProject ? <>
                        {getProject.team.map((memberDetails, index) => (
                          <tbody key={index}>
                            <tr className="fw-normal">
                              <th>
                                <span className="ms-2">{memberDetails.userId.userName}</span>
                              </th>
                              {showmemeberId&&showmemeberId.length ?<>
                              {showmemeberId.map((getinfofrom,index)=>(
                               <td className="align-middle" key={index}>
                                   <span>{getinfofrom.task}</span>
                               </td>
                              ))}
                              </>:<><td className="align-middle">
                                   <span>No task Assign</span>
                               </td></>}

                              <td className="align-middle">
                                <h6 className="mb-0">
                                  <MDBBadge className="mx-2" color="danger">
                                    status
                                  </MDBBadge>
                                </h6>
                              </td>
                              <td className="align-middle">
                                <button className="btn btn-primary" onClick={e => setShow({ index: index, value: memberDetails.userId._id, status: true })}>Task</button>
                                <button className="btn btn-danger">Danger</button>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </> : <></>}

                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show.status} onHide={e => setShow({ index: 0, value: '', status: false })}>
        <Modal.Header className='gradient-custom-2 border-0 text-white'>
          <Modal.Title>Assign Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className='gradient-custom-2'>
          <div className="form-group">
            <label htmlFor="task" className="text-white">Task</label>
            <input type="text" className="form-control" id="task" aria-describedby="task" placeholder="Enter Task" onChange={e => { setTask(e.target.value) }} />
            <small id="task" className="form-text text-muted">Please Assgin a task to</small>
            <button className="btn btn-success btn-block mt-2" onClick={TaskValue}>Assign</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}