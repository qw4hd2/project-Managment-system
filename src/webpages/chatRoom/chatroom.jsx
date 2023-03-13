import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {DeleteGroupChat} from "./chat.js";
import "./../css/style.css";
import { FiSend } from 'react-icons/fi';
import swal from "sweetalert";
function ChatRoom() {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = sessionStorage.getItem('user');
  const { id } = useParams()
  const userId = user;
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getChat/${id}/chat`);
        const data = await response.json();
        setMessages(data.chat);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      fetchChat();
    }
  }, [messages]);

  const handleSendMessage = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: userId,
          messageText: messageText,
        }),
      });
      const data = await response.json();
      setMessages([...messages, data.message]);
      setMessageText("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteChat = async()=>{
    await DeleteGroupChat(userId,id).then((response)=>{
      swal(response,{
        icon:"success",
        butons:{},
        timer:3000,
      })
    }).catch((err)=>{
      swal(err.response.data,{
        icon:"error",
        butons:{},
        timer:3000,
      })
    })
  }
  return (
    <div className="container-fluid body">
      <div className="bg-dark">
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          <>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <div>Group Chatting</div>
                    <div className="btn btn-danger" onClick={handleDeleteChat}>Delete</div>
                  </div>
                  <div className="card-body mt-5 mb-4 card-body-height">
                   {messages?<>
                    {messages.map((messageInfo, index) => (
                      <ul className="chat-list" key={index}>

                        {messageInfo.sender ? <>
                          {messageInfo.sender._id === userId ? <>
                            <li className="in">
                              <div className="chat-img">
                                <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                              </div>
                              <div className="chat-body">
                                <div className="chat-message">
                                  <h5>{messageInfo.sender.userName ? <>{messageInfo.sender.userName}</> : <>{"unknown"}</>}</h5>
                                  <p>{messageInfo.text}</p>
                                </div>
                              </div>
                            </li>
                          </> : <>
                            <li className="out">
                              <div className="chat-img">
                                <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                              </div>
                              <div className="chat-body">
                                <div className="chat-message">
                                  <h5>{messageInfo.sender.userName}</h5>
                                  <p>{messageInfo.text}</p>
                                </div>
                              </div>
                            </li>
                          </>}
                        </> : <></>}


                      </ul>
                    ))}
                   
                   </>:<>not started yet</>}
                  </div>
                  <div className="panel-footer messageinputfield">
                    <div className="input-group">
                      <input id="btn-input" type="text" className="form-control pt-4 pb-4" placeholder="Message" value={messageText} onChange={(event) => setMessageText(event.target.value)} />
                      <span className="input-group-btn">
                        <button className="btn btn-primary pt-3 pb-2" onClick={handleSendMessage}><FiSend /></button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </>
        )}
      </div>

    </div>
  );
}
export default ChatRoom;
