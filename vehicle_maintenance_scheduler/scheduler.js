function optimizeTasks(tasks, maxHours) {
    const n = tasks.length;

    const dp = Array.from({ length: n + 1 }, () =>
        Array(maxHours + 1).fill(0)
    );

    for (let i = 1; i <= n; i++) {
        const { Duration, Impact } = tasks[i - 1];

        for (let h = 0; h <= maxHours; h++) {
            if (Duration <= h) {
                dp[i][h] = Math.max(
                    Impact + dp[i - 1][h - Duration],
                    dp[i - 1][h]
                );
            } else {
                dp[i][h] = dp[i - 1][h];
            }
        }
    }

    let selected = [];
    let h = maxHours;

    for (let i = n; i > 0; i--) {
        if (dp[i][h] !== dp[i - 1][h]) {
            selected.push(tasks[i - 1]);
            h -= tasks[i - 1].Duration;
        }
    }

    return {
        maxImpact: dp[n][maxHours],
        selectedTasks: selected.reverse()
    };
}

module.exports = { optimizeTasks };
