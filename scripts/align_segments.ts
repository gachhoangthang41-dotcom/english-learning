import fs from "fs";

let code = fs.readFileSync("app/data/a1-lessons.ts", "utf8");

// We need to parse transcript and apply to segments
// Find every block of LessonContent
const regex = /(title:\s*"[^"]+",[\s\S]*?transcript:\s*`([\s\S]*?)`,[\s\S]*?segments:\s*\[)([\s\S]*?)(\],)/g;

code = code.replace(regex, (match, beforeSegments, transcript, segmentsStr, afterSegments) => {
    // split transcript by sentences
    const sentences = transcript.match(/[^.?!]+[.?!]+(?=\s|$)/g)?.map((s: string) => s.trim()) || [];
    
    let i = 0;
    // Replace each { start: x, end: y } with text added
    const newSegmentsStr = segmentsStr.replace(/\{\s*start:\s*([\d.]+),\s*end:\s*([\d.]+)\s*(?:,\s*text:\s*"[^"]*")?\s*\}/g, (segMatch: string, start: string, end: string) => {
        const text = sentences[i] ? sentences[i].replace(/"/g, '\\"') : "";
        i++;
        return `{ start: ${start}, end: ${end}, text: "${text}" }`;
    });
    
    return beforeSegments + newSegmentsStr + afterSegments;
});

fs.writeFileSync("app/data/a1-lessons.ts", code);
console.log("Updated a1-lessons.ts segments with text");
