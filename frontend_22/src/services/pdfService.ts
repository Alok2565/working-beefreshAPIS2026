import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (invoice: any) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("GST INVOICE", 14, 15);

  doc.setFontSize(10);
  doc.text(`Invoice No: ${invoice.invoice_no}`, 14, 25);
  doc.text(`Customer ID: ${invoice.user_id}`, 14, 30);
  doc.text(`Total: ₹${invoice.total_amount}`, 14, 35);

  autoTable(doc, {
    startY: 45,
    head: [["Tax Type", "Tax %", "Tax Amount"]],
    body: invoice.taxes.map((t: any) => [
      t.tax_type,
      t.tax_percent,
      t.tax_amount,
    ]),
  });

  doc.save(`invoice-${invoice.invoice_no}.pdf`);
};