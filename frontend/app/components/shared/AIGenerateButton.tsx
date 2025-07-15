import React from "react";

type AIGenerateButtonProps = {
  onClick: () => void;
  children?: React.ReactNode;
};

const AIGenerateButton: React.FC<AIGenerateButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-700 flex items-center gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
          clipRule="evenodd"
        />
      </svg>
      {children || "Random Generate"}
    </button>
  );
};

export default AIGenerateButton;
