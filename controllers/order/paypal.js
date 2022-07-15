import paypal from "paypal-rest-sdk";

//set the configuration
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AeBB1FJlFKGdtJr42QirGBpNyfmzJA1giAOFLk-LAsb0RgTq_H2hAg2_hx4VA8H30pB40O071Sz575ah",
  client_secret:
    "EDMpuDQJxZW4CMHDLGE3jVQuW6HImZAd9AwSU2wcAAjGKX-9a3bU1icdsZ2k4TLnCpYUMExBj0QxspF6",
});

const create_payment_json1 = (dataPayPal) => {
  const items = [];
  let total = 0;
  dataPayPal.map((product) => {
    items.push({
      name: product.name,
      sku: product.idProduct,
      price: (product.priceAtBuy / 23.225).toFixed(1).toString(),
      currency: "USD",
      quantity: product.quantity,
    });
    total += (product.priceAtBuy / 23.225) * product.quantity;
  });
  return {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url:
        "http://localhost:4000/success?amount=" + total.toFixed(1).toString(),
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items,
        },
        amount: {
          currency: "USD",
          total: total.toFixed(1).toString(),
        },
        description: "Hat for the best team ever",
      },
    ],
  };
};

export default {
  pay(dataPayPal) {
    return new Promise((resolve) => {
      console.log(
        create_payment_json1(dataPayPal).transactions[0].amount.total
      );
      paypal.payment.create(
        create_payment_json1(dataPayPal),
        function (error, payment) {
          if (error) {
            console.log(error);
          } else {
            for (let i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === "approval_url") {
                resolve(payment.links[i].href);
              }
            }
          }
        }
      );
    });
  },
};
