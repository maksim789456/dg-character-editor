import "server-only";
import { promises as fs } from "fs";
import { DgProfession } from "@/src/model/profession";

const localeDictionary = {
  en: () => import("./lang/en.json").then((module) => module.default),
  ru: () => import("./lang/ru.json").then((module) => module.default),
} as any;

const skillsDictionary = {
  en: () => import("./skills/en.json").then((module) => module.default),
  ru: () => import("./skills/ru.json").then((module) => module.default),
} as any;

const pdfFieldsDictionary = {
  en: () => import("./pdf/en.json").then((module) => module.default),
  ru: () => import("./pdf/ru.json").then((module) => module.default),
} as any;

export const getLocaleDictionary = async (locale: string) =>
  localeDictionary[locale]();
export const getSkillsDictionary = async (locale: string) =>
  skillsDictionary[locale]();
export const getPdfFieldsDictionary = async (locale: string) =>
  pdfFieldsDictionary[locale]();

export async function getProfessions(): Promise<DgProfession[]> {
  const files = await fs.readdir("res/professions/");
  let professions = [] as DgProfession[];
  for (const file of files) {
    const content = await import("res/professions/" + file).then(
      (module) => module.default
    );
    professions.push(content);
  }
  return professions;
}
