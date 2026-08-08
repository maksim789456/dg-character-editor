import CharactersList from "@/components/characters/charactersList";

export default async function CharactersListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <CharactersList lang={lang} />
  );
}
