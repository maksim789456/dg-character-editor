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
import ThemeProvider from "@/app/contexts/themeContext";
import { useTranslations } from "next-intl";
import Footer from "./characterSheet/sections/footer";

export default function CharacterSheet({
  lang,
  skillsDict,
}: {
  lang: string;
  skillsDict: any;
}) {
  const t = useTranslations("characterSheet");

  return (
    <main
      id="dgCharacter"
      role="main"
      className="min-h-screen px-0 py-1 bg-white dark:bg-neutral-900 min-w-max sm:flex sm:flex-col sm:items-center sm:justify-between"
    >
      <div className="w-[40rem] md:w-[60rem] grid grid-cols-2 gap-0.5 gap-x-1">
        <Provider store={store}>
          <ThemeProvider>
            <SettingsSection className="col-span-2" lang={lang} />
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
            <PersonalSection />
            <StaticSection className="col-span-2 md:col-span-1" />
            <PsychologicalSection className="col-span-2 md:col-span-1" />
            <SkillsSection skillsDict={skillsDict} />
            <WoundsSection />
            <EquipmentSection />
            <div className="col-span-2 relative">
              <RemarksSection />
              <div className="absolute bottom-0 -right-4 hidden lg:block">
                <h1 className="font-dg-main text-xs text-center text-vertical text-dg dark:text-neutral-200 select-none w-fit">
                  {t("other.pieceOfArt")}
                </h1>
              </div>
            </div>
            <Footer/>
          </ThemeProvider>
        </Provider>
      </div>
    </main>
  );
}
