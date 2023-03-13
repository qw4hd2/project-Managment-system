import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';
import { NavLink,Link } from 'react-router-dom';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Header from "../include/header.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEmpire } from '@fortawesome/free-brands-svg-icons';
import { fetchEnrolledProject,deleteProject } from "./homData.js";
import Robot from "./../images/robot.jpg";
import Footer from "./../include/footer.js";
import swal from 'sweetalert';
function Home() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [getuserData, setUserData] = useState();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [getEnrollData,setEnrollData] = useState('');
    const userId = sessionStorage.getItem('user')
    const fetchProject = async () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/api/project/user/${userId}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setUserData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const fetchTotalProjectEnroll = async () => {
        await fetchEnrolledProject(userId).then((response) => {
            setEnrollData(response);
        })
    }
    useEffect(() => {
        fetchProject();
        fetchTotalProjectEnroll();
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    
      const formattedTime = currentTime.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
      const handleDelete = async(id)=>{
        await deleteProject(id).then((response)=>{
            swal({
                title:"Delete",
                text:response,
                icon:"success",
                button:{},
                timer:3000,
            }).then(window.location.reload(true))
        })
      }
    return (<>
        <div className="container-fluid p-0 bg-container">
            <Header />
            <div className='container'>
                <div className='row add-card'>
                    <div className='col-lg-6 col-md-12 col-sm-12'>
                        <button className="addProject" onClick={handleShow}>+</button>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12'>
                        <p className="text">Click Below Button to see All Ongoing Projects</p>
                        <Link to="/seeProjects"><button className='see-details'>Click to see All project</button></Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12 col-sm-12 col-md-12 p-5'>
                        <h1 className='text-center text-white'>Your Project are listed Below</h1>
                    </div>
                    {getuserData && getuserData.length ? <>
                        {getuserData.map((getInfo, index) => (

                            <div className="col-md-6 col-lg-4 column" key={index}>
                                <div className="card card-project gr-3">
                                    <div className="txt mt-3">
                                        <h1>{getInfo.projectName}</h1>
                                        <p>{getInfo.projectDescription}</p>
                                    </div>
                                    <NavLink to={`/Projectmember/${getInfo._id}`} >View Project</NavLink>
                                    <div className="ico-card">
                                        <button className='btn btn-danger' onClick={e=>handleDelete(getInfo._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </> : <section className="dark">
                        <div className="container py-4">
                            <h1 className="h1 text-center" id="pageHeaderTitle">No Project</h1>
                            <article className="postcard dark blue">
                                <a className="postcard__img_link" href="#">
                                    <img className="postcard__img" src={Robot} alt="Image Title" />
                                </a>
                                <div className="postcard__text">
                                    <h1 className="postcard__title blue"><a href="#">No Project</a></h1>
                                    <div className="postcard__subtitle small">
                                        <time dateTime="2020-05-25 12:00:00">
                                            {formattedTime}
                                        </time>
                                    </div>
                                    <div className="postcard__bar"></div>
                                    <div className="postcard__preview-txt">It Seems like you are not started any project. Anyway welcome to project management system developed by Shahriyar, here you can start your own project and add member to assign them task and update their task. Thank you for visiting my web application and have a nice day<br/>Best regard: Shahriyar</div>
                                </div>
                            </article>
                            
                        </div>
                    </section>
                    }
                </div>
                <div className="row pb-5">
                    <div className="col-lg-12 colsm-12 col-md-12 p-5">
                        <h1 className='text-center text-white'>Member in projects</h1>
                    </div>
                    {getEnrollData && getEnrollData.length ? <>
                        {getEnrollData.map((getInfo, index) => (

                            <div className="col-md-6 col-lg-4 column" key={index}>
                                <div className="card card-project gr-3">
                                    <div className="txt">
                                        <h1>{getInfo.projectName}</h1>
                                        <p>Project Admin: {getInfo.projectAdmin.userName}</p>
                                    </div>
                                    <NavLink to={`/taskformember/${getInfo._id}`} >View Project</NavLink>
                                    <div className="ico-card">
                                        <FontAwesomeIcon icon={faEmpire} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </> : <section className="dark">
                        <div className="container py-4">
                            <h1 className="h1 text-center" id="pageHeaderTitle">Not A Member</h1>
                            <article className="postcard dark blue">
                                <a className="postcard__img_link" href="#">
                                    <img className="postcard__img" src={Robot} alt="Image Title" />
                                </a>
                                <div className="postcard__text">
                                    <h1 className="postcard__title blue"><a href="#">Not Enrolled in any project</a></h1>
                                    <div className="postcard__subtitle small">
                                        <time dateTime="2020-05-25 12:00:00">
                                            {formattedTime}
                                        </time>
                                    </div>
                                    <div className="postcard__bar"></div>
                                    <div className="postcard__preview-txt">It Seems like you are not enrolled in any project. Anyway welcome to project management system developed by shahriyar. Here you can start you own project and add member to assign them task and update their task. Thank you for visiting my web application and have a nice day<br/>Best regard: Shahriyar</div>
                                </div>
                            </article>
                            
                        </div>
                    </section>
                    }
                </div>
            </div>
        <Footer/>
        </div>


        <Modal show={show} onHide={handleClose}>
            <Modal.Header className='gradient-custom-2 border-0 text-white'>
                <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>
            <Modal.Body className='gradient-custom-2'>
                <Formik
                    initialValues={{
                        userId: userId,
                        projectName: '',
                        projectType: '',
                        description: '',
                        day: '',
                        month: '',
                        year: '',
                        iniday: '',
                        inimonth: '',
                        iniyear: '',
                    }}
                    onSubmit={async (values) => {
                        var data = JSON.stringify({
                            "projectAdmin": values.userId,
                            "projectName": values.projectName,
                            "projectType": values.projectType,
                            "projectDescription": values.description,
                            "dueDate": [
                                {
                                    "day": values.day,
                                    "month": values.month,
                                    "year": values.year
                                }
                            ],
                            "initialDate": [
                                {
                                    "day": values.iniday,
                                    "month": values.inimonth,
                                    "year": values.iniyear
                                }
                            ]
                        });
                        var config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: 'http://localhost:5000/api/create/newProject',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data
                        };

                        axios(config)
                            .then(function (response) {
                                swal({
                                    title:"Thank You",
                                    text:"Your project has been added successfully",
                                    icon:"success",
                                    buttons:{},
                                    timer:3000,
                                  }).then(handleClose)
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}
                >
                    <Form >
                        <div className="row">
                            <div className='col-lg-6 col-sm-12 col-md-12'>
                                <Field id="projectName" name="projectName" placeholder="project name" className="form-control" />
                            </div>
                            <div className='col-lg-6 col-sm-12 col-md-12'>
                                <Field id="projectType" name="projectType" placeholder="Project type" className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 mt-2">

                                <Field id="description" name="description" placeholder="Project Description" className="form-control" />

                            </div>
                        </div>
                        <div className="row">
                            <div className='col-lg-12 col-sm-12 col-md-12'>
                                <label htmlFor="date">duedate</label>
                            </div>
                            <div className='col-lg-4 col-sm-12 col-md-12'>
                                <Field name="day" type="text" placeholder="dd" className="form-control" />
                            </div>
                            <div className='col-lg-4 col-sm-12 col-md-12'>
                                <Field name="month" type="text" placeholder="mm" className="form-control" />
                            </div>
                            <div className='col-lg-4 col-sm-12 col-md-12'>
                                <Field name="year" type="text" placeholder="yy" className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-lg-12 col-sm-12 col-md-12'>
                                <label htmlFor="date">Initial Data</label>
                            </div>
                            <div className='col-lg-4 col-sm-12 col-md-12'>
                                <Field name="iniday" type="text" placeholder="dd" className="form-control" />
                            </div>
                            <div className='col-lg-4 col-sm-12 col-md-12'>
                                <Field name="inimonth" type="text" placeholder="mm" className="form-control" />
                            </div>
                            <div className='col-lg-4 col-sm-12 col-md-12'>
                                <Field name="iniyear" type="text" placeholder="yy" className="form-control" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 mt-3'>
                                <button type="submit" className='btn btn-block btn-info'>Add Project</button>
                            </div>
                        </div>

                    </Form>
                </Formik>
            </Modal.Body>
        </Modal>
    </>
    )
}

export default Home