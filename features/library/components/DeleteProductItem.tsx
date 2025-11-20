"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDeleteFoodLibraryMutation } from "../hooks/useDeleteFoodLibraryMutation";

const DeleteProductItem = ({ id }: { id: string }) => {
  const deleteFoodFromLibrary = useDeleteFoodLibraryMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!id) {
      console.error("Delete error: ID is missing");
      return;
    }

    setDeletingId(id);
    try {
      await deleteFoodFromLibrary.mutateAsync(id);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const isDeleting = deletingId === id || deleteFoodFromLibrary.isPending;

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      variant="outline"
      className="h-10 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 disabled:opacity-50"
      size="sm"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </Button>
  );
};

export default DeleteProductItem;
