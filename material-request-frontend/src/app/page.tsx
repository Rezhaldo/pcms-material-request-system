"use client";

import { useRequests } from "@/hooks/useRequests";
import { MaterialDTO } from "@/types/request";
import { useState } from "react";


export default function Home() {

  const { createRequestData, loadingCreate } = useRequests();

  const [requester, setRequester] = useState("");
  const [department, setDepartment] = useState("");

  const emptyMaterial: MaterialDTO = {
    materialDescription: "",
    materialType: "",
    quantity: 1,
    unit: "",
    unitPrice: 0,
    totalPrice: 0,
    supplier: "",
  };
  const [materials, setMaterials] = useState<MaterialDTO[]>([emptyMaterial]);


  function updateMaterial(index: number, field: keyof MaterialDTO, value: any) {
    const updated = [...materials];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    updated[index].totalPrice =
      updated[index].quantity * updated[index].unitPrice;

    setMaterials(updated);
  }

  function addMaterial() {
    setMaterials([...materials, { ...emptyMaterial }]);
  }

  async function handleSubmit() {
    const data = {
      requestDate: new Date().toISOString(),
      requester,
      department,
      materials,
    };

    const success = await createRequestData(data);

    if (!success) return;
    setRequester("");
    setDepartment("");
    setMaterials([{ ...emptyMaterial }]);
  }

  function removeMaterial(index: number) {
    if (materials.length === 1) return;

    const updated = materials.filter((_, i) => i !== index);
    setMaterials(updated);
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-10">

      <h1 className="text-3xl font-bold mb-8">
        Material Request
      </h1>

      {/* Request Info */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">

        <h2 className="text-lg font-semibold mb-4">
          Request Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              value={requester}
              placeholder="Requester..."
              className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onChange={(e) => setRequester(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Division <span className="text-red-500">*</span>
            </label>
            <input
              value={department}
              placeholder="Department..."
              className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* Materials Table */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">

        <table className="w-full text-sm text-gray-700 dark:text-gray-200 min-w-[700px]">

          <thead className="bg-gray-100 dark:bg-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Item Name</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Unit</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Supplier</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-gray-700">

            {materials.map((m, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">

                <td className="p-2">
                  <input
                    value={m.materialDescription}
                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={(e) =>
                      updateMaterial(i, "materialDescription", e.target.value)
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    value={m.materialType}
                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={(e) =>
                      updateMaterial(i, "materialType", e.target.value)
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    min={1}
                    value={m.quantity}
                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={(e) =>
                      updateMaterial(i, "quantity", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    value={m.unit}
                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={(e) =>
                      updateMaterial(i, "unit", e.target.value)
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    value={m.unitPrice}
                    type="number"
                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={(e) =>
                      updateMaterial(i, "unitPrice", Number(e.target.value))
                    }
                  />
                </td>

                <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:text-white">
                  ${m.totalPrice.toLocaleString()}
                </td>

                <td className="p-2">
                  <input
                    value={m.supplier}
                    className="border rounded-md p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={(e) =>
                      updateMaterial(i, "supplier", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addMaterial();
                      }
                    }}
                  />
                </td>

                <td className="p-2">
                  <button
                    onClick={() => removeMaterial(i)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">

        <button
          onClick={addMaterial}
          className="bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition"
        >
          + Add Material
        </button>

        <button
          onClick={handleSubmit}
          disabled={loadingCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingCreate ? "Creating..." : "Submit Request"}
        </button>

      </div>

    </div>
  );
}