"use client";

import { RedirectType, redirect } from "next/navigation";
import { useEffect } from "react";

const availableLanguages = ["en", "ru"];

export default function Root() {
  useEffect(() => {
    let lang = navigator.language.split("-")[0];
    if (!availableLanguages.includes(lang)) lang = "en";
    redirect("/" + lang, RedirectType.replace);
  }, []);
}
