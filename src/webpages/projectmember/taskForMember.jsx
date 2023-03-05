import React ,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { taskAssignToMember } from "./dataRequest.js";
import Header from "./../include/header.js";
import Footer from "./../include/footer.js";
import "./../css/style.css";
function TaskForMember() {
    const {id} =useParams()
    const memberId = sessionStorage.getItem('user')
    const [showmemeberId, setmemberID] = useState('')
    const fetchTaskForMember = async()=>{
        taskAssignToMember(id,memberId).then((response)=>{
            setmemberID(response)
          })
    }
    useEffect(()=>{
        fetchTaskForMember();
    },[])
  return (
    <div className="container-fluid gradient-custom-2 h-100">
        <div className="row">
         <div className="col-lg-12 col-sm-12 col-md-12">
            <Header/>
         </div>
        </div>
        <hr color="white"/>
       <div className="row">
        <div className="col-lg-12 col-sm-12 col-sm-12">
            <div className="task-div">
                <div className='d-flex justify-content-between pr-3 pl-3'>
                    <p className='task-show1'>Project Admin: {showmemeberId &&  showmemeberId[0].projectAdmin.userName}</p>
                    <p className='task-show1'>Project Name: {showmemeberId && showmemeberId[0].projectId.projectName}</p>
                    <p className='task-show1'>Project Type:{showmemeberId && showmemeberId[0].projectId.projectType}</p>
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
                        <button>Submit Task</button>
                    </div>
                </div>
               
            </div>   
        </div>
                
        </div>
        <div className="row">
            <Footer/>
        </div>
        
       </div>

  )
}

export default TaskForMember