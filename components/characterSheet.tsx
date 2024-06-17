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
      className="min-h-screen px-0 py-1 bg-white lg:flex lg:flex-col lg:items-center lg:justify-between lg:px-24"
    >
      <div className="w-[40rem] lg:w-[60rem] grid grid-cols-2 gap-0.5 gap-x-1">
        <Provider store={store}>
          <SettingsSection
            sectionLocale={langDict.characterList.settingsSection}
            className="col-span-2"
            lang={lang}
          />
          <div className="col-span-2 h-16 bg-dg flex items-center justify-center">
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
            sectionLocale={langDict.characterList.personalSection}
          />
          <StaticSection
            sectionLocale={langDict.characterList.staticSection}
            className="col-span-2 lg:col-span-1"
          />
          <PsychologicalSection
            sectionLocale={langDict.characterList.psychologicalSection}
            className="col-span-2 lg:col-span-1"
          />
          <SkillsSection
            sectionLocale={langDict.characterList.skillsSection}
            skillsDict={skillsDict}
          />
          <WoundsSection sectionLocale={langDict.characterList.woundsSection} />
          <EquipmentSection
            sectionLocale={langDict.characterList.equipmentSection}
          />
          <RemarksSection
            sectionLocale={langDict.characterList.remarksSection}
          />
        </Provider>
        <div className="col-span-2 flex flex-row items-center justify-center px-16 py-3">
          <div className="font-dg-main text-dg text-sm text-center">
            {langDict.characterList.other.topSecret}
          </div>
        </div>
        <div className="col-span-2 flex flex-row items-center justify-center">
          <p className="font-dg-main text-dg pr-3">Debug:</p>
          <DownloadJsonButton />
        </div>
      </div>
    </main>
  );
}
