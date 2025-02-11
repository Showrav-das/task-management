"use client";
import { useAuth } from "@/AuthContext";
import EditModal from "@/components/EditModal";
import Modal from "@/components/Modal";
import ProtectedRoute from "@/components/ProtectRoute";
import TaskTable from "@/components/TaskTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const { user } = useAuth();

  console.log("tasks", tasks);
  useEffect(() => {
    const fetchData = async () => {
      const email = user?.email;
      console.log("email", email);
      const getTasks = await fetch(`http://localhost:5000/tasks/${email}`);
      const { tasks } = await getTasks.json();
      setTasks(tasks);
      console.log("getTasks", tasks);
    };
    fetchData();
  }, [user]);

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  // const handleDeleteModal = (id) => {
  //   console.log("delete id", id);
  // };

  const handleDeleteModal = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleEditModal = (task) => {
    setSelectedTask(task);
    setOpenEditModal(true);
  };

  return (
    <>
      <div className="px-4 max-w-4xl mx-auto mt-12 sm:px-6 lg:px-8 relative">
        <div className="sm:flex sm:items-center relative">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">
              Tasks List
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Task
            </button>
          </div>
        </div>
        <TaskTable
          setOpen={setOpen}
          handleEditModal={handleEditModal}
          tasks={tasks}
          handleDeleteModal={handleDeleteModal}
        />
        {open && <Modal open={open} setOpen={setOpen} />}
        {openEditModal && selectedTask && (
          <EditModal
            task={selectedTask}
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            onTaskUpdate={handleTaskUpdate}
          />
        )}
      </div>
    </>
  );
}
