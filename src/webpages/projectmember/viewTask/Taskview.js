import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from "./../../include/header.js";
import { taskUploadByMemberToProjectAdmin } from "./../dataRequest.js";
import "./../../css/style.css";
import { getIn } from 'formik';
function Taskview() {
    const { id } = useParams();
    const { memberId } = useParams();
    const [getData, setData] = useState();
    const FetchDetailForAdmin = async () => {
        await taskUploadByMemberToProjectAdmin(id, memberId).then((response) => {
            setData(response);
        })
    }
    useEffect(() => {
        FetchDetailForAdmin();
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
                                        <h2 className="my-4">Task Upload by {getData&&<>{getData.tasks[0].memberId.userName}</>}</h2>
                                        <div>
                                            {getData ? <>
                                                {getData.tasks.map((getInfo, index) => (
                                                    <div className="container card-container mt-4">
                                                        <div className="col s12 m7">
                                                            <div className="card card-container">
                                                                <div className='row'>
                                                                    <div className='col-lg-6 col-sm-12 col-md-12'>
                                                                        <div className="card-image">
                                                                            <div>{getInfo.image ? <>
                                                                                {getInfo.image.map((img, indeximg) => (
                                                                                    <img src={img.url} key={indeximg}  className="fadeIn" />
                                                                                ))}
                                                                            </> : <></>}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-6 col-sm-12 col-md-12'>
                                                                        <div className="card-content">
                                                                            <span className="card-title">{getInfo.projectId.projectName}</span>
                                                                            <p>{getInfo.description}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </> : <>hy.......</>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Taskview