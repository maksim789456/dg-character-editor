import { connect, useSelector } from "react-redux";
import TableInput from "./table/tableInput";
import TableItem from "./table/tableItem";
import { RootState } from "@/src/store/store";
import { Dispatch } from "@reduxjs/toolkit";
import {
  rollStat,
  setBaseStat,
  setBaseStatDescription,
} from "@/src/features/dgCharacter/dgCharacterSlice";
import { baseStatSumSelector, makeBaseStatSelectorInstance } from "@/src/redux/selectors";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Dices from "../icons/dices";
import { useAppDispatch } from "@/src/redux/hooks";

interface BaseStatProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  name: string;
  playMode?: boolean;

  score?: number;
  onScoreChange?: (score: number) => void;
  description?: string;
  onDescriptionChange?: (description: string) => void;
}

const makeMapState = (_: RootState, ownProps: BaseStatProps) => {
  const baseStatSelector = makeBaseStatSelectorInstance(ownProps.name ?? "");
  return function realMapState(state: RootState) {
    const baseStat = baseStatSelector(state);
    return {
      score: baseStat.score ?? 0,
      description: baseStat.description ?? "",
      playMode: !state.dgCharacter.editMode,
    };
  };
};

const makeDispatchState = (dispatch: Dispatch, ownProps: BaseStatProps) => ({
  onScoreChange: (value: number) =>
    dispatch(setBaseStat({ field: ownProps.name, value })),
  onDescriptionChange: (value: string) =>
    dispatch(setBaseStatDescription({ field: ownProps.name, value })),
});

const BaseStat: React.FC<BaseStatProps> = ({
  title,
  name,
  playMode,
  score,
  onScoreChange,
  description,
  onDescriptionChange,
}) => {
  const t = useTranslations('characterSheet.staticSection');
  const baseStatSumIsToBig = useSelector(baseStatSumSelector) > 72;
  const dispatch = useAppDispatch();

  const scoreOutOfRange = score! < 9 || score! > 12;
  const hasDescription = description!.trim() !== "";

  const onSkillRolled = (e: React.MouseEvent<any>) => {
    if (playMode) {
      dispatch(rollStat(name));
    }
  }

  return (
    <div className="grid grid-cols-10">
      <TableItem className="col-span-3" title={title} />
      <TableInput
        className={clsx("col-span-2")}
        ariaLabel={`${title} Value`}
        inputClassName={clsx(baseStatSumIsToBig && "bg-yellow-100")}
        disabled={playMode}
        value={score}
        isNumber={true}
        onValueChange={(value) => {
          onScoreChange ? onScoreChange(value as number) : value;
        }}
      />
      <div className={clsx(
        "col-span-2 flex flex-row gap-1 items-center",
        "border-r border-b border-dg dark:border-neutral-600",
        playMode && "pr-1 cursor-pointer"
      )}>
        <TableItem
          className="!border-0"
          ariaLabel={`${title} Value x5`}
          title={`${score! * 5}`}
          isHeader={true}
          fontSize="text-base dark:text-neutral-200"
        />
        {playMode ? <Dices onClick={onSkillRolled} /> : <></>}
      </div>
      {!playMode && scoreOutOfRange || hasDescription ? (
        <TableInput
          className="col-span-3"
          ariaLabel={`${title} Description`}
          disabled={playMode}
          placeholder={t("statsDescriptionPlaceholder")}
          value={description ?? ""}
          onValueChange={(value) =>
            onDescriptionChange ? onDescriptionChange(value as string) : value
          }
        />
      ) : (
        <TableItem
          className="col-span-3"
          isHeader={true}
          fontSize="text-base"
          title={t("bpStatMax")}
          ariaLabel={`${title} No Description`}
        />
      )}
    </div>
  );
};

BaseStat.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  playMode: PropTypes.bool,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func,
  description: PropTypes.string,
  onDescriptionChange: PropTypes.func,
};

export default connect(makeMapState, makeDispatchState)(BaseStat);
