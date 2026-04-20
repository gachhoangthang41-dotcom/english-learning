"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    Settings,
    Play,
    Pause,
    Mic,
    Volume2,
    Edit3,
    MoreHorizontal,
    Eye
} from "lucide-react";
import { useLanguage } from '@/views/components/language-provider';
import { LESSONS_BY_LEVEL } from '@/models/data/a1-lessons';

// Defining the Segment type for the API response
type Segment = {
    id: number;
    startTime: number;
    endTime: number;
    text: string;           // English
    translation: string;    // Vietnamese
};

type VideoSize = "Small" | "Medium" | "Large";

type SpeechRecognitionResultEvent = {
    results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRecognitionErrorEvent = {
    error?: string;
};

type BrowserSpeechRecognition = {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    onstart: (() => void) | null;
    onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onspeechend: (() => void) | null;
    start: () => void;
    stop: () => void;
};

type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

const SEGMENT_EPSILON = 0.05;

export default function DictationPage() {
    const params = useParams();
    const router = useRouter();
    const { language } = useLanguage();
    const isEnglish = language === "en";
    const copy = isEnglish
        ? {
            loading: "Loading exercise...",
            noData: "No exercise data found.",
            goBack: "Go back",
            back: "Back",
            help: "Help",
            showVideo: "Show video",
            hideVideo: "Hide video",
            unsupportedBrowser: "Your browser does not support speech recognition. Please use Chrome or Edge.",
            recognitionError: "Speech recognition failed. Please try again.",
            unsupportedVideo: "Your browser does not support the video tag.",
            size: "Size:",
            allTopics: "All topics",
            lesson: "Lesson",
            vocabLevel: "Vocab level",
            fillPractice: "Fill-in-the-blanks practice",
            check: "Check",
            replaySentence: "Replay this sentence",
            next: "Next",
            translationLabel: "Vietnamese translation for:",
            pronunciationTitle: "Pronunciation & Recording",
            revealHint: "Record your voice to reveal the answer",
            youSaid: "You said:",
            notMatch: "That does not match yet. Try again.",
            listenSample: "Listen to sample",
            recording: "Recording...",
            recordVoice: "Record your voice",
            revealAnswer: "Show answer",
            translatedByUser: "Translated by a user",
            unitTitle: `Unit ${params.topicId}`,
            defaultTitle: `Unit ${params.topicId}`,
        }
        : {
            loading: "Đang tải bài tập...",
            noData: "Không tìm thấy dữ liệu bài tập.",
            goBack: "Quay lại",
            back: "Quay lại",
            help: "Trợ giúp",
            showVideo: "Hiện video",
            hideVideo: "Ẩn video",
            unsupportedBrowser: "Trình duyệt không hỗ trợ nhận diện giọng nói. Vui lòng dùng Chrome/Edge.",
            recognitionError: "Lỗi nhận diện âm thanh. Vui lòng thử lại.",
            unsupportedVideo: "Trình duyệt của bạn không hỗ trợ thẻ video.",
            size: "Kích thước:",
            allTopics: "Tất cả chủ đề",
            lesson: "Bài",
            vocabLevel: "Mức từ vựng",
            fillPractice: "Luyện đục lỗ",
            check: "Kiểm tra",
            replaySentence: "Nghe lại câu này",
            next: "Tiếp",
            translationLabel: "Bản dịch tiếng Việt cho:",
            pronunciationTitle: "Phát âm & Ghi âm",
            revealHint: "Hãy ghi âm để xem câu trả lời",
            youSaid: "Bạn đã đọc:",
            notMatch: "Chưa khớp, hãy thử lại.",
            listenSample: "Nghe mẫu",
            recording: "Đang thu âm...",
            recordVoice: "Thu âm của bạn",
            revealAnswer: "Hiện câu trả lời",
            translatedByUser: "Dịch bởi người dùng",
            unitTitle: `Bài ${params.topicId}`,
            defaultTitle: `Bài ${params.topicId}`,
        };

    const levelIdStr = String(params.levelId).toLowerCase();
    const topicIdStr = String(params.topicId);
    const levelData = LESSONS_BY_LEVEL[levelIdStr];
    const lessonData = levelData ? levelData[topicIdStr] : null;

    // Localized Titles Mapper
    const titleViMap: Record<string, string> = {
        "Introducing Myself": "Giới thiệu bản thân",
        "My Family": "Gia đình của tôi",
        "My Daily Routine": "Thói quen hàng ngày",
        "My Home": "Ngôi nhà của tôi",
        "My Pet": "Thú cưng của tôi",
        "The weather today": "Thời tiết hôm nay",
        "My School": "Trường học của tôi",
        "Shopping": "Mua sắm",
        "What's in my bag/backpack": "Có gì trong balo của tôi",
        "Daily Routine": "Thói quen hàng ngày",
        "Travel & Transport": "Du lịch & Di chuyển"
    };

    const englishTitle = lessonData?.title || `Unit ${params.topicId}`;
    const lessonTitle = isEnglish ? englishTitle : (lessonData?.title ? (titleViMap[lessonData.title] || lessonData.title) : copy.defaultTitle);
    const lessonVideoSrc = lessonData?.videoSrc || "";

    // --- STATE ---
    const [isVideoHidden, setIsVideoHidden] = useState(false);
    const [videoSize, setVideoSize] = useState<VideoSize>("Large");
    const videoRef = useRef<HTMLVideoElement>(null);
    const playbackStopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Exercise State
    const [currentSegIndex, setCurrentSegIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showResult, setShowResult] = useState(false);
    
    const [blanks, setBlanks] = useState<{ token: string, isBlank: boolean, userValue: string }[]>([]);

    // API State
    const [videoId, setVideoId] = useState<string>("");
    const [segments, setSegments] = useState<Segment[]>([]);
    const [levelCode, setLevelCode] = useState<string>(typeof params.levelId === 'string' ? params.levelId.toUpperCase() : "A1");
    const [isLoading, setIsLoading] = useState(true);
    const resolvedVideoSrc = videoId || lessonVideoSrc || `/videos/${params.levelId}/Lesson ${params.topicId}.mp4`;

    const currentSegment = segments[currentSegIndex];
    const activeSegmentRef = useRef(currentSegIndex);

    useEffect(() => {
        activeSegmentRef.current = currentSegIndex;
    }, [currentSegIndex]);

    const clearPlaybackStopTimer = () => {
        if (playbackStopTimeoutRef.current) {
            clearTimeout(playbackStopTimeoutRef.current);
            playbackStopTimeoutRef.current = null;
        }
    };

    const pauseAtSegmentEnd = (segmentToStop = segments[activeSegmentRef.current]) => {
        const video = videoRef.current;
        if (!video || !segmentToStop) return;

        video.pause();
        video.currentTime = Math.min(
            segmentToStop.endTime,
            Math.max(segmentToStop.startTime + SEGMENT_EPSILON, segmentToStop.endTime - SEGMENT_EPSILON)
        );
    };

    const schedulePlaybackStop = (segmentToStop = segments[activeSegmentRef.current]) => {
        const video = videoRef.current;
        if (!video || !segmentToStop) return;

        clearPlaybackStopTimer();

        const remainingMs = Math.max(0, (segmentToStop.endTime - video.currentTime - SEGMENT_EPSILON) * 1000);
        playbackStopTimeoutRef.current = setTimeout(() => {
            pauseAtSegmentEnd(segmentToStop);
        }, remainingMs);
    };

    const playCurrentSegment = (fromStart = false) => {
        const video = videoRef.current;
        const segmentToPlay = segments[activeSegmentRef.current];
        if (!video || !segmentToPlay) return;

        clearPlaybackStopTimer();
        video.pause();

        if (
            fromStart ||
            video.currentTime < segmentToPlay.startTime ||
            video.currentTime >= segmentToPlay.endTime - SEGMENT_EPSILON
        ) {
            video.currentTime = segmentToPlay.startTime + SEGMENT_EPSILON;
        }

        video.play();
        schedulePlaybackStop(segmentToPlay);
    };

    // Speech Recognition & Reveal State
    const [isTextRevealed, setIsTextRevealed] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [recognitionError, setRecognitionError] = useState("");
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const [pronunciationResult, setPronunciationResult] = useState<any | null>(null);

    // --- FETCH DATA ---
    useEffect(() => {
        const fetchDictationData = async () => {
            try {
                const res = await fetch(`/api/learning/${params.levelId}/${params.topicId}/dictation`);
                if (res.ok) {
                    const data = await res.json();
                    setVideoId(data.videoId);
                    setSegments(data.segments);
                    if (data.levelCode) setLevelCode(data.levelCode);
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
    }, [currentSegIndex, currentSegment]);

    const handleNext = () => {
        if (currentSegIndex < segments.length - 1) {
            const nextIndex = currentSegIndex + 1;
            setCurrentSegIndex(nextIndex);
            clearPlaybackStopTimer();
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = segments[nextIndex].startTime + SEGMENT_EPSILON;
            }
        }
    };

    const togglePlay = () => {
        if (!videoRef.current || !currentSegment) return;
        if (!videoRef.current.paused) {
            clearPlaybackStopTimer();
            videoRef.current.pause();
        } else {
            playCurrentSegment(true);
        }
    };

    const replayCurrentSegment = () => {
        if (!videoRef.current || !currentSegment) return;
        playCurrentSegment(true);
    };

    const alignPlaybackToCurrentSegment = () => {
        if (!videoRef.current || !currentSegment) return;

        const currentTime = videoRef.current.currentTime;
        const isOutsideSegment =
            currentTime < currentSegment.startTime ||
            currentTime >= currentSegment.endTime - SEGMENT_EPSILON;

        if (isOutsideSegment) {
            videoRef.current.currentTime = currentSegment.startTime + SEGMENT_EPSILON;
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current || segments.length === 0) return;

        const activeSegment = segments[activeSegmentRef.current];
        if (!activeSegment) return;

        // Pause exactly at the end of the current practice sentence so the user
        // has time to fill the blanks before moving on.
        if (!videoRef.current.paused && videoRef.current.currentTime >= activeSegment.endTime - SEGMENT_EPSILON) {
            pauseAtSegmentEnd(activeSegment);
        }
    };

    const keepVideoInsideCurrentSegment = () => {
        if (!videoRef.current || !currentSegment) return;

        const currentTime = videoRef.current.currentTime;
        if (currentTime < currentSegment.startTime || currentTime > currentSegment.endTime) {
            videoRef.current.currentTime = currentSegment.startTime + SEGMENT_EPSILON;
        }

        if (!videoRef.current.paused) {
            schedulePlaybackStop(currentSegment);
        }
    };

    useEffect(() => {
        return () => {
            clearPlaybackStopTimer();
        };
    }, []);

    const handleBlankChange = (index: number, value: string) => {
        setBlanks(prev => {
            const newBlanks = [...prev];
            newBlanks[index].userValue = value;
            return newBlanks;
        });
    };

    function blobToDataUrl(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    const startSpeechRecognition = () => {
        const windowWithSpeech = window as Window & {
            SpeechRecognition?: BrowserSpeechRecognitionConstructor;
            webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor;
        };
        const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setRecognitionError(copy.unsupportedBrowser);
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
            setPronunciationResult(null);
        };

        recognition.onresult = (event: SpeechRecognitionResultEvent) => {
            const speechResult = event.results[0][0].transcript;
            setTranscript(speechResult);

            if (currentSegment) {
                const cleanResult = speechResult.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase().trim();
                const cleanTarget = currentSegment.text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase().trim();

                if (cleanResult === cleanTarget || cleanTarget.includes(cleanResult)) {
                    setIsTextRevealed(true);
                }
            }
        };

        recognition.onerror = () => {
            setIsRecording(false);
            setRecognitionError(copy.recognitionError);
        };

        recognition.onspeechend = () => {
            recognition.stop();
            setIsRecording(false);
        };

        recognition.start();
    };

    const startRecording = async () => {
        setRecognitionError("");
        setPronunciationResult(null);

        // If already recording via MediaRecorder, stop it
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            return;
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaStreamRef.current = stream;

                const defaultMime = 'audio/webm';
                let mime = defaultMime;
                try {
                    if (typeof (MediaRecorder as any).isTypeSupported === 'function') {
                        const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/wav'];
                        for (const c of candidates) {
                            if ((MediaRecorder as any).isTypeSupported(c)) {
                                mime = c;
                                break;
                            }
                        }
                    }
                } catch (e) {
                    // ignore
                }

                const options: any = {};
                if ((MediaRecorder as any).isTypeSupported && (MediaRecorder as any).isTypeSupported(mime)) options.mimeType = mime;

                const recorder = new MediaRecorder(stream, options);
                const chunks: Blob[] = [];

                recorder.ondataavailable = (ev: BlobEvent) => {
                    if (ev.data && ev.data.size) chunks.push(ev.data);
                };

                recorder.onstart = () => {
                    setIsRecording(true);
                    setTranscript("");
                    setRecognitionError("");
                    setPronunciationResult(null);
                };

                recorder.onstop = async () => {
                    setIsRecording(false);
                    try {
                        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
                        const dataUrl = await blobToDataUrl(blob);
                        const base64 = dataUrl.split(',')[1] || '';

                        // send to server for assessment
                        const payload = {
                            audioBase64: base64,
                            mimeType: blob.type || 'audio/webm',
                            filename: 'record.webm',
                            reference: currentSegment?.text || ''
                        };

                        const res = await fetch('/api/pronunciation/check', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                            cache: 'no-store',
                        });

                        const data = await res.json().catch(() => null);
                        if (res.ok && data?.status === 'success') {
                            setPronunciationResult(data.result || data.data || data);
                            // if upstream provides score, reveal text on high score
                            const score = Number(data.result?.score ?? data.result?.confidence ?? data?.data?.score ?? NaN);
                            if (!Number.isNaN(score) && score >= 0.75) {
                                setIsTextRevealed(true);
                            }
                        } else {
                            console.warn('/api/pronunciation/check failed', data);
                            setRecognitionError(data?.message || 'Lỗi kiểm tra phát âm');
                        }
                    } catch (err) {
                        console.error('Pronunciation check error:', err);
                        setRecognitionError(copy.recognitionError);
                    } finally {
                        // stop tracks
                        try {
                            mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
                        } catch {}
                        mediaStreamRef.current = null;
                        mediaRecorderRef.current = null;
                    }
                };

                recorder.start();
                mediaRecorderRef.current = recorder;

                // auto-stop after a reasonable duration (10s) to avoid cutting user off too early
                setTimeout(() => {
                    try {
                        if (recorder.state === 'recording') recorder.stop();
                    } catch (e) {}
                }, 10000);
            } catch (err) {
                console.error('MediaRecorder error:', err);
                startSpeechRecognition();
            }
        } else {
            // fallback to SpeechRecognition
            startSpeechRecognition();
        }
    };

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center bg-background text-foreground">{copy.loading}</div>;
    }

    if (!segments || segments.length === 0) {
        return <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
            <p>{copy.noData}</p>
            <button onClick={() => router.back()} className="rounded bg-blue-600 px-4 py-2 text-white">{copy.goBack}</button>
        </div>;
    }

    return (
        <div className="mx-auto flex h-screen max-w-[1600px] flex-col overflow-hidden bg-background font-sans text-foreground">
            {/* HEADER */}
            <header className="flex-shrink-0 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-3 backdrop-blur dark:border-border dark:bg-card/90">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-600 transition hover:text-slate-900 dark:text-muted-foreground dark:hover:text-foreground"
                    >
                        <ChevronLeft size={20} />
                        <span className="text-sm font-semibold">{copy.back}</span>
                    </button>

                    <div className="h-4 w-px bg-border" />

                    <div className="flex items-center gap-2 font-bold text-foreground">
                        <Mic size={18} className="text-blue-400" />
                        <span>Fill-in-the-blanks & Recording</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <button
                        onClick={() => setIsVideoHidden((prev) => !prev)}
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:border-blue-400/50 dark:hover:bg-blue-500/20 dark:hover:text-white"
                    >
                        <Eye size={16} />
                        <span>{isVideoHidden ? copy.showVideo : copy.hideVideo}</span>
                    </button>
                    <button className="text-slate-600 transition hover:text-slate-900 dark:text-muted-foreground dark:hover:text-foreground">{copy.help}</button>
                    {/* Dark/light toggle removed per user request */}
                </div>
            </header>

            {/* MAIN LAYOUT */}
            <main className="flex-1 flex overflow-hidden">
                {/* LEFT PANEL: VIDEO */}
                <section className={`flex-shrink-0 flex flex-col border-r border-slate-200 bg-slate-50 transition-all duration-300 dark:border-border dark:bg-card/40
                    ${videoSize === "Large" ? "w-1/2" : videoSize === "Medium" ? "w-[40%]" : "w-[30%]"} 
                    ${isVideoHidden ? 'hidden' : 'block'}
                `}>
                    <div className="p-4 flex-1 overflow-y-auto">
                        <div className="mb-6">
                            <div className="text-xs text-blue-400/80 uppercase font-bold tracking-wider mb-2">
                                {copy.allTopics} / Level {levelCode} / {isEnglish ? `UNIT ${params.topicId}` : copy.unitTitle.toUpperCase()}
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-yellow-400 text-xl">⭐</div>
                                <h1 className="text-2xl font-bold text-foreground">{lessonTitle}</h1>
                                <div className="rounded border border-slate-300 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600 dark:border-border dark:text-muted-foreground">
                                    {copy.vocabLevel} {levelCode}
                                </div>
                            </div>
                        </div>

                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black shadow-2xl">
                            <video
                                ref={videoRef}
                                className="absolute inset-0 w-full h-full"
                                controls
                                playsInline
                                src={resolvedVideoSrc}
                                onTimeUpdate={handleTimeUpdate}
                                onSeeked={keepVideoInsideCurrentSegment}
                                onLoadedMetadata={keepVideoInsideCurrentSegment}
                                onPlay={() => {
                                    alignPlaybackToCurrentSegment();
                                    schedulePlaybackStop();
                                    setIsPlaying(true);
                                }}
                                onPause={() => {
                                    clearPlaybackStopTimer();
                                    setIsPlaying(false);
                                }}
                            >
                                {copy.unsupportedVideo}
                            </video>
                        </div>
                    </div>

                    <div className="flex items-center border-t border-slate-200 bg-white px-4 py-4 dark:border-border dark:bg-card">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-muted-foreground">{copy.size}</span>
                            <select
                                className="rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 outline-none dark:border-border dark:bg-background dark:text-foreground"
                                value={videoSize}
                                onChange={(e) => setVideoSize(e.target.value as VideoSize)}
                            >
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* RIGHT PANEL: PRACTICE */}
                <section className={`relative flex-1 flex-col bg-slate-100 dark:bg-background ${isVideoHidden ? 'mx-auto w-full max-w-4xl border-x border-slate-200 dark:border-border' : 'flex'}`}>
                    <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
                        
                        {/* Fill in the blanks Box */}
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-border dark:bg-card">
                            <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-border">
                                <div className="flex items-center gap-4">
                                    <button onClick={togglePlay} className="size-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition shadow-lg shadow-blue-500/20">
                                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                    </button>
                                    <span className="text-sm font-medium text-slate-600 dark:text-muted-foreground">
                                            — {copy.fillPractice} (Fill in the blanks) — {currentSegIndex + 1} / {segments.length}
                                    </span>
                                </div>
                                <button className="text-slate-500 transition hover:text-slate-900 dark:text-muted-foreground dark:hover:text-foreground">
                                    <Settings size={18} />
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-1 gap-y-2 p-6 text-xl leading-[2.5] text-foreground md:p-8 md:text-2xl">
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
                                                    : 'border-slate-400 text-blue-600 hover:border-blue-500 focus:border-blue-500 dark:border-slate-500 dark:text-blue-300'
                                                }`}
                                            spellCheck={false}
                                        />
                                    ) : (
                                        <span key={i} className="whitespace-pre-wrap leading-none mt-1">{b.token}</span>
                                    )
                                ))}
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-200 p-4 dark:border-border">
                                <button 
                                    onClick={() => setShowResult(true)}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition"
                                >
                                    {copy.check}
                                </button>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={replayCurrentSegment}
                                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:border-border dark:bg-secondary dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-foreground"
                                    >
                                        <Volume2 size={18} />
                                        <span className="text-sm font-semibold">{copy.replaySentence}</span>
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition ml-2"
                                    >
                                        {copy.next}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-border dark:bg-card">
                            <p className="mb-4 text-[15px] font-medium text-foreground">
                                {copy.translationLabel} {currentSegment.text}
                            </p>
                            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
                                <span>{copy.translatedByUser}</span>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-1 rounded bg-slate-100 px-3 py-1.5 text-slate-600 transition hover:text-slate-900 dark:bg-secondary dark:text-muted-foreground dark:hover:text-foreground">
                                        <Edit3 size={12} /> Edit
                                    </button>
                                    <button className="rounded bg-slate-100 px-2 py-1.5 text-slate-600 transition hover:text-slate-900 dark:bg-secondary dark:text-muted-foreground dark:hover:text-foreground">
                                        <MoreHorizontal size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#1e293b] dark:bg-[#1e293b]/40">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />

                            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
                                <Mic size={14} className="text-blue-400" />
                                <span>{copy.pronunciationTitle.toUpperCase()}</span>
                            </div>

                            <div className="min-h-[80px]">
                                {isTextRevealed ? (
                                    <p className="text-xl md:text-2xl font-bold text-emerald-400 mb-2 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        {currentSegment?.text}
                                    </p>
                                ) : (
                                    <p className="relative mb-2 w-fit select-none rounded bg-slate-300 bg-clip-text text-xl font-bold leading-relaxed text-transparent transition-all duration-300 dark:bg-slate-800 md:text-2xl">
                                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded bg-slate-100/95 backdrop-blur-md dark:bg-slate-800/80">
                                            <span className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-700 drop-shadow-md dark:text-slate-400">
                                                <Mic size={14} /> {copy.revealHint}
                                            </span>
                                        </span>
                                        {currentSegment?.text}
                                    </p>
                                )}

                                {transcript && !isTextRevealed && (
                                 <p className="text-sm text-rose-400 mt-2">
                                         {copy.youSaid} &quot;{transcript}&quot;. {copy.notMatch}
                                     </p>
                                )}
                                {recognitionError && (
                                    <p className="text-sm text-rose-400 mt-2">{recognitionError}</p>
                                )}
                                {pronunciationResult && (
                                    <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-foreground dark:border-border dark:bg-card">
                                        <div className="font-semibold mb-1">Kết quả kiểm tra phát âm</div>
                                        <div>Điểm: {typeof pronunciationResult?.score !== 'undefined' ? String(pronunciationResult.score) : (pronunciationResult?.confidence ?? '—')}</div>
                                        {pronunciationResult?.feedback && (
                                            <div className="mt-1 text-sm text-muted-foreground">
                                                {typeof pronunciationResult.feedback === 'string'
                                                    ? pronunciationResult.feedback
                                                    : (pronunciationResult.feedback?.message ?? JSON.stringify(pronunciationResult.feedback))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 mt-6">
                                <button
                                    onClick={replayCurrentSegment}
                                    className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                                >
                                    <Volume2 size={16} /> {copy.listenSample}
                                </button>
                                <button 
                                    onClick={startRecording}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition border
                                        ${isRecording 
                                            ? 'bg-rose-100 border-rose-300 text-rose-700 animate-pulse dark:bg-rose-500/30 dark:border-rose-500/50 dark:text-rose-300' 
                                            : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 dark:border-rose-500/20 dark:text-rose-400'
                                        }
                                    `}
                                >
                                    <Mic size={16} /> {isRecording ? copy.recording : copy.recordVoice}
                                </button>
                                
                                {!isTextRevealed && (
                                    <button 
                                        onClick={() => setIsTextRevealed(true)}
                                        className="ml-auto flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:border-border dark:bg-secondary dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-foreground"
                                    >
                                        <Eye size={16} /> {copy.revealAnswer}
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
