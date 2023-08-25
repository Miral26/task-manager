import { db } from "@/database/db";
import { Job } from "@/types/task";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";

interface Props {
  taskData: Job[];
  openTaskModal: () => void;
  setSelectedId: (x: string) => void;
}

const TaskList = (props: Props) => {
  const { taskData, openTaskModal, setSelectedId } = props;

  const deleteTask = async (id: string) => {
    if (window.confirm("Are you sure to delete this task?")) {
      await deleteDoc(doc(db, "tasks", id));
      toast.success("Task Deleted!!", {
        position: "top-center",
      });
    }
  };

  const handleEdit = (id: string) => {
    openTaskModal();
    setSelectedId(id);
  };

  return (
    <>
      {taskData.length > 0 &&
        taskData.map((task) => {
          return (
            <div
              key={task.id}
              className="h-[169px] max-w-sm  rounded-lg  border bg-white p-[20px] shadow"
            >
              <div className="  flex items-center pb-4">
                <span className=" text-lg font-bold text-black ">
                  Task Name :
                </span>
                <span className="text-lg text-black">
                  {" "}
                  {task.isCompleted ? <s>{task.taskName}</s> : task.taskName}
                </span>
              </div>
              <div className=" flex  items-center pb-4">
                <span className="text-lg font-bold text-black">
                  Task Descriptions :
                </span>
                <span className="text-gray-500 text-sm">
                  {task.isCompleted ? (
                    <s>{task.taskDescriptions}</s>
                  ) : (
                    task.taskDescriptions
                  )}
                </span>
              </div>
              <div className="flex justify-between gap-5">
                <button
                  onClick={() => task.id && deleteTask(task.id)}
                  className=" w-[150px] rounded-md border border-transparent	bg-[#ff7b7b] py-2 px-4 text-sm font-medium"
                >
                  Delete
                </button>

                <button
                  onClick={() => task.id && handleEdit(task.id)}
                  className="w-[150px] rounded-md border border-transparent bg-body-color py-2 px-4 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default TaskList;
