import React, { ReactNode } from "react";
import clsx from "clsx";

interface TableItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  customTitle?: ReactNode;
  ariaLabel?: string;
  isHeader?: boolean;
  fontSize?: string;
}

const TableItem: React.FC<TableItemProps> = ({
  title,
  customTitle,
  ariaLabel,
  isHeader: center,
  fontSize,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "border-b border-r border-dg last:border-r-0 w-full h-full",
        props.className || ""
      )}
    >
      <div
        className={
          "px-1 py-0.5 h-full flex items-center " +
          (center || false ? "justify-center" : "")
        }
      >
        <div
          className={
            "font-dg-main " +
            (center || false ? "text-center " : " ") +
            (fontSize || false ? fontSize : "text-xs")
          }
          aria-label={ariaLabel}
        >
          {title ?? customTitle}
        </div>
      </div>
    </div>
  );
};

export default TableItem;
