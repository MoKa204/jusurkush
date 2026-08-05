export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: "requires_payment_method" | "succeeded" | "failed";
}

export interface PaymentGateway {
  createPaymentIntent(amount: number, currency?: string): Promise<PaymentIntent>;
  verifyPayment(paymentIntentId: string): Promise<boolean>;
}

export class StripeTestPaymentProvider implements PaymentGateway {
  async createPaymentIntent(amount: number, currency = "usd"): Promise<PaymentIntent> {
    // Standard Stripe test mode interface stub
    const id = `pi_test_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const clientSecret = `${id}_secret_${Math.random().toString(36).substring(2, 10)}`;

    return {
      id,
      clientSecret,
      amount,
      currency,
      status: "requires_payment_method",
    };
  }

  async verifyPayment(paymentIntentId: string): Promise<boolean> {
    // In test mode, payment intents beginning with pi_test_ succeed
    return paymentIntentId.startsWith("pi_test_");
  }
}

export function getPaymentGateway(): PaymentGateway {
  return new StripeTestPaymentProvider();
}
