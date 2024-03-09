import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_CHATS } from "../redux/query/user";
import { io } from "socket.io-client";
import { IMessage } from "../interface/user";
import { useAppSelector } from "../hooks/redux";
import { findNearestState } from "../utils/CalculateDistance";
import VNavbar from './VNavbar';
const CommunityChat: React.FC = () => {
  const content = [
    "Avoid offensive language, hate speech, and personal attacks.",
    "Respect the privacy of others and refrain from sharing their personal information without consent.",
    "Refrain from spamming, using excessive caps, or sending repeated messages.",
    "Avoid using inappropriate language and be mindful of cultural differences.",
    "Do not engage in any form of harassment, bullying, or intimidation , Report any instances of harassment to the app administrators.",
    "Take a moment to consider the potential impact of your message before posting.",
    "If you're part of a group, follow the group's specific rules and norms."
  ];
  const paragraphsToShowInitially = 2;
  const [visibleContent, setVisibleContent] = useState(content.slice(0, paragraphsToShowInitially));
  const showMoreContent = () => setVisibleContent(content);
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
  console.log(user?._id)
  return (<>
    <div className="mmpage">
      <div className="mainpage w-screen min-h-screen font-Rubik backdrop-blur-md p-1" >
        <div className="w-5/6 ml-auto relative  h-auto p-1 ">
          <div className="w-5/6 rounded-md ml-auto mr-auto mt-20 pb-4 relative h-auto bg-white p-1">
            <h1 className="text-3xl p-4 font-extrabold text-gray-600">Community Chats</h1>
            {visibleContent.map((paragraph, index) => (
              <p className="text-md pl-4 pt-1 " key={index}>{paragraph}</p>
            ))}
            {visibleContent.length < content.length && (
              <button  className="pl-4 pt-2 text-teal-400" onClick={showMoreContent}>Show More</button>
            )}
          </div>
          <div className="w-4/6 shadow-md mx-auto mt-5 bg-white rounded p-4">
            <h2 className="p-4 rounded text-white font-bold text-center text-lg bg-sea-green-500">Chat Room</h2>

            <div className="shadow-md mt-5 p-4 h-96 overflow-scroll overflow-x-hidden">
              <ul>
                {messages?.map((message, i) => (
                  <li className={`shadow-sm w-min mt-2 text-white rounded-md
                
                  
                ${message.sender === user?._id ? 'bg-sea-green-500 rounded-tl-none ml-auto min-w-[20%]' : 'rounded-tr-none bg-gray-800 min-w-[20%] text-white'}
                 p-4`} key={i}>
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
      </div>
    </div> </>);
};

export default CommunityChat;
