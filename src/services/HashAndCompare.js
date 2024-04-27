import bcrypt from "bcrypt";
export const hashText = (plaintext, saltRound = process.env.SALT_ROUND) => {
  const hashResult = bcrypt.hashSync(plaintext, parseInt(saltRound));
  return hashResult;
};
export const comparePass = (password, hashValue) => {
  const comValue = bcrypt.compareSync(password, hashValue);
  return comValue;
};
