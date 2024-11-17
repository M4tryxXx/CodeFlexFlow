import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const UploadPhoto = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        setStatus("File uploaded successfully!");
        setUploadProgress(0);
        setFile(null);
        if (xhr.response) {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          setUploadedFile(response.httpfilepath);
        }
      } else {
        setStatus("Failed to upload file.");
        setUploadProgress(0);
      }
    };

    xhr.onerror = () => {
      setStatus("Error uploading file.");
      setUploadProgress(0);
    };

    xhr.send(formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Photo</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-white"
          >
            Select Photo
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border rounded bg-gray-700 text-white h-20 "
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
      {status && <p className="mt-4 text-white">{status}</p>}
      {uploadProgress > 0 && (
        <div className="mt-4">
          <p className="text-white">
            Upload Progress: {uploadProgress.toFixed(2)}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      {uploadedFile && (
        <div className="mt-4 w-full">
          <Link href={uploadedFile} target="_blank">
            <p className="text-blue-500 hover:underline">View uploaded file</p>
          </Link>
          <Image
            src={uploadedFile}
            alt="Uploaded file"
            className="w-auto h-64 mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default UploadPhoto;
