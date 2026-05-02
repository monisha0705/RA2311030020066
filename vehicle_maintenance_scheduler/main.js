const { getDepots, getVehicles } = require("./api");
const { optimizeTasks } = require("./scheduler");

async function run() {
    try {
        console.log("Starting scheduler...\n");

        const depots = await getDepots();
        const tasks = await getVehicles();

        depots.forEach((depot) => {
            const result = optimizeTasks(tasks, depot.MechanicHours);

            console.log(`Depot ${depot.ID}`);
            console.log(`Hours: ${depot.MechanicHours}`);
            console.log(`Max Impact: ${result.maxImpact}`);

            console.log("Selected Tasks:");
            result.selectedTasks.forEach((t) => {
                console.log(
                    `- ${t.TaskID} (Dur: ${t.Duration}, Impact: ${t.Impact})`
                );
            });

            console.log("----------------------\n");
        });

    } catch (err) {
        console.error("Error:", err.message);
    }
}

run();
