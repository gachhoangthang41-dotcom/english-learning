"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    Settings,
    Play,
    Pause,
    RotateCcw,
    Mic,
    Volume2,
    Edit3,
    MoreHorizontal,
    Eye
} from "lucide-react";

// Defining the Segment type for the API response
type Segment = {
    id: number;
    startTime: number;
    endTime: number;
    text: string;           // English
    translation: string;    // Vietnamese
};

export default function DictationPage() {
    const params = useParams();
    const router = useRouter();

    // --- STATE ---
    const [isVideoHidden, setIsVideoHidden] = useState(false);
    const [videoSize, setVideoSize] = useState<"Small" | "Medium" | "Large">("Large");

    // Exercise State
    const [currentSegIndex, setCurrentSegIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showResult, setShowResult] = useState(false);
    
    const [blanks, setBlanks] = useState<{ token: string, isBlank: boolean, userValue: string }[]>([]);

    // API State
    const [videoId, setVideoId] = useState<string>("");
    const [segments, setSegments] = useState<Segment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const currentSegment = segments[currentSegIndex];

    // Speech Recognition & Reveal State
    const [isTextRevealed, setIsTextRevealed] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [recognitionError, setRecognitionError] = useState("");

    // --- FETCH DATA ---
    useEffect(() => {
        const fetchDictationData = async () => {
            try {
                const res = await fetch(`/api/learning/${params.levelId}/${params.topicId}/dictation`);
                if (res.ok) {
                    const data = await res.json();
                    setVideoId(data.videoId);
                    setSegments(data.segments);
                } else {
                    console.error("Failed to fetch dictation data:", res.status);
                }
            } catch (err) {
                console.error("Error fetching dictation data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDictationData();
    }, [params.levelId, params.topicId]);

    // --- ACTIONS ---
    useEffect(() => {
        if (!currentSegment) return;

        // Generate fill-in-the-blanks (Cloze) logic
        const tokens = currentSegment.text.match(/\b\w+\b|[^\w]+/g) || [];
        const wordTokens = tokens.map((token, index) => ({ token, index })).filter(t => /^\w+$/.test(t.token));
        
        // Randomly pick ~30% of words to be blanks (at least 1)
        const shuffled = [...wordTokens].sort(() => 0.5 - Math.random());
        const blankCount = Math.max(1, Math.floor(wordTokens.length * 0.3));
        const blankIndices = new Set(shuffled.slice(0, blankCount).map(t => t.index));

        setBlanks(
            tokens.map((token, index) => ({
                token,
                isBlank: blankIndices.has(index),
                userValue: ""
            }))
        );
        setShowResult(false);
        setIsTextRevealed(false); // Reset reveal state on new segment
        setTranscript("");
        setRecognitionError("");
    }, [currentSegIndex, currentSegment?.text]);

    const handleNext = () => {
        if (currentSegIndex < segments.length - 1) {
            setCurrentSegIndex(prev => prev + 1);
            setIsPlaying(false);
        }
    };

    const handlePrev = () => {
        if (currentSegIndex > 0) {
            setCurrentSegIndex(prev => prev - 1);
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        // TODO: Link with YouTube Player API
    };

    const handleBlankChange = (index: number, value: string) => {
        setBlanks(prev => {
            const newBlanks = [...prev];
            newBlanks[index].userValue = value;
            return newBlanks;
        });
    };

    const startRecording = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setRecognitionError("Trình duyệt không hỗ trợ nhận diện giọng nói. Vui lòng dùng Chrome/Edge.");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsRecording(true);
            setRecognitionError("");
            setTranscript("");
        };

        recognition.onresult = (event: any) => {
            const speechResult = event.results[0][0].transcript;
            setTranscript(speechResult);

            if (currentSegment) {
                // Remove punctuation and lowercase for comparison
                const cleanResult = speechResult.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase().trim();
                const cleanTarget = currentSegment.text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase().trim();

                if (cleanResult === cleanTarget || cleanTarget.includes(cleanResult)) {
                    setIsTextRevealed(true); // Correct!
                }
            }
        };

        recognition.onerror = (event: any) => {
            setIsRecording(false);
            setRecognitionError("Lỗi nhận diện âm thanh. Vui lòng thử lại.");
        };

        recognition.onspeechend = () => {
            recognition.stop();
            setIsRecording(false);
        };

        recognition.start();
    };

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center bg-[#0b1120] text-white">Loading exercise...</div>;
    }

    if (!segments || segments.length === 0) {
        return <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[#0b1120] text-white">
            <p>No exercise data found.</p>
            <button onClick={() => router.back()} className="px-4 py-2 bg-blue-600 rounded">Go back</button>
        </div>;
    }

    return (
        <div className="flex flex-col h-screen max-w-[1600px] mx-auto bg-[#0b1120] text-slate-200 overflow-hidden font-sans">
            {/* HEADER */}
            <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-[#0f172a] border-b border-slate-800">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition"
                    >
                        <ChevronLeft size={20} />
                        <span className="text-sm font-semibold">Quay lại</span>
                    </button>

                    <div className="h-4 w-[1px] bg-slate-700" />

                    <div className="flex items-center gap-2 font-bold text-white">
                        <Mic size={18} className="text-blue-400" />
                        <span>Fill-in-the-blanks & Recording</span>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                    <button className="text-slate-400 hover:text-white transition">Trợ giúp</button>
                    {/* Dark/light toggle removed per user request */}
                </div>
            </header>

            {/* MAIN LAYOUT */}
            <main className="flex-1 flex overflow-hidden">
                {/* LEFT PANEL: VIDEO */}
                <section className={`flex-shrink-0 flex flex-col border-r border-slate-800 transition-all duration-300
                    ${videoSize === "Large" ? "w-1/2" : videoSize === "Medium" ? "w-[40%]" : "w-[30%]"} 
                    ${isVideoHidden ? 'hidden' : 'block'}
                `}>
                    <div className="p-4 flex-1 overflow-y-auto">
                        <div className="mb-6">
                            <div className="text-xs text-blue-400/80 uppercase font-bold tracking-wider mb-2">
                                All topics / Level {params.levelId} / LESSON {params.topicId}
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-yellow-400 text-xl">⭐</div>
                                <h1 className="text-2xl font-bold text-white">Introducing Myself</h1>
                                <div className="px-2 py-0.5 text-[10px] font-bold uppercase rounded border border-slate-600 text-slate-400">
                                    Vocab level {params.levelId}
                                </div>
                            </div>
                        </div>

                        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative border border-slate-800">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0"
                            />
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-[#0f172a]">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Size:</span>
                            <select
                                className="bg-[#1e293b] border border-slate-700 text-sm text-white rounded px-2 py-1 outline-none"
                                value={videoSize}
                                onChange={(e) => setVideoSize(e.target.value as any)}
                            >
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                            </select>
                        </div>
                        <button
                            onClick={() => setIsVideoHidden(true)}
                            className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition border border-slate-700"
                        >
                            Hide video
                        </button>
                    </div>
                </section>

                {/* RIGHT PANEL: PRACTICE */}
                <section className={`flex-1 flex flex-col bg-[#0b1120] relative ${isVideoHidden ? 'max-w-4xl mx-auto w-full border-x border-slate-800' : ''}`}>
                    {isVideoHidden && (
                        <button
                            onClick={() => setIsVideoHidden(false)}
                            className="absolute top-4 left-4 z-10 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg shadow-lg"
                        >
                            Show Video
                        </button>
                    )}

                    <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
                        
                        {/* Fill in the blanks Box */}
                        <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                            <div className="flex items-center justify-between p-4 border-b border-slate-800/50">
                                <div className="flex items-center gap-4">
                                    <button onClick={togglePlay} className="size-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition shadow-lg shadow-blue-500/20">
                                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                    </button>
                                    <span className="text-slate-400 font-medium text-sm">
                                        — Luyện đục lỗ (Fill in the blanks) — {currentSegIndex + 1} / {segments.length}
                                    </span>
                                </div>
                                <button className="text-slate-500 hover:text-white transition">
                                    <Settings size={18} />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 flex flex-wrap items-center text-xl md:text-2xl text-white leading-[2.5] gap-x-1 gap-y-2">
                                {blanks.map((b, i) => (
                                    b.isBlank ? (
                                        <input
                                            key={i}
                                            type="text"
                                            value={b.userValue}
                                            onChange={(e) => handleBlankChange(i, e.target.value)}
                                            style={{ width: `${Math.max(4, b.token.length + 1)}ch` }}
                                            className={`mx-1 px-1 text-center bg-transparent border-b-2 outline-none transition-colors duration-200 
                                                ${showResult 
                                                    ? (b.userValue.toLowerCase() === b.token.toLowerCase() 
                                                        ? 'border-emerald-500 text-emerald-400' 
                                                        : 'border-rose-500 text-rose-400') 
                                                    : 'border-slate-500 hover:border-blue-400 focus:border-blue-400 text-blue-300'
                                                }`}
                                            spellCheck={false}
                                        />
                                    ) : (
                                        <span key={i} className="whitespace-pre-wrap leading-none mt-1">{b.token}</span>
                                    )
                                ))}
                            </div>

                            <div className="p-4 flex items-center justify-between border-t border-slate-800/50">
                                <button 
                                    onClick={() => setShowResult(true)}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition"
                                >
                                    Kiểm tra
                                </button>
                                <div className="flex items-center gap-3">
                                    <button className="p-2.5 flex items-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition">
                                        <Volume2 size={18} />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition ml-2"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Translation Box */}
                        <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-sm">
                            <p className="text-white font-medium text-[15px] mb-4">
                                Bản dịch tiếng Việt cho: {currentSegment.text}
                            </p>
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <span>Translated by a user</span>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-1 hover:text-slate-300 transition bg-slate-800/50 px-3 py-1.5 rounded">
                                        <Edit3 size={12} /> Edit
                                    </button>
                                    <button className="hover:text-slate-300 transition bg-slate-800/50 px-2 py-1.5 rounded">
                                        <MoreHorizontal size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Pronunciation / Shadowing Box */}
                        <div className="bg-[#1e293b]/40 border border-[#1e293b] rounded-xl p-6 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />

                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                                <Mic size={14} className="text-blue-400" />
                                <span>PRONUNCIATION & RECORDING</span>
                            </div>

                            <div className="min-h-[80px]">
                                {isTextRevealed ? (
                                    <p className="text-xl md:text-2xl font-bold text-emerald-400 mb-2 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        {currentSegment?.text}
                                    </p>
                                ) : (
                                    <p className="text-xl md:text-2xl font-bold text-transparent bg-slate-800 bg-clip-text mb-2 leading-relaxed select-none relative w-fit rounded transition-all duration-300">
                                        <span className="absolute inset-0 bg-slate-800/80 backdrop-blur-md rounded pointer-events-none flex items-center justify-center">
                                            <span className="text-sm text-slate-400 font-semibold tracking-wide drop-shadow-md flex items-center gap-2">
                                                <Mic size={14} /> Hãy ghi âm để xem câu trả lời
                                            </span>
                                        </span>
                                        {currentSegment?.text}
                                    </p>
                                )}

                                {transcript && !isTextRevealed && (
                                     <p className="text-sm text-rose-400 mt-2">
                                         Bạn đã đọc: "{transcript}". Chưa khớp, hãy thử lại!
                                     </p>
                                )}
                                {recognitionError && (
                                    <p className="text-sm text-rose-400 mt-2">{recognitionError}</p>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 mt-6">
                                <button className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-sm font-bold flex items-center gap-2 transition">
                                    <Volume2 size={16} /> Nghe mẫu
                                </button>
                                <button 
                                    onClick={startRecording}
                                    disabled={isRecording}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition border
                                        ${isRecording 
                                            ? 'bg-rose-500/30 border-rose-500/50 text-rose-300 animate-pulse' 
                                            : 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/20 text-rose-400'
                                        }
                                    `}
                                >
                                    <Mic size={16} /> {isRecording ? "Đang thu âm..." : "Thu âm của bạn"}
                                </button>
                                
                                {!isTextRevealed && (
                                    <button 
                                        onClick={() => setIsTextRevealed(true)}
                                        className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-slate-300 text-sm font-bold flex items-center gap-2 transition ml-auto"
                                    >
                                        <Eye size={16} /> Hiện câu trả lời
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}
