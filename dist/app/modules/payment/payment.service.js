"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../../config"));
// creating stripe instance from config
const stripe = new stripe_1.default(config_1.default.stripe.secret_key);
const createOne = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { price } = data;
    const amount = price * 100;
    const paymentIntent = yield stripe.paymentIntents.create({
        currency: "usd",
        amount,
        payment_method_types: ["card"]
    });
    const result = paymentIntent.client_secret;
    return result;
});
exports.PaymentService = { createOne };
