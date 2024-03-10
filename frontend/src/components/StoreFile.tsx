import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { useAppSelector } from "../hooks/redux";
import axios from "axios";
import { IPFS_KEY } from "../common/keys";
import { ADD_FILE } from "../redux/query/user";
import { toast } from "react-toastify";
const StoreFile: React.FC = () => {
  const notifyB = (msg) => toast.success(msg);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [addFile] = useMutation(ADD_FILE);
  const { user } = useAppSelector((state) => state.user);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log('andar')
    event.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const pinataMetadata = JSON.stringify({
      name: "File name",
    });
    formData.append("pinataMetadata", pinataMetadata);
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${IPFS_KEY}`,
          },
        }
      );
      console.log(res.data.IpfsHash);
      await addFile({
        variables: {
          fileDetails: {
            userId: user?._id,
            fileName,
            fileHash: res.data.IpfsHash,
          },
        },
      });
      notifyB(
        "Document Uploaded Successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fileuploads shadow-md p-10 w-11/12 rounded-lg bg-white">
      
      <form onSubmit={handleSubmit}>
        File Name: <input type="text" className="w-1/6 bg-gray-100 border-2 rounded-md" onChange={(e) => setFileName(e.target.value)} />
        <input type="file" style={dropzoneStyle} className="fileups mt-5 w-11/12 h-32 text-center " onChange={handleFileChange} />
        <button className="w-40 ml-auto mr-auto bg-teal-400 mt-5 rounded-md text-white p-2 shadow-md" type="submit">Submit</button>
      </form>
    </div>
  );
};const dropzoneStyle: React.CSSProperties = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  paddingLeft: "40%",
  paddingTop: "3rem",
  cursor: "pointer",
  
};

export default StoreFile;
