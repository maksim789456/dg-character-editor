import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setActiveCharacterId } from "@/src/features/dgCharacter/dgCharactersSlice";
import { selectCurrentCharacterId } from "@/src/redux/selectors";

export function ActiveCharacterProxy({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const activeCharacterId = useAppSelector(selectCurrentCharacterId);

  useEffect(() => {
    dispatch(setActiveCharacterId(id));
  }, [dispatch, id]);

  if (activeCharacterId !== id) {
    return null;
  }

  return <>{children}</>;
}