import mongoose from 'mongoose';

const mongoDB = async () => {
    try {
        const coon = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to ${coon.connection.host}`);
    } catch (err) {
        console.log(`error ${err}`);
        process.exit(1);
    }
}

export default mongoDB;