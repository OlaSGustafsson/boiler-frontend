import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import fetch from "node-fetch";

const openWeatherMapAppId = process.env.OPENWEATHERMAPAPPID;
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");

  if (!req.body || !req.body.id || !req.body.units || !req.body.lang) {
    const msg =
      "Something missing in the body. Be sure to pass id, units and lang...";
    context.log(msg);
    context.res = {
      status: 400,
      body: msg,
      Headers: {
        "Content-Type": "text/html",
      },
    };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?id=${req.body.id}&units=${req.body.units}&lang=${req.body.lang}&appid=${openWeatherMapAppId}`;

  var responseStatus = 200;
  var responseMessage = {};

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    responseMessage = await response.json();
  } catch (error) {
    context.log(error);
    responseStatus = 400;
    responseMessage = {
      error: error,
    };
  }

  context.res = {
    status: responseStatus,
    body: responseMessage,
  };
};

export default httpTrigger;
