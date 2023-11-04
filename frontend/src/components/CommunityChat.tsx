import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_CHATS } from "../redux/query/user";
import { io } from "socket.io-client";
import { IMessage } from "../interface/user";
import { useAppSelector } from "../hooks/redux";
import { findNearestState } from "../utils/CalculateDistance";
import VNavbar from './VNavbar';
const CommunityChat: React.FC = () => {
  const [nearestState, setNearestState] = useState<string | null>(null);
  const [getChats, { data }] = useLazyQuery(GET_USER_CHATS);
  const { user } = useAppSelector((state) => state.user);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const socket = useMemo(() => io("localhost:8000"), []);

  // console.log("co", nearestState);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const nearest = findNearestState({ latitude, longitude });
          setNearestState(nearest);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    if (nearestState) {
      getChats({
        variables: {
          community: nearestState,
        },
      });
    }
  }, [nearestState, getChats]);

  useEffect(() => {
    if (data) {
      setMessages(data.getCommunityChats);
    }
  }, [data]);

  const handleMessage = useCallback(
    (newMsg: IMessage) => {
      console.log('newmsg', newMsg)
      setMessages([...messages, newMsg]);
    },
    [messages]
  );
  useEffect(() => {
    socket.on("chat message", handleMessage);
    return () => {
      socket.off("chat message", handleMessage);
    };
  }, [socket, handleMessage]);

  const sendMessage = () => {
    socket.emit("chat message", {
      sender: user?._id,
      senderName: user?.name,
      message: newMessage,
      community: nearestState,
    });
    setNewMessage("");
  };

  return (<>
    <div className="flex w-screen bg-keppel-400">
      <VNavbar />
      <div className="w-5/6 h-screen p-5" >
        <div className="bg-white flex justify-between mx-auto h-40 rounded shadow-md ">
          <div>
            <h1 className="font-semibold p-4 text-2xl">Community Chat</h1>

            <p className="font-normal pl-4 text-xl">Community chat based on the location to allow users to interact about health information.</p>

          </div>
          <img className="p-4 pr-10" src="./group-chat.png" alt="" />
        </div>
        <div className="w-4/6 shadow-md mx-auto mt-5 bg-white rounded p-4">
          <h2 className="p-4 rounded text-white font-bold text-center text-lg bg-sea-green-500">Chat Room</h2>

          <div className="shadow-md mt-5 p-4 h-96 overflow-scroll overflow-x-hidden">
            <ul>
              {messages?.map((message, i) => (
                <li className=" shadow-sm w-min mt-2 text-white rounded-md bg-sea-green-400 p-4" key={i}>
                  <p className="font-semibold">Anonymous</p> 
                  <p>{message.message}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex mt-2 ">
            
            <input className="w-5/6 shadow-md h-10 rounded-md border-2 border-sea-green-600 p-2 "
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="w-1/6 text-white ml-4 rounded-lg bg-sea-green-500" onClick={sendMessage}>Send</button>
          </div>
        </div>

      </div>
    </div> </>);
};

export default CommunityChat;
