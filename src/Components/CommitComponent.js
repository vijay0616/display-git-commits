import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import moment from "moment";
import CodeComparison from "./CodeComparisonComponent";

const CommitComponent = () => {
  const { owner, repository, commitSHA } = useParams();

  const [isDiffVisible, setIsDiffVisible] = useState(false);
  const [commitData, setCommitData] = useState();

  // Function to toggle the visibility of code differences
  const toggleDiffVisibility = (index) => {
    setIsDiffVisible((prev) => {
      return { ...prev, [index]: !prev[index] };
    });
  };

  useEffect(() => {
    const fetchCommit = async () => {
      const response = await axios.get(
        `http://127.0.0.1:4000/api/repository/${owner}/${repository}/commits/${commitSHA}`
      );
      setCommitData(response.data);
    };
    fetchCommit();
  }, []);

  return (
    <>
      <div className="flex py-8 px-8">
        {/* User profile image */}
        <img
          src="/profile.jpeg"
          className=" rounded-full h-10 w-10 object-cover"
          alt="profile"
        />
        <div className="flex flex-col pl-2 w-full">
          {/* Commit subject */}
          <p className=" text-base font-semibold leading-6 text-[#39496A]">
            {commitData?.subject}
          </p>
          <div className="flex">
            <div className="flex flex-col text-sm leading-5 font-normal w-1/2">
              {/* Commit author information */}
              <span className="text-[#6D727C]">
                Authorized by{" "}
                <b className="text-[#39496A]">{commitData?.author?.name}</b>{" "}
                {moment(commitData?.author?.date).fromNow()}
              </span>
              <span>{commitData?.subject}</span>
            </div>
            {/* Display commit information for committer if different from author */}
            {commitData?.author.name !== commitData?.committer.name && (
              <div className="flex flex-col text-sm leading-5 font-normal text-[#6D727C] w-1/2 text-right">
                <span>
                  Commited by <b>{commitData?.committer.name}</b>{" "}
                  {moment(commitData?.committer?.date).fromNow()}
                </span>
                <span>
                  Commit{" "}
                  <b className="text-[#39496A] font-monospace">
                    {commitData?.oid}
                  </b>
                </span>
                <span>
                  Parent{" "}
                  <b className="text-[#1C7CD6] font-monospace">
                    {commitData?.parents[0]?.sha}
                  </b>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col px-8">
        {commitData?.files.map((data, index) => (
          <React.Fragment key={data.sha}>
            {/* Clickable section to toggle code difference visibility */}
            <div
              className={`flex cursor-pointer text-[#1C7CD6] transition-colors duration-300 ${
                !isDiffVisible[index] && "mb-8"
              }`}
              onClick={() => toggleDiffVisibility(index)}
            >
              <div className="flex justify-center items-center gap-2">
                <ChevronRightIcon
                  className={`w-5 h-5 text-[#39496A] ${
                    isDiffVisible[index] && "rotate-90"
                  }`}
                />
                {data.filename}
              </div>
            </div>

            {/* Display code differences if visible */}
            {isDiffVisible[index] && (
              <div
                className={`mt-1 pt-2 transition-max-height overflow-hidden max-h-0 transition-max-height duration-300 border border-[#e7ebf1] p-2 ${
                  isDiffVisible[index] ? "max-h-screen mb-8" : ""
                }`}
              >
                {/* Component for rendering code differences */}
                <CodeComparison patch={data.patch} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default CommitComponent;
