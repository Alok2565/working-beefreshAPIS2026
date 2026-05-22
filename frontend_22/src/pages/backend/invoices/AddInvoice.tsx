import { useState } from "react";

import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";

import { FaPlus, FaSave, FaTrash } from "react-icons/fa";

import { createInvoice } from "../../../services/invoiceService";

export default function AddInvoice() {
  // ================= STATE =================
  const [saving, setSaving] = useState(false);

  // ================= FORM =================
  const [form, setForm] = useState<any>({
    // CUSTOMER
    customer_name: "",
    email: "",
    mobile: "",

    // ORDER
    order_id: "",
    invoice_no: "",
    invoice_date: "",

    // TAX
    tax_type: "GST",

    gst_percent: 18,

    cgst_percent: 9,

    sgst_percent: 9,

    igst_percent: 18,

    // PAYMENT
    payment_method: "CASH",

    payment_status: "PENDING",

    // ADDRESS
    billing_address: "",

    shipping_address: "",

    // TOTALS
    subtotal: 0,

    tax_amount: 0,

    discount_amount: 0,

    total_amount: 0,

    // NOTES
    notes: "",
  });

  // ================= PRODUCTS =================
  // const [items, setItems] = useState<any[]>([
  //   {
  //     product_name: "",
  //     quantity: 1,
  //     price: 0,
  //     total: 0,
  //   },
  // ]);
  const [items, setItems] = useState<any[]>([
    {
      product_name: "",

      quantity: 1,

      price: 0,

      gst_percent: 18,

      total: 0,

      tax_amount: 0,
    },
  ]);
  // ================= HANDLE CHANGE =================
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= PRODUCT CHANGE =================
  // const handleItemChange = (index: number, field: string, value: any) => {
  //   const updatedItems = [...items];

  //   updatedItems[index][field] = value;

  //   const qty = Number(updatedItems[index].quantity) || 0;

  //   const price = Number(updatedItems[index].price) || 0;

  //   updatedItems[index].total = qty * price;

  //   setItems(updatedItems);

  //   calculateTotals(updatedItems);
  // };
  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...items];

    updatedItems[index][field] = value;

    const qty = Number(updatedItems[index].quantity) || 0;

    const price = Number(updatedItems[index].price) || 0;

    const gstPercent = Number(updatedItems[index].gst_percent) || 0;

    const subtotal = qty * price;

    const taxAmount = (subtotal * gstPercent) / 100;

    updatedItems[index].tax_amount = taxAmount;

    updatedItems[index].total = subtotal + taxAmount;

    setItems(updatedItems);

    calculateTotals(updatedItems);
  };

  // ================= CALCULATE TOTAL =================
  // const calculateTotals = (updatedItems: any[]) => {
  //   let subtotal = 0;

  //   let taxAmount = 0;

  //   updatedItems.forEach((item) => {
  //     const qty = Number(item.quantity) || 0;

  //     const price = Number(item.price) || 0;

  //     const itemSubtotal = qty * price;

  //     subtotal += itemSubtotal;

  //     // ================= TAX LOGIC =================
  //     let taxPercent = 0;

  //     // GST
  //     if (form.tax_type === "GST") {
  //       taxPercent = Number(form.gst_percent) || 18;
  //     }

  //     // IGST
  //     else if (form.tax_type === "IGST") {
  //       taxPercent = Number(form.igst_percent) || 18;
  //     }

  //     // CGST + SGST
  //     else if (form.tax_type === "CGST_SGST") {
  //       const cgst = Number(form.cgst_percent) || 9;

  //       const sgst = Number(form.sgst_percent) || 9;

  //       taxPercent = cgst + sgst;
  //     }

  //     // CGST
  //     else if (form.tax_type === "CGST") {
  //       taxPercent = Number(form.cgst_percent) || 9;
  //     }

  //     // SGST
  //     else if (form.tax_type === "SGST") {
  //       taxPercent = Number(form.sgst_percent) || 9;
  //     }

  //     taxAmount += (itemSubtotal * taxPercent) / 100;
  //   });

  //   const grandTotal = subtotal + taxAmount - Number(form.discount_amount || 0);

  //   setForm((prev: any) => ({
  //     ...prev,
  //     subtotal,
  //     tax_amount: taxAmount,
  //     total_amount: grandTotal,
  //   }));
  // };
  const calculateTotals = (updatedItems: any[]) => {
    let subtotal = 0;

    let taxAmount = 0;

    let grandTotal = 0;

    updatedItems.forEach((item) => {
      const qty = Number(item.quantity) || 0;

      const price = Number(item.price) || 0;

      const gstPercent = Number(item.gst_percent) || 0;

      const itemSubtotal = qty * price;

      const itemTax = (itemSubtotal * gstPercent) / 100;

      const itemTotal = itemSubtotal + itemTax;

      subtotal += itemSubtotal;

      taxAmount += itemTax;

      grandTotal += itemTotal;
    });

    grandTotal = grandTotal - Number(form.discount_amount || 0);

    setForm((prev: any) => ({
      ...prev,

      subtotal,

      tax_amount: taxAmount,

      total_amount: grandTotal,
    }));
  };
  // ================= ADD PRODUCT =================
  const addProduct = () => {
    setItems([
      ...items,
      {
        product_name: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  // ================= REMOVE PRODUCT =================
  const removeProduct = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);

    setItems(updatedItems);

    calculateTotals(updatedItems);
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        ...form,
        items,
      };

      await createInvoice(payload);

      alert("Invoice Created Successfully");
    } catch (err) {
      console.log(err);

      alert("Failed to create invoice");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={12}>
          <Card className="border-0 shadow rounded-4">
            {/* HEADER */}
            <Card.Header className="bg-white border-0 py-4">
              <Row className="align-items-center">
                <Col md={6}>
                  <h2 className="fw-bold mb-0">Manage Invoice</h2>
                </Col>

                <Col md={6} className="text-md-end mt-3 mt-md-0">
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        Save Invoice
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            {/* BODY */}
            <Card.Body>
              {/* CUSTOMER INFO */}
              <Card className="border-0 bg-light mb-4">
                <Card.Body>
                  <h5 className="fw-bold mb-4">Customer Information</h5>

                  <Row>
                    <Col md={3} className="mb-3">
                      <FloatingLabel label="Customer Name">
                        <Form.Control
                          type="text"
                          name="customer_name"
                          value={form.customer_name}
                          onChange={handleChange}
                          placeholder="Customer Name"
                        />
                      </FloatingLabel>
                    </Col>

                    <Col md={3} className="mb-3">
                      <FloatingLabel label="Email">
                        <Form.Control
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Email"
                        />
                      </FloatingLabel>
                    </Col>

                    <Col md={3} className="mb-3">
                      <FloatingLabel label="Mobile">
                        <Form.Control
                          type="text"
                          name="mobile"
                          value={form.mobile}
                          onChange={handleChange}
                          placeholder="Mobile"
                        />
                      </FloatingLabel>
                    </Col>

                    <Col md={3} className="mb-3">
                      <FloatingLabel label="Order ID">
                        <Form.Control
                          type="text"
                          name="order_id"
                          value={form.order_id}
                          onChange={handleChange}
                          placeholder="Order ID"
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* INVOICE DETAILS */}
              <Card className="border-0 bg-light mb-4">
                <Card.Body>
                  <h5 className="fw-bold mb-4">Invoice Details</h5>

                  <Row>
                    {/* INVOICE NO */}
                    <Col md={3} className="mb-3">
                      <FloatingLabel label="Invoice No">
                        <Form.Control
                          type="text"
                          name="invoice_no"
                          value={form.invoice_no}
                          onChange={handleChange}
                          placeholder="Invoice No"
                        />
                      </FloatingLabel>
                    </Col>

                    {/* DATE */}
                    <Col md={3} className="mb-3">
                      <FloatingLabel label="Invoice Date">
                        <Form.Control
                          type="date"
                          name="invoice_date"
                          value={form.invoice_date}
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                    </Col>

                    {/* TAX TYPE */}
                    <Col md={3} className="mb-3">
                      <FloatingLabel label="Tax Type">
                        <Form.Select
                          name="tax_type"
                          value={form.tax_type}
                          onChange={(e) => {
                            handleChange(e);

                            calculateTotals(items);
                          }}
                        >
                          <option value="GST">GST</option>

                          <option value="CGST_SGST">CGST + SGST</option>

                          <option value="CGST">CGST</option>

                          <option value="SGST">SGST</option>

                          <option value="IGST">IGST</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>

                    {/* PAYMENT */}
                    <Col md={3} className="mb-3">
                      <FloatingLabel label="Payment Method">
                        <Form.Select
                          name="payment_method"
                          value={form.payment_method}
                          onChange={handleChange}
                        >
                          <option value="CASH">CASH</option>

                          <option value="UPI">UPI</option>

                          <option value="CARD">CARD</option>

                          <option value="BANK">BANK</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>

                    {/* GST */}
                    {form.tax_type === "GST" && (
                      <Col md={3} className="mb-3">
                        <FloatingLabel label="GST %">
                          <Form.Control
                            type="number"
                            name="gst_percent"
                            value={form.gst_percent}
                            onChange={(e) => {
                              handleChange(e);

                              calculateTotals(items);
                            }}
                          />
                        </FloatingLabel>
                      </Col>
                    )}

                    {/* CGST + SGST */}
                    {form.tax_type === "CGST_SGST" && (
                      <>
                        <Col md={3} className="mb-3">
                          <FloatingLabel label="CGST %">
                            <Form.Control
                              type="number"
                              name="cgst_percent"
                              value={form.cgst_percent}
                              onChange={(e) => {
                                handleChange(e);

                                calculateTotals(items);
                              }}
                            />
                          </FloatingLabel>
                        </Col>

                        <Col md={3} className="mb-3">
                          <FloatingLabel label="SGST %">
                            <Form.Control
                              type="number"
                              name="sgst_percent"
                              value={form.sgst_percent}
                              onChange={(e) => {
                                handleChange(e);

                                calculateTotals(items);
                              }}
                            />
                          </FloatingLabel>
                        </Col>
                      </>
                    )}

                    {/* IGST */}
                    {form.tax_type === "IGST" && (
                      <Col md={3} className="mb-3">
                        <FloatingLabel label="IGST %">
                          <Form.Control
                            type="number"
                            name="igst_percent"
                            value={form.igst_percent}
                            onChange={(e) => {
                              handleChange(e);

                              calculateTotals(items);
                            }}
                          />
                        </FloatingLabel>
                      </Col>
                    )}
                  </Row>
                </Card.Body>
              </Card>

              {/* PRODUCTS */}
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">Product Details</h5>

                    <Button variant="dark" onClick={addProduct}>
                      <FaPlus className="me-2" />
                      Add Product
                    </Button>
                  </div>

                  <div className="table-responsive">
                    <Table bordered hover className="align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>Product Name</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>GST %</th>
                          <th>Tax</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {items.map((item: any, index: number) => (
                          <tr key={index}>
                            {/* PRODUCT */}
                            <td>
                              <Form.Control
                                type="text"
                                value={item.product_name}
                                placeholder="Product Name"
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "product_name",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>

                            {/* QTY */}
                            <td>
                              <Form.Control
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "quantity",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>

                            {/* PRICE */}
                            <td>
                              <Form.Control
                                type="number"
                                value={item.price}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "price",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>

                            {/* GST */}
                            <td>
                              <Form.Select
                                value={item.gst_percent}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "gst_percent",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value={0}>0%</option>

                                <option value={5}>5%</option>

                                <option value={12}>12%</option>

                                <option value={18}>18%</option>

                                <option value={28}>28%</option>
                              </Form.Select>
                            </td>

                            {/* TAX */}
                            <td>
                              <strong>
                                ₹ {Number(item.tax_amount || 0).toFixed(2)}
                              </strong>
                            </td>

                            {/* TOTAL */}
                            <td>
                              <strong>₹ {Number(item.total).toFixed(2)}</strong>
                            </td>

                            {/* DELETE */}
                            <td className="text-center">
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => removeProduct(index)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>

              {/* ADDRESS */}
              <Row>
                <Col md={6} className="mb-4">
                  <FloatingLabel label="Billing Address">
                    <Form.Control
                      as="textarea"
                      style={{
                        height: "120px",
                      }}
                      name="billing_address"
                      value={form.billing_address}
                      onChange={handleChange}
                      placeholder="Billing Address"
                    />
                  </FloatingLabel>
                </Col>

                <Col md={6} className="mb-4">
                  <FloatingLabel label="Shipping Address">
                    <Form.Control
                      as="textarea"
                      style={{
                        height: "120px",
                      }}
                      name="shipping_address"
                      value={form.shipping_address}
                      onChange={handleChange}
                      placeholder="Shipping Address"
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              {/* TOTALS */}
              {/* TOTALS */}
              <Row className="justify-content-end">
                <Col md={5}>
                  <Card className="border-0 shadow-sm rounded-4">
                    <Card.Body>
                      {/* SUBTOTAL */}
                      <div className="d-flex justify-content-between mb-3">
                        <span className="fw-semibold">Subtotal</span>

                        <strong>₹ {Number(form.subtotal).toFixed(2)}</strong>
                      </div>

                      {/* GST */}
                      {form.tax_type === "GST" && (
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-semibold">
                            GST ({form.gst_percent || 18}%)
                          </span>

                          <strong>
                            ₹ {Number(form.tax_amount).toFixed(2)}
                          </strong>
                        </div>
                      )}

                      {/* IGST */}
                      {form.tax_type === "IGST" && (
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-semibold">
                            IGST ({form.igst_percent || 18}%)
                          </span>

                          <strong>
                            ₹ {Number(form.tax_amount).toFixed(2)}
                          </strong>
                        </div>
                      )}

                      {/* CGST + SGST */}
                      {form.tax_type === "CGST_SGST" && (
                        <>
                          {/* CGST */}
                          <div className="d-flex justify-content-between mb-3">
                            <span className="fw-semibold">
                              CGST ({form.cgst_percent || 9}%)
                            </span>

                            <strong>
                              ₹ {(Number(form.tax_amount) / 2).toFixed(2)}
                            </strong>
                          </div>

                          {/* SGST */}
                          <div className="d-flex justify-content-between mb-3">
                            <span className="fw-semibold">
                              SGST ({form.sgst_percent || 9}%)
                            </span>

                            <strong>
                              ₹ {(Number(form.tax_amount) / 2).toFixed(2)}
                            </strong>
                          </div>
                        </>
                      )}

                      {/* ONLY CGST */}
                      {form.tax_type === "CGST" && (
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-semibold">
                            CGST ({form.cgst_percent || 9}%)
                          </span>

                          <strong>
                            ₹ {Number(form.tax_amount).toFixed(2)}
                          </strong>
                        </div>
                      )}

                      {/* ONLY SGST */}
                      {form.tax_type === "SGST" && (
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-semibold">
                            SGST ({form.sgst_percent || 9}%)
                          </span>

                          <strong>
                            ₹ {Number(form.tax_amount).toFixed(2)}
                          </strong>
                        </div>
                      )}

                      {/* DISCOUNT */}
                      <div className="mb-3">
                        <FloatingLabel label="Discount">
                          <Form.Control
                            type="number"
                            name="discount_amount"
                            value={form.discount_amount}
                            onChange={(e) => {
                              handleChange(e);

                              calculateTotals(items);
                            }}
                          />
                        </FloatingLabel>
                      </div>

                      <hr />

                      {/* GRAND TOTAL */}
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold mb-0">Grand Total</h5>

                        <h4 className="fw-bold text-success mb-0">
                          ₹ {Number(form.total_amount).toFixed(2)}
                        </h4>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* NOTES */}
              <Row className="mt-4">
                <Col md={12}>
                  <FloatingLabel label="Notes">
                    <Form.Control
                      as="textarea"
                      style={{
                        height: "120px",
                      }}
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Notes"
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
