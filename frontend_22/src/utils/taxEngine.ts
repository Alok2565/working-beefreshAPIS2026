export const calculateTax = (amount: number, taxPercent: number) => {
  const taxAmount = (amount * taxPercent) / 100;

  return {
    taxAmount,
    total: amount + taxAmount,
  };
};
export const splitGST = (amount: number, gstPercent: number) => {
  const half = gstPercent / 2;

  const cgst = (amount * half) / 100;
  const sgst = (amount * half) / 100;

  return {
    cgst,
    sgst,
    totalTax: cgst + sgst,
    grandTotal: amount + cgst + sgst,
  };
};

export const calculateIGST = (amount: number, gstPercent: number) => {
  const igst = (amount * gstPercent) / 100;

  return {
    igst,
    grandTotal: amount + igst,
  };
};