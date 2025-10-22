"use client";

import React from "react";

interface BoolInputProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  textClassName?: string;
}

const BoolInput: React.FC<BoolInputProps> = ({
  title,
  textClassName,
  ...props
}) => {
  return (
    <div
      className={`flex flex-row w-full items-center gap-1 ${props.className}`}
    >
      <input type="checkbox" className="w-4 h-4"/>
      <p className={`font-dg text-dg ${textClassName || ""}`}>{title}</p>
    </div>
  );
};

export default BoolInput;
