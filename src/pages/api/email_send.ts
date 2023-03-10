import type { NextApiRequest, NextApiResponse } from "next";

export default async function userCheck(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.SENDINBLUE_KEY as string;
  const apiUrl = "https://api.sendinblue.com/v3/smtp/email";

  const sendinblueData = {
    sender: {
      name: "Mike",
      email: "michael@freno.me",
    },
    to: [
      {
        email: "bob@sycamorehillnj.com",
      },
    ],
    htmlContent: `<html><head></head><body><div>Request Name: ${
      req.query.name as string
    }</div><div>Request Email: ${
      req.query.email as string
    }</div><div>Request Message: ${
      req.query.message as string
    }</div></body></html>`,
    subject: `Website Contact Request`,
  };
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(sendinblueData),
  });
  res.status(response.status).json(await response.json());
}
