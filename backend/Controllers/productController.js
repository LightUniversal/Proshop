import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// To get all the products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword }); // returns total number of products in the product collection

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});


// Get paid product
const getPaidProduct = asyncHandler(async (req, res) => {
  const paidProduct = await Product.findById(req.params.id);

  if(paidProduct) {
    res.status(200).json({paidProduct})
  } else {
    res.status(400).json({message: "Product not found!"});
  }
})
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Product Name",
    user: req.user._id,
    price: 0,
    image: "/images/physics.jpg",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Product Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found.....");
  }
  // const product = products.find(p => p._id === id)
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    courseOutline,
    countInStock,
    image,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.courseOutline = courseOutline;
    product.image = image;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc   Delete a product
// @route  DELETE /api/product/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({
      _id: product._id,
    });
    res.status(200).json({
      message: "Product deleted",
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc   Create question for a product
// @route  POST /api/product/:id/reviews
// @access Private/Admin
const createQuestion = asyncHandler(async (req, res) => {
  const { question, solution, topic, options, answer } = req.body;
  const course = await Product.findById(req.params.id);
  if (course) {
    const question_ = {
      question,
      topic,
      solution,
      answer,
      options,
    };
    course.questions.push(question_);
    await course.save();
    res.status(201).json({
      message: "Question Added",
    });
  } else {
    res.status(404);
    throw new Error("Resource not found!");
  }
});

// @desc   Create a review for a product
// @route  POST /api/product/:id/reviews
// @access Private
const createReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You have a review already for this product");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      message: "Review Added",
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc  Get top rated products
// @route GET /api/products/top
// @ccess Public
const getTopMaterials = asyncHandler(async (req, res) => {
  const materials = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(materials);
});

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createReviews,
  getTopMaterials,
  createQuestion,
  getPaidProduct
};
