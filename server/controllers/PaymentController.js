const snap = require("../helpers/midtrans");

class PaymentController {
  static async midtransPayment(req, res, next) {
    try {
      const { email, amount } = req.body;

      let parameter = {
        transaction_details: {
          order_id: new Date().getTime(),
          gross_amount: amount,
        },
        customer_details: {
          email: email,
        },
        enabled_payments: [
          "credit_card",
          "cimb_clicks",
          "bca_klikbca",
          "bca_klikpay",
          "bri_epay",
          "echannel",
          "permata_va",
          "bca_va",
          "bni_va",
          "bri_va",
          "other_va",
          "gopay",
          "indomaret",
          "danamon_online",
          "akulaku",
          "shopeepay",
        ],
        credit_card: {
          secure: true,
        },
      };
      const transaction = await snap.createTransaction(parameter);

      let transactionToken = transaction.token;
      let transactionRedirectUrl = transaction.redirect_url;
      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PaymentController;
