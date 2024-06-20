"use client";

import CharactersList from "@/components/characters/charactersList";
import ReduxProvider from "@/components/reduxProvider";

export default function CharactersListPage({
  params,
}: {
  params: { lang: string };
}) {
  return (
    <ReduxProvider>
      <CharactersList lang={params.lang} />
    </ReduxProvider>
  );
}
