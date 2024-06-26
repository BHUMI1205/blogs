import mongoose from 'mongoose'
import bcrypt from "bcrypt";
import { user } from '../model/user.js'

async function seedAdmin() {
    await mongoose.connect('mongodb://127.0.0.1/Blog');
    // await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await user.findOne({ role: "superAdmin" });

    if (!existingAdmin) {
        const adminCredentials = {
            fname: "Admin User",
            lname: "Admin User",
            username: "Admin User",
            email: "admin@gmail.com",
            password: "aaaaaa",
            role: "superAdmin",
        };

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(adminCredentials.password, salt);
        // adminCredentials.password = hashedPassword;

        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(adminCredentials.password, salt, function (err, hash) {
                if (err) return next(err);
                adminCredentials.password = hash;
            })
        }) 
    await user.create(adminCredentials);

    console.log("Admin user created successfully");
} else {
    console.log("Admin user already exists");
} 

}

export { seedAdmin }
