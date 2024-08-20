"use client";
import React from "react";
import { deleteExperience } from "@/app/lib/actions";
import toast from "react-hot-toast";
import { DeleteIcon } from "../admin/table/DeleteIcon";

export default function DeleteExperience({ id }: { id: any }) {
  const functionDelete = async (experienceId: any) => {
    try {
      await deleteExperience(experienceId);
      toast.success("Experience deleted!");
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleDelete = async () => {
    await functionDelete(id);
  };
  return (
    <>
      <DeleteIcon
        onClick={handleDelete}
        className="w-8 z-50 text-red-600 hover:cursor-pointer"
      />
    </>
  );
}
