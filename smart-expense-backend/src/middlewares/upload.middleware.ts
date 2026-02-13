import multer from "multer";

// Store file in memory (not disk)
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === "text/csv") {
            cb(null, true);
        } else {
            cb(new Error("Only CSV files are allowed"));
        }
    },
});
