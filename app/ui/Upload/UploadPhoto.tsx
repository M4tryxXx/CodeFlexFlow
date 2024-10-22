import React, { useState } from "react";

const UploadPhoto: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("File uploaded successfully!");
        setFile(null);
        const fileElement = document.getElementById("file") as HTMLInputElement;
        if (fileElement) {
          fileElement.value = "";
        }
        console.log(await response.json());
      } else {
        setStatus("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("Error uploading file.");
    }
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
            className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
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
    </div>
  );
};

export default UploadPhoto;
