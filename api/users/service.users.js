import userDal from './dal.users.js';
import bcrypt from 'bcrypt';

const getUsers = async () => {
    try {
        const users = await userDal.getUsers();
        return users;
    } catch (err) {
        console.error('Error reading data:', err);
        throw err;
    }
};

const getUserById = async (id) => {
    try {
        const user = await userDal.getUserById(id);
        return user;
    } catch (err) {
        console.error('Error reading data:', err);
        throw err;
    }
};

const addUser = async (newUser) => {
  try {
      const saltRounds = 10;
      const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
              if (err) {
                  reject('Something went wrong while hashing the password.');
              } else {
                  resolve(hash);
              }
          });
      });

      if (isStrongPassword(newUser.password) && isUserEmailValid(newUser.email)) {
          newUser.password = hashedPassword;
          const addUserRes = userDal.addUser(newUser);
          return addUserRes
      } else {
          console.log('The email or password is not valid.') ;
      }
  } catch (error) {
      console.error(error);
  }
};

const loginUser = async (email, password) => {
  try {
    const logInUser = await userDal.loginUser(email, password);
    return logInUser
  } catch (err) {
    console.error('Error reading data:', err);
  }
};


const userService = {
    getUsers,
    getUserById,
    addUser,
    loginUser
};

export default userService;

  //checks if email valid
function isUserEmailValid(userEmail) {
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(userEmail);
  }
  
  
  // if password is fix 
  function isStrongPassword(password) {
    if (password.length < 8) {
      return false;
    }
  
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    return true;
  }