
import fs from 'fs';
import path from 'path';

const SOURCE_DIR = "D:\\taitu_youtube\\video_da_chia";

console.log("📂 Checking directory:", SOURCE_DIR);

try {
    if (fs.existsSync(SOURCE_DIR)) {
        console.log("✅ Directory exists!");
        const files = fs.readdirSync(SOURCE_DIR);
        console.log(`📦 Found ${files.length} items.`);
        console.log("First 3 items:", files.slice(0, 3));
    } else {
        console.error("❌ Directory NOT FOUND!");
    }
} catch (err) {
    console.error("❌ Error accessing directory:", err);
}
