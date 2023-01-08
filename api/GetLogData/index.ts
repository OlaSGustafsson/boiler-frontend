import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import fetch from "node-fetch";

const apiKeyGetData = process.env.APIKEYGETDATA;

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");

  if (
    !req.body ||
    !req.body.SensorId ||
    !req.body.StartTimeStamp ||
    !req.body.EndTimeStamp
  ) {
    const msg =
      "Something missing in the body. Be sure to pass SensorId, StartTimeStamp and EndTimeStamp...";
    context.log(msg);
    context.res = {
      status: 400,
      body: msg,
      Headers: {
        "Content-Type": "text/html",
      },
    };
  }
  const url = `https://func-boiler.azurewebsites.net/api/GetData?code=${apiKeyGetData}`;

  var responseStatus = 200;
  var responseMessage = {};

  try {
    const response = await fetch(url, {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify({
        SensorId: req.body.SensorId,
        StartTimeStamp: req.body.StartTimeStamp,
        EndTimeStamp: req.body.EndTimeStamp,
      }),
    });
    responseMessage = await response.json();
  } catch (error) {
    console.error(error);
    responseMessage = {
      sensorId: req.body.SensorId,
      values: [],
      error: error,
    };
  }

  context.res = {
    status: responseStatus,
    body: responseMessage,
  };
};

export default httpTrigger;
