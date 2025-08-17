"use client";

import React, { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";

interface Props {
  message?: string;
  duration?: number;
}

const SuccessMessage = ({ message, duration = 3000 }: Props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!message || !visible) return null;

  return (
    <div className="flex items-center bg-lime-100 text-sm text-lime-500 p-2 mt-2 rounded-md">
      <BsCheck2 className="mr-2" />
      {message}
    </div>
  );
};

export default SuccessMessage;
