import React, { useState } from "react";
import "../../styles/BulkUpload.css";
import BulkUploadPreview from "./BulkUploadPreview";
import ValidationErrors from "./ValidationErrors";

import {
  downloadTemplate,
  validateBulkFile,
  importProducts,
} from "../../services/bulkUploadService";


const BulkUploadProducts = () => {
  const supplierId = localStorage.getItem("supplier_id");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validRows, setValidRows] = useState(0);
  const [invalidRows, setInvalidRows] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setPreviewData([]);
      setErrors([]);
      setValidRows(0);
      setInvalidRows(0);
    }
  };

  const handleValidate = async () => {
  if (!selectedFile) {
    alert("Please select a file.");
    return;
  }

  try {
    setLoading(true);

    const result = await validateBulkFile(
      supplierId,
      selectedFile
    );

   
    const enrichedPreview = (result.preview || []).map((row) => ({
      ...row,
      error: row.error || null,
    }));

    setPreviewData(enrichedPreview);
    setErrors(result.errors || []);
    setValidRows(result.valid_rows || 0);
    setInvalidRows(result.invalid_rows || 0);

    if (result.invalid_rows > 0) {
      alert(
        `Validation Failed!\n\nValid Rows: ${result.valid_rows}\nInvalid Rows: ${result.invalid_rows}`
      );
    } else {
      alert(`Validation Successful!\n\n${result.valid_rows} rows are ready to import.`);
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.detail || "Validation failed.");
  } finally {
    setLoading(false);
  }
};
  const handleImport = async () => {
    const validProducts = previewData.filter(
      (item) => !item.error
    );

    if (validProducts.length === 0) {
      alert("No valid products to import.");
      return;
    }

    try {
      setLoading(true);

      const result = await importProducts(
        supplierId,
        validProducts
      );

      alert(
        `${result.imported} products imported successfully.`
      );

      setSelectedFile(null);
      setPreviewData([]);
      setErrors([]);
      setValidRows(0);
      setInvalidRows(0);
    } catch (error) {
      console.error(error);
      alert("Import failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bulk-upload-container">

      <h2>Bulk Product Upload</h2>

      <div className="upload-card">

        <button
          className="download-btn"
          onClick={downloadTemplate}
        >
          Download Sample Template
        </button>

        <br /><br />

        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
        />

        <p className="supported-files">
          Supported Files
          <br />
          XLSX
          <br />
          XLS
          <br />
          CSV
        </p>

        <button
          className="validate-btn"
          onClick={handleValidate}
          disabled={loading}
        >
          {loading
            ? "Validating..."
            : "Validate File"}
        </button>

      </div>

      <div className="summary">

        <h4>
          Valid Rows : {validRows}
        </h4>

        <h4>
          Invalid Rows : {invalidRows}
        </h4>

      </div>

      <ValidationErrors errors={errors} />

      <BulkUploadPreview
        previewData={previewData}
      />

      {previewData.length > 0 && (
        <button
          className="import-btn"
          onClick={handleImport}
          disabled={loading || invalidRows > 0}
        >
          Import Products
        </button>
      )}

    </div>
  );
};

export default BulkUploadProducts;