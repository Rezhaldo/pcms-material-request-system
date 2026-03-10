import { fetchRequests, removeRequest, submitRequest, updateRequest } from "@/services/requestService";
import { CreateRequestDTO, RequestDTO } from "@/types/request";
import { useEffect, useState } from "react";

export function useRequests() {
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [requestsList, setRequestsList] = useState<RequestDTO[]>([]);

    const loadRequests = async () => {
        setLoadingFetch(true);
        try {
            const data = await fetchRequests();
            setRequestsList(data || []);
        } finally {
            setLoadingFetch(false);
        }
    };

    const createRequestData = async (data: CreateRequestDTO) => {
        if (loadingCreate) return false;
        setLoadingCreate(true);

        try {
            const res = await submitRequest(data);
            setRequestsList((prev) => [res, ...prev]);
            return true;
        } catch {
            return false;
        } finally {
            setLoadingCreate(false);
        }
    };

    const editRequestData = async (id: number, data: CreateRequestDTO) => {
        try {
            const res = await updateRequest(id, data);
            if (res) {
                setRequestsList((prev) =>
                    prev.map((r) => (r.id === res.id ? res : r))
                );
            }
            return res;
        } catch {
            return null;
        }
    };

    const deleteRequestData = async (id: number) => {
        try {
            await removeRequest(id);
            setRequestsList((prev) => prev.filter((r) => r.id !== id));
            return true;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    return {
        createRequestData,
        requestsList,
        editRequestData,
        deleteRequestData,
        loadingCreate,
        loadingFetch,
        reloadRequests: loadRequests,
    };
}