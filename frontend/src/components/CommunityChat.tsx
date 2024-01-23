import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_CHATS } from "../redux/query/user";
import { io } from "socket.io-client";
import { IMessage } from "../interface/user";
import { useAppSelector } from "../hooks/redux";
import { findNearestState } from "../utils/CalculateDistance";
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

  return (
    <div className="rounded-md overflow-hidden shadow-md">
  <div className="p-4">
    <h2 className="text-lg font-semibold mb-2">Chat Room</h2>
    <ul className="space-y-2">
      {messages?.map((message, i) => (
        <li key={i} className="flex items-start">
          <div className="flex-shrink-0">
            <img
              // src={message.senderAvatar}
              alt={`${message.senderName}'s Avatar`}
              className="h-6 w-6 rounded-full"
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-600">
              <strong>{message.senderName}:</strong> {message.message}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
  <div className="border-t border-gray-200 p-4">
    <label className="block text-sm font-medium text-gray-600">Message:</label>
    <div className="mt-1 flex rounded-md shadow-sm">
      <input
        type="text"
        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Send
      </button>
    </div>
  </div>
</div>

  );
};

export default CommunityChat;
