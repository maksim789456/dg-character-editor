import 'server-only'
 
const localeDictionary = {
  "en": () => import('./lang/en.json').then((module) => module.default),
  "ru": () => import('./lang/ru.json').then((module) => module.default),
} as any;

const skillsDictionary = {
  "en": () => import('./skills/en.json').then((module) => module.default),
  "ru": () => import('./skills/ru.json').then((module) => module.default),
} as any;

const pdfFieldsDictionary = {
  "en": () => import('./pdf/en.json').then((module) => module.default),
  "ru": () => import('./pdf/ru.json').then((module) => module.default),
} as any;

export const getLocaleDictionary = async (locale: string) => localeDictionary[locale]()
export const getSkillsDictionary = async (locale: string) => skillsDictionary[locale]()
export const getPdfFieldsDictionary = async (locale: string) => pdfFieldsDictionary[locale]()