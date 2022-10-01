import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class BadRequestError extends CustomAPIError {
  statusCode: number;
  constructor(messsage: string) {
    super(messsage);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
