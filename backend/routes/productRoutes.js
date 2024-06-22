import express from "express";
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct, createReviews, getTopMaterials, createQuestion, getPaidProduct,} from "../Controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


const router = express.Router();
// route to create a new product and
// make a get request for all pro ducts 
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopMaterials);

// make a get request, put and delete request for a single  product
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

router.route('/exam/:id').get(protect, getPaidProduct);
router.route("/:id/questions").post(protect, admin, createQuestion);
router.route("/:id/reviews").post(protect, createReviews);
export default router;
