import React from "react";

const BulkUploadPreview = ({ previewData }) => {

    if (previewData.length === 0) {
        return null;
    }

    return (

        <div className="preview-container">

            <h3>Preview Uploaded Data</h3>

            <table className="preview-table">

                <thead>

                    <tr>

                        <th>Row</th>

                        <th>Product Name</th>

                        <th>Category</th>

                        <th>Description</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Unit</th>

                        <th>Image URL</th>

                        <th>Status</th>

                        <th>Validation</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        previewData.map((item, index) => (

                            <tr
                                key={index}
                                className={item.error ? "error-row" : ""}
                            >

                                <td>{index + 2}</td>

                                <td>{item.product_name}</td>

                                <td>{item.category}</td>

                                <td>{item.description}</td>

                                <td>{item.price}</td>

                                <td>{item.stock}</td>

                                <td>{item.unit}</td>

                                <td>
                                    {
                                        item.image_url
                                            ? (
                                                <a
                                                    href={item.image_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    View
                                                </a>
                                            )
                                            : "-"
                                    }
                                </td>

                                <td>{item.status}</td>

                                <td>

                                    {

                                        item.error

                                            ? (
                                                <span className="error-text">
                                                    ❌ {item.error}
                                                </span>
                                            )

                                            : (
                                                <span className="success-text">
                                                    ✅ Valid
                                                </span>
                                            )

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default BulkUploadPreview;