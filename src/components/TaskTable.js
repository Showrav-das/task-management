import React from "react";

import { ArchiveX, Eye, NotebookPen } from "lucide-react";
export default function TaskTable({
  setOpen,
  handleEditModal,
  tasks,
  handleDeleteModal,
}) {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>

                <th scope="col" className="relative py-3.5 pl-3  sm:pr-0">
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks?.map((task, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {task.title}
                  </td>
                  <td className="w-[300px] px-3 py-4 text-sm text-gray-500">
                    {task.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(task.dueDate).toISOString().split("T")[0]}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {task.status}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEditModal(task)}
                        type="button"
                        className="block rounded-md py-2 text-center text-sm font-semibold text-gray-500 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="block rounded-md  py-2 text-center text-sm font-semibold text-gray-500 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        <NotebookPen className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteModal(task._id)}
                        type="button"
                        className="block rounded-md py-2 text-center text-sm font-semibold text-red-500 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        <ArchiveX className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
