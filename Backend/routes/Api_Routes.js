const express=require('express');
const router=express.Router();

//uploading multer code 
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
//end

const {loginUser,registerUser}=require('../controllers/AuthController');
const { addProduct, getProducts, deleteProduct, updateProduct, getProductById, getSearchProducts } = require('../controllers/ProductController');
router.post("/api/v1/auth",loginUser);
router.post("/api/v1/signup",registerUser);

//produts 
router.post("/api/v1/products",upload.single('attach'),addProduct);
router.get("/api/v1/products",getProducts);
router.get("/api/v1/searchproducts/:ser",getSearchProducts);
router.delete("/api/v1/products/:id",deleteProduct);
router.put("/api/v1/products/:id",updateProduct);
router.get("/api/v1/getproductbyid/:id",getProductById);
module.exports=router;
