const axios = require("axios");

const LOG_API = "http://20.207.122.201/evaluation-service/logs";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtZzYzNzVAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNTAxMSwiaWF0IjoxNzc3NzA0MTExLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMzRhMGIzMjgtOTFkMi00ZWQyLTk5ZTMtMzg5YjM2NDZiY2M1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibW9uaXNoYSBnIiwic3ViIjoiMzU4YmNkNWYtMTFiOS00MTc4LWFhZTgtN2FjZTRjZDMxYTgzIn0sImVtYWlsIjoibWc2Mzc1QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoibW9uaXNoYSBnIiwicm9sbE5vIjoicmEyMzExMDMwMDIwMDY2IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiMzU4YmNkNWYtMTFiOS00MTc4LWFhZTgtN2FjZTRjZDMxYTgzIiwiY2xpZW50U2VjcmV0Ijoic1FXWnB2dmRoUEJLTkdkcSJ9.BgnPDu7DXWNYYfc-CnrPjlz72MNolRvAljmecSobK_8";

async function Log(stack, level, pkg, message) {
    try {
        const logData = {
            stack: stack.toLowerCase(),
            level: level.toLowerCase(),
            package: pkg.toLowerCase(),
            message
        };

        const response = await axios.post(LOG_API, logData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            }
        });

        console.log("✅ Log sent:", response.data);

    } catch (error) {
        console.error("❌ Logging failed:", error.response?.data || error.message);
    }
}

module.exports = Log;