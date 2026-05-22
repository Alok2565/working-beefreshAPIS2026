import { FaUsers, FaChartLine } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { BsCartCheckFill } from "react-icons/bs";
import Counter from "../../components/common/Counter";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Jan", orders: 40 },
//   { name: "Feb", orders: 60 },
//   { name: "Mar", orders: 80 },
// ];

const AdminDashboard = () => {
  return (
    <>
      {/* CARDS */}
      <div className="row mb-4">
        <div className="col-6 col-md-6 col-sm-6 col-lg-3 mb-3">
          <div className="card p-3 shadow bg-danger text-white">
            <h6>
              <GiSandsOfTime size={25} /> Pending orders
            </h6>
            <h3>
              <Counter value={1200} />
            </h3>
          </div>
        </div>

        <div className="col-6 col-md-6 col-sm-6 col-lg-3 mb-3">
          <div className="card p-3 shadow bg-success text-white">
            <h6>
              <BsCartCheckFill size={25} /> New Orders
            </h6>
            <h3>
              ₹ <Counter value={5000} />
            </h3>
          </div>
        </div>
        <div className="col-6 col-md-6 col-sm-6 col-lg-3 mb-3">
          <div className="card p-3 shadow bg-warning text-white">
            <h6>
              <FaChartLine size={25} /> Total Revenue
            </h6>
            <h3>
              ₹ <Counter value={5000} />
            </h3>
          </div>
        </div>
        <div className="col-6 col-md-6 col-sm-6 col-lg-3 mb-3">
          <div className="card p-3 shadow bg-primary text-white">
            <h6>
              <FaUsers size={25} /> Total Users
            </h6>
            <h3>
              ₹ <Counter value={5000} />
            </h3>
          </div>
        </div>
      </div>

      {/* CHART */}
      {/* <div className="card p-3 shadow">
        <h5>Monthly Orders</h5>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#ca7d18" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </>
  );
};

export default AdminDashboard;
// import Counter from "../../components/common/Counter";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Jan", orders: 40 },
//   { name: "Feb", orders: 60 },
//   { name: "Mar", orders: 80 },
// ];

// const AdminDashboard = () => {
//   return (
//     <div>
//       {/* CARDS */}
//       <div className="row mb-4">
//         <div className="col-md-3">
//           <div className="card p-3 shadow bg-danger text-white">
//             <h6>Orders</h6>
//             <h3>
//               <Counter value={1200} />
//             </h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card p-3 shadow bg-success text-white">
//             <h6>Revenue</h6>
//             <h3>
//               ₹ <Counter value={5000} />
//             </h3>
//           </div>
//         </div>
//       </div>

//       {/* CHART */}
//       <div className="card p-3 shadow">
//         <h5>Monthly Orders</h5>

//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="orders" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import Counter from "../../components/common/Counter";

// const AdminDashboard = () => {
//   return (
//     <div className="row">
//       <div className="col-md-3 mb-3">
//         <div className="card p-3 bg-danger text-white shadow">
//           <h6>Pending Inspection</h6>
//           <h3>
//             <Counter value={100} />
//           </h3>
//         </div>
//       </div>

//       <div className="col-md-3 mb-3">
//         <div className="card p-3 bg-warning shadow">
//           <h6>New Inspection</h6>
//           <h3>
//             <Counter value={500} />
//           </h3>
//         </div>
//       </div>

//       <div className="col-md-3 mb-3">
//         <div className="card p-3 bg-primary text-white shadow">
//           <h6>Total Clients</h6>
//           <h3>
//             <Counter value={600} />
//           </h3>
//         </div>
//       </div>

//       <div className="col-md-3 mb-3">
//         <div className="card p-3 bg-secondary text-white shadow">
//           <h6>Total Vendors</h6>
//           <h3>
//             <Counter value={1500} />
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
