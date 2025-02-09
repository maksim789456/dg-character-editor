"use client";

import { useAppSelector } from "@/src/redux/hooks";

const DownloadJsonButton: React.FC = () => {
  const dgCharacter = useAppSelector(state => state.dgCharacter);

  const downloadJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(dgCharacter));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      "DG_Character_" + dgCharacter.fullName + ".json"
    );
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  return (
    <button
      className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100 dark:outline-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
      onClick={downloadJson}
    >
      Download JSON
    </button>
  );
};

export default DownloadJsonButton;
