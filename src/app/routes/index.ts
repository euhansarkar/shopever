import express from 'express';
import { UserRouter } from '../modules/user/user.route';
import { AdminRouter } from '../modules/admin/admin.router';
import { AuthRouter } from '../modules/auth/auth.router';
import { ManagementDepartmentRouter } from '../modules/managementDepartment/managementDepartment.router';
import { CustomerRouter } from '../modules/customer/customer.router';
import { AttributeGroupRouter } from '../modules/attributeGroup/attributeGroup.router';
import { AttributeRouter } from '../modules/attribute/attribute.router';
import { CategoryRouter } from '../modules/category/category.router';
import { ProductRouter } from '../modules/product/product.router';
import { PaymentMethodRouter } from '../modules/paymentMethod/paymentMethod.router';
import { ShippingMethodRouter } from '../modules/shippingMethod/shippingMethod.router';
import { CollectionRouter } from '../modules/collection/collection.router';
import { CMSRouter } from '../modules/CMS/CMS.router';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/admins',
    route: AdminRouter,
  },
  {
    path: '/customers',
    route: CustomerRouter,
  },
  {
    path: '/attribute-groups',
    route: AttributeGroupRouter,
  },
  {
    path: '/attributes',
    route: AttributeRouter,
  },
  {
    path: '/categories',
    route: CategoryRouter,
  },
  {
    path: '/products',
    route: ProductRouter,
  },
  {
    path: '/payment-methods',
    route: PaymentMethodRouter,
  },
  {
    path: '/shipping-methods',
    route: ShippingMethodRouter,
  },
  {
    path: '/collections',
    route: CollectionRouter,
  },
  {
    path: '/cmss',
    route: CMSRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
