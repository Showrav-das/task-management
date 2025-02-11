"use client";
import { useState } from "react";
import { ChevronDownIcon, X } from "lucide-react";

export default function EditModal({
  setOpenEditModal,
  openEditModal,
  task,
  onTaskUpdate,
}) {
  console.log("task", task);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: new Date(task.dueDate).toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const updatedTask = await res.json();
    if (res.ok) {
      onTaskUpdate(updatedTask); // Call the callback with updated task
      setOpenEditModal(false);
    }
  };
  return (
    <div
      open={openEditModal}
      onClose={setOpenEditModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-md bg-white z-30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add Task</h2>
          <button
            type="button"
            onClick={() => setOpenEditModal(false)}
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">Close</span>
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="title"
              name="title"
              defaultValue={formData.title}
              placeholder="write a title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="Description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="write a description of task"
              id="Description"
              name="description"
              defaultValue={formData.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              onChange={handleChange}
              type="date"
              id="dueDate"
              name="dueDate"
              defaultValue={formData.dueDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Status
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                onChange={handleChange}
                id="status"
                name="status"
                defaultValue="pending"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>pending</option>
                <option>completed</option>
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
