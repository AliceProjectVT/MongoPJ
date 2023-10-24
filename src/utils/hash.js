// hash.js
import bcrypt from 'bcrypt';

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isCorrectPassword = (hashedPassword, password) => bcrypt.compareSync(password, hashedPassword);

export { createHash, isCorrectPassword };
