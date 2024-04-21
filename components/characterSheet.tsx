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
import { useAppSelector } from "@/src/redux/hooks";
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
    <Provider store={store}>
      <InnerCharacterSheet
        lang={lang}
        langDict={langDict}
        skillsDict={skillsDict}
      />
    </Provider>
  );
}

function InnerCharacterSheet({
  lang,
  langDict,
  skillsDict,
}: {
  lang: string;
  langDict: any;
  skillsDict: any;
}) {
  const editMode = useAppSelector((state) => state.dgCharacter.editMode);
  const editColSpanRule = {
    "col-span-2": editMode,
    "col-span-3": !editMode,
  };

  return (
    <main
      id="dgCharacter"
      className="min-h-screen px-0 py-1 bg-white lg:flex lg:flex-col lg:items-center lg:justify-between lg:px-24"
    >
      <div
        className={clsx("grid gap-0.5 gap-x-1", {
          "w-[40rem] lg:w-[60rem] grid-cols-2": editMode,
          "w-[80rem] grid-cols-3": !editMode,
        })}
      >
        <SettingsSection
          sectionLocale={langDict.characterList.settingsSection}
          className={clsx(editColSpanRule)}
          lang={lang}
        />
        <div
          className={clsx(
            "h-16 bg-dg flex items-center justify-center",
            editColSpanRule
          )}
        >
          <Image
            alt="delta green logo"
            src="/Delta-Green-Logo-Horizontal-Tran.png"
            className="w-[224px] h-16"
            width="468"
            height="134"
          />
        </div>
        {editMode ? (
          <>
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
            <WoundsSection
              sectionLocale={langDict.characterList.woundsSection}
            />
            <EquipmentSection
              sectionLocale={langDict.characterList.equipmentSection}
            />
            <RemarksSection
              sectionLocale={langDict.characterList.remarksSection}
            />
          </>
        ) : (
          <>
            <div className="col-span-2 grid gap-1 auto-rows-fr">
              <PersonalSection
                sectionLocale={langDict.characterList.personalSection}
              />
              <RemarksSection
                sectionLocale={langDict.characterList.remarksSection}
              />
              <EquipmentSection
                sectionLocale={langDict.characterList.equipmentSection}
              />
              <WoundsSection
                sectionLocale={langDict.characterList.woundsSection}
              />
            </div>
            <div className="flex flex-col gap-1">
              <StaticSection
                sectionLocale={langDict.characterList.staticSection}
                viewMode={true}
              />
              <PsychologicalSection
                sectionLocale={langDict.characterList.psychologicalSection}
                viewMode={true}
              />
              <SkillsSection
                sectionLocale={langDict.characterList.skillsSection}
                skillsDict={skillsDict}
                viewMode={true}
              />
            </div>
          </>
        )}

        <div
          className={clsx(
            "flex flex-row items-center justify-center px-16 py-3",
            { "col-span-2": editMode, "col-span-3": !editMode }
          )}
        >
          <div className="font-dg-main text-dg text-sm text-center">
            {langDict.characterList.other.topSecret}
          </div>
        </div>
        <div
          className={clsx(
            "flex flex-row items-center justify-center",
            editColSpanRule
          )}
        >
          <p className="font-dg-main text-dg pr-3">Debug:</p>
          <DownloadJsonButton />
        </div>
      </div>
    </main>
  );
}
