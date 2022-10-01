import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class NotFoundError extends CustomAPIError {
  statusCode: number;
  constructor(messsage: string) {
    super(messsage);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
