import 'server-only'

import lang from './lang/en.json';
import skills from './skills/en.json';
import pdf from './pdf/en.json';

export type LocaleSchema = typeof lang;
export type SkillsSchema = typeof skills;
export type PdfSchema = typeof pdf;
 
const localeDictionary: Record<string, () => Promise<LocaleSchema>> = {
  "en": () => import('./lang/en.json').then((module) => module.default as LocaleSchema),
  "ru": () => import('./lang/ru.json').then((module) => module.default as LocaleSchema),
};

const skillsDictionary: Record<string, () => Promise<SkillsSchema>> = {
  "en": () => import('./skills/en.json').then((module) => module.default),
  "ru": () => import('./skills/ru.json').then((module) => module.default),
} as any;

const pdfFieldsDictionary: Record<string, () => Promise<PdfSchema>> = {
  "en": () => import('./pdf/en.json').then((module) => module.default),
  "ru": () => import('./pdf/ru.json').then((module) => module.default),
} as any;

export const getLocaleDictionary = async (locale: string) => await localeDictionary[locale]()
export const getSkillsDictionary = async (locale: string) => await skillsDictionary[locale]()
export const getPdfFieldsDictionary = async (locale: string) => await pdfFieldsDictionary[locale]()