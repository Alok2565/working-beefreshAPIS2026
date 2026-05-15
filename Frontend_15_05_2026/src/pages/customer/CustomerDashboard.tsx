import usePageTitle from "../../hooks/usePageTitle";

const CustomerDashboard = () => {
  usePageTitle("Dashboard");
  return (
    <div>
      <h2>Customer Dashboard</h2>

      {/* Stats */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div>Orders: 12</div>
        <div>Pending: 3</div>
        <div>Cart: 2</div>
      </div>

      {/* Orders */}
      <h3>Recent Orders</h3>
      <ul>
        <li>#123 - Delivered</li>
        <li>#124 - Pending</li>
      </ul>
    </div>
  );
};

export default CustomerDashboard;
