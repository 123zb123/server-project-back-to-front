
import fs from 'fs';
import { promisify } from 'util';
import bcrypt from 'bcrypt';

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

const getUsers = async (req, res) => {
    try {
        const dataAsinc = await readFileAsync('./data.json', 'utf8');
        const jsonData = JSON.parse(dataAsinc);
        const userStrings = jsonData.map(user => `name: ${user.name}, email: ${user.email}`);
        const responseString = userStrings.join('\n');

        return responseString; // Send the response to the client                                        
    } catch (err) {
        console.error('Error reading data:', err);
        res.send('Error reading data');
    }
};

const getUserById = async (id) => {
    try {
        const dataAsinc = await readFileAsync('./data.json', 'utf8');
        const jsonData = JSON.parse(dataAsinc);
        const user = jsonData.find(user => id === String(user.id));
        return user;
    } catch (err) {
        console.error('Error reading data:', err);
        res.send('Error reading data');
    }
};

const addUser = async (newUser) => {
    try {
        const dataAsync = await readFileAsync('./usersData.json', 'utf8');
        const jsonData = JSON.parse(dataAsync);
        jsonData.push(newUser);
        
        const updatedData = JSON.stringify(jsonData);
        await writeFileAsync('./usersData.json', updatedData);
        
        return('New user added:', newUser);
    } catch (err) {
        console.error('Error:', err);
    }
}

const loginUser = async (email, password) => {
    try {
        const dataAsync = await readFileAsync('./usersData.json', 'utf8');
        const jsonData = JSON.parse(dataAsync);

        for (const element of jsonData) {
            if (element.email === email && await bcrypt.compare(password, element.password)) {
                return "The user logged in successfully";
            }
        }

        return "The email or password is incorrect, please try again...";
    } catch (err) {
        console.error('Error:', err);
        return "An error occurred";
    }
}




const userDal = {
    getUsers,
    getUserById,
    addUser,
    loginUser
};

export default userDal;




