export interface MaterialDTO {
    materialDescription: string;
    materialType: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
    supplier: string;
}

export interface CreateRequestDTO {
    requestDate: string;
    requester: string;
    department: string;
    materials: MaterialDTO[];
}

export type RequestDTO = {
    id: number;
    requestCode: string;
    requestDate: string;
    requester: string;
    department: string;
    materials: MaterialDTO[];
};