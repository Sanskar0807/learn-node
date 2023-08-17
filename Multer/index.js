const express = require('express');
const port = 3001;
const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './image')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

app.use(express.static(__dirname + '/image'));


app.post('/image',upload.single('upload') ,(req, res) => {
    try {
        console.log("rom rom bhai");
        res.send("image is uploaded sucessfully");
    } catch (error) {
        console.log(error)
    }
    
})

app.listen(port, () => {
    console.log("your app is listen sucessfully");
});