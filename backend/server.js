import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoDB from './config/db.js';
import Blog from './models/blogsModel.js';
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js'
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
const PORT = process.env.PORT || 5000;
const app = express();

mongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use('/blogs', blogRoutes)
app.use('/user', userRoutes);
app.use('/uploads', uploadRoutes)

app.get("/", async (req, res) => {
    const blogs = await Blog.find({})
    res.send(blogs)
})


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))     //serving   uploads/  folder as the static folder

if (process.env.NODE_ENV === 'production') {
    //set static folder

    app.use(express.static(path.join(__dirname, '/frontend/build')))

    // any route that is not api will be redirected to indesx.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '/frontend/build', 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.send("api successful...");
    });
}

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`app is listening to port... ${PORT}`)
})