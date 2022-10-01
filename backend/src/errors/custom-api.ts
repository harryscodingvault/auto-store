class CustomAPIError extends Error {
  constructor(messsage: string) {
    super(messsage);
  }
}

export default CustomAPIError;
