import DD214Form from "@/components/dd-214/dd214_form";

export default async function DD214FormPage({
  params,
}: {
  params: { lang: string };
}) {
  return (
    <>
      <DD214Form lang={params.lang} />
    </>
  );
}