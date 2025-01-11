import React, { useEffect, useRef } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import toast from 'react-hot-toast'
import { useState } from "react";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { baseURL } from "../config/AxiosHelper";
import { getMessages } from "../services/RoomService";

function ChatPage() {


  const {roomId, currentUser, connected, setConnected, setRoomId, setCurrentUser}=useChatContext();

  const navigate= useNavigate()

  useEffect(()=>{
    if(!connected){
     navigate("/")
    }

  },[roomId, currentUser, connected])


  const [messages, setMessages] = useState([]);  
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const chatBoxRef = useRef(null);

  const [stompClient, setStompClient] = useState(null);

  // const [roomId, setRoomId] = useState("");
  // const [currentUser] = useState("bala")



  useEffect(()=>{

    async function loadMessages() {

      try {

        const messages =await getMessages(roomId);

        

        setMessages(messages)
        
      } catch (error) {

        console.log(error)
        
      }
      
    }
    if(connected){
    loadMessages();
    }

  },[])

  // Scroll Dowm

  useEffect(()=>{

    if(chatBoxRef.current){
      chatBoxRef.current.scroll({
        top:chatBoxRef.current.scrollHeight,
        behavior:'smooth'
      })
    }

  },[messages])


 useEffect(() => {
    const connectWebSocket = () => {
      ///SockJS
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);

        toast.success("connected");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);

          const newMessage = JSON.parse(message.body);

          setMessages((prev) => [...prev, newMessage]);

          //rest of the work after success receiving the message
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }

    //stomp client
  }, [roomId]);


  // send Message handle

  const sendMessage = async ()=>{
    if(stompClient && connected && input.trim()){
      console.log(input)
    }

    const message ={
      sender:currentUser,
      content:input,
      roomId:roomId
    }

    stompClient.send(`/app/sendMessage/${roomId}`,{},JSON.stringify(message))
    setInput("");
  }

  function handleLogout(){
    stompClient.disconnect()
    setConnected(false)
    setRoomId("")
    setCurrentUser("")
    navigate("/")
  }




  return (
    <div className="">
      {/* THis is header */}
      <header className="border border-gray-700 py-2 flex justify-around items-center bg-gray-900 fixed w-full h-12 ">
        {/* Room name Container */}

        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>{roomId}</span>
          </h1>
        </div>

        {/* UserName Container */}
        <div>
          <h1 className="text-xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>

        {/* button: leave Room */}
        <div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 px-1.5 py-1.5 rounded-md text-sm">
            Leave Room
          </button>
        </div>
      </header>

      <main ref={chatBoxRef} className="py-12 px-1 w-3/4 bg-slate-600 mx-auto h-screen overflow-auto  text-white">
        <div className="message_container">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender===currentUser ? "justify-end" : "justify-start"}`}>
              <div className={`my-1 p-1 ${message.sender===currentUser ? "bg-green-600" : "bg-purple-600"} rounded-md max-w-sm  `}>
                <div className="flex flex-row gap-2">
                  <img
                    src="https://avatar.iran.liara.run/public/24"
                    alt=""
                    className="h-9 w-9 "
                  />
                  <div className=" flex flex-col ">
                    <p className="text-xs font-bold">{message.sender}</p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Input message container */}

      <div className="fixed bottom-2 w-full h-10 ">
        <div className="h-full flex items-center justify-between gap-2 pr-5   border border-gray-700 rounded-full w-2/3 mx-auto bg-gray-900">
          <input
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            type="text"
            placeholder="Type your message here..."
            className="border-gray-600 border bg-gray-800 px-3 py-2 rounded-full w-full h-full text-sm focus:outline-none"
          />

          <div className="flex gap-1">
            <button className="bg-purple-600 px-1 py-1 rounded-full h-8 w-10 flex justify-center items-center hover:bg-purple-700">
              <MdAttachFile size={20} />
            </button>
            <button onClick={sendMessage} className="bg-green-600 px-1 py-1 rounded-full h-8 w-10 flex justify-center items-center hover:bg-green-700">
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
