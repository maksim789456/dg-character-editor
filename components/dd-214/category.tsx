import React, { ReactNode } from "react";

interface CategoryProps extends React.HTMLAttributes<HTMLDivElement> {
  name: ReactNode;
  titleClassName?: string;
}

const Category: React.FC<CategoryProps> = ({ name, titleClassName, ...props }) => {
  return (
    <div
      className={"flex flex-row flex-nowrap w-full " + (props.className || "")}
    >
      <div className="border-2 border-dg dark:border-zinc-800 border-b-0 flex flex-row w-full">
        <div className="border-0 border-dg border-r w-10 px-1 flex items-center justify-center">
          <h1 className={"font-dg-main text-sm text-center text-vertical text-dg dark:text-neutral-200 select-none text-wrap " + (titleClassName || "")}>
            {name}
          </h1>
        </div>
        <div className="text-dg w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default Category;
