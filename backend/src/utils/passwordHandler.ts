import bcrypt from "bcrypt";

export const createNewPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

export const comparePassword = async (
  newPassword: string,
  oldPassword: string
) => {
  const isMatch = await bcrypt.compare(newPassword, oldPassword);
  return isMatch;
};
