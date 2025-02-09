import CharacterSheet from "@/components/characterSheet";
import { ReduxProvider } from "@/components/reduxProvider";
import {
  getLocaleDictionary,
  getSkillsDictionary,
  getProfessions
} from "@/res/dictionaries";

export default async function CharacterSheetPage({
  params,
}: {
  params: { lang: string };
}) {
  const langDict = await getLocaleDictionary(params.lang);
  const skillsDict = await getSkillsDictionary(params.lang);
  const professions = await getProfessions();

  return (
    <ReduxProvider preloadedState={{ dgProfessions: professions }}>
      <CharacterSheet
        lang={params.lang}
        langDict={langDict}
        skillsDict={skillsDict}
      />
    </ReduxProvider>
  );
}
