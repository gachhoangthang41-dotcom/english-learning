
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Thư mục nguồn và đích
const SOURCE_DIR = "D:\\taitu_youtube\\video_da_chia";
const DEST_DIR = path.join(process.cwd(), "public/videos/pronunciation");

async function main() {
    console.log("🚀 Bắt đầu import video...");
    console.log(`📂 Nguồn: ${SOURCE_DIR}`);
    console.log(`📂 Đích: ${DEST_DIR}`);

    // 1. Đảm bảo thư mục đích tồn tại
    if (!fs.existsSync(DEST_DIR)) {
        console.log("🛠️ Tạo thư mục đích...");
        fs.mkdirSync(DEST_DIR, { recursive: true });
    }

    // 2. Lấy danh sách thư mục bài học
    let lessonDirs: string[] = [];
    try {
        lessonDirs = fs.readdirSync(SOURCE_DIR).filter(file => {
            return fs.statSync(path.join(SOURCE_DIR, file)).isDirectory();
        });
    } catch (e) {
        console.error("❌ Không đọc được thư mục nguồn:", e);
        return;
    }

    console.log(`📦 Tìm thấy ${lessonDirs.length} thư mục bài học.`);

    // 3. Tạo Level Pre-A1 nếu chưa có
    let level = await prisma.level.findFirst({ where: { code: 'A1' } });
    if (!level) {
        console.log("⚠️ Không tìm thấy level A1, tạo mới...");
        level = await prisma.level.create({
            data: {
                code: 'A1',
                name: 'Beginner',
                order: 1,
                recommendedMinPerLesson: 15
            }
        });
    }

    // 4. Duyệt từng bài và import
    // IMPORT 5 BÀI ĐẦU TIÊN
    const LIMIT = 5;
    let count = 0;

    for (const dirName of lessonDirs) {
        if (count >= LIMIT) break;

        const fullSourcePath = path.join(SOURCE_DIR, dirName);

        // Tìm file video
        const files = fs.readdirSync(fullSourcePath);
        const videoFile = files.find(f => f.toLowerCase().endsWith('.mp4'));

        if (videoFile) {
            const newFileName = `lesson-${count + 1}.mp4`;
            const destPath = path.join(DEST_DIR, newFileName);

            // Copy file
            try {
                if (!fs.existsSync(destPath)) {
                    process.stdout.write(`⏳ Copying ${newFileName}... `);
                    fs.copyFileSync(path.join(fullSourcePath, videoFile), destPath);
                    console.log("✅ Done.");
                } else {
                    console.log(`⏩ ${newFileName} đã tồn tại, bỏ qua copy.`);
                }
            } catch (err) {
                console.error(`❌ Lỗi copy file ${videoFile}:`, err);
                continue;
            }

            // Tạo Lesson trong DB
            try {
                // Kiểm tra xem lesson đã tồn tại chưa để tránh duplicate khi chạy lại
                const existingLesson = await prisma.lesson.findFirst({
                    where: {
                        title: dirName,
                        levelId: level.id
                    }
                });

                if (!existingLesson) {
                    await prisma.lesson.create({
                        data: {
                            levelId: level.id,
                            title: dirName,
                            order: count + 100,
                            isPublished: true,
                            exercises: {
                                create: {
                                    type: 'PRONUNCIATION',
                                    skill: 'SPEAKING',
                                    title: 'Luyện tập video',
                                    order: 1,
                                    isPublished: true,
                                    mediaUrl: `/videos/pronunciation/${newFileName}`,
                                    contentJson: {
                                        sentences: [
                                            { id: 1, text: "Listen carefully to the video." },
                                            { id: 2, text: "Repeat what you hear." },
                                            { id: 3, text: "Practice makes perfect." }
                                        ]
                                    }
                                }
                            }
                        }
                    });
                    console.log(`💾 Đã lưu vào DB: ${dirName}`);
                } else {
                    console.log(`⏩ DB Lesson đã tồn tại: ${dirName}`);
                }

                count++;
            } catch (dbErr) {
                console.error("❌ Lỗi DB:", dbErr);
            }
        }
    }

    console.log(`🎉 Hoàn thành! Đã import ${count} bài học.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
