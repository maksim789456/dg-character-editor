import CharacterSheet from "@/components/characterSheet";
import {
  getSkillsDictionary,
} from "@/res/dictionaries";

export default async function CharacterSheetPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const skillsDict = await getSkillsDictionary(lang);

  return (
    <>
      <CharacterSheet
        lang={lang}
        skillsDict={skillsDict}
      />
    </>
  );
}
