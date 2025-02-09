import CharacterSheet from "@/components/characterSheet";
import { ReduxProvider } from "@/components/reduxProvider";
import {
  getLocaleDictionary,
  getSkillsDictionary,
  getProfessions,
} from "@/res/dictionaries";
import { initialState } from "@/src/features/dgCharacter/dgCharacterSlice";

export default async function CharacterSheetPage({
  params,
}: {
  params: { lang: string };
}) {
  const langDict = await getLocaleDictionary(params.lang);
  const skillsDict = await getSkillsDictionary(params.lang);
  const professions = await getProfessions();

  const preloadedState = {
    dgProfessions: professions,
    dgCharacter: {...initialState, lang: params.lang},
  };
  return (
    <ReduxProvider preloadedState={preloadedState}>
      <CharacterSheet
        langDict={langDict}
        skillsDict={skillsDict}
      />
    </ReduxProvider>
  );
}
