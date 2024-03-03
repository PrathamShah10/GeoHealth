import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useAppSelector } from "../hooks/redux";
import { GET_ALL_USERFILES } from "../redux/query/user";
import ClipSpinner from "../common/ClipSpinner";
function GetFiles() {
  const { user } = useAppSelector((state) => state.user);
  const [userFiles, setUserFiles] = useState<any>([]);
  const [getFilesww, { data }] = useLazyQuery(GET_ALL_USERFILES);

  useEffect(() => {
    const getUserFiles = () => {
      getFilesww({
        variables: {
          id: user?._id,
        },
      });
    };
    getUserFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFilesww, user]);

  useEffect(() => {
    setUserFiles(data?.getUserFiles);
  }, [data]);

  const openFile = (path: string) => {
    // Create a new window to open the file
    window.open(`https://gateway.pinata.cloud/ipfs/${path}`, "_blank");
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <ClipSpinner isLoading={false} />
      <div className="flex">
        {userFiles?.map((userFile: any, i: number) => {
        return (
          <div className='p-2 cursor-pointer bg-green-200' key={i} onClick={() => openFile(userFile.fileHash)}>
            fileName: {userFile.fileName}
          </div>
        );
      })}
      </div>
      
    </div>
  );
}

export default GetFiles;
