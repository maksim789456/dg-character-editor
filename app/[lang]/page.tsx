import CharacterSheet from "@/components/characterSheet";
import {
  getSkillsDictionary,
} from "@/res/dictionaries";

export default async function CharacterSheetPage({
  params,
}: {
  params: { lang: string };
}) {
  const skillsDict = await getSkillsDictionary(params.lang);

  return (
    <>
      <CharacterSheet
        lang={params.lang}
        skillsDict={skillsDict}
      />
    </>
  );
}
