import { OptionType } from "@/components/characterSheet/select";

export function getTypeValue(
  opts: OptionType[],
  val: string | null
): OptionType[] {
  return opts.filter((o) =>
    !o.value ? false : val?.includes(o.value) ?? typeof val === "undefined"
  );
}
