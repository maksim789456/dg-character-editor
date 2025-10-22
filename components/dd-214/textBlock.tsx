"use client";

import React, { ReactNode } from "react";

interface TextBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  titleClassName?: string;
  name?: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ title, titleClassName, name, ...props }) => {
  return (
    <div
      className={`border border-dg dark:border-neutral-600 border-t-0 border-l-0
  } ${props.className || ""} flex flex-col w-full`}
    >
      {title ? <p className={`font-dg-main dark:text-neutral-200 text-xs px-1 pt-1 ${titleClassName}`}>{title}</p> : <></>}
      <div className="h-full flex flex-row justify-center items-center py-0.5">
        <p className="font-dg-main dark:text-neutral-200 text-xs text-center">{name}</p>
        {props.children}
      </div>
    </div>
  );
};

export default TextBlock;
