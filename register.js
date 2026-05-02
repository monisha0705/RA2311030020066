const axios = require("axios");

const REGISTER_API = "http://20.207.122.201/evaluation-service/register";

async function register() {
    try {
        const response = await axios.post(REGISTER_API, {
            email: "mg6375@srmist.edu.in",
            name: "Monisha G",
            mobileNo: "8639250143",
            githubUsername: "monisha0705",
            rollNo: "RA2311030020066",
            accessCode: "QkbpxH"   // from email
        });

        console.log("✅ Registration Success:");
        console.log(response.data);

    } catch (error) {
        console.error("❌ Registration failed:", error.response?.data || error.message);
    }
}

register();