import "server-only";
import { promises as fs } from "fs";
import { DgProfession } from "@/src/model/profession";
import { DgSkillsDict } from "@/src/model/skills";
import path from "path";

const localeDictionary = {
  en: () => import("./lang/en.json").then((module) => module.default),
  ru: () => import("./lang/ru.json").then((module) => module.default),
} as Record<string, () => Promise<any>>;

const skillsDictionary = {
  en: () => import("./skills/en.json").then((module) => module.default),
  ru: () => import("./skills/ru.json").then((module) => module.default),
} as Record<string, () => Promise<DgSkillsDict>>;

const pdfFieldsDictionary = {
  en: () => import("./pdf/en.json").then((module) => module.default),
  ru: () => import("./pdf/ru.json").then((module) => module.default),
} as Record<string, () => Promise<any>>;

export const getLocaleDictionary = async (locale: string) =>
  localeDictionary[locale]();
export const getSkillsDictionary = async (locale: string) =>
  skillsDictionary[locale]();
export const getPdfFieldsDictionary = async (locale: string) =>
  pdfFieldsDictionary[locale]();

export async function getProfessions(): Promise<DgProfession[]> {
  const professionsPath = path.resolve(process.cwd(), "res", "professions");
  const files = await fs.readdir(professionsPath);
  let professions = [] as DgProfession[];
  for (const file of files) {
    const content = await fs.readFile(path.resolve(professionsPath, file), 'utf8');
    const data = JSON.parse(content);
    professions.push(data);
  }
  return professions;
}
