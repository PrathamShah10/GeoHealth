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

  console.log("co", nearestState);
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
      message: newMessage,
      community: nearestState,
    });
    setNewMessage("");
  };

  return (
    <div>
      <div>
        <label>Message: </label>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Chat Room</h2>
        <ul>
          {messages?.map((message, i) => (
            <li key={i}>
              <strong>{message.sender}:</strong> {message.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunityChat;
