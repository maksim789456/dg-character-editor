import CharacterSheet from "@/components/characterSheet";
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
    <>
      <CharacterSheet
        lang={params.lang}
        langDict={langDict}
        skillsDict={skillsDict}
        professions={professions}
      />
    </>
  );
}
