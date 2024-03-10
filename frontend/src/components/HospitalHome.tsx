import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_HOSPITAL_FILES } from "../redux/query/user";
import { useNavigate } from "react-router";
const HospitalHome = () => {
  const { _id } = JSON.parse(localStorage.getItem("hospital"));
  const hospitalId = _id;
  const [files, setFiles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [getAllHospitalFiles, { data }] = useLazyQuery(GET_ALL_HOSPITAL_FILES);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFiles = async () => {
      if (hospitalId) {
        getAllHospitalFiles({
          variables: {
            hospitalId,
          },
        });
      }
    };

    fetchFiles();
  }, [hospitalId]);

  useEffect(() => {
    if (data) {
      setFiles(data.getHospitalFiles);
    }
  }, [data]);

  const users = Array.from(new Set(files.map((file) => file.userId)));

  const handleUserClick = async (userId) => {
    setSelectedUserId(userId);
    try {
      const response = files.filter((item) => item.userId === userId);
      setUserFiles(response);
    } catch (error) {
      console.error(error);
    }
  };
  const openFile = (path: string) => {
    // Create a new window to open the file
    window.open(`https://gateway.pinata.cloud/ipfs/${path}`, "_blank");
  };
  return (
    <div>
      <h1>Hospital Files</h1>
      <h2>Users whose files this hospital has:</h2>
      <ul>
        {users.map((userId) => (
          <li key={userId}>
            <button onClick={() => handleUserClick(userId)}>
              User ID: {userId}
            </button>
          </li>
        ))}
      </ul>
      {selectedUserId && (
        <div>
          <h2>Files of selected user:</h2>
          <ul>
            {userFiles.map((file) => (
              <li onClick={() => openFile(file.fileHash)} key={file.fileHash}>
                {file.fileName}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default HospitalHome;
