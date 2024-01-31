const os = require("os");

// 1KB = 1024 bytes
// 1MB = 1024 1KB
// 1GB = 1024 MB
console.log("Free memory", os.freemem() / 1024 / 1024 / 1024);
console.log("Total memory", os.totalmem() / 1024 / 1024 / 1024);
console.log("Version", os.version());
console.log("CPU", os.cpus());
