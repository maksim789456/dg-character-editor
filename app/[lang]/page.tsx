import CharacterSheet from "@/components/characterSheet";
import {
  getLocaleDictionary,
  getSkillsDictionary,
} from "@/res/dictionaries";

export default async function CharacterSheetPage({
  params,
}: {
  params: { lang: string };
}) {
  const langDict = await getLocaleDictionary(params.lang);
  const skillsDict = await getSkillsDictionary(params.lang);

  return (
    <>
      <CharacterSheet
        lang={params.lang}
        langDict={langDict}
        skillsDict={skillsDict}
      />
    </>
  );
}
