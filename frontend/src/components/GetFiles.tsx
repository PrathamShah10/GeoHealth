import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useAppSelector } from "../hooks/redux";
import { ADD_FILES_TO_HOSPITAL, GET_ALL_USERFILES } from "../redux/query/user";
import ClipSpinner from "../common/ClipSpinner";
const GetFiles = ({ toSend }: GetFilesProps) => {
  const { user } = useAppSelector((state) => state.user);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [userFiles, setUserFiles] = useState<any>([]);
  const [getFilesww, { data }] = useLazyQuery(GET_ALL_USERFILES);
  const [updateFiles] = useMutation(ADD_FILES_TO_HOSPITAL);
  const { hospitalId } = useParams();
  useEffect(() => {
    const getUserFiles = () => {
      getFilesww({
        variables: {
          id: user?._id,
        },
        fetchPolicy: "network-only",
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
  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };
  const SendFiles = () => {
    updateFiles({
      variables: {
        fileData: {
          fileHashes: selectedItems,
          hospitalId,
        },
      },
    });
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <ClipSpinner isLoading={false} />
      <div className="flex">
        {userFiles?.map((userFile: any, i: number) => {
          return (
            <div className="p-2 cursor-pointer bg-green-200" key={i}>
              {toSend && (
                <input
                  type="checkbox"
                  checked={selectedItems.includes(userFile.fileHash)}
                  onChange={(event) =>
                    handleCheckboxChange(event, userFile.fileHash)
                  }
                />
              )}
              <div onClick={() => openFile(userFile.fileHash)}>
                fileName: {userFile.fileName}
              </div>
            </div>
          );
        })}
        {toSend && <div onClick={SendFiles}>Send files</div>}
      </div>
    </div>
  );
};
type GetFilesProps = {
  toSend?: string;
};
export default GetFiles;
