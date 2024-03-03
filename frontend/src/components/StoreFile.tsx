import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { useAppSelector } from "../hooks/redux";
import axios from "axios";
import { IPFS_KEY } from "../common/keys";
import { ADD_FILE } from "../redux/query/user";
const StoreFile: React.FC = () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <h1>Pin File to IPFS</h1>
      <form onSubmit={handleSubmit}>
        FileName: <input type="text" onChange={(e) => setFileName(e.target.value)} />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StoreFile;
