import express from 'express';
import { CMSRouter } from '../modules/CMS/CMS.router';
import { AdminRouter } from '../modules/admin/admin.router';
import { AttributeRouter } from '../modules/attribute/attribute.router';
import { AttributeGroupRouter } from '../modules/attributeGroup/attributeGroup.router';
import { AttributeOptionRouter } from '../modules/attributeOption/attributeOption.router';
import { AuthRouter } from '../modules/auth/auth.router';
import { CategoryRouter } from '../modules/category/category.router';
import { CollectionRouter } from '../modules/collection/collection.router';
import { CustomerRouter } from '../modules/customer/customer.router';
import { ManagementDepartmentRouter } from '../modules/managementDepartment/managementDepartment.router';
import { PaymentMethodRouter } from '../modules/paymentMethod/paymentMethod.router';
import { ProductRouter } from '../modules/product/product.router';
import { ShippingMethodRouter } from '../modules/shippingMethod/shippingMethod.router';
import { UserRouter } from '../modules/user/user.route';
import { VarientRouter } from '../modules/varient/varient.router';
import { StoreRouter } from '../modules/store/store.router';
import { PaymentRouter } from '../modules/payment/payment.router';

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
  },
  {
    path: '/attribute-options',
    route: AttributeOptionRouter,
  },
  {
    path: '/varients',
    route: VarientRouter,
  },
  {
    path: '/store',
    route: StoreRouter,
  },
  {
    path: '/payment',
    route: PaymentRouter,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
