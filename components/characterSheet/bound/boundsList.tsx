import { useAppSelector } from "@/src/redux/hooks";
import Bound from "./bound";
import { shallowEqual } from "react-redux";

interface BoundsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const BoundsList: React.FC<BoundsListProps> = () => {
  const boundsIds = useAppSelector(
    (state) => Array.from(state.dgCharacter.bounds.keys()),
    shallowEqual
  );
  return boundsIds.map((id: number) => <Bound boundId={id} key={id} />);
};

export default BoundsList;
