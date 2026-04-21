const fs = require("fs");

let code = fs.readFileSync("app/data/a1-lessons.ts", "utf8");

// Process each lesson's segments and fill in text from transcript
const regex = /(title:\s*"[^"]+",[\s\S]*?transcript:\s*`([\s\S]*?)`,[\s\S]*?segments:\s*\[)([\s\S]*?)(\],)/g;

code = code.replace(regex, (match, beforeSegments, transcript, segmentsStr, afterSegments) => {
    // split transcript by sentences
    const rawSentences = transcript.match(/[^.?!]+[.?!]+(?=\s|$)/g) || [];
    const sentences = rawSentences.map((s) => s.trim()
        .replace(/\\/g, '\\\\')   // escape backslashes first
        .replace(/"/g, '\\"')     // escape double quotes
    );
    
    let i = 0;
    // Replace each segment with text field added/replaced
    const newSegmentsStr = segmentsStr.replace(/\{\s*start:\s*([\d.]+),\s*end:\s*([\d.]+)(?:,\s*text:\s*"[\s\S]*?")?\s*\}/g, (segMatch, start, end) => {
        const text = sentences[i] || "";
        i++;
        return `{ start: ${start}, end: ${end}, text: "${text}" }`;
    });
    
    return beforeSegments + newSegmentsStr + afterSegments;
});

fs.writeFileSync("app/data/a1-lessons.ts", code);
console.log("Done! Updated a1-lessons.ts segments with text");
