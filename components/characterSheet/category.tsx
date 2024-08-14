import React from "react";

interface CategoryProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

const Category: React.FC<CategoryProps> = ({ name, ...props }) => {
  return (
    <div
      className={"flex flex-row flex-nowrap w-full " + (props.className || "")}
    >
      <div className="border-2 border-dg dark:border-neutral-800 border-l-0 flex flex-row w-full">
        <h1 className="font-dg-main text-sm text-center bg-dg dark:bg-neutral-800 text-vertical text-white dark:text-neutral-200 select-none px-3 py-3 w-fit">
          {name}
        </h1>
        <div className="text-dg w-full">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Category;
