"use client";

import CharactersList from "@/components/characters/charactersList";
import ReduxProvider from "@/components/reduxProvider";

export default async function CharactersListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <ReduxProvider>
      <CharactersList lang={lang} />
    </ReduxProvider>
  );
}
