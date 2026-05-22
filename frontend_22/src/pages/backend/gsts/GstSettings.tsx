import { useEffect, useState } from "react";
import {
  getGSTSettings,
  updateGSTSettings,
} from "../../../services/gstService";

function GSTSettings() {
  // ================= FORM STATE =================
  const [form, setForm] = useState<any>({
    id: "",
    company_name: "",
    gst_number: "",
    registration_type: "",
    invoice_prefix: "",
    default_gst_percent: "",
    currency: "",
    financial_year: "",
    state_code: "",
    address: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // ================= GET GST SETTINGS =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getGSTSettings();

        if (res?.data?.data) {
          setForm(res.data.data);
        }
      } catch (err) {
        console.log("GET GST ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setSaving(true);

      await updateGSTSettings(Number(form.id), form);

      alert("GST Settings Saved Successfully");
    } catch (err) {
      console.log("SAVE ERROR:", err);
      alert("Error saving GST settings");
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return <div className="p-4">Loading GST Settings...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow border-0 rounded-4 p-4">
        <h3 className="mb-4 fw-bold">GST Settings</h3>

        {/* Company Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Company Name
          </label>

          <input
            type="text"
            className="form-control"
            name="company_name"
            value={form.company_name || ""}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        {/* GST Number */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            GST Number
          </label>

          <input
            type="text"
            className="form-control"
            name="gst_number"
            value={form.gst_number || ""}
            onChange={handleChange}
            placeholder="Enter GST number"
          />
        </div>

        {/* Registration Type */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Registration Type
          </label>

          <select
            className="form-select"
            name="registration_type"
            value={form.registration_type || ""}
            onChange={handleChange}
          >
            <option value="">Select Registration Type</option>
            <option value="Regular">Regular</option>
            <option value="Composition">Composition</option>
            <option value="Unregistered">Unregistered</option>
            <option value="E-commerce">E-commerce</option>
            <option value="ISD">ISD</option>
          </select>
        </div>

        {/* Invoice Prefix */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Invoice Prefix
          </label>

          <input
            type="text"
            className="form-control"
            name="invoice_prefix"
            value={form.invoice_prefix || ""}
            onChange={handleChange}
            placeholder="INV"
          />
        </div>

        {/* Default GST Percent */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Default GST %
          </label>

          <input
            type="number"
            className="form-control"
            name="default_gst_percent"
            value={form.default_gst_percent || ""}
            onChange={handleChange}
            placeholder="18"
          />
        </div>

        {/* Currency */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Currency
          </label>

          <input
            type="text"
            className="form-control"
            name="currency"
            value={form.currency || ""}
            onChange={handleChange}
            placeholder="INR"
          />
        </div>

        {/* Financial Year */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Financial Year
          </label>

          <input
            type="text"
            className="form-control"
            name="financial_year"
            value={form.financial_year || ""}
            onChange={handleChange}
            placeholder="2025-2026"
          />
        </div>

        {/* State Code */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            State Code
          </label>

          <input
            type="text"
            className="form-control"
            name="state_code"
            value={form.state_code || ""}
            onChange={handleChange}
            placeholder="DL"
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Address
          </label>

          <textarea
            className="form-control"
            rows={3}
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Phone
          </label>

          <input
            type="text"
            className="form-control"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Email
          </label>

          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        {/* Save Button */}
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
export default GSTSettings;