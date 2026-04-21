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
    Eye,
    Loader2,
    Bot,
    Star
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
            aiEvaluating: "AI is evaluating your pronunciation...",
            aiEvalTitle: "AI PRONUNCIATION EVALUATION",
            scoringTitle: "Scoring Criteria",
            scoringAccuracy: "Vocabulary Accuracy (40%): Saying the correct words",
            scoringStructure: "Sentence Structure (30%): Correct word order & completeness",
            scoringPronunciation: "Pronunciation & Intonation (20%): Clear, natural pronunciation",
            scoringFluency: "Fluency (10%): Smooth, confident, uninterrupted speech",
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
            aiEvaluating: "AI đang đánh giá phát âm của bạn...",
            aiEvalTitle: "AI ĐÁNH GIÁ PHÁT ÂM",
            scoringTitle: "Tiêu chí chấm điểm",
            scoringAccuracy: "Độ chính xác từ vựng (40%): Nói đúng các từ trong câu mẫu",
            scoringStructure: "Cấu trúc câu (30%): Đúng thứ tự từ và đầy đủ nội dung",
            scoringPronunciation: "Phát âm & Ngữ điệu (20%): Phát âm rõ ràng, tự nhiên",
            scoringFluency: "Độ lưu loát (10%): Nói trôi chảy, tự tin, không ngắt quãng",
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
    const resolvedVideoSrc = videoId || lessonVideoSrc || `/videos/Lesson ${params.topicId}.mp4`;

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
    const [isCheckingPronunciation, setIsCheckingPronunciation] = useState(false);
    const [wordAnalysis, setWordAnalysis] = useState<{
        words: { ref: string; user: string | null; isCorrect: boolean }[];
        score: number;
        correctCount: number;
        totalCount: number;
        userTranscript: string;
        referenceText: string;
        missedWords: string[];
        wrongWords: { expected: string; got: string }[];
    } | null>(null);

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
        setIsCheckingPronunciation(false);
        setWordAnalysis(null);
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

    const compareWordsDetailed = (reference: string, userSaid: string) => {
        const clean = (s: string) => s.replace(/[.,/#!$%^&*;:{}=\-_`~()'"?!]/g, "").toLowerCase().trim();
        const refWords = clean(reference).split(/\s+/).filter(Boolean);
        const userWords = clean(userSaid).split(/\s+/).filter(Boolean);

        const words: { ref: string; user: string | null; isCorrect: boolean }[] = [];
        const missedWords: string[] = [];
        const wrongWords: { expected: string; got: string }[] = [];

        let userIdx = 0;
        for (let i = 0; i < refWords.length; i++) {
            const refWord = refWords[i];
            if (userIdx < userWords.length) {
                const userWord = userWords[userIdx];
                const isExact = refWord === userWord;
                const isSimilar = !isExact && (
                    refWord.includes(userWord) || userWord.includes(refWord) ||
                    levenshteinDistance(refWord, userWord) <= Math.max(1, Math.floor(refWord.length * 0.3))
                );
                const isCorrect = isExact || isSimilar;

                words.push({ ref: refWord, user: userWord, isCorrect });
                if (!isCorrect) {
                    wrongWords.push({ expected: refWord, got: userWord });
                }
                userIdx++;
            } else {
                words.push({ ref: refWord, user: null, isCorrect: false });
                missedWords.push(refWord);
            }
        }

        const correctCount = words.filter(w => w.isCorrect).length;
        const score = refWords.length > 0 ? Math.round((correctCount / refWords.length) * 100) : 0;

        return {
            words,
            score,
            correctCount,
            totalCount: refWords.length,
            userTranscript: userSaid,
            referenceText: reference,
            missedWords,
            wrongWords,
        };
    };

    function levenshteinDistance(a: string, b: string): number {
        const matrix: number[][] = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b[i - 1] === a[j - 1]) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    // IPA Phonetic Dictionary for common English words
    const ipaDict: Record<string, string> = {
        "hello": "/həˈloʊ/", "and": "/ænd/", "welcome": "/ˈwɛlkəm/", "to": "/tuː/",
        "this": "/ðɪs/", "slow": "/sloʊ/", "english": "/ˈɪŋglɪʃ/", "listening": "/ˈlɪs.ən.ɪŋ/",
        "for": "/fɔːr/", "beginners": "/bɪˈgɪn.ərz/", "the": "/ðə/", "a": "/ə/",
        "is": "/ɪz/", "it": "/ɪt/", "in": "/ɪn/", "on": "/ɒn/", "at": "/æt/",
        "my": "/maɪ/", "name": "/neɪm/", "i": "/aɪ/", "am": "/æm/", "you": "/juː/",
        "are": "/ɑːr/", "we": "/wiː/", "they": "/ðeɪ/", "he": "/hiː/", "she": "/ʃiː/",
        "have": "/hæv/", "has": "/hæz/", "do": "/duː/", "does": "/dʌz/",
        "not": "/nɒt/", "can": "/kæn/", "will": "/wɪl/", "would": "/wʊd/",
        "could": "/kʊd/", "should": "/ʃʊd/", "what": "/wɒt/", "where": "/weər/",
        "when": "/wen/", "how": "/haʊ/", "who": "/huː/", "why": "/waɪ/",
        "with": "/wɪð/", "from": "/frɒm/", "about": "/əˈbaʊt/", "like": "/laɪk/",
        "just": "/dʒʌst/", "but": "/bʌt/", "or": "/ɔːr/", "so": "/soʊ/",
        "if": "/ɪf/", "all": "/ɔːl/", "very": "/ˈver.i/", "good": "/gʊd/",
        "new": "/njuː/", "first": "/fɜːrst/", "also": "/ˈɔːl.soʊ/",
        "people": "/ˈpiː.pəl/", "know": "/noʊ/", "time": "/taɪm/",
        "think": "/θɪŋk/", "make": "/meɪk/", "go": "/goʊ/", "come": "/kʌm/",
        "see": "/siː/", "look": "/lʊk/", "want": "/wɒnt/", "give": "/gɪv/",
        "use": "/juːz/", "find": "/faɪnd/", "tell": "/tel/", "ask": "/ɑːsk/",
        "work": "/wɜːrk/", "seem": "/siːm/", "feel": "/fiːl/", "try": "/traɪ/",
        "leave": "/liːv/", "call": "/kɔːl/", "keep": "/kiːp/", "let": "/let/",
        "begin": "/bɪˈgɪn/", "show": "/ʃoʊ/", "hear": "/hɪər/", "play": "/pleɪ/",
        "run": "/rʌn/", "move": "/muːv/", "live": "/lɪv/", "believe": "/bɪˈliːv/",
        "help": "/help/", "talk": "/tɔːk/", "turn": "/tɜːrn/", "start": "/stɑːrt/",
        "right": "/raɪt/", "little": "/ˈlɪt.əl/", "big": "/bɪg/", "small": "/smɔːl/",
        "long": "/lɒŋ/", "old": "/oʊld/", "young": "/jʌŋ/", "different": "/ˈdɪf.ər.ənt/",
        "important": "/ɪmˈpɔːr.tənt/", "world": "/wɜːrld/", "today": "/təˈdeɪ/",
        "back": "/bæk/", "up": "/ʌp/", "out": "/aʊt/", "down": "/daʊn/",
        "still": "/stɪl/", "after": "/ˈɑːf.tər/", "before": "/bɪˈfɔːr/",
        "now": "/naʊ/", "here": "/hɪər/", "there": "/ðeər/", "then": "/ðen/",
        "more": "/mɔːr/", "much": "/mʌtʃ/", "many": "/ˈmen.i/", "some": "/sʌm/",
        "than": "/ðæn/", "other": "/ˈʌð.ər/", "into": "/ˈɪn.tuː/",
        "thing": "/θɪŋ/", "practice": "/ˈpræk.tɪs/", "learn": "/lɜːrn/",
        "study": "/ˈstʌd.i/", "read": "/riːd/", "write": "/raɪt/", "speak": "/spiːk/",
        "say": "/seɪ/", "understand": "/ʌn.dərˈstænd/", "please": "/pliːz/",
        "thank": "/θæŋk/", "thanks": "/θæŋks/", "sorry": "/ˈsɒr.i/",
        "yes": "/jes/", "no": "/noʊ/", "maybe": "/ˈmeɪ.bi/",
        "today": "/təˈdeɪ/", "tomorrow": "/təˈmɒr.oʊ/", "yesterday": "/ˈjes.tər.deɪ/",
        "morning": "/ˈmɔːr.nɪŋ/", "evening": "/ˈiːv.nɪŋ/", "night": "/naɪt/",
        "day": "/deɪ/", "week": "/wiːk/", "month": "/mʌnθ/", "year": "/jɪər/",
        "water": "/ˈwɔː.tər/", "food": "/fuːd/", "eat": "/iːt/", "drink": "/drɪŋk/",
        "house": "/haʊs/", "home": "/hoʊm/", "family": "/ˈfæm.ə.li/",
        "friend": "/frend/", "school": "/skuːl/", "teacher": "/ˈtiː.tʃər/",
        "student": "/ˈstjuː.dənt/", "book": "/bʊk/", "class": "/klɑːs/",
        "love": "/lʌv/", "hate": "/heɪt/", "happy": "/ˈhæp.i/", "sad": "/sæd/",
        "beautiful": "/ˈbjuː.tə.fəl/", "nice": "/naɪs/", "great": "/greɪt/",
        "really": "/ˈriː.ə.li/", "always": "/ˈɔːl.weɪz/", "never": "/ˈnev.ər/",
        "sometimes": "/ˈsʌm.taɪmz/", "often": "/ˈɒf.ən/", "usually": "/ˈjuː.ʒu.ə.li/",
        "because": "/bɪˈkɒz/", "every": "/ˈev.ri/", "each": "/iːtʃ/",
        "between": "/bɪˈtwiːn/", "sentence": "/ˈsen.təns/", "word": "/wɜːrd/",
        "another": "/əˈnʌð.ər/", "again": "/əˈgen/", "country": "/ˈkʌn.tri/",
        "together": "/təˈgeð.ər/", "number": "/ˈnʌm.bər/",
    };

    const getIPA = (word: string): string | null => {
        return ipaDict[word.toLowerCase()] || null;
    };

    const generateComment = (analysis: NonNullable<typeof wordAnalysis>): string => {
        const { score, correctCount, totalCount, wrongWords, missedWords } = analysis;
        const lines: string[] = [];

        // Overall assessment
        if (score === 100) {
            lines.push("⭐ Xuất sắc! Bạn đã nói chính xác toàn bộ câu. Tiếp tục phát huy!");
        } else if (score >= 80) {
            lines.push(`👏 Rất tốt! Bạn nói đúng ${correctCount}/${totalCount} từ. Chỉ cần chú ý thêm vài từ nữa là hoàn hảo!`);
        } else if (score >= 60) {
            lines.push(`💪 Khá tốt! Bạn đúng ${correctCount}/${totalCount} từ. Hãy nghe lại và luyện thêm các từ bị sai.`);
        } else if (score >= 40) {
            lines.push(`📖 Cần cải thiện! Bạn mới đúng ${correctCount}/${totalCount} từ. Hãy nghe câu mẫu nhiều lần hơn và đọc chậm lại.`);
        } else {
            lines.push(`🎯 Hãy cố gắng lần nữa! Bạn đúng ${correctCount}/${totalCount} từ. Thử nghe và lặp lại từng từ một.`);
        }

        // Specific feedback on wrong words
        if (wrongWords.length > 0) {
            lines.push("");
            lines.push("🔍 Phân tích lỗi phát âm:");
            wrongWords.forEach(w => {
                const ipa = getIPA(w.expected);
                if (ipa) {
                    lines.push(`  • \"${w.expected}\" ${ipa} - Bạn nói thành \"${w.got}\". Hãy chú ý đọc đúng âm ${ipa}.`);
                } else {
                    lines.push(`  • \"${w.expected}\" - Bạn nói thành \"${w.got}\". Hãy nghe lại câu mẫu để sửa.`);
                }
            });
        }

        // Feedback on missed words
        if (missedWords.length > 0) {
            lines.push("");
            lines.push(`⚠️ Bạn bị thiếu ${missedWords.length} từ: ${missedWords.map(w => `\"${w}\"`).join(", ")}. Hãy cố nói đầy đủ câu.`);
        }

        // Pronunciation tips based on common error patterns
        const tips: string[] = [];
        wrongWords.forEach(w => {
            if (w.expected === 'the' || w.expected === 'this' || w.expected === 'that' || w.expected === 'there' || w.expected === 'they' || w.expected === 'them' || w.expected === 'then' || w.expected === 'than') {
                tips.push('💡 Các từ bắt đầu bằng "th" (/ð/ hoặc /θ/): Đặt lưỡi giữa hai hàm răng, thổi hơi nhẹ.');
            }
            if (w.expected.endsWith('ing')) {
                tips.push(`💡 Âm "-ing" /ɪŋ/: Phát âm là "ìng" với âm mũi /ŋ/, không phải "ìn".`);
            }
            if (w.expected.includes('oo')) {
                tips.push(`💡 Âm "oo" /uː/: Kéo dài môi tròn, như âm "u" kéo dài trong tiếng Việt.`);
            }
            if (w.expected === 'slow' || w.expected === 'show' || w.expected === 'go' || w.expected === 'no' || w.expected === 'know') {
                tips.push(`💡 Âm /oʊ/ (long O): Bắt đầu bằng "ô" rồi chuyển sang "uơ" nhẹ.`);
            }
            if (w.expected === 'welcome' || w.expected === 'listen' || w.expected === 'little') {
                tips.push(`💡 Một số từ có âm câm (silent letters): VD: "listen" không đọc chữ "t".`);
            }
        });

        // Remove duplicate tips
        const uniqueTips = [...new Set(tips)];
        if (uniqueTips.length > 0) {
            lines.push("");
            lines.push("🎓 Mẹo phát âm:");
            uniqueTips.forEach(t => lines.push(`  ${t}`));
        }

        return lines.join("\n");
    };

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

                // Detailed word-by-word comparison (local, no external API)
                const analysis = compareWordsDetailed(currentSegment.text, speechResult);
                setWordAnalysis(analysis);
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
        setIsCheckingPronunciation(false);
        setWordAnalysis(null);

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
                    setIsCheckingPronunciation(true);
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
                        setIsCheckingPronunciation(false);
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

                // Also capture transcript via SpeechRecognition for detailed word comparison
                startSpeechRecognition();

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

                        {/* Server Pronunciation Evaluation Section */}
                        {(isCheckingPronunciation || pronunciationResult || wordAnalysis) && (
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-[#1e293b] dark:bg-[#1e293b]/40">
                                <div className="border-b border-slate-200 p-4 dark:border-border">
                                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
                                        <Bot size={14} className="text-emerald-400" />
                                        <span>{copy.aiEvalTitle}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    {isCheckingPronunciation && !pronunciationResult && !wordAnalysis ? (
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Loader2 size={18} className="animate-spin text-blue-400" />
                                            <span>{copy.aiEvaluating}</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-5">
                                            {/* Score Badge */}
                                            {wordAnalysis && (
                                                <div className="flex items-center gap-4">
                                                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-black ${
                                                        wordAnalysis.score >= 80 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' :
                                                        wordAnalysis.score >= 50 ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' :
                                                        'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400'
                                                    }`}>
                                                        {wordAnalysis.score}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-foreground">
                                                            {wordAnalysis.score >= 80 ? 'Đạt! Rất tốt!' :
                                                             wordAnalysis.score >= 50 ? 'Khá! Cần cải thiện thêm' :
                                                             'Cần luyện thêm nhiều'}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {wordAnalysis.correctCount}/{wordAnalysis.totalCount} từ đúng
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Word-by-Word Comparison */}
                                            {wordAnalysis && (
                                                <div>
                                                    <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">Phân tích từng từ</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {wordAnalysis.words.map((w, i) => (
                                                            <div key={i} className={`group relative rounded-lg px-3 py-2 text-sm font-semibold transition ${
                                                                w.isCorrect
                                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                                                                    : w.user === null
                                                                        ? 'bg-slate-200 text-slate-400 line-through dark:bg-slate-700 dark:text-slate-500'
                                                                        : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400'
                                                            }`}>
                                                                <span>{w.ref}</span>
                                                                {!w.isCorrect && w.user && (
                                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100 dark:bg-slate-700">
                                                                        Bạn nói: \"{w.user}\"
                                                                    </div>
                                                                )}
                                                                {w.user === null && (
                                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100 dark:bg-slate-700">
                                                                        Thiếu từ này
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2 flex items-center gap-4 text-[10px] text-muted-foreground">
                                                        <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> Đúng</span>
                                                        <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-rose-400" /> Sai</span>
                                                        <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-slate-400" /> Thiếu</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* What user said */}
                                            {wordAnalysis && wordAnalysis.userTranscript && (
                                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-border dark:bg-card">
                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground mb-1">🎙️ Bạn đã nói</div>
                                                    <div className="text-sm text-foreground italic">&quot;{wordAnalysis.userTranscript}&quot;</div>
                                                </div>
                                            )}

                                            {/* Wrong words detail with IPA */}
                                            {wordAnalysis && wordAnalysis.wrongWords.length > 0 && (
                                                <div className="rounded-lg border border-rose-200/60 bg-rose-50/50 p-3 dark:border-rose-500/15 dark:bg-rose-500/5">
                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">❌ Từ cần sửa</div>
                                                    <div className="space-y-2.5">
                                                        {wordAnalysis.wrongWords.map((w, i) => {
                                                            const ipa = getIPA(w.expected);
                                                            return (
                                                                <div key={i} className="rounded-md bg-white/60 p-2 dark:bg-slate-800/40">
                                                                    <div className="flex items-center gap-2 text-sm">
                                                                        <span className="text-rose-500 line-through font-medium">{w.got}</span>
                                                                        <span className="text-muted-foreground">→</span>
                                                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{w.expected}</span>
                                                                        {ipa && (
                                                                            <span className="ml-1 rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-mono text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400">
                                                                                {ipa}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    {ipa && (
                                                                        <div className="mt-1 text-[11px] text-muted-foreground">
                                                                            🗣️ Đọc là: <span className="font-semibold text-foreground">{ipa}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Missed words with IPA */}
                                            {wordAnalysis && wordAnalysis.missedWords.length > 0 && (
                                                <div className="rounded-lg border border-amber-200/60 bg-amber-50/50 p-3 dark:border-amber-500/15 dark:bg-amber-500/5">
                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">⚠️ Từ bị thiếu</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {wordAnalysis.missedWords.map((w, i) => {
                                                            const ipa = getIPA(w);
                                                            return (
                                                                <div key={i} className="flex items-center gap-1 rounded bg-amber-100 px-2 py-1 dark:bg-amber-500/20">
                                                                    <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">{w}</span>
                                                                    {ipa && <span className="text-[10px] font-mono text-amber-600/70 dark:text-amber-500">{ipa}</span>}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Detailed Comment */}
                                            {wordAnalysis && (
                                                <div className="rounded-lg border border-emerald-200/60 bg-emerald-50/50 p-4 dark:border-emerald-500/15 dark:bg-emerald-500/5">
                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">📝 Nhận xét chi tiết</div>
                                                    <div className="text-sm leading-6 text-foreground whitespace-pre-wrap">
                                                        {generateComment(wordAnalysis)}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Server result */}
                                            {pronunciationResult && (
                                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-border dark:bg-card">
                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground mb-1">📡 Kết quả từ server</div>
                                                    <div className="text-sm text-foreground whitespace-pre-wrap">
                                                        {typeof pronunciationResult === 'string'
                                                            ? pronunciationResult
                                                            : pronunciationResult?.feedback
                                                                ? (typeof pronunciationResult.feedback === 'string'
                                                                    ? pronunciationResult.feedback
                                                                    : pronunciationResult.feedback?.message || JSON.stringify(pronunciationResult.feedback, null, 2))
                                                                : pronunciationResult?.text
                                                                    ? pronunciationResult.text
                                                                    : JSON.stringify(pronunciationResult, null, 2)
                                                        }
                                                    </div>
                                                    {(pronunciationResult?.score !== undefined || pronunciationResult?.confidence !== undefined) && (
                                                        <div className="mt-2 text-sm font-bold text-emerald-500">
                                                            Điểm server: {pronunciationResult?.score ?? pronunciationResult?.confidence}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Scoring criteria */}
                                            <div className="rounded-xl border border-blue-200/60 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-4 dark:border-blue-500/15 dark:from-blue-500/5 dark:to-indigo-500/5">
                                                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                                    <Star size={12} />
                                                    <span>{copy.scoringTitle}</span>
                                                </div>
                                                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                                                    <li className="flex items-start gap-2">
                                                        <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                                        <span>{copy.scoringAccuracy}</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                                        <span>{copy.scoringStructure}</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                                                        <span>{copy.scoringPronunciation}</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                                                        <span>{copy.scoringFluency}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </section>
            </main>
        </div>
    );
}
