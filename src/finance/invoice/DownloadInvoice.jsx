import jsPDF from "jspdf";

const DownloadInvoice = (invoice) => {
  const doc = new jsPDF();

  doc.text(
    `Invoice Number: ${invoice.invoiceNumber}`,
    20,
    20
  );

  doc.text(
    `Vendor: ${invoice.vendorName}`,
    20,
    30
  );

  doc.text(
    `Supplier: ${invoice.supplierName}`,
    20,
    40
  );

  doc.text(
    `Amount: ₹ ${invoice.totalAmount}`,
    20,
    50
  );

  doc.save(
    `${invoice.invoiceNumber}.pdf`
  );
};

export default DownloadInvoice;