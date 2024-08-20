"use client";
import React from "react";
import { deleteQualification } from "@/app/lib/actions";
import { DeleteIcon } from "../admin/table/DeleteIcon";
import toast from "react-hot-toast";

export default function DeleteQualification({ id }: { id: any }) {
  const functionDelete = async (qualificationId: any) => {
    try {
      await deleteQualification(qualificationId);
    } catch (err: any) {
      toast.error(err);
    }
    toast.success("Education deleted!");
  };

  const handleDelete = async () => {
    await functionDelete(id);
  };
  return (
    <>
      <DeleteIcon
        onClick={handleDelete}
        className="w-8 text-red-500 z-50 hover:cursor-pointer"
      />
    </>
  );
}
