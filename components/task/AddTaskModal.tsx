import { useLoading } from "@/context/LoaderContext";
import fire, { db } from "@/database/db";
import { Job } from "@/types/task";
import { addDoc, getDoc, updateDoc, collection, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  closeTaskModal: () => void;
  selectedId: string;
}

const AddTaskModal = (props: Props) => {
  const { closeTaskModal, selectedId } = props;
  const [taskValue, setTaskValue] = useState<Job>({
    taskName: "",
    taskDescriptions: "",
    isCompleted: false,
  });
  const { setLoading } = useLoading();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkboxValue = (e.target as HTMLInputElement).checked;
      setTaskValue({ ...taskValue, [name]: checkboxValue });
    } else {
      setTaskValue({ ...taskValue, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const docRef = await collection(db, "tasks");
      await addDoc(docRef, taskValue);
      closeTaskModal();
      toast.success("Task created successfully", {
        position: "top-center",
      });
    } catch (err) {
      toast.error("Oops, something went wrong. Please try again later", {
        position: "top-center",
      });
    } finally {
      setTaskValue({
        taskName: "",
        taskDescriptions: "",
        isCompleted: false,
      });
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "tasks", selectedId);
      await updateDoc(docRef, taskValue);
      closeTaskModal();
      toast.success("Task Updated successfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Oops, something went wrong. Please try again later", {
        position: "top-center",
      });
    } finally {
      setTaskValue({
        taskName: "",
        taskDescriptions: "",
        isCompleted: false,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      const docRef = doc(db, "tasks", selectedId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { isCompleted, taskDescriptions, taskName } = docSnap.data();
        setTaskValue({ isCompleted, taskDescriptions, taskName });
      } else {
        toast.error("Oops, There was a problem in getting task data", {
          position: "top-center",
        });
      }
    };

    selectedId && fetchTask();
  }, [selectedId]);

  return (
    <div className="absolute top-[50%] left-[50%] w-[500px] max-w-sm translate-y-[-50%] translate-x-[-50%] rounded-lg border border-[#a4adb7] bg-white p-4 shadow-2xl">
      <h5 className="text-xl font-medium text-primary ">Create your task</h5>
      <div className="mt-2">
        <label
          htmlFor="taskName"
          className="mb-2 block text-sm font-medium text-[#4a4a4a]"
        >
          Task Name
        </label>
        <input
          type="text"
          name="taskName"
          value={taskValue.taskName}
          id="taskName"
          className="block  w-full rounded-lg border-[#f9fafb00] bg-[#959cb045] p-2.5 text-sm"
          placeholder="Task name"
          required
          onChange={handleChange}
        />
      </div>
      <div className="mt-2">
        <label
          htmlFor="taskDescriptions"
          className="mb-2 block text-sm font-medium text-[#4a4a4a]"
        >
          Task Descriptions
        </label>
        <textarea
          id="taskDescriptions"
          name="taskDescriptions"
          value={taskValue.taskDescriptions}
          rows={4}
          className="block  w-full rounded-lg border-[#f9fafb00] bg-[#959cb045] p-2.5 text-sm"
          placeholder="Write your task descriptions here..."
          required
          onChange={handleChange}
        />
      </div>
      {selectedId && (
        <div className="mt-2 ">
          <div className="flex gap-3">
            <label
              htmlFor="isCompleted"
              className=" block text-sm font-medium text-[#4a4a4a]"
            >
              Task Completed
            </label>
            <input
              id="isCompleted"
              type="checkbox"
              name="isCompleted"
              checked={taskValue.isCompleted}
              className="checked:bg-blue-500 "
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      <div className="mt-5 flex justify-between">
        <button
          onClick={selectedId ? handleUpdate : handleSubmit}
          className="rounded-lg  bg-primary  px-5 py-2.5 text-sm font-medium text-white "
        >
          {selectedId ? " Update Task" : "Create Task"}
        </button>
        <button
          onClick={closeTaskModal}
          className="rounded-lg  bg-body-color  px-5 py-2.5 text-sm font-medium text-white "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
