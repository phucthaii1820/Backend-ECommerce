import crypto from "crypto";
import https from "https";

export default {
  pay(dataMomo) {
    return new Promise((resolve) => {
      var partnerCode = "MOMO1DLN20220714";
      var accessKey = "QnhKudYWLLLMI2pu";
      var secretkey = "7wnl0f86e6etugnPXg6DHpb9yP1QIOiH";
      var requestId = partnerCode + new Date().getTime();
      var orderId = requestId;
      var orderInfo = "Thanh toán đơn hàng";
      var redirectUrl =
        "https://fit-summer-2022-ec-ommerce.vercel.app/complete-order?success=true";
      var ipnUrl =
        "https://fit-summer-2022-ec-ommerce.vercel.app/complete-order?success=false";
      var amount = dataMomo.total + dataMomo.ship;
      var requestType = "captureWallet";
      var extraData = Buffer.from(dataMomo._id).toString("base64");

      var rawSignature =
        "accessKey=" +
        accessKey +
        "&amount=" +
        amount +
        "&extraData=" +
        extraData +
        "&ipnUrl=" +
        ipnUrl +
        "&orderId=" +
        orderId +
        "&orderInfo=" +
        orderInfo +
        "&partnerCode=" +
        partnerCode +
        "&redirectUrl=" +
        redirectUrl +
        "&requestId=" +
        requestId +
        "&requestType=" +
        requestType;
      //puts raw signature

      var signature = crypto
        .createHmac("sha256", secretkey)
        .update(rawSignature)
        .digest("hex");

      const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: "vi",
      });

      const options = {
        hostname: "test-payment.momo.vn",
        port: 443,
        path: "/v2/gateway/api/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
        },
      };

      const req = https.request(options, (res) => {
        res.setEncoding("utf8");
        res.on("data", (body) => {
          resolve(body);
        });
        res.on("end", () => {
          console.log("No more data in response.");
        });
      });

      req.on("error", (e) => {
        console.log(`problem with request: ${e.message}`);
      });
      // write data to request body
      console.log("Sending....");
      req.write(requestBody);
      req.end();
    });
  },
};
