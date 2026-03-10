import { APIClient } from "@/lib/api";
import { CreateRequestDTO } from "@/types/request";


function handleError(error: any): never {
    if (error.response?.data) {
        const message =
            error.response.data.message?.[0] ||
            error.response.data.message ||
            "Something went wrong";
        throw new Error(message);
    }

    throw new Error("Network error. Please try again.");
}

export async function createRequest(data: CreateRequestDTO) {
    try {
        const response = await APIClient.post("/requests", data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getRequests() {
    try {
        const response = await APIClient.get("/requests");
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteRequest(id: number) {
    try {
        const response = await APIClient.delete(`/requests/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function editRequest(id: number, data: CreateRequestDTO) {
    try {
        const response = await APIClient.put(`/requests/${id}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}