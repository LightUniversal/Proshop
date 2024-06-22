import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

// where our image goes
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname} - ${Date.now()}${path.extname(file.originalname)}`);
    },
    fileFilter(req, file, cb) {
        checkFileType(file, cb);
    }
});
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    console.log(file.mimetype);
    const mimetype = filetypes.test(file.mimetype);
    if(extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Images only");
    }
}

// upload images
const upload = multer({
    storage,
});

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: "Image uploaded",
        image: `/${req.file.path}`
    });
});

router.post('/profileImage', upload.single('image'), (req, res) => {
    res.send({
        message: "Profile Image added successfully",
        image: `/${req.file.path}`
    });
})
export default router;