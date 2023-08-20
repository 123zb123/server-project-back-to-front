import userService from './service.users.js';

const getAllUsers = async (req, res) => {
    try {
        console.log("getAllUsers")
        const users = await userService.getUsers();
        if (users.length > 0)
            return res.status(200).send(users
                // "message": "Users fetch successfuly!",
                // "data": users
            )
        else {
            return res.status(404).json({ "message": "No Users" })
        }
    } catch (error) {
        console.error(error)
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ "message": "user not found" })

        }
    } catch (error) {
        console.error(error)
    }
};

const addUser = async(req, res) => {
    try{
        const newUser = req.body;
        const addUserRes = await userService.addUser(newUser)
        res.status(200).json({"message : user added successfuly!" : addUserRes})
    } catch (error){
        res.status(400).json({"error controller" : error})
    }
}

const loginUser = async (req, res) => {
    try{
        const {email} = req.body
        const {password} = req.body
        const userLogin = await userService.loginUser(email, password)
        res.status(200).json({"massage" : userLogin})
    }catch (error) {
        res.status(400).json({"massage" : error})
    }
}

const userControler = {
    getAllUsers,
    getUserById,
    addUser,
    loginUser
};


export default userControler;




