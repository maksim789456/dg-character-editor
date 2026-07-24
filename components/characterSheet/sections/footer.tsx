import clsx from "clsx";
import { useTranslations } from "next-intl";
import DownloadJsonButton from "../export/downloadJsonButton";

export default function Footer() {
  const t = useTranslations("characterSheet");

  return (
    <>
      <div className="mt-2 col-span-2 grid grid-cols-14">
        <div className="col-span-3 flex flex-row gap-3">
          <p className="row-span-2 flex items-center justify-center text-dg dark:text-neutral-200 text-3xl font-semibold">
            DD
          </p>
          <p className="flex items-center justify-center font-dg-main text-dg dark:text-neutral-200 text-sm text-center">
            {t("other.usa")}
            <br />
            {t("other.form")}
          </p>
          <p className="row-span-2 flex items-center justify-center text-dg dark:text-neutral-200 text-3xl font-semibold">
            315
          </p>
        </div>
        <p className="col-span-3"></p>
        <div className="col-span-6 flex items-center justify-center">
          <p className="font-dg-main text-dg dark:text-neutral-200 text-center text-xs">
            {t("other.topSecret")}
          </p>
        </div>
        <div className="col-span-2 flex items-center justify-end">
          <p className="text-dg dark:text-neutral-200 text-3xl font-semibold">
            112382
          </p>
        </div>
      </div>
      <div className="col-span-2 flex flex-row items-center justify-center px-16 py-3">
        <div className="font-dg-main text-dg dark:text-neutral-200 text-sm text-center">
          Copyright © 2023-2026{" "}
          <a
            href="https://github.com/maksim789456"
            aria-label="Autor github link"
          >
            maksim789456
          </a>
          <br />
          {t("other.copyright")}
        </div>
      </div>
      <div
        className={clsx(
          "col-span-2 flex flex-row items-center justify-center",
          process.env.NODE_ENV === "production" && "hidden",
        )}
      >
        <p className="font-dg-main text-dg dark:text-neutral-200 pr-3">
          Debug:
        </p>
        <DownloadJsonButton />
      </div>
    </>
  );
}