"use client";

import React from "react";
import Category from "../category";
import GenderInput from "../genderInput";
import TextInput from "../textInput";
import ProfessionSelect from "../professionSelect";

interface PersonalSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
  lang: string;
}

const PersonalSection: React.FC<PersonalSectionProps> = ({
  sectionLocale,
  lang,
  ...props
}) => {
  return (
    <Category
      className="col-span-2"
      name={sectionLocale?.categoryName}
      {...props}
    >
      <div className="grid grid-cols-5">
        <TextInput
          className="col-span-3"
          title={sectionLocale?.fullName}
          name="fullName"
        />
        <ProfessionSelect
          className="col-span-2"
          sectionLocale={sectionLocale}
          lang={lang}
        />
        <TextInput
          className="col-span-3"
          title={sectionLocale?.employer}
          name="employer"
        />
        <TextInput
          className="col-span-2"
          title={sectionLocale?.nationality}
          name="nationality"
        />
        <GenderInput
          className="col-span-1"
          title={sectionLocale?.gender}
          mTitle={sectionLocale?.genderM}
          fTitle={sectionLocale?.genderF}
        />
        <TextInput
          className="col-span-1"
          title={sectionLocale?.age}
          name="age"
        />
        <TextInput
          className="col-span-3"
          title={sectionLocale?.education}
          name="education"
        />
      </div>
    </Category>
  );
};

export default PersonalSection;
