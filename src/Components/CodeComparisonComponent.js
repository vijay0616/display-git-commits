import React from "react";

const CodeComparison = ({ patch }) => {
  const lines = patch.split("\n");

  const renderLines = () => {
    return lines.map((line, index) => {
      if (line.startsWith("+")) {
        return (
          <div key={index} className=" bg-[#D8FFCB] font-monospace">
            {line}
          </div>
        );
      } else if (line.startsWith("-")) {
        return (
          <div key={index} className="bg-[#FFE4E9] font-monospace">
            {line}
          </div>
        );
      } else {
        return (
          <div key={index} className="font-monospace">
            {line}
          </div>
        );
      }
    });
  };

  return (
    <div className="whitespace-pre-wrap text-[#657B83]">{renderLines()}</div>
  );
};

export default CodeComparison;
