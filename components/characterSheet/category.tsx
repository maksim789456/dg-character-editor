import clsx from "clsx";
import React from "react";

interface CategoryProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  vertical?: boolean;
}

const Category: React.FC<CategoryProps> = ({ name, vertical, ...props }) => {
  return (
    <div
      className={"flex flex-row flex-nowrap w-full " + (props.className || "")}
    >
      <div
        className={clsx("border-2 border-dg flex w-full", {
          "flex-row border-l-0": !vertical,
          "flex-col": vertical,
        })}
      >
        <h1
          className={clsx(
            "font-dg-main text-sm text-center bg-dg flex-row text-white select-none px-3 py-3",
            {
              "w-fit, text-vertical": !vertical,
              "h-fit": vertical,
            }
          )}
        >
          {name}
        </h1>
        <div className="text-dg w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default Category;
