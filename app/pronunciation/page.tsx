"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Mic, Volume2, ChevronLeft, CheckCircle2, XCircle, Trophy, RotateCcw, Home, PlayCircle } from "lucide-react";
import Link from "next/link";

interface Sentence {
    id: number;
    text: string;
    ipa?: string;
}

interface PronunciationData {
    id: string;
    title: string;
    mediaUrl?: string | null;
    contentJson?: {
        sentences: Sentence[];
    };
}

// Hàm chuẩn hóa text
const clean = (str: string) => {
    return str
        .toLowerCase()
        .replace(/['’]ll/g, " will")
        .replace(/['’]ve/g, " have")
        .replace(/['’]re/g, " are")
        .replace(/['’]m/g, " am")
        .replace(/['’]d/g, " would")
        .replace(/['’]s/g, " is")
        .replace(/n['’]t/g, " not")
        .replace(/gonna/g, "going to")
        .replace(/wanna/g, "want to")
        .replace(/gotta/g, "got to")
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Remove standard punctuation
        .replace(/\s+/g, " ") // Normalize spaces
        .trim();
};

export default function PronunciationPage() {
    const searchParams = useSearchParams();
    const exerciseId = searchParams.get("id") || searchParams.get("exerciseId");

    const [data, setData] = useState<PronunciationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [sentences, setSentences] = useState<Sentence[]>([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
    const [isSupported, setIsSupported] = useState(true);
    const [completedCount, setCompletedCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const recognitionRef = useRef<any>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const targetSentence = sentences[currentIndex]?.text || "";
    const targetIpa = sentences[currentIndex]?.ipa || "";

    // Load Data from API
    useEffect(() => {
        async function loadData() {
            try {
                const apiUrl = exerciseId ? `/api/pronunciation?exerciseId=${exerciseId}` : "/api/pronunciation";
                const res = await fetch(apiUrl);
                const json = await res.json();

                if (json) {
                    setData(json);
                    // Parse contentJson safely
                    const s = (json.contentJson as any)?.sentences || [];
                    setSentences(s.length > 0 ? s : [{ id: 1, text: "Hello world" }]); // Fallback
                }
            } catch (err) {
                console.error("Failed to load lesson:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // Speech Recognition Setup
    useEffect(() => {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setIsSupported(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
            const spokenText = event.results[0][0].transcript;
            setTranscript(spokenText);

            const cleanSpoken = clean(spokenText);
            const cleanTarget = clean(targetSentence);

            if (cleanSpoken === cleanTarget) {
                setStatus("correct");
                setCompletedCount(prev => prev + 1);
            } else {
                setStatus("wrong");
            }
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognitionRef.current = recognition;
    }, [targetSentence]);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setStatus("idle");
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    const speakText = () => {
        const utterance = new SpeechSynthesisUtterance(targetSentence);
        utterance.lang = "en-US";
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    };

    const goNext = () => {
        if (currentIndex === sentences.length - 1) {
            setIsFinished(true);
        } else {
            setCurrentIndex(currentIndex + 1);
            setStatus("idle");
            setTranscript("");
        }
    };

    const goPrev = () => {
        setCurrentIndex(Math.max(0, currentIndex - 1));
        setStatus("idle");
        setTranscript("");
    };

    const restartLesson = () => {
        setCurrentIndex(0);
        setStatus("idle");
        setTranscript("");
        setCompletedCount(0);
        setIsFinished(false);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    if (loading) return <div className="min-h-screen bg-bg flex items-center justify-center text-white">Loading lesson...</div>;

    if (!isSupported) {
        return (
            <div className="min-h-screen bg-bg flex items-center justify-center p-8">
                <div className="text-center space-y-4 text-red-400">
                    <XCircle size={48} className="mx-auto" />
                    <h2 className="text-2xl font-semibold">Trình duyệt không hỗ trợ</h2>
                    <p className="text-muted">Vui lòng sử dụng Chrome hoặc Edge để dùng tính năng này.</p>
                </div>
            </div>
        );
    }

    if (isFinished) {
        const score = Math.round((completedCount / sentences.length) * 100);
        return (
            <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-6 max-w-md">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                        <Trophy size={48} className="text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-fg">🎉 Hoàn thành bài học!</h1>
                    <p className="text-muted text-lg">Bạn đã hoàn thành {sentences.length} câu luyện tập</p>
                    <div className="glass-card rounded-2xl p-6">
                        <div className="text-5xl font-black bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">{score}%</div>
                        <p className="text-muted mt-2">Điểm số của bạn</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button onClick={restartLesson} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all">
                            <RotateCcw size={20} /> Học lại
                        </button>
                        <Link href="/lessons/pre-a1" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition-all">
                            <Home size={20} /> Quay lại
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg flex flex-col p-4 md:p-8">
            <header className="text-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-fg mb-1">{data?.title || "Luyện Phát Âm"}</h1>
                <p className="text-muted text-sm">Câu {currentIndex + 1} / {sentences.length}</p>
                <div className="mt-3 max-w-xs mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / sentences.length) * 100}%` }} />
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center gap-6">

                {/* VIDEO PLAYER */}
                {data?.mediaUrl && (
                    <div className="w-full max-w-2xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 mb-4">
                        <video
                            key={data.mediaUrl}
                            ref={videoRef}
                            src={data.mediaUrl}
                            controls
                            className="w-full h-full object-contain"
                            poster="/placeholder-video.jpg"
                        >
                            Trình duyệt không hỗ trợ thẻ video.
                        </video>
                    </div>
                )}

                {/* SENTENCE */}
                <div onClick={speakText} className="glass-card rounded-2xl p-6 md:p-8 max-w-xl w-full text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20">
                    <Volume2 className="mx-auto mb-4 text-accent w-8 h-8" />
                    <p className="text-lg md:text-xl font-medium text-fg leading-relaxed">{targetSentence}</p>
                    {targetIpa && <p className="text-base text-muted/80 mt-2 font-mono">{targetIpa}</p>}
                    <span className="text-xs text-muted mt-3 block">Nhấn để nghe mẫu</span>
                </div>

                {/* RESULT */}
                <div className="min-h-16 w-full max-w-md">
                    {status === "correct" && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/15 border border-green-500/30 animate-[slideIn_0.3s_ease]">
                            <CheckCircle2 className="text-green-500 shrink-0" />
                            <span className="text-fg">Tuyệt vời! Chính xác! 🎉</span>
                        </div>
                    )}
                    {status === "wrong" && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/15 border border-red-500/30 animate-[slideIn_0.3s_ease]">
                            <XCircle className="text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="text-fg">Chưa đúng lắm, thử lại nhé!</span>
                                <p className="text-sm text-muted mt-1">Bạn nói: "{transcript}"</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* MIC BUTTON */}
                <button onClick={startListening} disabled={isListening} className={`flex flex-col items-center justify-center gap-2 w-28 h-28 md:w-32 md:h-32 rounded-full text-white font-semibold text-sm transition-all duration-300 disabled:cursor-not-allowed ${isListening ? "bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/40 animate-pulse" : status === "correct" ? "bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/40" : "bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/40"}`}>
                    <Mic size={28} />
                    <span>{isListening ? "ĐANG NGHE..." : "ĐỌC NGAY"}</span>
                </button>
            </main>

            <footer className="flex justify-between gap-4 mt-6 max-w-md w-full mx-auto">
                <button onClick={goPrev} disabled={currentIndex === 0} className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold glass-card text-fg hover:bg-white/10 disabled:opacity-50">
                    <ChevronLeft size={20} /> Trước
                </button>
                <button onClick={goNext} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
                    {currentIndex === sentences.length - 1 ? "Hoàn thành" : "Tiếp theo"}
                </button>
            </footer>
        </div>
    );
}
