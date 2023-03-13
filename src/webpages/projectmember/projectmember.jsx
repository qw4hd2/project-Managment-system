import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {
  MDBBadge,
} from "mdb-react-ui-kit";
import Header from "../include/header.js";
import { FaSearch } from "react-icons/fa";
import "./../css/style.css";
import { getUserSearchResults, postProjectMemberRequest, fetchProject, assignTask, taskAssignToMember,requestTojoinProject,getRequestForAdmin ,leaveProejctteam,totalTaskSubmitBySpecificMember} from "./dataRequest.js";
import { Badge } from "react-bootstrap";
import {Link} from "react-router-dom";
import swal from 'sweetalert';
export default function App() {
  // projectAdmin
  const userId = sessionStorage.getItem('user');
  const [getSearch, setSearchuser] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [getProject, setProject] = useState('');
  const [getTask, setTask] = useState('');
  const [show, setShow] = useState({ index: 0, value: '', status: false });
  const [showModal, setShowModal] = useState(false);
  const [click, setClick] = useState({ index: 0, value: "" });
  const [getSubmit,setSubmit] = useState(0);
  const [showmemeberId, setmemberID] = useState('')
  const [getRequest,setShowRequest] = useState('');
  const [getLength,setLength] = useState()
  // projectId
  const { id } = useParams();


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = () => {
    if(searchTerm.trim()){
    getUserSearchResults(searchTerm).then((response) => {
      setSearchuser(response);
    });
  }else{
    setSearchuser([]);
    setSearchTerm([]);
  }
  };

  const handleClickRequest = async (requestToId) => {
    
    postProjectMemberRequest(userId, id, requestToId).then((response) => {
      swal(
        response, {
        icon: "info",
        buttons: false,
        timer: 3000,
      }
      )
    }).catch((err) => {
      swal(
        err.response.data, {
        icon: "error",
        buttons: false,
        timer: 3000,
      }
      )
    })
  }
  const handleFetchProject = async () => {
    fetchProject(id).then((response) => {
      setProject(response);
      const team = response.team;
      for (const member of team) {
        const memberId = member.userId._id;
        taskAssignToMember(id, [memberId]).then((response) => {
          setmemberID(response)
        });
        totalTaskSubmitBySpecificMember([memberId],id).then((response) => {
          setSubmit(response);
        });
      }
    });
  };
  
  async function TaskValue() {
    assignTask(id, userId, show.value, getTask).then((response) => {
      swal(
        response.message, {
        icon: "info",
        buttons: false,
        timer: 3000,
      }
      ).then(setShow({ index: 0, value: '', status: false }))
    })
  }
  const handleAccept = async(id,projectId,jionerId)=>{
    getRequestForAdmin(id,projectId,jionerId).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  }
  const handleKick = async(memberId,id)=>{
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to see participate more!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async(willDelete) => {
        if (willDelete) {
          await leaveProejctteam(memberId,id).then((response)=>{
            swal("OK! you leave project team successfully", {
              icon: "success",
              buttons:{},
              timer:3000,
            });
          })
        } else {
          swal("Your are in project!");
        }
      });
  
  }
  useEffect(() => {
    handleFetchProject();
  }, []);
  useEffect(() => {
    requestTojoinProject(userId,id).then((response)=>{
      setShowRequest(response);
      setLength(response.length);
    })
  }, [userId,id]);

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
                    <div>
                      <div>
                        <div className="form-outline d-flex justify-content-between">
                          <div className="d-flex">
                            <input type="search" id="form1" className="form-control" onChange={handleInputChange} />
                            <button className="btn btn-primary" onClick={handleButtonClick}><FaSearch /></button>
                          </div>
                          <button className="request-admin" onClick={e=>setShowModal(true)}>Request<Badge>{getLength ? `(${getLength})` : null}</Badge></button>
                        </div>
                        {getSearch ? <>
                          {getSearch.map((result, index) => (
                            <div key={index} className="search-tap bg-info rounded" onClick={e => setClick({ index: index, value: result._id })}>{result.userName}<button className="btn btn-success btn-block" onClick={e=>handleClickRequest(result._id)}>request</button></div>
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
                        <tr className="text-center">
                          <th scope="col">Team Member</th>
                          <th scope="col">Task</th>
                          {/* <th scope="col">status</th> */}
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      {getProject ? <>
                        {getProject.team.map((memberDetails, index) => (
                          <tbody key={index} className="text-center">
                            <tr className="fw-normal">
                              <th>
                                <span className="ms-2">{memberDetails.userId.userName}</span>
                              </th>
                              {showmemeberId && showmemeberId.length ? <>
                                {showmemeberId.map((getinfofrom, index) => (
                                  <td className="align-middle" key={index}>
                                    <span>{getinfofrom.task}</span>
                                  </td>
                                ))}
                              </> : <><td className="align-middle">
                                <span>No task Assign</span>
                              </td></>}

                              {/* <td className="align-middle">
                                <h6 className="mb-0">
                                  <MDBBadge className="mx-2" color="danger">
                                    status
                                  </MDBBadge>
                                </h6>
                              </td> */}
                              <td className="d-flex justify-content-center">
                                <button className="btn btn-primary" onClick={e => setShow({ index: index, value: memberDetails.userId._id, status: true })}>Task</button>
                                <button className="btn btn-danger ml-3" onClick={e=>handleKick(memberDetails.userId._id,id)}>Kick Member</button>
                                <Link to={`/taskview/pid/${id}/mid/${memberDetails.userId._id}`}><button className="btn btn-success ml-3">View <MDBBadge className="mx-2" color="danger">
                                {getSubmit ? `(${getSubmit.count})` : null}
                                  </MDBBadge></button></Link>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </> : <></>}

                    </table>
                  </div>
                  <Link to={`/chatRoom/${id}`}><button className="btn btn-info">chatRoom</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* task modal start */}
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
      {/* task modal end */}

      {/* request modal start */}
      <Modal show={showModal} onHide={e => setShowModal(false)}>
        <Modal.Header className='gradient-custom-2 border-0 text-white'>
          <Modal.Title>Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body className='gradient-custom-2'>
        {getRequest?<>
        {getRequest.map((info,index)=>(
            <div className='row' key={index}>
            <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='card bg-transparent'>
                    <div className='card-body d-flex justify-content-between'>
                        <div>
                            <h4>{info.jionerId.userName}</h4>
                        </div>
                        <div>
                            <button className='btn btn-success' onClick={e=>{handleAccept(info._id,info.projectId,info.jionerId._id)}}>Accept</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))}
        </>:<>No request here</>}
        </Modal.Body>
      </Modal>
      {/* request modal end */}
    </>
  );
}