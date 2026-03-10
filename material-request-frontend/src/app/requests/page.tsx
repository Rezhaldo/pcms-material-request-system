"use client";

import { useRequests } from "@/hooks/useRequests";
import { RequestDTO } from "@/types/request";
import { useState } from "react";

export default function RequestsPage() {
    const { requestsList, editRequestData, deleteRequestData, loadingFetch } = useRequests();

    const [editingRequest, setEditingRequest] = useState<RequestDTO | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [savingEditId, setSavingEditId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleSaveEdit = async () => {
        if (!editingRequest) return;

        setSavingEditId(editingRequest.id);

        const payload = {
            requestDate: editingRequest.requestDate,
            requester: editingRequest.requester,
            department: editingRequest.department,
            materials: editingRequest.materials,
        };

        await editRequestData(editingRequest.id, payload);

        setIsModalOpen(false);
        setEditingRequest(null);
        setSavingEditId(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this request?")) return;

        setDeletingId(id);
        await deleteRequestData(id);
        setDeletingId(null);
    };

    const updateMaterial = (index: number, field: string, value: any) => {
        if (!editingRequest) return;

        const updated = [...editingRequest.materials];
        updated[index] = { ...updated[index], [field]: value };

        setEditingRequest({ ...editingRequest, materials: updated });
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-10">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Requests Dashboard</h1>

            {/* Table Wrapper with horizontal scroll */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-gray-700 dark:text-gray-200">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm uppercase">
                        <tr>
                            <th className="px-4 py-3">Code</th>
                            <th className="px-4 py-3">Requester</th>
                            <th className="px-4 py-3">Department</th>
                            <th className="px-4 py-3">Materials</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                        {loadingFetch ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    Loading...
                                </td>
                            </tr>
                        ) : requestsList.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    No requests found
                                </td>
                            </tr>
                        ) : (
                            requestsList.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <td className="px-4 py-3">{r.requestCode}</td>
                                    <td className="px-4 py-3">{r.requester}</td>
                                    <td className="px-4 py-3">{r.department}</td>
                                    <td className="px-4 py-3">{r.materials.length}</td>
                                    <td className="px-4 py-3 flex gap-2 flex-wrap">
                                        <button
                                            onClick={() => handleDelete(r.id)}
                                            disabled={deletingId === r.id}
                                            className={`px-3 py-1.5 rounded-md text-sm text-white ${deletingId === r.id
                                                ? "bg-red-300 cursor-not-allowed"
                                                : "bg-red-500 hover:bg-red-600"
                                                }`}
                                        >
                                            {deletingId === r.id ? "Deleting..." : "Delete"}
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditingRequest(r);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isModalOpen && editingRequest && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-[900px] max-h-[90vh] overflow-y-auto p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold dark:text-white">Edit Request</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{editingRequest.requestCode}</p>
                        </div>

                        <div className="space-y-4">
                            <input
                                value={editingRequest.requester}
                                onChange={(e) => setEditingRequest({ ...editingRequest, requester: e.target.value })}
                                className="border p-3 rounded-md w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                placeholder="Requester"
                            />
                            <input
                                value={editingRequest.department}
                                onChange={(e) => setEditingRequest({ ...editingRequest, department: e.target.value })}
                                className="border p-3 rounded-md w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                placeholder="Department"
                            />
                        </div>

                        <div className="overflow-x-auto mt-6">
                            <table className="w-full text-sm text-gray-700 dark:text-gray-200 min-w-[700px]">
                                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Description</th>
                                        <th className="px-4 py-3 text-left">Type</th>
                                        <th className="px-4 py-3 text-left">Qty</th>
                                        <th className="px-4 py-3 text-left">Unit</th>
                                        <th className="px-4 py-3 text-left">Price</th>
                                        <th className="px-4 py-3 text-left">Total</th>
                                        <th className="px-4 py-3 text-left">Supplier</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-gray-700">
                                    {editingRequest.materials.map((m, i) => (
                                        <tr key={i}>
                                            <td className="p-2">
                                                <input
                                                    value={m.materialDescription}
                                                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                                    onChange={(e) => updateMaterial(i, "materialDescription", e.target.value)}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    value={m.materialType}
                                                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                                    onChange={(e) => updateMaterial(i, "materialType", e.target.value)}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    value={m.quantity}
                                                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                                    onChange={(e) => updateMaterial(i, "quantity", Number(e.target.value))}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    value={m.unit}
                                                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                                    onChange={(e) => updateMaterial(i, "unit", e.target.value)}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    value={m.unitPrice}
                                                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                                    onChange={(e) => updateMaterial(i, "unitPrice", Number(e.target.value))}
                                                />
                                            </td>
                                            <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                                                ${(m.quantity * m.unitPrice).toLocaleString()}
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    value={m.supplier}
                                                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                                    onChange={(e) => updateMaterial(i, "supplier", e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md dark:text-white"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSaveEdit}
                                disabled={savingEditId === editingRequest.id}
                                className={`px-4 py-2 rounded-md text-white ${savingEditId === editingRequest.id
                                    ? "bg-blue-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {savingEditId === editingRequest.id ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}