import { Route } from "react-router-dom";

// ADMIN
import Profile from "../pages/auth/Profile";
import ChangePassword from "../pages/auth/ChangePassword";
import AdminDashboard from "../pages/backend/AdminDashboard";
import Users from "../pages/backend/manage/users/Users";
import Roles from "../pages/backend/manage/roles/Roles";

import ManageOrders from "../pages/backend/manage/Products/Orders";
import AddRole from "../pages/backend/manage/roles/AddRole";
import AddPermission from "../pages/backend/manage/permissions/AddPermission";
import PermissionList from "../pages/backend/manage/permissions/PermissionList";
import RolePermissionView from "../pages/backend/manage/role_permissions/RolePermissionView";
import RolePermissionAssign from "../pages/backend/manage/role_permissions/RolePermissionAssign";
import UserRoleAssignPermission from "../pages/backend/manage/users/UserRoleAssignPermission";
import HomeBanners from "../pages/backend/manage/banners/HomeBanners";
import AddHomeBanner from "../pages/backend/manage/banners/AddHomeBanner";
import EditHomeBanner from "../pages/backend/manage/banners/EditHomeBanner";
import EditRole from "../pages/backend/manage/roles/EditRole";
import CategoryLists from "../components/backend/products/categories/CategoryLists";
import AddCategory from "../components/backend/products/categories/AddCategory";
import EditCategory from "../components/backend/products/categories/EditCategory";
import WeightUnits from "../components/backend/products/weight_units/WeightUnits";
import AddWeightUnit from "../components/backend/products/weight_units/AddWeightUnit";
import EditWeightUnit from "../components/backend/products/weight_units/EditWeightUnit";
import ProductAttributes from "../components/backend/products/attributes/ProductAttributes";
import AddProductAttribute from "../components/backend/products/attributes/AddProductAttribute";
import EditProductAttribute from "../components/backend/products/attributes/EditProductAttribute";
import AddAttributeValue from "../components/backend/products/attributes/AddAttributeValue";
import EditAttributeValue from "../components/backend/products/attributes/EditAttributeValue";
import AttributeValues from "../components/backend/products/attributes/AttributeValues";
import FlavorLists from "../components/backend/products/flavors/FlavorLists";
import AddFlavor from "../components/backend/products/flavors/AddFlavor";
import EditFlavor from "../components/backend/products/flavors/EditFlavor";
import PackgingLists from "../components/backend/products/Packagings/PackgingLists";
import AddPackging from "../components/backend/products/Packagings/AddPackging";
import EditPackging from "../components/backend/products/Packagings/EditPackging";
import AddPurity from "../components/backend/products/purity/AddPurity";
import EditPurity from "../components/backend/products/purity/EditPurity";
import PurityLists from "../components/backend/products/purity/PurityLists";
import TaxMasterLists from "../components/backend/products/tax_master/TaxMasterLists";
import AddTaxMaster from "../components/backend/products/tax_master/AddTaxMaster";
import EditTaxMaster from "../components/backend/products/tax_master/EditTaxMaster";
import GSTSettings from "../pages/backend/gsts/GstSettings";
import InvoiceList from "../pages/backend/invoices/InvoiceList";
import AddInvoice from "../pages/backend/invoices/AddInvoice";
import BrandLists from "../components/backend/products/brands/BrandLists";
import AddBrand from "../components/backend/products/brands/AddBrand";
import EditBrand from "../components/backend/products/brands/EditBrand";
import ProductList from "../components/backend/products/products/ProductList";
import AddProduct from "../components/backend/products/products/AddProduct";
function AdminRoutes() {
  return (
    <>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="/admin/manage/home-banners" element={<HomeBanners />} />
      <Route
        path="/admin/manage/home-banner/add-new"
        element={<AddHomeBanner />}
      />
      <Route
        path="/admin/manage/home-banner/edit/:id"
        element={<EditHomeBanner />}
      />

      <Route path="admin/manage/users" element={<Users />} />
      <Route
        path="/admin/manage/user/add-new"
        element={<h2>Add New Users</h2>}
      />
      <Route path="/admin/manage/user/edit/:id" element={<h2>Edit Users</h2>} />
      <Route
        path="/admin/manage/user-role-permission"
        element={<UserRoleAssignPermission />}
      />
      <Route path="/admin/manage/roles" element={<Roles />} />
      <Route path="/admin/manage/role/add-new" element={<AddRole />} />
      <Route path="/admin/manage/role/eidt/:id" element={<EditRole />} />
      <Route path="/admin/manage/permissions" element={<PermissionList />} />
      <Route
        path="/admin/manage/permission/add-new"
        element={<AddPermission />}
      />
      <Route
        path="/admin/manage/role/permission-view"
        element={<RolePermissionView />}
      />
      <Route
        path="/admin/role/permission/assign"
        element={<RolePermissionAssign />}
      />
      <Route path="/admin/manage/products" element={<ProductList />} />
      <Route path="/admin/manage/product/add-new" element={<AddProduct />} />

      <Route path="/admin/manage/brands" element={<BrandLists />} />
      <Route path="/admin/manage/brand/add-new" element={<AddBrand />} />
      <Route path="/admin/manage/brand/edit/:id" element={<EditBrand />} />

      <Route
        path="/admin/manage/products/categories"
        element={<CategoryLists />}
      />
      <Route
        path="/admin/manage/products/category/add-new"
        element={<AddCategory />}
      />
      <Route
        path="/admin/manage/products/category/edit/:id"
        element={<EditCategory />}
      />

      <Route path="/admin/manage/products/taxes" element={<TaxMasterLists />} />
      <Route
        path="/admin/manage/products/tax/add-new"
        element={<AddTaxMaster />}
      />
      <Route
        path="/admin/manage/products/tax/edit/:id"
        element={<EditTaxMaster />}
      />

      <Route
        path="/admin/manage/orders/gts-settings"
        element={<GSTSettings />}
      />
      <Route
        path="/admin/manage/products/attribute/flavors"
        element={<FlavorLists />}
      />
      <Route
        path="/admin/manage/products/attribute/flavor/add-new"
        element={<AddFlavor />}
      />
      <Route
        path="/admin/manage/products/attribute/flavor/edit/:id"
        element={<EditFlavor />}
      />
      <Route
        path="/admin/manage/products/attribute/packaging-types"
        element={<PackgingLists />}
      />
      <Route
        path="/admin/manage/products/attribute/packaging-type/add-new"
        element={<AddPackging />}
      />
      <Route
        path="/admin/manage/products/attribute/packaging-type/edit/:id"
        element={<EditPackging />}
      />

      <Route
        path="/admin/manage/products/attribute/purities"
        element={<PurityLists />}
      />
      <Route
        path="/admin/manage/products/attribute/purity/add-new"
        element={<AddPurity />}
      />
      <Route
        path="/admin/manage/products/attribute/purity/edit/:id"
        element={<EditPurity />}
      />

      <Route
        path="/admin/manage/products/weight-units"
        element={<WeightUnits />}
      />
      <Route
        path="/admin/manage/products/weight-unit/add-new"
        element={<AddWeightUnit />}
      />
      <Route
        path="/admin/manage/products/weight-unit/edit/:id"
        element={<EditWeightUnit />}
      />

      <Route
        path="/admin/manage/products/attributes"
        element={<ProductAttributes />}
      />
      <Route
        path="/admin/manage/products/attributes/add-new"
        element={<AddProductAttribute />}
      />
      <Route
        path="/admin/manage/products/attributes/edit/:id"
        element={<EditProductAttribute />}
      />

      <Route
        path="/admin/manage/products/attribute/values"
        element={<AttributeValues />}
      />
      <Route
        path="/admin/manage/products/attribute/value/add-new"
        element={<AddAttributeValue />}
      />
      <Route
        path="/admin/manage/products/attribute/value/edit/:id"
        element={<EditAttributeValue />}
      />

      <Route path="/admin/manage/orders" element={<ManageOrders />} />
      <Route path="/admin/manage/orders/invoices" element={<InvoiceList />} />
      <Route
        path="/admin/manage/orders/invoice/add-new"
        element={<AddInvoice />}
      />

      <Route path="/admin/manage/profile" element={<Profile />} />
      <Route
        path="/admin/manage/change-password"
        element={<ChangePassword />}
      />
    </>
  );
}

export default AdminRoutes;
