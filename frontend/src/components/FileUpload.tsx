import React, { useState } from 'react';
import { create as ipfsHttpClient } from "ipfs-http-client";

const ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  // headers: {
  //   authorization,
  // },
});

interface AppState {
  file: File | null;
  cid: string;
  fileData: ArrayBuffer | null;
}

function FileUpload() {
  // const [state, setState] = useState<AppState>({
  //   file: null,
  //   cid: '',
  //   fileData: null,
  // });

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event?.target?.files && setState({ ...state, file: event?.target?.files[0] });
  // };

  // const handleFileUpload = async () => {
  //   if (state.file) {
  //     try {
  //       const added = await ipfs.add(state.file);
  //       setState({ ...state, cid: added.path, file: null });
  //     } catch (error) {
  //       console.error('Error adding file:', error);
  //     }
  //   }
  // };

  // const handleFileDownload = async () => {
  //   if (state.cid) {
  //     try {
  //       const data = await ipfs.cat(state.cid);
  //       setState({ ...state, fileData: data });
  //     } catch (error) {
  //       console.error('Error retrieving file:', error);
  //     }
  //   }
  // };

  return (
    <div>
      {/* <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {state.cid && (
        <button onClick={handleFileDownload}>Download</button>
      )}
      {state.fileData && (
        <img src={URL.createObjectURL(new Blob([state.fileData], { type: 'image/jpeg' }))} alt="Downloaded Image" />
      )} */}
      <h1>gello</h1>
    </div>
  );
}
export default FileUpload;