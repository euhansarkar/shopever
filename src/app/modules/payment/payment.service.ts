import Stripe from "stripe";
import config from "../../../config";

// creating stripe instance from config
const stripe = new Stripe(config.stripe.secret_key!);
const createOne = async (data: { price: number }): Promise<string | null> => {
    const { price } = data;
    const amount = price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount,
        payment_method_types: ["card"]
    })

    const result = paymentIntent.client_secret;
    return result;
}


export const PaymentService = { createOne }