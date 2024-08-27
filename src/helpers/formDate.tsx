export const formatDate = (date: Date | null) => {
    return date ? date.toISOString().split("T")[0] : "";
  };