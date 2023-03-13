import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { taskAssignToMember, leaveProejctteam,submitTaskFunction } from "./dataRequest.js";
import Modal from 'react-bootstrap/Modal';
import Header from "./../include/header.js";
import Footer from "./../include/footer.js";
import { Link } from "react-router-dom";
import "./../css/style.css";
import swal from 'sweetalert';
function TaskForMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem('user')
  const [showmemeberId, setmemberID] = useState('')
  const [show,setShow] = useState(false);
  const [image, setImage] = useState({ preview: '', data: '' })
  const [getDescription,setDescription]=useState("");
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  const fetchTaskForMember = async () => {
    taskAssignToMember(id, memberId).then((response) => {
      setmemberID(response)
    })
  }
  useEffect(() => {
    fetchTaskForMember();
  }, [])
  const handleKick = async (memberId, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to  participate more!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await leaveProejctteam(memberId, id).then((response) => {
            swal("OK! you leave project team successfully", {
              icon: "success",
              buttons: {},
              timer: 3000,
            }).then(() => {
              navigate("/home")
            })
          })
        } else {
          swal("Your are in project!");
        }
      });

  }
 const handleSubmitRequest =async(projectId,MemberId,projectAdminId,img,description)=>{
  await submitTaskFunction(projectId,projectAdminId,MemberId,img,description).then((response)=>{
    swal(response.message,{
      icon:"success",
      buttons:false,
      timer:3000,
    }).then(setShow(false))
  })

 }
  return (
    <div className="container-fluid gradient-custom-2 h-100">
      <div className="row">
        <div className="col-lg-12 col-sm-12 col-md-12">
          <Header />
        </div>
      </div>
      <hr color="white" />
      <div className="row">
        <div className="col-lg-12 col-sm-12 col-sm-12">
          <div className="task-div">
            <div className='d-flex justify-content-between '>
              <p>Project Admin: {showmemeberId && showmemeberId[0].projectAdmin.userName}</p>
              <p>Project Name: {showmemeberId && showmemeberId[0].projectId.projectName}</p>
              <p>Project Type:{showmemeberId && showmemeberId[0].projectId.projectType}</p>
            </div>
            <div className="col-lg-4 col-sm-12 col-md-12">
              <div className="task-show">
                <h1 className='task-heading'>Task</h1>
              </div>
              <div className="task-show1">
                <p>Project Description: {showmemeberId && showmemeberId[0].projectId.projectDescription}</p>
                <p className='task-height'>Project Task: {showmemeberId && showmemeberId[0].task}</p>
              </div>
              <div className="task-show1 task-footer">
                <p>want to submit task</p>
                <button onClick={e => setShow(true)}>Submit Task</button>
              </div>
            </div>
            <div className='d-flex justify-content-between mt-3'>
            <Link to={`/chatRoom/${id}`}><button className='btn btn-info ml-3'>chatRoom</button></Link>
            <button className='btn btn-danger me-3' onClick={e => handleKick(memberId, id)}>Leave Project</button>
            </div>
          </div>
        </div>

      </div>
      <div className="row">
        <Footer />
      </div>
      <Modal show={show} onHide={e => setShow(false)}>
        <Modal.Header className='gradient-custom-2 border-0 text-white'>
          <Modal.Title>Submit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className='gradient-custom-2'>
          <input name="image" type="file" className="btn btn-success mb-2"  onChange={handleFileChange} required/>
          <input name="description" type="text" className='form-control mb-2' placeholder='Task Description here...' onChange={e=>setDescription(e.target.value)} required/>
          <button onClick={e=>{handleSubmitRequest(id,memberId,showmemeberId && showmemeberId[0].projectAdmin._id,image.data,getDescription)}} className="btn btn-success">Submit Task</button>
        </Modal.Body>
      </Modal>
    </div>

  )
}

export default TaskForMember