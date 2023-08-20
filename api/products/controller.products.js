import productsService from './service.products.js';

const getAllProducts = async (req, res) => {
    try {
        console.log("getAllUsers")
        const users = await productsService.getAllProducts();
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

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await productsService.getProductById(id);
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ "message": "user not found" })

        }
    } catch (error) {
        console.error(error)
    }
};

const addNewProduct = async(req, res) => {
    try{
        const newProduct = req.body;
        await productsService.addNewProduct(newProduct)
        res.status(200).json({"message" : "product added succefuly"})
    } catch (error){
        res.status(400).json({"error controller" : error})
    }
}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const update = req.body
        await productsService.updateProduct(id, update)
        res.status(200).json({"massage" : "product updated succefuly !"})
    }catch (err){
        res.status(400).json({"error at controller " : err})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params
        await productsService.deleteProduct(id)
        res.status(200).json({"massage" : "product deleted succefuly !"})
    }catch (err){
        res.status(400).json({"error at controller " : err})
    }
}
const productsController = {
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProduct,
    deleteProduct

};


export default productsController;



