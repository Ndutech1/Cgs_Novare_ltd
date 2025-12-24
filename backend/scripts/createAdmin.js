require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../src/models/Admin");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");

    const existingAdmin = await Admin.findOne({
      email: "dubemben0@gmail.com"
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new Admin({
      email: "dubemben@gmail.com",
      password: "08120249300@Ben"
    });

    await admin.save();
    console.log("✅ Admin account created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
})();
