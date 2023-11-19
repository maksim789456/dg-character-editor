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

export default function CharacterSheet({
  lang,
  langDict,
  skillsDict
}: {
  lang: string;
  langDict: any;
  skillsDict: any;
}) {
  const downloadJson = () => {
    const dgCharacter = store.getState().dgCharacter;
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(dgCharacter));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      "DG_Character_" + dgCharacter.fullName + ".json"
    );
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <main id="dgCharacter" className="flex min-h-screen flex-col items-center justify-between px-24 py-1 bg-white">
      <div className="w-[60rem] grid grid-cols-2 gap-0.5 gap-x-1">
        <Provider store={store}>
          <SettingsSection className="col-span-2" lang={lang}/>
          <div className="col-span-2 h-16 bg-dg flex items-center justify-center">
            <Image
              alt="delta green logo"
              src="/Delta-Green-Logo-Horizontal-Tran.png"
              className="w-[224px] h-16"
              width="468"
              height="134"
            />
          </div>
          <PersonalSection
            sectionLocale={langDict.characterList.personalSection}
          />
          <StaticSection sectionLocale={langDict.characterList.staticSection} />
          <PsychologicalSection
            sectionLocale={langDict.characterList.psychologicalSection}
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
          <button
            className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100"
            onClick={downloadJson}
          >
            Download JSON
          </button>
        </div>
      </div>
    </main>
  );
}
