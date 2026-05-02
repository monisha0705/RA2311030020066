const Log = require("./logger");

async function runTest() {
    console.log("🚀 Test started");

    await Log("backend", "info", "handler", "Testing logger");  

    console.log("✅ Test finished");
}

runTest();
