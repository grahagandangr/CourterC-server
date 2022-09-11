const snap = require("../helpers/midtrans");
const { User, OrderDetail } = require("../models");

class PaymentController {
  static async topUpBalance(req, res, next) {
    try {
      const inputAmount = req.body.amount;
      const { id, email, username } = req.user;
      let parameter = {
        transaction_details: {
          order_id: new Date().getTime(),
          gross_amount: Number(req.body.amount),
        },
        customer_details: {
          email: email,
          name: username,
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

      req.inputAmount = inputAmount;

      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
        inputAmount,
      });
    } catch (error) {
      // next(error);
      console.log(error);
    }
  }

  static async updateBalance(req, res, next) {
    try {
      const inputAmount = req.inputAmount;
      console.log(inputAmount, "+++++");
      const { id, email, username } = req.user;

      const { gross_amount } = req.body;
      const user = await User.findByPk(id);
      let updateBalance = await User.update(
        { balance: user.balance + Number(gross_amount) },
        { where: { id } }
      );

      console.log(updateBalance);

      res.status(200).json({ message: "Success top-up balance" });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async cancelOrder(req, res, next) {
    try {
      const { id, email, username } = req.user;
      const { orderDetailId } = req.params;
      const user = await User.findByPk(id);
      const orderDetail = await OrderDetail.findByPk(orderDetailId);
      const updateBalance = await User.update(
        {
          balance: user.balance + orderDetail.price,
        },
        {
          where: { id },
        }
      );

      const order = await OrderDetail.update(
        { status: "Cancelled" },
        {
          where: { id: orderDetailId },
        }
      );
      res.status(200).json({
        message: "Success cancelled order",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async claimPaymentOwner(req, res, next){
    try {
      const id =req.user.id
      const { orderDetailId } = req.params;
      const user = await User.findByPk(id);
      const orderDetail = await OrderDetail.findByPk(orderDetailId);

      const updateBalanceOwner = await User.update(
        {
          balance: user.balance + orderDetail.price,
        },
        {
          where: { id },
        }
      );

      const order = await OrderDetail.update(
        { status: "Finished" },
        {
          where: { id: orderDetailId },
        }
      );
      res.status(200).json({
        msg: "Success claim payment",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PaymentController;
