const axios = require("axios");

const AUTH_API = "http://20.207.122.201/evaluation-service/auth";

async function getToken() {
    try {
        const response = await axios.post(AUTH_API, {
            email: "mg6375@srmist.edu.in",
            name: "monisha g",
            rollNo: "RA2311030020066",
            accessCode: "QkbpxH",
            clientID: "358bcd5f-11b9-4178-aae8-7ace4cd31a83",
            clientSecret: "sQWZpvvdhPBKNGdq"
        });

        console.log("✅ Token:");
        console.log(response.data);

    } catch (error) {
        console.error("❌ Auth failed:", error.response?.data || error.message);
    }
}

getToken();