import React, { ChangeEvent, useState, useCallback } from "react";
import { create } from "ipfs-http-client";
const UserDocumentsInput = () => {
  const [uploadedHash, setUploadedHash] = useState<string | null>(null);

  const authorization =
    "Basic " +
    btoa("87aff0ec5f874fc3b14967d217dcf0df:6oS9Zapfo/gIxA1R+4E6JxymvALO6hIvgzRRIEJ2j3lJgsAbu0jqdA");
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization,
    },
  });
  console.log("upload hash is", uploadedHash);
  const onFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        try {
          const { cid } = await ipfs.add(file);

          // Set the uploaded hash to state
          setUploadedHash(cid.toString());
        } catch (error) {
          console.error("Error uploading file to IPFS:", error);
        }
      }
    },
    [ipfs]
  );

  return (
    <div className="h-screen flex justify-center items-center">
      <input type="file" onChange={onFileChange} />
      {uploadedHash && (
        <div>
          <p>File uploaded successfully!</p>
          <p>IPFS Hash: {uploadedHash}</p>
        </div>
      )}
    </div>
  );
};

export default UserDocumentsInput;
