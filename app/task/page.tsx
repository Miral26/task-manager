"use client";

import Header from "@/components/header";
import Loader from "@/components/loader";
import { useLoading } from "@/context/LoaderContext";
import { auth, db } from "@/database/db";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Job } from "@/types/task";
import AddTaskCard from "@/components/task/AddTaskCard";
import AddTaskModal from "@/components/task/AddTaskModal";
import TaskList from "@/components/task/TaskList";

const Task = () => {
  const [userName, setUserName] = useState<string>();
  const { loading, setLoading } = useLoading();
  const [taskData, setTaskData] = useState<Job[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const openTaskModal = () => {
    setIsModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsModalOpen(false);
    setSelectedId("");
  };

  useEffect(() => {
    const q = collection(db, "tasks");
    const tasks: Job[] = [...taskData];
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          tasks.push({ ...change.doc.data(), id: change.doc.id } as Job);
          setTaskData([...tasks]);
        }

        if (change.type === "modified") {
          for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === change.doc.id) {
              tasks.splice(i, 1);
              break;
            }
          }
          tasks.push({ ...change.doc.data(), id: change.doc.id } as Job);
          setTaskData([...tasks]);
        }

        if (change.type === "removed") {
          for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === change.doc.id) {
              tasks.splice(i, 1);
              break;
            }
          }
          setTaskData([...tasks]);
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const fetchUserData = async (id: string) => {
    try {
      const querySnapshot = await getDoc(doc(db, "users", id));
      if (querySnapshot.data()) {
        const name = querySnapshot.data();
        name && setUserName(name.userName);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Oops, something went wrong. Please try again later", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="relative h-[100vh] bg-white">
        {loading ? (
          <Loader />
        ) : (
          userName && (
            <>
              <Header userName={userName} />
              <div className="m-10 grid grid-cols-4 gap-4">
                <AddTaskCard openTaskModal={openTaskModal} />
                <TaskList
                  taskData={taskData}
                  openTaskModal={openTaskModal}
                  setSelectedId={setSelectedId}
                />
              </div>
              {isModalOpen && (
                <AddTaskModal
                  closeTaskModal={closeTaskModal}
                  selectedId={selectedId}
                />
              )}
            </>
          )
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Task;
