import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import fetch from "node-fetch";

const apiKeyGetLatest = process.env.APIKEYGETLATEST;

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");

  var responseStatus = 200;
  var responseMessage = {};

  const url = `https://func-boiler.azurewebsites.net/api/GetLatest?code=${apiKeyGetLatest}`;

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
