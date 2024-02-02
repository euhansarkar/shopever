"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CMS_router_1 = require("../modules/CMS/CMS.router");
const admin_router_1 = require("../modules/admin/admin.router");
const attribute_router_1 = require("../modules/attribute/attribute.router");
const attributeGroup_router_1 = require("../modules/attributeGroup/attributeGroup.router");
const attributeOption_router_1 = require("../modules/attributeOption/attributeOption.router");
const auth_router_1 = require("../modules/auth/auth.router");
const category_router_1 = require("../modules/category/category.router");
const collection_router_1 = require("../modules/collection/collection.router");
const customer_router_1 = require("../modules/customer/customer.router");
const managementDepartment_router_1 = require("../modules/managementDepartment/managementDepartment.router");
const paymentMethod_router_1 = require("../modules/paymentMethod/paymentMethod.router");
const product_router_1 = require("../modules/product/product.router");
const shippingMethod_router_1 = require("../modules/shippingMethod/shippingMethod.router");
const user_route_1 = require("../modules/user/user.route");
const varient_router_1 = require("../modules/varient/varient.router");
const store_router_1 = require("../modules/store/store.router");
const payment_router_1 = require("../modules/payment/payment.router");
const order_router_1 = require("../modules/order/order.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRouter,
    },
    {
        path: '/management-departments',
        route: managementDepartment_router_1.ManagementDepartmentRouter,
    },
    {
        path: '/auth',
        route: auth_router_1.AuthRouter,
    },
    {
        path: '/admins',
        route: admin_router_1.AdminRouter,
    },
    {
        path: '/customers',
        route: customer_router_1.CustomerRouter,
    },
    {
        path: '/attribute-groups',
        route: attributeGroup_router_1.AttributeGroupRouter,
    },
    {
        path: '/attributes',
        route: attribute_router_1.AttributeRouter,
    },
    {
        path: '/categories',
        route: category_router_1.CategoryRouter,
    },
    {
        path: '/products',
        route: product_router_1.ProductRouter,
    },
    {
        path: '/payment-methods',
        route: paymentMethod_router_1.PaymentMethodRouter,
    },
    {
        path: '/shipping-methods',
        route: shippingMethod_router_1.ShippingMethodRouter,
    },
    {
        path: '/collections',
        route: collection_router_1.CollectionRouter,
    },
    {
        path: '/cmss',
        route: CMS_router_1.CMSRouter,
    },
    {
        path: '/auth',
        route: auth_router_1.AuthRouter,
    },
    {
        path: '/attribute-options',
        route: attributeOption_router_1.AttributeOptionRouter,
    },
    {
        path: '/varients',
        route: varient_router_1.VarientRouter,
    },
    {
        path: '/store',
        route: store_router_1.StoreRouter,
    },
    {
        path: '/payment',
        route: payment_router_1.PaymentRouter,
    },
    {
        path: '/orders',
        route: order_router_1.OrderRouter,
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
