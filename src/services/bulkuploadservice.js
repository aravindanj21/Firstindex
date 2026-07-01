import axios from "axios";

const API = "http://127.0.0.1:8000/api/products";

export const downloadTemplate = async () => {
    const response = await axios.get(
        `${API}/template`,
        {
            responseType: "blob",
        }
    );

    const url = window.URL.createObjectURL(
        new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "Product_Template.xlsx");

    document.body.appendChild(link);

    link.click();

    link.remove();
};

export const validateBulkFile = async (
    supplierId,
    file
) => {

    const formData = new FormData();

    formData.append("supplier_id", supplierId);

    formData.append("file", file);

    const response = await axios.post(
        `${API}/bulk-upload`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const importProducts = async (
    supplierId,
    products
) => {

    const response = await axios.post(
        `${API}/import`,
        {
            supplier_id: supplierId,
            products: products,
        }
    );

    return response.data;
};