import CharacterSheet from "@/components/characterSheet";
import { getLocaleDictionary, getSkillsDictionary } from "@/res/dictionaries";

export default async function CharacterSheetPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { id, lang } = await params;
  const skillsDict = await getSkillsDictionary(lang);

  return (
    <CharacterSheet
      lang={lang}
      id={id}
      skillsDict={skillsDict}
    />
  );
}
