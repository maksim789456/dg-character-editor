import clsx from "clsx";

export default function DeleteIcon(props: React.SVGProps<SVGAElement>) {
  return (
    <svg className={clsx("w-5 h-5 text-white dark:text-neutral-200", props.className)} fill="currentColor" viewBox="0 -960 960 960">
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>
  )
}