"use client";
import React, { useState } from "react";
import { deleteQualification } from "@/app/lib/actions";
import { DeleteIcon } from "../admin/table/DeleteIcon";
import toast from "react-hot-toast";
import "../css/loadingSpinner.css";

export default function DeleteQualification({ id }: { id: any }) {
  const [loading, setLoading] = useState(false);
  const functionDelete = async (qualificationId: any) => {
    try {
      await deleteQualification(qualificationId);
    } catch (err: any) {
      setLoading(false);
      toast.error(err);
    }
    setLoading(false);
    toast.success("Education deleted!");
  };

  const handleDelete = async () => {
    setLoading(true);
    await functionDelete(id);
  };
  return (
    <>
      {loading && (
        <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
          <div className="bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg md:h-16 h-12 w-[30%] rounded-lg flex flex-row justify-center items-center fixed left-[35%] top-1/2">
            <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
            Loading...
          </div>
        </div>
      )}
      <DeleteIcon
        onClick={handleDelete}
        className="w-8 text-red-500 z-50 hover:cursor-pointer"
      />
    </>
  );
}
