import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class UnauthenticatedError extends CustomAPIError {
  statusCode: number;
  constructor(messsage: string) {
    super(messsage);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
