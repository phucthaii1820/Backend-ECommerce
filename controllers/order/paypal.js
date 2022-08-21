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
  var extraData = Buffer.from(dataPayPal._id).toString("base64");
  const items = [];
  let total = 0;
  let subtotal = 0;
  const ship = (dataPayPal.ship / 23.415).toFixed(1);
  dataPayPal.products.map((product) => {
    items.push({
      name: "product.name",
      sku: product.idProduct,
      price: (product.priceAtBuy / 23.415).toFixed(1),
      currency: "USD",
      quantity: product.quantity,
    });
  });

  items.map((item) => {
    total += item.price * item.quantity;
  });

  subtotal += +total.toFixed(1);
  total += Number(ship);
  total = total.toFixed(1);
  return {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url:
        "https://fit-summer-2022-ec-ommerce.vercel.app/complete-order?success=true&message=Giao+d%E1%BB%8Bch+th%C3%A0nh+c%C3%B4ng.&extraData=" +
        extraData,
      cancel_url:
        "https://fit-summer-2022-ec-ommerce.vercel.app/complete-order?success=false&message=Giao+d%E1%BB%8Bch+b%E1%BB%8B+t%E1%BB%AB+ch%E1%BB%91i+b%E1%BB%9Fi+ng%C6%B0%E1%BB%9Di+d%C3%B9ng.&extraData=" +
        extraData,
    },
    transactions: [
      {
        item_list: {},
        amount: {
          currency: "USD",
          total: total,
          details: {
            subtotal: subtotal,
            shipping: ship,
          },
        },
        description: "payment for order",
      },
    ],
  };
};

export default {
  pay(dataPayPal) {
    return new Promise((resolve) => {
      paypal.payment.create(
        create_payment_json1(dataPayPal),
        function (error, payment) {
          if (error) {
            console.log(error);
          } else {
            for (let i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === "approval_url") {
                // resolve(payment.links[i].href.match(/EC-\w+/)[0]);
                resolve(payment.links[i].href);
              }
            }
          }
        }
      );
    });
  },
};
