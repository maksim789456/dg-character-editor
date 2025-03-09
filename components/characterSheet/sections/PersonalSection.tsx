"use client";

import React from "react";
import Category from "../category";
import GenderInput from "../genderInput";
import TextInput from "../textInput";
import { useTranslations } from "next-intl";

interface PersonalSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const PersonalSection: React.FC<PersonalSectionProps> = ({
  ...props
}) => {
  const t = useTranslations('characterSheet.personalSection');
  return (
    <Category
      className="col-span-2"
      name={t("categoryName")}
      {...props}
    >
      <div className="grid grid-cols-5">
        <TextInput
          className="col-span-3"
          title={t("fullName")}
          name="fullName"
        />
        <TextInput
          className="col-span-2"
          title={t("profession")}
          name="profession"
        />
        <TextInput
          className="col-span-3"
          title={t("employer")}
          name="employer"
        />
        <TextInput
          className="col-span-2"
          title={t("nationality")}
          name="nationality"
        />
        <GenderInput
          className="col-span-1"
          title={t("gender")}
          mTitle={t("genderM")}
          fTitle={t("genderF")}
        />
        <TextInput
          className="col-span-1"
          title={t("age")}
          name="age"
        />
        <TextInput
          className="col-span-3"
          title={t("education")}
          name="education"
        />
      </div>
    </Category>
  );
};

export default PersonalSection;
