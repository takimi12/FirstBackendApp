import Rollbar from "rollbar";

const token = process.env.ROLLBAR_ACCESS_TOKEN;
if (!token) {
  throw new Error("Missing ROLLBAR_ACCESS_TOKEN in .env");
}

export const rollbar = new Rollbar({
  accessToken: token,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    code_version: "1.0.0",
  },
});
