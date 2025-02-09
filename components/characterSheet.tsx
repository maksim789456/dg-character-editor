"use client";

import store from "@/src/store/store";
import PersonalSection from "./characterSheet/sections/PersonalSection";
import StaticSection from "./characterSheet/sections/StaticSection";
import PsychologicalSection from "./characterSheet/sections/PsychologicalSection";
import Image from "next/image";
import SkillsSection from "./characterSheet/sections/SkillsSection";
import WoundsSection from "./characterSheet/sections/WoundsSection";
import EquipmentSection from "./characterSheet/sections/EquipmentSection";
import RemarksSection from "./characterSheet/sections/RemarksSection";
import { Provider } from "react-redux";
import SettingsSection from "./characterSheet/sections/SettingsSection";
import DownloadJsonButton from "./characterSheet/export/downloadJsonButton";
import ThemeProvider from "@/app/contexts/themeContext";
import clsx from "clsx";

export default function CharacterSheet({
  lang,
  langDict,
  skillsDict,
}: {
  lang: string;
  langDict: any;
  skillsDict: any;
}) {
  return (
    <main
      id="dgCharacter"
      role="main"
      className="min-h-screen px-0 py-1 bg-white dark:bg-neutral-900 min-w-max sm:flex sm:flex-col sm:items-center sm:justify-between lg:px-24"
    >
      <div className="w-[40rem] md:w-[60rem] grid grid-cols-2 gap-0.5 gap-x-1">
        <Provider store={store}>
          <ThemeProvider>
            <SettingsSection
              sectionLocale={langDict.characterSheet.settingsSection}
              className="col-span-2"
              lang={lang}
            />
            <div className="col-span-2 h-16 bg-dg dark:bg-zinc-800 flex items-center justify-center">
              <Image
                alt="delta green logo"
                src="/Delta-Green-Logo-Horizontal-Tran.png"
                className="w-[224px] h-16"
                width="468"
                height="134"
                priority
              />
            </div>
            <PersonalSection
              sectionLocale={langDict.characterSheet.personalSection}
            />
            <StaticSection
              sectionLocale={langDict.characterSheet.staticSection}
              className="col-span-2 md:col-span-1"
            />
            <PsychologicalSection
              sectionLocale={langDict.characterSheet.psychologicalSection}
              className="col-span-2 md:col-span-1"
            />
            <SkillsSection
              sectionLocale={langDict.characterSheet.skillsSection}
              skillsDict={skillsDict}
            />
            <WoundsSection
              sectionLocale={langDict.characterSheet.woundsSection}
            />
            <EquipmentSection
              sectionLocale={langDict.characterSheet.equipmentSection}
            />
            <div className="col-span-2 relative">
              <RemarksSection
                sectionLocale={langDict.characterSheet.remarksSection}
              />
              <div className="absolute bottom-0 -right-4 hidden lg:block">
                <h1 className="font-dg-main text-xs text-center text-vertical text-dg/20 dark:text-neutral-200 select-none w-fit">
                  {langDict.characterSheet.other.pieceOfArt}
                </h1>
              </div>
            </div>
          </ThemeProvider>
        </Provider>
        <div className="mt-2 col-span-2 grid grid-cols-14">
          <div className="col-span-3 flex flex-row gap-3">
            <p className="row-span-2 flex items-center justify-center text-dg dark:text-neutral-200 text-3xl font-semibold">
              DD
            </p>
            <p className="flex items-center justify-center font-dg-main text-dg dark:text-neutral-200 text-sm text-center">
              {langDict.characterSheet.other.usa}
              <br />
              {langDict.characterSheet.other.form}
            </p>
            <p className="row-span-2 flex items-center justify-center text-dg dark:text-neutral-200 text-3xl font-semibold">
              315
            </p>
          </div>
          <p className="col-span-3"></p>
          <div className="col-span-6 flex items-center justify-center">
            <p className="font-dg-main text-dg dark:text-neutral-200 text-center text-xs">
              {langDict.characterSheet.other.topSecret}
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
            Copyright © 2023–2025 <a href="https://github.com/maksim789456">maksim789456</a><br />
            {langDict.characterSheet.other.copyright}
          </div>
        </div>
        <div
          className={clsx(
            "col-span-2 flex flex-row items-center justify-center",
            process.env.NODE_ENV === "production" && "hidden"
          )}
        >
          <p className="font-dg-main text-dg dark:text-neutral-200 pr-3">
            Debug:
          </p>
          <DownloadJsonButton />
        </div>
      </div>
    </main>
  );
}
