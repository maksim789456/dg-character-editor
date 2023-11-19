"use client";

import React from "react";
import Category from "../category";
import GenderInput from "../genderInput";
import TextInput from "../textInput";
import { useDispatch, useSelector } from "react-redux";
import { DgCharacter } from "@/src/model/character";
import { set } from "@/src/features/dgCharacter/dgCharacterSlice";

interface PersonalSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const PersonalSection: React.FC<PersonalSectionProps> = ({
  sectionLocale,
  ...props
}) => {
  const dgCharacter = useSelector((state: any) => state.dgCharacter);
  const dispatch = useDispatch();

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
          disabled={!dgCharacter.editMode}
          value={dgCharacter.fullName}
          onValueChange={(value) => dispatch(set({ field: "fullName", value }))}
        />
        <TextInput
          className="col-span-2"
          title={sectionLocale?.profession}
          disabled={!dgCharacter.editMode}
          value={dgCharacter.profession}
          onValueChange={(value) =>
            dispatch(set({ field: "profession", value }))
          }
        />
        <TextInput
          className="col-span-3"
          title={sectionLocale?.employer}
          disabled={!dgCharacter.editMode}
          value={dgCharacter.employer}
          onValueChange={(value) => dispatch(set({ field: "employer", value }))}
        />
        <TextInput
          className="col-span-2"
          title={sectionLocale?.nationality}
          disabled={!dgCharacter.editMode}
          value={dgCharacter.nationality}
          onValueChange={(value) =>
            dispatch(set({ field: "nationality", value }))
          }
        />
        <GenderInput
          className="col-span-1"
          title={sectionLocale?.gender}
          mTitle={sectionLocale?.genderM}
          fTitle={sectionLocale?.genderF}
          disabled={!dgCharacter.editMode}
          gender={dgCharacter.gender}
          onGenderChange={(value) => dispatch(set({ field: "gender", value }))}
          customGender={dgCharacter.customGender ?? ''}
          onCustomGenderChange={(value) =>
            dispatch(set({ field: "customGender", value }))
          }
        />
        <TextInput
          className="col-span-1"
          title={sectionLocale?.age}
          disabled={!dgCharacter.editMode}
          value={dgCharacter.age}
          onValueChange={(value) => dispatch(set({ field: "age", value }))}
        />
        <TextInput
          className="col-span-3"
          title={sectionLocale?.education}
          disabled={!dgCharacter.editMode}
          value={dgCharacter.education}
          onValueChange={(value) => dispatch(set({ field: "education", value }))}
        />
      </div>
    </Category>
  );
};

export default PersonalSection;
