"use client";

import store from "@/src/store/store";

const DownloadJsonButton: React.FC = () => {
  const downloadJson = () => {
    const dgCharacter = store.getState().dgCharacter;
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
      className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100"
      onClick={downloadJson}
    >
      Download JSON
    </button>
  );
};

export default DownloadJsonButton;
