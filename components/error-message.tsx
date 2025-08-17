import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

interface Props {
  message?: string;
}

const ErrorMessage = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="flex items-center bg-red-100 text-sm text-red-500 p-2 mt-2 rounded-md">
      <BsExclamationTriangle className="mr-2" />
      {message}
    </div>
  );
};

export default ErrorMessage;
