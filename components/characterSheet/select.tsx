/* eslint-disable react/prop-types */

import Select, { Props } from "react-select";
import clsx from "clsx";

export type OptionType = { value?: string; label: string };

type CustomSelectProps<Option> = Props<Option, false, any> & {};

const DgSelect = (props: CustomSelectProps<OptionType>) => {
  return (
    <Select
      {...props}
      isMulti={false}
      instanceId={`dgSelect-${props.instanceId}`}
      name={`$dgSelect-${props.name}`}
      classNames={{
        control: () =>
          clsx(
            "!bg-blue-100 dark:!bg-neutral-800 !border-0 !rounded-none !shadow-none",
            props.isDisabled && "!bg-gray-200 dark:!bg-neutral-700"
          ),
        placeholder: () => "font-dg-main text-dg dark:text-neutral-200 text-md",
        singleValue: () => "font-dg-main text-dg dark:text-neutral-200 text-md",
        menu: () => "dark:bg-neutral-800",
        option: ({ isFocused, isSelected }) =>
          clsx(
            "font-dg-main text-dg dark:text-neutral-200 text-sm hover:dark:bg-neutral-700",
            isSelected && "dark:bg-neutral-600",
            !isSelected && isFocused && "dark:bg-neutral-700"
          ),
      }}
    ></Select>
  );
};

export default DgSelect;
