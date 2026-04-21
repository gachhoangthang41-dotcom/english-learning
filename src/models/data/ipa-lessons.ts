export type IpaLocalizedText = {
  vi: string;
  en: string;
};

export type IpaCard = {
  symbol: string;
  sound: IpaLocalizedText;
  word: string;
  ipa: string;
  tip: IpaLocalizedText;
};

export type IpaSection = {
  title: IpaLocalizedText;
  intro: IpaLocalizedText;
  cards: IpaCard[];
};

export type IpaPracticeWord = {
  word: string;
  ipa: string;
  note: IpaLocalizedText;
};

export type IpaLesson = {
  title: string;
  subtitle: IpaLocalizedText;
  intro: IpaLocalizedText;
  goals: IpaLocalizedText[];
  quickTips: IpaLocalizedText[];
  recap: IpaLocalizedText[];
  sections: IpaSection[];
  practiceWords: IpaPracticeWord[];
};

export const IPA_LESSONS: Record<string, IpaLesson> = {
  "1": {
    title: "IPA Basics and Vowel Map",
    subtitle: {
      vi: "Làm quen với bảng IPA và nhóm nguyên âm cốt lõi.",
      en: "Get familiar with the IPA chart and the core English vowels.",
    },
    intro: {
      vi: "Bài đầu tiên giúp người học hiểu vì sao chữ viết và âm đọc khác nhau, đồng thời nhận ra sự khác biệt giữa nguyên âm ngắn và nguyên âm dài.",
      en: "This first lesson explains why spelling and pronunciation differ and helps learners hear the contrast between short and long vowels.",
    },
    goals: [
      {
        vi: "Nhìn ký hiệu và liên kết được với âm trong từ thật.",
        en: "Match each symbol to the sound in a real word.",
      },
      {
        vi: "Phân biệt nguyên âm ngắn và nguyên âm dài khi đọc.",
        en: "Tell short and long vowels apart when reading aloud.",
      },
      {
        vi: "Bắt đầu đọc từ vựng bằng phiên âm thay vì đoán theo chữ cái.",
        en: "Start reading vocabulary from phonetics instead of guessing from spelling.",
      },
    ],
    quickTips: [
      {
        vi: "Kéo dài nguyên âm dài thêm một nhịp thay vì nói to hơn.",
        en: "Lengthen long vowels slightly instead of saying them louder.",
      },
      {
        vi: "Khi gặp từ mới, đọc phần giữa của phiên âm trước rồi mới ghép cả từ.",
        en: "When you meet a new word, decode the middle vowel first, then build the whole word.",
      },
      {
        vi: "Đừng đồng nhất /i:/ với chữ i và /u:/ với chữ u; hãy bám vào âm, không bám vào chữ.",
        en: "Do not equate /i:/ with the letter i or /u:/ with the letter u; follow the sound, not the spelling.",
      },
    ],
    recap: [
      {
        vi: "Nguyên âm ngắn: nhanh, gọn, không kéo dài.",
        en: "Short vowels are quick, compact, and not stretched.",
      },
      {
        vi: "Nguyên âm dài: giữ âm ổn định thêm một chút thời gian.",
        en: "Long vowels stay stable for a bit more time.",
      },
      {
        vi: "Phiên âm là bản đồ phát âm đáng tin hơn chính tả.",
        en: "IPA is a more reliable pronunciation map than spelling.",
      },
    ],
    sections: [
      {
        title: {
          vi: "Nguyên âm ngắn",
          en: "Short Vowels",
        },
        intro: {
          vi: "Đây là các âm xuất hiện rất nhiều trong từ cơ bản hằng ngày.",
          en: "These sounds appear constantly in everyday beginner vocabulary.",
        },
        cards: [
          {
            symbol: "/ɪ/",
            sound: {
              vi: "Âm ngắn, miệng mở ít, gần với i ngắn.",
              en: "A short, relaxed sound close to a quick i.",
            },
            word: "sit",
            ipa: "/sɪt/",
            tip: {
              vi: "Không đọc thành /si:t/. Âm này phải ngắn và nhẹ.",
              en: "Do not turn it into /si:t/. Keep it short and light.",
            },
          },
          {
            symbol: "/e/",
            sound: {
              vi: "Âm mở vừa, giống e trong từ rất ngắn.",
              en: "A mid-open front vowel, like a brief e sound.",
            },
            word: "pen",
            ipa: "/pen/",
            tip: {
              vi: "Hạ hàm nhẹ, không kéo âm về /ei/.",
              en: "Drop the jaw slightly and avoid drifting to /ei/.",
            },
          },
          {
            symbol: "/æ/",
            sound: {
              vi: "Âm mở rộng, miệng bẹt hơn, rất quan trọng trong accent Anh Mỹ.",
              en: "A wide open front vowel that is very important in American English.",
            },
            word: "cat",
            ipa: "/kæt/",
            tip: {
              vi: "Mở miệng nhiều hơn /e/ để tránh đọc nhầm thành /ket/.",
              en: "Open wider than /e/ so it does not sound like /ket/.",
            },
          },
          {
            symbol: "/ʌ/",
            sound: {
              vi: "Âm trung tâm, ngắn, thường gặp trong từ rất phổ biến.",
              en: "A short central vowel found in many high-frequency words.",
            },
            word: "cup",
            ipa: "/kʌp/",
            tip: {
              vi: "Đừng đọc thành /u/ hoặc /o/. Âm nằm ở giữa miệng.",
              en: "Do not replace it with /u/ or /o/. Keep it centered.",
            },
          },
          {
            symbol: "/ɒ/",
            sound: {
              vi: "Âm tròn môi ngắn, thường thấy trong accent Anh Anh.",
              en: "A short rounded vowel common in British pronunciation.",
            },
            word: "hot",
            ipa: "/hɒt/",
            tip: {
              vi: "Nếu quen accent Mỹ, hãy chú ý sự khác biệt với /ɑ:/ hoặc /ɑ/.",
              en: "If you use American English often, notice how it differs from /ɑ:/ or /ɑ/.",
            },
          },
        ],
      },
      {
        title: {
          vi: "Nguyên âm dài",
          en: "Long Vowels",
        },
        intro: {
          vi: "Nguyên âm dài cần giữ âm đều và rõ, không biến thành hai âm ghép.",
          en: "Long vowels should stay steady and clear instead of turning into diphthongs.",
        },
        cards: [
          {
            symbol: "/i:/",
            sound: {
              vi: "Âm i dài, căng hơn và sáng hơn /ɪ/.",
              en: "A tense long i sound, brighter than /ɪ/.",
            },
            word: "see",
            ipa: "/si:/",
            tip: {
              vi: "Giữ âm ổn định, không thêm /j/ ở cuối.",
              en: "Keep it stable and do not add a trailing /j/.",
            },
          },
          {
            symbol: "/ɑ:/",
            sound: {
              vi: "Âm a dài, mở sâu, thường gặp trong car hoặc start.",
              en: "A deep long a sound, common in words like car and start.",
            },
            word: "car",
            ipa: "/kɑ:/",
            tip: {
              vi: "Mở hàm và thả lỏng lưỡi, tránh bóp âm quá ngắn.",
              en: "Open the jaw and relax the tongue instead of clipping it short.",
            },
          },
          {
            symbol: "/u:/",
            sound: {
              vi: "Âm u dài, môi tròn vừa phải, âm giữ ổn định.",
              en: "A long u sound with moderate lip rounding and steady airflow.",
            },
            word: "food",
            ipa: "/fu:d/",
            tip: {
              vi: "Đừng đẩy thành /uu-uh/. Giữ một khối âm liền mạch.",
              en: "Do not split it into /uu-uh/. Keep it as one smooth block.",
            },
          },
          {
            symbol: "/ɜ:/",
            sound: {
              vi: "Âm giữa miệng kéo dài, rất hay xuất hiện trong learn, word, bird.",
              en: "A long central vowel often heard in learn, word, and bird.",
            },
            word: "bird",
            ipa: "/bɜ:d/",
            tip: {
              vi: "Giữ lưỡi ở giữa, môi không mở quá lớn.",
              en: "Keep the tongue centered and avoid opening the lips too wide.",
            },
          },
        ],
      },
    ],
    practiceWords: [
      {
        word: "ship",
        ipa: "/ʃɪp/",
        note: {
          vi: "So sánh với sheep để nghe rõ /ɪ/ và /i:/.",
          en: "Compare it with sheep to hear /ɪ/ versus /i:/.",
        },
      },
      {
        word: "sheep",
        ipa: "/ʃi:p/",
        note: {
          vi: "Kéo âm chính dài hơn một chút và giữ âm sáng.",
          en: "Sustain the main vowel a little longer and keep it bright.",
        },
      },
      {
        word: "cup",
        ipa: "/kʌp/",
        note: {
          vi: "Âm giữa nhanh, gọn, không tròn môi.",
          en: "The middle vowel is quick, compact, and not rounded.",
        },
      },
      {
        word: "food",
        ipa: "/fu:d/",
        note: {
          vi: "Môi tròn nhẹ và giữ hơi đều tới cuối âm.",
          en: "Round the lips slightly and keep the airflow even to the end.",
        },
      },
    ],
  },
  "2": {
    title: "Diphthongs and Sound Glides",
    subtitle: {
      vi: "Học các âm đôi chuyển động từ vị trí miệng này sang vị trí khác.",
      en: "Learn the moving vowel sounds that glide from one mouth position to another.",
    },
    intro: {
      vi: "Âm đôi là chìa khóa để nghe tự nhiên hơn. Người học thường đọc âm đôi như hai âm tách rời hoặc kéo thành một nguyên âm dài, nên bài này tập trung vào chuyển động mượt.",
      en: "Diphthongs are essential for natural pronunciation. Learners often split them into two separate sounds or flatten them into a long vowel, so this lesson focuses on smooth movement.",
    },
    goals: [
      {
        vi: "Nhận ra hướng di chuyển của từng âm đôi.",
        en: "Recognize the direction each diphthong moves in.",
      },
      {
        vi: "Đọc tròn một khối âm thay vì ngắt giữa chừng.",
        en: "Produce each diphthong as one continuous sound unit.",
      },
      {
        vi: "Nghe và sửa các lỗi nhầm giữa /eɪ/, /aɪ/, /əʊ/, /aʊ/.",
        en: "Hear and correct confusion among /eɪ/, /aɪ/, /əʊ/, and /aʊ/.",
      },
    ],
    quickTips: [
      {
        vi: "Âm đôi luôn có điểm bắt đầu rõ và điểm kết thúc nhẹ hơn.",
        en: "A diphthong has a clear starting point and a lighter ending point.",
      },
      {
        vi: "Hãy tập chậm trước, rồi tăng tốc nhưng vẫn giữ quỹ đạo âm.",
        en: "Practice slowly first, then speed up while preserving the sound path.",
      },
      {
        vi: "Nếu âm đôi nghe cứng, bạn đang dừng quá lâu ở giữa.",
        en: "If the diphthong feels rigid, you are probably pausing too long in the middle.",
      },
    ],
    recap: [
      {
        vi: "Âm đôi là chuyển động liên tục, không phải hai âm đứng cạnh nhau.",
        en: "A diphthong is continuous movement, not two separate vowels.",
      },
      {
        vi: "Điểm bắt đầu quyết định phần lớn cảm giác của âm.",
        en: "The starting point determines most of the sound identity.",
      },
      {
        vi: "Kết thúc âm đôi phải nhẹ để câu nghe tự nhiên.",
        en: "The end of a diphthong should stay light for a natural rhythm.",
      },
    ],
    sections: [
      {
        title: {
          vi: "Âm đôi phổ biến",
          en: "Core Diphthongs",
        },
        intro: {
          vi: "Đây là nhóm âm xuất hiện thường xuyên trong giao tiếp cơ bản.",
          en: "These diphthongs appear constantly in basic spoken English.",
        },
        cards: [
          {
            symbol: "/eɪ/",
            sound: {
              vi: "Bắt đầu gần /e/ rồi trượt nhẹ lên phía /ɪ/.",
              en: "Start near /e/ and glide gently toward /ɪ/.",
            },
            word: "day",
            ipa: "/deɪ/",
            tip: {
              vi: "Không nên tách thành de + i. Hãy giữ thành một nhịp.",
              en: "Do not split it into de + i. Keep it as one beat.",
            },
          },
          {
            symbol: "/aɪ/",
            sound: {
              vi: "Bắt đầu mở rộng rồi nâng dần lên cuối âm.",
              en: "Start open and rise toward the end.",
            },
            word: "time",
            ipa: "/taɪm/",
            tip: {
              vi: "Điểm đầu mở rõ, đừng bắt đầu quá hẹp.",
              en: "Make the opening clear and do not start too narrow.",
            },
          },
          {
            symbol: "/əʊ/",
            sound: {
              vi: "Âm trung tính mở đầu rồi tròn môi ở cuối.",
              en: "Begin with a neutral vowel and round the lips toward the end.",
            },
            word: "go",
            ipa: "/gəʊ/",
            tip: {
              vi: "Đừng bắt đầu quá mạnh bằng /o/. Phần đầu phải nhẹ.",
              en: "Do not begin too strongly with /o/. The opening should be lighter.",
            },
          },
          {
            symbol: "/aʊ/",
            sound: {
              vi: "Bắt đầu mở rộng rồi tròn môi dần về cuối.",
              en: "Start open and gradually round the lips at the end.",
            },
            word: "house",
            ipa: "/haʊs/",
            tip: {
              vi: "Đừng đọc house như hao-út tách rời từng phần.",
              en: "Do not pronounce house as two separate chunks.",
            },
          },
        ],
      },
      {
        title: {
          vi: "Âm đôi kết thúc bằng schwa hoặc /ɪ/",
          en: "Diphthongs Ending Toward Schwa or /ɪ/",
        },
        intro: {
          vi: "Nhóm này giúp người học đọc đúng các từ như boy, hair, near.",
          en: "This group helps learners pronounce words like boy, hair, and near more accurately.",
        },
        cards: [
          {
            symbol: "/ɔɪ/",
            sound: {
              vi: "Âm tròn môi rồi trượt lên phía /ɪ/.",
              en: "Start rounded and glide toward /ɪ/.",
            },
            word: "boy",
            ipa: "/bɔɪ/",
            tip: {
              vi: "Phần đầu cần đủ tròn để khác với /aɪ/.",
              en: "Make the opening rounded enough to distinguish it from /aɪ/.",
            },
          },
          {
            symbol: "/ɪə/",
            sound: {
              vi: "Đi từ /ɪ/ sang schwa nhẹ, hay gặp trong accent Anh Anh.",
              en: "Move from /ɪ/ toward a light schwa, common in British English.",
            },
            word: "near",
            ipa: "/nɪə/",
            tip: {
              vi: "Phần cuối mờ nhẹ, không cần nhấn rõ như một nguyên âm mới.",
              en: "Let the ending fade lightly rather than stressing it like a new vowel.",
            },
          },
          {
            symbol: "/eə/",
            sound: {
              vi: "Từ /e/ trượt về schwa, dùng nhiều trong hair, care.",
              en: "Glide from /e/ toward schwa, as in hair and care.",
            },
            word: "care",
            ipa: "/keə/",
            tip: {
              vi: "Giữ phần đầu sáng, phần sau lùi về trung tâm.",
              en: "Keep the opening bright and let the ending return to center.",
            },
          },
        ],
      },
    ],
    practiceWords: [
      {
        word: "late",
        ipa: "/leɪt/",
        note: {
          vi: "Âm đôi đi lên nhẹ, phụ âm cuối đóng rõ.",
          en: "The diphthong rises gently and the final consonant closes cleanly.",
        },
      },
      {
        word: "light",
        ipa: "/laɪt/",
        note: {
          vi: "Phần đầu mở hơn late và nghe sáng dần về cuối.",
          en: "The opening is wider than late and brightens toward the end.",
        },
      },
      {
        word: "go",
        ipa: "/gəʊ/",
        note: {
          vi: "Phần đầu rất nhẹ, không đọc cứng như /go/ thuần.",
          en: "Keep the opening very light instead of a flat /go/.",
        },
      },
      {
        word: "boy",
        ipa: "/bɔɪ/",
        note: {
          vi: "Làm tròn môi ở đầu rồi nới dần ở cuối.",
          en: "Round the lips at the start and release them toward the end.",
        },
      },
    ],
  },
  "3": {
    title: "Consonants and Minimal Pairs",
    subtitle: {
      vi: "Tập trung vào phụ âm dễ nhầm và cặp hữu thanh, vô thanh.",
      en: "Focus on confusing consonants and voiced versus voiceless pairs.",
    },
    intro: {
      vi: "Nhiều lỗi phát âm không nằm ở nguyên âm mà nằm ở phụ âm cuối hoặc các cặp âm như /s/ - /z/, /tʃ/ - /dʒ/, /θ/ - /ð/. Bài này giúp người học sửa phần đó.",
      en: "Many pronunciation issues come from consonants rather than vowels, especially final sounds and pairs such as /s/ - /z/, /tʃ/ - /dʒ/, and /θ/ - /ð/. This lesson targets those contrasts.",
    },
    goals: [
      {
        vi: "Nhận ra sự rung dây thanh ở phụ âm hữu thanh.",
        en: "Feel vocal cord vibration in voiced consonants.",
      },
      {
        vi: "Giữ phụ âm cuối đủ rõ để không làm đổi nghĩa từ.",
        en: "Keep final consonants clear enough to preserve meaning.",
      },
      {
        vi: "Luyện minimal pairs để tự phát hiện lỗi.",
        en: "Use minimal pairs to catch your own pronunciation mistakes.",
      },
    ],
    quickTips: [
      {
        vi: "Đặt tay lên cổ họng để kiểm tra phụ âm có rung hay không.",
        en: "Put your hand on your throat to check for voicing.",
      },
      {
        vi: "Phụ âm cuối không cần quá mạnh nhưng không được biến mất.",
        en: "A final consonant does not need to be heavy, but it must not disappear.",
      },
      {
        vi: "Với /θ/ và /ð/, đầu lưỡi chạm nhẹ mép răng thay vì nằm hoàn toàn trong miệng.",
        en: "For /θ/ and /ð/, let the tongue tip touch lightly at the edge of the teeth.",
      },
    ],
    recap: [
      {
        vi: "Âm hữu thanh có rung, âm vô thanh không rung.",
        en: "Voiced sounds vibrate and voiceless sounds do not.",
      },
      {
        vi: "Phụ âm cuối quyết định sự rõ nghĩa trong nhiều từ ngắn.",
        en: "Final consonants carry meaning in many short words.",
      },
      {
        vi: "Minimal pairs là công cụ sửa lỗi rất nhanh và hiệu quả.",
        en: "Minimal pairs are a fast and effective correction tool.",
      },
    ],
    sections: [
      {
        title: {
          vi: "Cặp hữu thanh và vô thanh",
          en: "Voiced and Voiceless Pairs",
        },
        intro: {
          vi: "Nhìn giống nhau ở vị trí miệng, nhưng khác ở độ rung của dây thanh.",
          en: "These pairs share mouth position but differ in voicing.",
        },
        cards: [
          {
            symbol: "/s/ - /z/",
            sound: {
              vi: "Cùng vị trí lưỡi, nhưng /z/ có rung cổ họng.",
              en: "Same tongue position, but /z/ adds vocal vibration.",
            },
            word: "rice / rise",
            ipa: "/raɪs/ - /raɪz/",
            tip: {
              vi: "Nghe và cảm nhận phần cuối, không chỉ nhìn chữ cái.",
              en: "Listen and feel the ending instead of trusting the spelling alone.",
            },
          },
          {
            symbol: "/f/ - /v/",
            sound: {
              vi: "Môi dưới chạm răng trên, nhưng /v/ có rung.",
              en: "Lower lip touches upper teeth, and /v/ adds voicing.",
            },
            word: "fan / van",
            ipa: "/fæn/ - /væn/",
            tip: {
              vi: "Giữ lực ma sát giống nhau, chỉ thêm rung ở /v/.",
              en: "Keep the same friction and add voicing for /v/.",
            },
          },
          {
            symbol: "/tʃ/ - /dʒ/",
            sound: {
              vi: "Cùng kiểu bật-xát, nhưng /dʒ/ hữu thanh hơn.",
              en: "Both are affricates, but /dʒ/ is voiced.",
            },
            word: "cheap / jeep",
            ipa: "/tʃi:p/ - /dʒi:p/",
            tip: {
              vi: "Giữ thời gian bật tương tự nhau để so sánh rõ hơn.",
              en: "Keep the release timing similar so the contrast stays clear.",
            },
          },
        ],
      },
      {
        title: {
          vi: "Âm dễ nhầm cho người Việt",
          en: "Common Trouble Sounds for Vietnamese Learners",
        },
        intro: {
          vi: "Đây là nhóm âm thường bị thay thế bằng âm quen thuộc hơn trong tiếng Việt.",
          en: "These sounds are often replaced by more familiar Vietnamese sounds.",
        },
        cards: [
          {
            symbol: "/θ/",
            sound: {
              vi: "Âm vô thanh, đầu lưỡi chạm mép răng và thổi hơi ra.",
              en: "A voiceless sound made by placing the tongue lightly at the teeth and pushing air through.",
            },
            word: "think",
            ipa: "/θɪŋk/",
            tip: {
              vi: "Đừng thay bằng /t/ hoặc /s/. Phải có hơi đi qua răng.",
              en: "Do not replace it with /t/ or /s/. Let air pass through the teeth.",
            },
          },
          {
            symbol: "/ð/",
            sound: {
              vi: "Giống /θ/ nhưng có rung dây thanh.",
              en: "Built like /θ/ but with voicing.",
            },
            word: "this",
            ipa: "/ðɪs/",
            tip: {
              vi: "Bắt đầu bằng âm nhẹ và có rung, không bật mạnh như /d/.",
              en: "Start gently with voicing instead of a strong /d/ release.",
            },
          },
          {
            symbol: "/ŋ/",
            sound: {
              vi: "Âm ng ở cuối, lưỡi chạm phía sau, không bật /g/ ra ngoài.",
              en: "A final ng sound formed at the back without releasing a /g/.",
            },
            word: "sing",
            ipa: "/sɪŋ/",
            tip: {
              vi: "Kết thúc ở /ŋ/ là đủ, không cần đọc thành /sɪŋg/.",
              en: "End at /ŋ/ and avoid adding an extra /g/ sound.",
            },
          },
        ],
      },
    ],
    practiceWords: [
      {
        word: "fan / van",
        ipa: "/fæn/ - /væn/",
        note: {
          vi: "Giữ môi dưới cố định, chỉ thay đổi rung cổ họng.",
          en: "Keep the lower lip position constant and change only the voicing.",
        },
      },
      {
        word: "rice / rise",
        ipa: "/raɪs/ - /raɪz/",
        note: {
          vi: "Nghe phần cuối trước khi chú ý cả từ.",
          en: "Listen to the final consonant before judging the whole word.",
        },
      },
      {
        word: "thin / this",
        ipa: "/θɪn/ - /ðɪs/",
        note: {
          vi: "Cùng vị trí lưỡi nhưng /this/ có rung rõ hơn.",
          en: "The tongue stays in a similar place, but /this/ adds voicing.",
        },
      },
      {
        word: "sing",
        ipa: "/sɪŋ/",
        note: {
          vi: "Dừng ngay ở âm mũi cuối để câu nghe gọn và tự nhiên.",
          en: "Stop cleanly at the nasal ending for a compact, natural finish.",
        },
      },
    ],
  },
  "4": {
    title: "Stress, Schwa, and Rhythm",
    subtitle: {
      vi: "Đọc tự nhiên hơn nhờ trọng âm từ, âm schwa và nhịp câu.",
      en: "Sound more natural through word stress, schwa, and sentence rhythm.",
    },
    intro: {
      vi: "Đọc đúng từng âm chưa đủ để nghe tự nhiên. Người học cần biết nhấn vào đâu, chỗ nào giảm âm, và vì sao schwa xuất hiện rất nhiều trong tiếng Anh nói hằng ngày.",
      en: "Correct sounds alone are not enough for natural speech. Learners also need to know where to place stress, where to reduce, and why schwa appears so often in everyday English.",
    },
    goals: [
      {
        vi: "Nhận ra âm tiết được nhấn trong từ hai hoặc ba âm tiết.",
        en: "Identify the stressed syllable in two- and three-syllable words.",
      },
      {
        vi: "Đọc schwa nhẹ và nhanh trong âm tiết không nhấn.",
        en: "Use a light, quick schwa in unstressed syllables.",
      },
      {
        vi: "Bắt đầu tạo nhịp nói tự nhiên thay vì đọc đều từng âm tiết.",
        en: "Start building natural rhythm instead of reading every syllable equally.",
      },
    ],
    quickTips: [
      {
        vi: "Trọng âm không phải là hét to hơn, mà là rõ hơn, dài hơn và chắc hơn một chút.",
        en: "Stress is not shouting; it is making one syllable clearer, longer, and firmer.",
      },
      {
        vi: "Schwa /ə/ rất ngắn và trung tính, thường là âm bạn nghe thấy nhiều nhất trong tiếng Anh tự nhiên.",
        en: "Schwa /ə/ is short and neutral, and it may be the sound you hear most often in natural English.",
      },
      {
        vi: "Âm tiết không nhấn nên nhẹ, nếu nhấn hết mọi âm tiết thì câu sẽ rất cứng.",
        en: "Unstressed syllables should stay light; if every syllable is stressed, the sentence sounds stiff.",
      },
    ],
    recap: [
      {
        vi: "Mỗi từ đa âm tiết thường có một trọng âm chính.",
        en: "Most multisyllabic words have one main stress.",
      },
      {
        vi: "Schwa giúp câu chảy nhanh và tự nhiên hơn.",
        en: "Schwa helps speech move faster and sound more natural.",
      },
      {
        vi: "Nhịp tiếng Anh thường xoay quanh âm tiết nhấn chứ không đều từng âm tiết.",
        en: "English rhythm usually revolves around stressed syllables instead of equal syllable timing.",
      },
    ],
    sections: [
      {
        title: {
          vi: "Trọng âm từ",
          en: "Word Stress",
        },
        intro: {
          vi: "Các dấu nháy đứng trước âm tiết được nhấn trong phiên âm là tín hiệu rất quan trọng.",
          en: "The stress mark before a syllable in IPA is a critical clue for pronunciation.",
        },
        cards: [
          {
            symbol: "ˈ",
            sound: {
              vi: "Dấu trọng âm chính đặt trước âm tiết nổi bật nhất.",
              en: "The primary stress mark comes before the most prominent syllable.",
            },
            word: "teacher",
            ipa: "/ˈti:tʃə/",
            tip: {
              vi: "Âm đầu mạnh hơn, âm cuối giảm thành schwa nhẹ.",
              en: "The first syllable is stronger and the ending reduces to a light schwa.",
            },
          },
          {
            symbol: "ˈ",
            sound: {
              vi: "Trọng âm thay đổi có thể làm người nghe khó nhận ra từ.",
              en: "Changing stress can make a familiar word harder to recognize.",
            },
            word: "about",
            ipa: "/əˈbaʊt/",
            tip: {
              vi: "Không nhấn âm đầu; âm đầu phải giảm nhẹ.",
              en: "Do not stress the first syllable; reduce it instead.",
            },
          },
          {
            symbol: "ˌ",
            sound: {
              vi: "Dấu trọng âm phụ nhẹ hơn trọng âm chính.",
              en: "Secondary stress is lighter than primary stress.",
            },
            word: "information",
            ipa: "/ˌɪnfəˈmeɪʃən/",
            tip: {
              vi: "Chú ý nhịp lên xuống thay vì đọc đều cả bốn âm tiết.",
              en: "Notice the rise and fall rather than flattening all four syllables.",
            },
          },
        ],
      },
      {
        title: {
          vi: "Schwa và giảm âm",
          en: "Schwa and Reduction",
        },
        intro: {
          vi: "Schwa là âm giảm phổ biến nhất và giúp câu nói trôi hơn rất nhiều.",
          en: "Schwa is the most common reduced vowel and makes speech flow much more smoothly.",
        },
        cards: [
          {
            symbol: "/ə/",
            sound: {
              vi: "Âm trung tính, rất ngắn, xuất hiện ở âm tiết không nhấn.",
              en: "A very short neutral vowel found in unstressed syllables.",
            },
            word: "teacher",
            ipa: "/ˈti:tʃə/",
            tip: {
              vi: "Âm cuối không cần rõ như /e/ hay /a/; chỉ là một âm rất nhẹ.",
              en: "The last syllable does not need a clear /e/ or /a/; it is just a light neutral sound.",
            },
          },
          {
            symbol: "/ə/",
            sound: {
              vi: "Schwa thường có ở đầu từ chức năng hoặc tiền tố yếu.",
              en: "Schwa often appears in weak prefixes and function words.",
            },
            word: "about",
            ipa: "/əˈbaʊt/",
            tip: {
              vi: "Âm đầu chỉ chạm nhẹ rồi nhường chỗ cho trọng âm chính.",
              en: "Touch the opening lightly and move quickly to the stressed syllable.",
            },
          },
          {
            symbol: "Rhythm",
            sound: {
              vi: "Nhịp tiếng Anh dồn vào các âm tiết nhấn và rút ngắn phần còn lại.",
              en: "English rhythm clusters around stressed syllables and compresses the rest.",
            },
            word: "I want to go",
            ipa: "/aɪ ˈwɒnt tə gəʊ/",
            tip: {
              vi: "to thường giảm còn /tə/ chứ không giữ nguyên /tu:/.",
              en: "to is often reduced to /tə/ instead of a full /tu:/.",
            },
          },
        ],
      },
    ],
    practiceWords: [
      {
        word: "about",
        ipa: "/əˈbaʊt/",
        note: {
          vi: "Giảm âm đầu, nhấn mạnh âm sau.",
          en: "Reduce the first syllable and stress the second.",
        },
      },
      {
        word: "teacher",
        ipa: "/ˈti:tʃə/",
        note: {
          vi: "Âm cuối rất nhẹ, đừng đọc quá rõ thành /-er/ cứng.",
          en: "Keep the ending light instead of turning it into a heavy /-er/.",
        },
      },
      {
        word: "information",
        ipa: "/ˌɪnfəˈmeɪʃən/",
        note: {
          vi: "Trọng âm chính rơi vào meɪ, các âm tiết còn lại giảm bớt lực.",
          en: "Primary stress falls on meɪ and the other syllables stay lighter.",
        },
      },
      {
        word: "want to",
        ipa: "/ˈwɒnt tə/",
        note: {
          vi: "Quan sát cách từ chức năng thường bị giảm trong câu nói nhanh.",
          en: "Notice how function words are often reduced in connected speech.",
        },
      },
    ],
  },
};