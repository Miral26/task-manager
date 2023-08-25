import { PlusIconSVG } from "@/assets/svg/icon";
import React from "react";

const AddTaskCard = ({ openTaskModal }: { openTaskModal: () => void }) => {
  return (
    <div
      className="h-[169px] rounded-lg bg-body-color p-5  text-center shadow"
      onClick={openTaskModal}
    >
      <div className="flex flex-col items-center ">
        <span className="text-2xl font-bold text-[#090f64]">Add Task</span>
        <div className="mt-4 flex space-x-3 text-2xl text-[#090f64]">
          <PlusIconSVG />
        </div>
      </div>
    </div>
  );
};

export default AddTaskCard;
