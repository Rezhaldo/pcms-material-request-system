import { createRequest, deleteRequest, editRequest, getRequests } from "@/api/requestApi";
import { CreateRequestDTO } from "@/types/request";
import { toast } from "sonner";


export async function submitRequest(data: CreateRequestDTO) {
    try {
        const res = await createRequest(data);

        toast.success(`Request ${res.requestCode} created`);
        return res;
    } catch (err: any) {
        toast.error(err.message || "Failed to create request");
        throw err;
    }
}

export async function updateRequest(id: number, data: CreateRequestDTO) {
    try {
        const res = await editRequest(id, data);
        toast.success(`Request ${res.requestCode} updated`);
        return res;
    } catch (err: any) {
        toast.error(err.message || "Failed to update request");
        throw err;
    }
}

export async function removeRequest(id: number) {
    try {
        await deleteRequest(id);
        toast.success("Request deleted");
    } catch (err: any) {
        toast.error(err.message || "Failed to delete request");
        throw err;
    }
}

export async function fetchRequests() {
    try {
        const res = await getRequests();
        return res;
    } catch (err: any) {
        toast.error(err.message || "Failed to fetch requests");
        throw err;
    }
}