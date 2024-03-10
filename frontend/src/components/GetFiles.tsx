import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useAppSelector } from "../hooks/redux";
import { Document, Page } from "react-pdf";
import { ADD_FILES_TO_HOSPITAL, GET_ALL_USERFILES } from "../redux/query/user";
import { pdfjs } from "react-pdf";
import { toast } from "react-toastify";

import ClipSpinner from "../common/ClipSpinner";
import StoreFile from "./StoreFile";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
const GetFiles = ({ toSend }: GetFilesProps) => {
  const notifyB = (msg) => toast.success(msg);
  const { user } = useAppSelector((state) => state.user);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [userFiles, setUserFiles] = useState<any>([]);
  const [getFilesww, { data }] = useLazyQuery(GET_ALL_USERFILES);
  const [updateFiles] = useMutation(ADD_FILES_TO_HOSPITAL);
  const { hospitalId } = useParams();
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
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
  }, []);

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
    notifyB("Documents Sent Successfully");
  };
  return (
    <div className="mmpage ">
      <div className="backdrop-blur-md p-1 h-screen">
        <div className="ml-[25rem] mt-24">
          <ClipSpinner isLoading={false} />
          <StoreFile />
          <div className="flex justify-between w-11/12">
            <h1 className="font-extrabold mt-5 text-3xl font-Rubik text-gray-600">
              Your Files
            </h1>

            {toSend && (
              <div
                className=" mt-6 p-3 bg-teal-400 rounded-lg cursor-pointer shadow-lg text-white"
                onClick={SendFiles}
              >
                Send files
              </div>
            )}
          </div>

          <div className=" flex flex-wrap bg-gray-50 w-11/12 rounded-lg mt-4 ">
            {userFiles?.map((userFile: any, i: number) => {
              return (
                <div
                  className="w-[20%] bg-white ml-10 mt-10 h-max-content pb-10 text-center shadow-md rounded-lg  relative"
                  key={i}
                >
                  <div className="">
                    {toSend && (
                      <div className="checkbox-wrapper-31 ml-[80%] mt-4">
                        <input
                          type="checkbox"
                          className=""
                          checked={selectedItems.includes(userFile.fileHash)}
                          onChange={(event) =>
                            handleCheckboxChange(event, userFile.fileHash)
                          }
                        />
                        <svg viewBox="0 0 35.6 35.6">
                          <circle
                            className="background"
                            cx="17.8"
                            cy="17.8"
                            r="17.8"
                          ></circle>
                          <circle
                            className="stroke"
                            cx="17.8"
                            cy="17.8"
                            r="14.37"
                          ></circle>
                          <polyline
                            className="check"
                            points="11.78 18.12 15.55 22.23 25.17 12.87"
                          ></polyline>
                        </svg>
                      </div>
                    )}
                    <Document
                      file={`https://gateway.pinata.cloud/ipfs/${userFile.fileHash}`}
                      className=""
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={(error) => {
                        console.error("Error loading PDF:", error);
                        setNumPages(0);
                      }}
                      error={null} // This will suppress the default "Failed to load PDF file" message
                    >
                      {numPages > 0 ? (
                        <div className="">
                          <Page
                            pageNumber={pageNumber}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            width={200}
                            height={800}
                            className="ml-5 mt-8"
                          />
                        </div>
                      ) : (
                        <img
                          className="w-52"
                          src={`https://gateway.pinata.cloud/ipfs/${userFile.fileHash}`}
                          alt=""
                        />
                      )}
                    </Document>
                    <img
                      className="w-[80%] ml-8 mt-10 "
                      src={`https://gateway.pinata.cloud/ipfs/${userFile.fileHash}`}
                      alt=""
                    />
                  </div>

                  <div className="flex justify-between mb-0 mt-auto bottom-0  w-full absolute p-2">
                    <p className="pt-2 text-xl font-Rubik">
                      {userFile.fileName}
                    </p>
                    <div
                      className="cursor-pointer bg-teal-400 text-white p-2 rounded-md"
                      onClick={() => openFile(userFile.fileHash)}
                    >
                      View
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
type GetFilesProps = {
  toSend?: string;
};
export default GetFiles;
