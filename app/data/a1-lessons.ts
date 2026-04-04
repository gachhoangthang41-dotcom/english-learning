export type Segment = { start: number; end: number; text?: string };
export type LessonContent = {
  title: string;
  subtitle?: string;
  videoSrc: string;
  transcript: string;
  segments: Segment[];
};



export const A1_LESSONS: Record<string, LessonContent> = {
  "1": {
    title: "Introducing Myself",
    subtitle: "LESSON 1",
    videoSrc: "/videos/a1/Lesson 1.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners. Today's topic is introducing myself. You will listen to a short story about a woman. She will introduce herself and will give us personal information about her family and her life. After the story, I will ask you some questions to check on your understanding. Don't worry if you don't understand everything. Just focus on the key information. Are you ready? Let's begin. Hello, my name is Emily. I'm 40 years old and I live in a small town in the United States. I want to tell you a little bit about myself. I was born in New York City, but now I live in a town called Greenfield. It's very quiet here and I love it. The weather is nice and there are many parks and trees. I live in a small house with my husband Tom and our two children, Lily and Ben. Tom is 42 years old and he works in a big office in the city. He is very busy, but he loves his job. Lily is 9 years old and Ben is six. Lily loves to draw and Ben loves to play with his toys. I work as a nurse. I help people when they are sick or hurt. I work in a hospital in the city. My job is very important to me because I like to help people feel better. Sometimes it's a hard job, but I enjoyed it a lot. In my free time, I like to read books. My favorite books are about history and travel. I also enjoy cooking. I like cooking Italian food, especially pasta. On weekends, my family and I go for walks in the park. We also visit my parents who live not far from us. I have two sisters and we like to spend time together. I think it's important to take care of our health. I try to stay active by walking and eating healthy food. I feel very lucky because I have a nice family and a lot of friends. That's a little bit about me. Thank you for listening.`,
    segments: [
      { start: 0, end: 6.2, text: "Hello and welcome to this slow English listening for beginners." },
      { start: 6.2, end: 9.7, text: "Today's topic is introducing myself." },
      { start: 9.7, end: 20, text: "You will listen to a short story about a woman." },
      { start: 20, end: 22, text: "She will introduce herself and will give us personal information about her family and her life." },
      { start: 22, end: 28, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 28, end: 30, text: "Don't worry if you don't understand everything." },
      { start: 30, end: 33, text: "Just focus on the key information." },
      { start: 33, end: 35, text: "Are you ready?" },
      { start: 35, end: 41, text: "Let's begin." },
      { start: 41, end: 44, text: "Hello, my name is Emily." },
      { start: 44, end: 49, text: "I'm 40 years old and I live in a small town in the United States." },
      { start: 49, end: 55, text: "I want to tell you a little bit about myself." },
      { start: 55, end: 60, text: "I was born in New York City, but now I live in a town called Greenfield." },
      { start: 60, end: 62, text: "It's very quiet here and I love it." },
      { start: 62, end: 68, text: "The weather is nice and there are many parks and trees." },
      { start: 68, end: 76, text: "I live in a small house with my husband Tom and our two children, Lily and Ben." },
      { start: 76, end: 83, text: "Tom is 42 years old and he works in a big office in the city." },
      { start: 83, end: 88, text: "He is very busy, but he loves his job." },
      { start: 88, end: 97, text: "Lily is 9 years old and Ben is six." },
      { start: 97, end: 103, text: "Lily loves to draw and Ben loves to play with his toys." },
      { start: 103, end: 107, text: "I work as a nurse." },
      { start: 107, end: 110, text: "I help people when they are sick or hurt." },
      { start: 110, end: 114, text: "I work in a hospital in the city." },
      { start: 114, end: 121, text: "My job is very important to me because I like to help people feel better." },
      { start: 121, end: 128, text: "Sometimes it's a hard job, but I enjoyed it a lot." },
      { start: 128, end: 131, text: "In my free time, I like to read books." },
      { start: 131, end: 135, text: "My favorite books are about history and travel." },
      { start: 135, end: 142, text: "I also enjoy cooking." },
    ],
  },

  "2": {
    title: "My Family",
    subtitle: "LESSON 2",
    videoSrc: "/videos/a1/Lesson 2.mp4",
    transcript: `In this video, I will talk about the topic my family. Listen carefully because later I will ask you some questions to see if you understood everything. Are you ready? Let's start. Hello everyone. My name is Anna. I'm very happy to share my family story with you today. I come from a small and loving family and I want to tell you all about them. I live with four people: my father, my mother, my older sister, and my younger brother. My father's name is Mark. He is a doctor. Every day he works in a busy hospital and helps many people feel better. I admire him because he is very kind and always takes care of others. My father loves his job and he often tells me stories about how he helps his patients. My mother's name is Linda. She is a teacher. She works in a local school where she teaches young children. My mother is very patient and friendly. She enjoys reading and writing and she always helps me with my homework when I study in the evening. I feel very lucky to have such a caring and smart mother. I also have an older sister. Her name is Emily. Emily is a high school student. She studies hard and loves art. In her free time, she likes to draw and paint. Sometimes she shows me her beautiful pictures and I feel very proud of her. Emily is very supportive and she always encourages me to try new things. My younger brother is Tom. He is 8 years old and full of energy. Tom loves playing with his toys and riding his bicycle in the park. He is always laughing and making everyone smile. Even though he is younger, he is very curious and loves to ask questions about everything he sees. Every morning, our family eats breakfast together. We sit at the table and talk about our plans for the day. After breakfast, my father leaves for the hospital. My mother goes to school and my sister and I get ready for our studies. In the afternoon, we sometimes meet at home and share our experiences. In the evening, we have dinner together and enjoy simple happy moments. On weekends, we like to spend time together outdoors. We go for walks in the park and visit local markets or sometimes watch a movie together at home. These moments make me feel very happy and connected with my family. Thank you for listening to my story about my family. I hope you enjoyed learning about each member and their daily lives. I love my family and I am grateful for every day we spend together.`,
    segments: [
      { start: 0, end: 5, text: "In this video, I will talk about the topic my family." },
      { start: 5, end: 12, text: "Listen carefully because later I will ask you some questions to see if you understood everything." },
      { start: 12, end: 14, text: "Are you ready?" },
      { start: 14, end: 18, text: "Let's start." },
      { start: 18, end: 20, text: "Hello everyone." },
      { start: 20, end: 22, text: "My name is Anna." },
      { start: 22, end: 28, text: "I'm very happy to share my family story with you today." },
      { start: 28, end: 36, text: "I come from a small and loving family and I want to tell you all about them." },
      { start: 36, end: 39, text: "I live with four people: my father, my mother, my older sister, and my younger brother." },
      { start: 39, end: 45, text: "My father's name is Mark." },
      { start: 45, end: 48, text: "He is a doctor." },
      { start: 48, end: 51, text: "Every day he works in a busy hospital and helps many people feel better." },
      { start: 51, end: 57, text: "I admire him because he is very kind and always takes care of others." },
      { start: 57, end: 64, text: "My father loves his job and he often tells me stories about how he helps his patients." },
      { start: 64, end: 72, text: "My mother's name is Linda." },
      { start: 72, end: 75, text: "She is a teacher." },
      { start: 75, end: 78, text: "She works in a local school where she teaches young children." },
      { start: 78, end: 85, text: "My mother is very patient and friendly." },
      { start: 85, end: 89, text: "She enjoys reading and writing and she always helps me with my homework when I study in the evening." },
      { start: 89, end: 98, text: "I feel very lucky to have such a caring and smart mother." },
      { start: 98, end: 104, text: "I also have an older sister." },
      { start: 104, end: 107, text: "Her name is Emily." },
      { start: 107, end: 110, text: "Emily is a high school student." },
      { start: 110, end: 114, text: "She studies hard and loves art." },
      { start: 114, end: 119, text: "In her free time, she likes to draw and paint." },
      { start: 119, end: 125, text: "Sometimes she shows me her beautiful pictures and I feel very proud of her." },
      { start: 125, end: 132, text: "Emily is very supportive and she always encourages me to try new things." },
      { start: 132, end: 139, text: "My younger brother is Tom." },
      { start: 139, end: 142, text: "He is 8 years old and full of energy." },
      { start: 142, end: 147, text: "Tom loves playing with his toys and riding his bicycle in the park." },
      { start: 147, end: 154, text: "He is always laughing and making everyone smile." },
      { start: 154, end: 160, text: "Even though he is younger, he is very curious and loves to ask questions about everything he sees." },
      { start: 160, end: 170, text: "Every morning, our family eats breakfast together." },
      { start: 170, end: 175, text: "We sit at the table and talk about our plans for the day." },
      { start: 175, end: 181, text: "After breakfast, my father leaves for the hospital." },
      { start: 181, end: 186, text: "My mother goes to school and my sister and I get ready for our studies." },
      { start: 186, end: 194, text: "In the afternoon, we sometimes meet at home and share our experiences." },
      { start: 194, end: 201, text: "In the evening, we have dinner together and enjoy simple happy moments." },
      { start: 201, end: 210, text: "On weekends, we like to spend time together outdoors." },
      { start: 210, end: 215, text: "We go for walks in the park and visit local markets or sometimes watch a movie together at home." },
      { start: 215, end: 225, text: "These moments make me feel very happy and connected with my family." },
      { start: 225, end: 232, text: "Thank you for listening to my story about my family." },
      { start: 232, end: 237, text: "I hope you enjoyed learning about each member and their daily lives." },
      { start: 237, end: 244, text: "I love my family and I am grateful for every day we spend together." },
    ],
  },

  "3": {
    title: "My favorite food",
    subtitle: "LESSON 3",
    videoSrc: "/videos/a1/Lesson 3.mp4",
    transcript: `Listening for beginners. Today's topic is food in Italy. After the story, I will ask you some questions to check on your understanding. Don't worry if you don't understand everything. Listen carefully and just focus on the key information. Are you ready? Let's begin. Hello, my name is Maria and I'm 40 years old. I'm from Italy, a country known all over the world for its food. Today I want to talk to you about the amazing food culture in my country. In Italy, food is very important. We don't just eat to stay alive. We eat to enjoy life. We take our time to prepare and eat our meals. Food brings people together. The most important meal of the day is lunch. It's usually around 1 or 2 in the afternoon. Many Italians like me like to eat with their families or friends. It's a moment to relax and talk about the day. For breakfast, we usually drink coffee. Most people love espresso or cappuccino. And we eat something sweet like cornetto, similar to a croissant. In the north of Italy, people sometimes eat a light breakfast with bread and jam. But in the south, it's more common to have pastries. Or salty food like pizza. A small pizza made with tomato and mozzarella. For lunch, Italians love pasta. There are many types of pasta. Spaghetti, penne, fusilli, ravioli, etc. We often eat pasta with tomato sauce or creamy sauce. My favorite pasta is pasta al pomodoro. Which is pasta with tomato sauce, basil, A little bit of olive oil and some grated Parmigiano cheese. It's simple but delicious. In Italy, we also have a tradition of eating antipasti. These are small dishes before the main meal. This can be olives, cheese, salami with fresh bread. After lunch, we usually eat a dessert. Like tiramisu or cannoli. And drink coffee. Of course, dinner in Italy is usually lighter. We usually have fish, meat, or chicken with salad. I love making a simple salad. But the most popular dish for dinner, especially with friends, is pizza. I love parmigiana pizza. It's pizza made with tomato, mozzarella, and fried eggplants. And also grated Parmigiano cheese. It's delicious. In my country, every region has its own special dishes. In the north, you can find a lot of rice dishes like risotto. In the south, they use more tomatoes, olives, and seafood. For example, in Sicily, you can eat pasta con le sarde. Which is pasta with sardines. And in the region of Emilia-Romagna, you can try lasagna or tortellini. Italian food is so diverse. And each region is proud of its recipes. Food is not just about eating. It's very important for us. Because it's part of our tradition and culture. We always cook with love. And we love sharing our meals with our family and friends. If you visit Italy, I recommend you try food in every region. Thank you for listening. I hope you feel inspired to try some Italian food.`,
    segments: [
      { start: 0, end: 8, text: "Listening for beginners." },
      { start: 8, end: 13, text: "Today's topic is food in Italy." },
      { start: 13, end: 20, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 20, end: 28, text: "Don't worry if you don't understand everything." },
      { start: 28, end: 36, text: "Listen carefully and just focus on the key information." },
      { start: 36, end: 41, text: "Are you ready?" },
      { start: 41, end: 49, text: "Let's begin." },
      { start: 49, end: 56, text: "Hello, my name is Maria and I'm 40 years old." },
      { start: 56, end: 63, text: "I'm from Italy, a country known all over the world for its food." },
      { start: 63, end: 70, text: "Today I want to talk to you about the amazing food culture in my country." },
      { start: 70, end: 75, text: "In Italy, food is very important." },
      { start: 75, end: 82, text: "We don't just eat to stay alive." },
      { start: 82, end: 88, text: "We eat to enjoy life." },
      { start: 88, end: 94, text: "We take our time to prepare and eat our meals." },
      { start: 94, end: 101, text: "Food brings people together." },
      { start: 101, end: 110, text: "The most important meal of the day is lunch." },
      { start: 110, end: 117, text: "It's usually around 1 or 2 in the afternoon." },
      { start: 117, end: 123, text: "Many Italians like me like to eat with their families or friends." },
      { start: 123, end: 129, text: "It's a moment to relax and talk about the day." },
      { start: 129, end: 136, text: "For breakfast, we usually drink coffee." },
      { start: 136, end: 145, text: "Most people love espresso or cappuccino." },
      { start: 145, end: 151, text: "And we eat something sweet like cornetto, similar to a croissant." },
      { start: 151, end: 156, text: "In the north of Italy, people sometimes eat a light breakfast with bread and jam." },
      { start: 156, end: 163, text: "But in the south, it's more common to have pastries." },
      { start: 163, end: 168, text: "Or salty food like pizza." },
      { start: 168, end: 173, text: "A small pizza made with tomato and mozzarella." },
      { start: 173, end: 180, text: "For lunch, Italians love pasta." },
      { start: 180, end: 188, text: "There are many types of pasta." },
      { start: 188, end: 194, text: "Spaghetti, penne, fusilli, ravioli, etc." },
      { start: 194, end: 199, text: "We often eat pasta with tomato sauce or creamy sauce." },
      { start: 199, end: 208, text: "My favorite pasta is pasta al pomodoro." },
      { start: 208, end: 215, text: "Which is pasta with tomato sauce, basil, A little bit of olive oil and some grated Parmigiano cheese." },
      { start: 215, end: 222, text: "It's simple but delicious." },
      { start: 222, end: 228, text: "In Italy, we also have a tradition of eating antipasti." },
      { start: 228, end: 235, text: "These are small dishes before the main meal." },
      { start: 235, end: 241, text: "This can be olives, cheese, salami with fresh bread." },
      { start: 241, end: 247, text: "After lunch, we usually eat a dessert." },
      { start: 247, end: 253, text: "Like tiramisu or cannoli." },
      { start: 253, end: 262, text: "And drink coffee." },
      { start: 262, end: 269, text: "Of course, dinner in Italy is usually lighter." },
      { start: 269, end: 274, text: "We usually have fish, meat, or chicken with salad." },
      { start: 274, end: 283, text: "I love making a simple salad." },
      { start: 283, end: 289, text: "But the most popular dish for dinner, especially with friends, is pizza." },
      { start: 289, end: 298, text: "I love parmigiana pizza." },
      { start: 298, end: 305, text: "It's pizza made with tomato, mozzarella, and fried eggplants." },
      { start: 305, end: 311, text: "And also grated Parmigiano cheese." },
      { start: 311, end: 320, text: "It's delicious." },
      { start: 320, end: 327, text: "In my country, every region has its own special dishes." },
      { start: 327, end: 334, text: "In the north, you can find a lot of rice dishes like risotto." },
      { start: 334, end: 342, text: "In the south, they use more tomatoes, olives, and seafood." },
      { start: 342, end: 349, text: "For example, in Sicily, you can eat pasta con le sarde." },
      { start: 349, end: 358, text: "Which is pasta with sardines." },
      { start: 358, end: 363, text: "And in the region of Emilia-Romagna, you can try lasagna or tortellini." },
      { start: 363, end: 372, text: "Italian food is so diverse." },
      { start: 372, end: 378, text: "And each region is proud of its recipes." },
      { start: 378, end: 383, text: "Food is not just about eating." },
      { start: 383, end: 389, text: "It's very important for us." },
      { start: 389, end: 395, text: "Because it's part of our tradition and culture." },
      { start: 395, end: 402, text: "We always cook with love." },
      { start: 402, end: 410, text: "And we love sharing our meals with our family and friends." },
      { start: 410, end: 415, text: "If you visit Italy, I recommend you try food in every region." },
    ],
  },

  "4": {
    title: "My Home",
    subtitle: "LESSON 4",
    videoSrc: "/videos/a1/Lesson 4.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners. Today's topic is my house. After the story, I will ask you some questions to check on your understanding. Don't worry if you don't understand everything. Just focus on the key information. Are you ready? Let's begin. Hello, my name is Linda. I'm 45 years old and I live in a small house in the city. It's not very big, but I love it because it feels like home. I have lived in this house for 10 years, and I'm very happy here. My house has four rooms, and each one is special to me. First, I'll tell you about the kitchen. The kitchen is very important in my house. I spend a lot of time cooking and eating with my family. It is not very big, but it's comfortable. I have a stove, a fridge, and a dishwasher. The kitchen is white, and the walls are painted light blue. There is a small window above the sink. I love looking outside when I'm doing the dishes. I also have a big table in the middle of the kitchen. My family eats together there. I cook dinner almost every night. I like making pasta, soups, and salads. My children like to help me with simple things. Like setting the table or stirring the soup. We always have fun in the kitchen. Next, let me tell you about the living room. The living room is very cozy. It's the place where my family relaxes after a long day. We have a big sofa, two armchairs, and a coffee table. There is a television on the wall. We watch movies together on weekends. I also have some plants in the living room. They make the space feel fresh and green. The walls are painted yellow. This makes the room feel warm and sunny. In the winter, I like to sit on the sofa. With a blanket, drink tea, and read a book. My children like to play board games in the living room. We spend a lot of time together there. Now, I'll tell you about my bedroom. It's a small room, but it's very peaceful. I sleep here, of course. I also like spending time reading and relaxing. I have a big bed with soft pillows and a warm blanket. There is a small desk. I can work on my computer or write there. I don't have many things in my bedroom. I like it to be simple and calm. The walls are light green. There is a small window next to the bed. I like to look outside at the trees and birds. When I wake up in the morning. My bedroom is the place where I rest and feel calm. It's my favorite room in the house. Finally, I want to talk to you about the bathroom. The bathroom is small but very functional. It has a shower, a toilet, and a sink. I have a mirror above the sink. I brush my teeth there every morning. The walls are white. There is a small shelf for towels and soap. There is a window in the bathroom too. I always open it when I take a shower. It makes the room feel fresh. I like to spend a little time in the bathroom in the morning. To get ready for the day. It's a quiet and private place. So, that's my house. I feel happy here. It's not big, but it's perfect for me and my family. Each room is important to me. And I love spending time in every room. I hope you enjoyed hearing about my home.`,
    segments: [
      { start: 0, end: 5, text: "Hello and welcome to this slow English listening for beginners." },
      { start: 5, end: 12, text: "Today's topic is my house." },
      { start: 12, end: 19, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 19, end: 26, text: "Don't worry if you don't understand everything." },
      { start: 26, end: 35, text: "Just focus on the key information." },
      { start: 35, end: 42, text: "Are you ready?" },
      { start: 42, end: 47, text: "Let's begin." },
      { start: 47, end: 55, text: "Hello, my name is Linda." },
      { start: 55, end: 63, text: "I'm 45 years old and I live in a small house in the city." },
      { start: 63, end: 72, text: "It's not very big, but I love it because it feels like home." },
      { start: 72, end: 78, text: "I have lived in this house for 10 years, and I'm very happy here." },
      { start: 78, end: 86, text: "My house has four rooms, and each one is special to me." },
      { start: 86, end: 92, text: "First, I'll tell you about the kitchen." },
      { start: 92, end: 103, text: "The kitchen is very important in my house." },
      { start: 103, end: 110, text: "I spend a lot of time cooking and eating with my family." },
      { start: 110, end: 119, text: "It is not very big, but it's comfortable." },
      { start: 119, end: 128, text: "I have a stove, a fridge, and a dishwasher." },
      { start: 128, end: 134, text: "The kitchen is white, and the walls are painted light blue." },
      { start: 134, end: 140, text: "There is a small window above the sink." },
      { start: 140, end: 147, text: "I love looking outside when I'm doing the dishes." },
      { start: 147, end: 152, text: "I also have a big table in the middle of the kitchen." },
      { start: 152, end: 158, text: "My family eats together there." },
      { start: 158, end: 164, text: "I cook dinner almost every night." },
      { start: 164, end: 171, text: "I like making pasta, soups, and salads." },
      { start: 171, end: 178, text: "My children like to help me with simple things." },
      { start: 178, end: 187, text: "Like setting the table or stirring the soup." },
      { start: 187, end: 193, text: "We always have fun in the kitchen." },
      { start: 193, end: 198, text: "Next, let me tell you about the living room." },
      { start: 198, end: 207, text: "The living room is very cozy." },
      { start: 207, end: 215, text: "It's the place where my family relaxes after a long day." },
      { start: 215, end: 220, text: "We have a big sofa, two armchairs, and a coffee table." },
      { start: 220, end: 226, text: "There is a television on the wall." },
      { start: 226, end: 232, text: "We watch movies together on weekends." },
      { start: 232, end: 239, text: "I also have some plants in the living room." },
      { start: 239, end: 244, text: "They make the space feel fresh and green." },
      { start: 244, end: 252, text: "The walls are painted yellow." },
      { start: 252, end: 257, text: "This makes the room feel warm and sunny." },
      { start: 257, end: 263, text: "In the winter, I like to sit on the sofa." },
      { start: 263, end: 270, text: "With a blanket, drink tea, and read a book." },
      { start: 270, end: 278, text: "My children like to play board games in the living room." },
      { start: 278, end: 285, text: "We spend a lot of time together there." },
      { start: 285, end: 291, text: "Now, I'll tell you about my bedroom." },
      { start: 291, end: 295, text: "It's a small room, but it's very peaceful." },
      { start: 295, end: 301, text: "I sleep here, of course." },
      { start: 301, end: 309, text: "I also like spending time reading and relaxing." },
      { start: 309, end: 313, text: "I have a big bed with soft pillows and a warm blanket." },
      { start: 313, end: 319, text: "There is a small desk." },
      { start: 319, end: 324, text: "I can work on my computer or write there." },
      { start: 324, end: 332, text: "I don't have many things in my bedroom." },
      { start: 332, end: 336, text: "I like it to be simple and calm." },
      { start: 336, end: 343, text: "The walls are light green." },
      { start: 343, end: 351, text: "There is a small window next to the bed." },
      { start: 351, end: 356, text: "I like to look outside at the trees and birds." },
      { start: 356, end: 365, text: "When I wake up in the morning." },
      { start: 365, end: 371, text: "My bedroom is the place where I rest and feel calm." },
      { start: 371, end: 376, text: "It's my favorite room in the house." },
      { start: 376, end: 381, text: "Finally, I want to talk to you about the bathroom." },
      { start: 381, end: 388, text: "The bathroom is small but very functional." },
      { start: 388, end: 393, text: "It has a shower, a toilet, and a sink." },
      { start: 393, end: 400, text: "I have a mirror above the sink." },
      { start: 400, end: 404, text: "I brush my teeth there every morning." },
      { start: 404, end: 415, text: "The walls are white." },
      { start: 415, end: 420, text: "There is a small shelf for towels and soap." },
      { start: 420, end: 426, text: "There is a window in the bathroom too." },
      { start: 426, end: 431, text: "I always open it when I take a shower." },
      { start: 431, end: 438, text: "It makes the room feel fresh." },
      { start: 438, end: 443, text: "I like to spend a little time in the bathroom in the morning." },
      { start: 443, end: 449, text: "To get ready for the day." },
      { start: 449, end: 454, text: "It's a quiet and private place." },
      { start: 454, end: 459, text: "So, that's my house." },
      { start: 459, end: 465, text: "I feel happy here." },
      { start: 465, end: 470, text: "It's not big, but it's perfect for me and my family." },
      { start: 470, end: 480, text: "Each room is important to me." },
      { start: 480, end: 485, text: "And I love spending time in every room." },
      { start: 485, end: 494, text: "I hope you enjoyed hearing about my home." },
      { start: 494, end: 501, text: "" },
      { start: 501, end: 507, text: "" },
      { start: 507, end: 514, text: "" },
      { start: 514, end: 521, text: "" },
      { start: 521, end: 530, text: "" },
      { start: 530, end: 535, text: "" },
      { start: 535, end: 541, text: "" },
      { start: 541, end: 547, text: "" },
      { start: 547, end: 556, text: "" },
      { start: 556, end: 561, text: "" },
      { start: 561, end: 568, text: "" },
      { start: 568, end: 574, text: "" },
    ],
  },

  "5": {
    title: "My Pet",
    subtitle: "LESSON 5",
    videoSrc: "/videos/a1/Lesson 5.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners. Today's topic is my favorite pet.
After the story, I will ask you some questions to check on your understanding.
Don't worry if you don't understand everything. Just focus on the key information.
Are you ready? Let's begin.
Hello, my name is Sarah.
I am 40 years old.
I live in a small house with my family.
I have a husband and two children.
Today I want to talk to you about my pet.
I have a cat.
His name is Milo.
He is three years old.
Milo is a small white cat with beautiful blue eyes.
He is very soft and fluffy.
When I touch his fur, it feels like a soft blanket.
I love him very much.
Milo is a very special cat.
He likes to play and sleep.
In the morning, he sits near the window and watches the birds.
He moves his tail and makes small sounds.
Sometimes he jumps and tries to catch them, but of course he cannot.
It is very fun to watch him.
In the afternoon, Milo sleeps a lot.
He has a favorite place in the house, the big sofa in the living room.
He likes to sleep there for hours.
Sometimes he sleeps in the sun near the window.
He loves warm places.
Milo is also very playful.
In the evening, he has a lot of energy.
He runs around the house and plays with his toys.
He has a small toy mouse, a ball, and a long string.
He likes to catch the string when I move it.
It is our favorite game.
He jumps, runs, and has so much fun.
My children also like to play with him.
Milo loves food.
He eats cat food and drinks fresh water every day.
Sometimes I give him special treats like a little fish or some chicken.
When he smells fish, he comes running to the kitchen.
He is always so excited to eat his favorite food.
Milo is not only playful but also very sweet.
He likes to be close to me.
In the evening when we sit on the sofa and I read a book, he comes and sits next to me.
He purs softly.
This makes me feel happy and relaxed.
At night, Milo sleeps in my bed.
He finds a warm spot near my feet and sleeps there all night.
Sometimes he wakes up and moves, but he always comes back to sleep near me.
He makes me feel safe and comfortable.
Milo is part of my family.
He is not just a pet.
He is my friend.
When I feel sad or tired, he stays close to me, he looks at me with his big blue eyes and I feel better.
I love my pet because he makes me feel happy.
He is always there for me.
He is funny, sweet, and full of love.`,
    segments: [
      { start: 0, end: 8, text: "Hello and welcome to this slow English listening for beginners." },
      { start: 8, end: 15, text: "Today's topic is my favorite pet." },
      { start: 15, end: 20, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 20, end: 25, text: "Don't worry if you don't understand everything." },
      { start: 25, end: 30, text: "Just focus on the key information." },
      { start: 30, end: 36, text: "Are you ready?" },
      { start: 36, end: 40, text: "Let's begin." },
      { start: 40, end: 46, text: "Hello, my name is Sarah." },
      { start: 46, end: 54, text: "I am 40 years old." },
      { start: 54, end: 59, text: "I live in a small house with my family." },
      { start: 59, end: 62, text: "I have a husband and two children." },
      { start: 62, end: 67, text: "Today I want to talk to you about my pet." },
      { start: 67, end: 72, text: "I have a cat." },
      { start: 72, end: 78, text: "His name is Milo." },
      { start: 78, end: 85, text: "He is three years old." },
      { start: 85, end: 92, text: "Milo is a small white cat with beautiful blue eyes." },
      { start: 92, end: 98, text: "He is very soft and fluffy." },
      { start: 98, end: 103, text: "When I touch his fur, it feels like a soft blanket." },
      { start: 103, end: 108, text: "I love him very much." },
      { start: 108, end: 116, text: "Milo is a very special cat." },
      { start: 116, end: 125, text: "He likes to play and sleep." },
      { start: 125, end: 131, text: "In the morning, he sits near the window and watches the birds." },
      { start: 131, end: 137, text: "He moves his tail and makes small sounds." },
      { start: 137, end: 143, text: "Sometimes he jumps and tries to catch them, but of course he cannot." },
      { start: 143, end: 150, text: "It is very fun to watch him." },
      { start: 150, end: 155, text: "In the afternoon, Milo sleeps a lot." },
      { start: 155, end: 162, text: "He has a favorite place in the house, the big sofa in the living room." },
      { start: 162, end: 168, text: "He likes to sleep there for hours." },
      { start: 168, end: 173, text: "Sometimes he sleeps in the sun near the window." },
      { start: 173, end: 179, text: "He loves warm places." },
      { start: 179, end: 186, text: "Milo is also very playful." },
      { start: 186, end: 194, text: "In the evening, he has a lot of energy." },
      { start: 194, end: 200, text: "He runs around the house and plays with his toys." },
      { start: 200, end: 205, text: "He has a small toy mouse, a ball, and a long string." },
      { start: 205, end: 212, text: "He likes to catch the string when I move it." },
      { start: 212, end: 219, text: "It is our favorite game." },
      { start: 219, end: 223, text: "He jumps, runs, and has so much fun." },
      { start: 223, end: 230, text: "My children also like to play with him." },
      { start: 230, end: 239, text: "Milo loves food." },
      { start: 239, end: 248, text: "He eats cat food and drinks fresh water every day." },
      { start: 248, end: 254, text: "Sometimes I give him special treats like a little fish or some chicken." },
      { start: 254, end: 260, text: "When he smells fish, he comes running to the kitchen." },
      { start: 260, end: 266, text: "He is always so excited to eat his favorite food." },
      { start: 266, end: 275, text: "Milo is not only playful but also very sweet." },
      { start: 275, end: 280, text: "He likes to be close to me." },
      { start: 280, end: 286, text: "In the evening when we sit on the sofa and I read a book, he comes and sits next to me." },
      { start: 286, end: 291, text: "He purs softly." },
      { start: 291, end: 299, text: "This makes me feel happy and relaxed." },
      { start: 299, end: 305, text: "At night, Milo sleeps in my bed." },
      { start: 305, end: 311, text: "He finds a warm spot near my feet and sleeps there all night." },
      { start: 311, end: 316, text: "Sometimes he wakes up and moves, but he always comes back to sleep near me." },
      { start: 316, end: 321, text: "He makes me feel safe and comfortable." },
      { start: 321, end: 326, text: "Milo is part of my family." },
      { start: 326, end: 330, text: "He is not just a pet." },
      { start: 330, end: 337, text: "He is my friend." },
      { start: 337, end: 344, text: "When I feel sad or tired, he stays close to me, he looks at me with his big blue eyes and I feel better." },
      { start: 344, end: 350, text: "I love my pet because he makes me feel happy." },
      { start: 350, end: 356, text: "He is always there for me." },
      { start: 356, end: 360, text: "He is funny, sweet, and full of love." },
      { start: 360, end: 372, text: "" },
      { start: 372, end: 377, text: "" },
      { start: 377, end: 387, text: "" },
      { start: 387, end: 392, text: "" },
      { start: 392, end: 399, text: "" },
      { start: 399, end: 405, text: "" },
      { start: 405, end: 413, text: "" },
      { start: 413, end: 419, text: "" },
      { start: 419, end: 429, text: "" },
      { start: 429, end: 435, text: "" },
      { start: 435, end: 440, text: "" },
      { start: 440, end: 446, text: "" },
    ],
  },

  "6": {
    title: "The weather today",
    subtitle: "LESSON 6",
    videoSrc: "/videos/a1/Lesson 6.mp4",
    transcript: `Hello and welcome back to this slow English listening for beginners. Today's topic is the weather and the seasons.
After the story, I will ask you some questions to check on your understanding.
Don't worry if you don't understand everything. Just focus on the key information.
Are you ready? Let's begin.
There are four seasons in the year.
Spring, summer, autumn, and winter.
Each season has different weather.
In spring, the weather is warm, the sun shines, and sometimes it rains.
Flowers grow and trees turn green.
Birds sing and people like to go outside.
Many people enjoy walking in the park or having picnics.
Some days are cloudy, but it is usually a nice season.
In summer, it is hot and sunny.
People go to the beach and swim in the sea.
They wear shorts and t-shirts, sunglasses.
Sometimes there are storms with rain and thunder.
In some countries, summer is very dry and the sun is very strong.
People drink cold drinks and eat ice cream to stay cool.
Some families go on vacation during summer.
In autumn, the weather gets cooler.
The leaves on the trees turn yellow, orange, and red.
It is often windy and rainy.
People wear jackets and scarves.
In some places, autumn is a time for harvesting fruits and vegetables.
The days become shorter and the nights are longer.
Some people enjoy drinking hot tea or coffee to stay warm.
In winter it is very cold.
Sometimes it snows.
People wear warm clothes like coats, hats, and gloves.
Some people make snowman or go skiing.
In many places, winter is the coldest season.
The days are short and the nights are long.
Some animals sleep during the winter like bears.
People like to stay inside and drink hot chocolate.
My favorite season is summer.
Summer is my favorite season because it's full of energy and fun activities.
The long sunny days make it perfect for spending time outside.
Many people enjoy going to the beach, playing sports, or having barbecues with family and friends.
The bright blue sky and the warm breeze create a relaxing atmosphere.
Summer is also a time for delicious food like fresh fruits, ice cream, and cold drinks.
The nights are warm and people can go out for evening walks or watch the stars.
Many festivals and outdoor events take place in the summer, making it an exciting season.
Even though the heat can sometimes be strong, swimming in the sea or drinking a cool lemonade makes everything better.
Some people check the weather on their phone or watch the weather forecast on TV.
This helps them decide what to wear or if they need an umbrella.`,
    segments: [
      { start: 0, end: 11, text: "Hello and welcome back to this slow English listening for beginners." },
      { start: 11, end: 17, text: "Today's topic is the weather and the seasons." },
      { start: 17, end: 22, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 22, end: 29, text: "Don't worry if you don't understand everything." },
      { start: 29, end: 34, text: "Just focus on the key information." },
      { start: 34, end: 41, text: "Are you ready?" },
      { start: 41, end: 48, text: "Let's begin." },
      { start: 48, end: 53, text: "There are four seasons in the year." },
      { start: 53, end: 58, text: "Spring, summer, autumn, and winter." },
      { start: 58, end: 66, text: "Each season has different weather." },
      { start: 66, end: 74, text: "In spring, the weather is warm, the sun shines, and sometimes it rains." },
      { start: 74, end: 82, text: "Flowers grow and trees turn green." },
      { start: 82, end: 89, text: "Birds sing and people like to go outside." },
      { start: 89, end: 95, text: "Many people enjoy walking in the park or having picnics." },
      { start: 95, end: 100, text: "Some days are cloudy, but it is usually a nice season." },
      { start: 100, end: 105, text: "In summer, it is hot and sunny." },
      { start: 105, end: 112, text: "People go to the beach and swim in the sea." },
      { start: 112, end: 119, text: "They wear shorts and t-shirts, sunglasses." },
      { start: 119, end: 127, text: "Sometimes there are storms with rain and thunder." },
      { start: 127, end: 137, text: "In some countries, summer is very dry and the sun is very strong." },
      { start: 137, end: 145, text: "People drink cold drinks and eat ice cream to stay cool." },
      { start: 145, end: 153, text: "Some families go on vacation during summer." },
      { start: 153, end: 160, text: "In autumn, the weather gets cooler." },
      { start: 160, end: 169, text: "The leaves on the trees turn yellow, orange, and red." },
      { start: 169, end: 175, text: "It is often windy and rainy." },
      { start: 175, end: 182, text: "People wear jackets and scarves." },
      { start: 182, end: 191, text: "In some places, autumn is a time for harvesting fruits and vegetables." },
      { start: 191, end: 199, text: "The days become shorter and the nights are longer." },
      { start: 199, end: 208, text: "Some people enjoy drinking hot tea or coffee to stay warm." },
      { start: 208, end: 213, text: "In winter it is very cold." },
      { start: 213, end: 218, text: "Sometimes it snows." },
      { start: 218, end: 226, text: "People wear warm clothes like coats, hats, and gloves." },
      { start: 226, end: 233, text: "Some people make snowman or go skiing." },
      { start: 233, end: 241, text: "In many places, winter is the coldest season." },
      { start: 241, end: 246, text: "The days are short and the nights are long." },
      { start: 246, end: 254, text: "Some animals sleep during the winter like bears." },
      { start: 254, end: 261, text: "People like to stay inside and drink hot chocolate." },
      { start: 261, end: 266, text: "My favorite season is summer." },
      { start: 266, end: 273, text: "Summer is my favorite season because it's full of energy and fun activities." },
      { start: 273, end: 281, text: "The long sunny days make it perfect for spending time outside." },
      { start: 281, end: 290, text: "Many people enjoy going to the beach, playing sports, or having barbecues with family and friends." },
      { start: 290, end: 298, text: "The bright blue sky and the warm breeze create a relaxing atmosphere." },
      { start: 298, end: 307, text: "Summer is also a time for delicious food like fresh fruits, ice cream, and cold drinks." },
      { start: 307, end: 315, text: "The nights are warm and people can go out for evening walks or watch the stars." },
      { start: 315, end: 324, text: "Many festivals and outdoor events take place in the summer, making it an exciting season." },
      { start: 324, end: 331, text: "Even though the heat can sometimes be strong, swimming in the sea or drinking a cool lemonade makes everything better." },
      { start: 331, end: 340, text: "Some people check the weather on their phone or watch the weather forecast on TV." },
      { start: 340, end: 346, text: "This helps them decide what to wear or if they need an umbrella." },
      { start: 346, end: 355, text: "" },
      { start: 355, end: 361, text: "" },
      { start: 361, end: 367, text: "" },
      { start: 367, end: 371, text: "" },
      { start: 371, end: 385, text: "" },
      { start: 385, end: 390, text: "" },
      { start: 390, end: 402, text: "" },
      { start: 402, end: 407, text: "" },
      { start: 407, end: 419, text: "" },
      { start: 419, end: 426, text: "" },
      { start: 426, end: 434, text: "" },
      { start: 434, end: 440, text: "" },
      { start: 440, end: 448, text: "" },
      { start: 448, end: 454, text: "" },
      { start: 454, end: 462, text: "" },
      { start: 462, end: 467, text: "" },
    ],
  },

  "7": {
    title: "My School",
    subtitle: "LESSON 7",
    videoSrc: "/videos/a1/Lesson 7.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners. Today's topic is my favorite subjects.
After the story, I will ask you some questions to check on your understanding.
Don't worry if you don't understand everything. Just focus on the key information.
Are you ready? Let's begin.
Today, I want to tell you about my favorite subjects.
When I was a student, I liked some subjects more than others.
Some subjects were very interesting and some were a little hard for me.
Let me tell you which ones I liked the most and why.
One of my favorite subject was English.
I always enjoyed learning new words and reading books in English.
I loved reading stories and poems.
My teacher was very nice and she helped me a lot.
I liked writing short stories and practicing speaking English with my classmates.
We also listened to songs in English and tried to understand the lyrics.
This was very fun for me.
I enjoyed speaking in English and learning about new cultures through language.
I always looked forward to English class because it was exciting and different every day.
Another subject I really liked was history.
I loved learning about the past.
My favorite part of history was learning about famous people and important events that happened long ago.
I enjoyed reading about kings, queens, and big wars.
My history teacher told many interesting stories about different countries.
It was exciting to learn how the world changed over time and how history affects our lives today.
History made me think a lot and I always wanted to learn more.
It was also fun to learn about ancient civilization like Egyptians, Greeks, and Romans.
They had amazing cultures and interesting stories.
I also enjoyed art.
In art class, I could be creative and use my imagination.
I liked drawing pictures with pencils and coloring them with paints.
Sometimes we made things with clay or other materials.
I enjoyed painting beautiful landscapes and creating colorful images.
Art class was a time when I could relax and express myself.
I wasn't the best artist, but I always had fun creating new things.
I loved the feeling of finishing artwork and showing it to my friends and teachers.
Art made me happy because it was a creative and peaceful subject.
Finally, I liked physical education.
PE was a class where I could be active and had fun.
I enjoyed playing sports with my friends.
We played football, basketball, and sometimes ran races.
PE was also a good way to stay healthy.
I liked being outside and moving around and it was fun to compete with my classmates.
Sometimes we also did exercise to make our bodies stronger.
PE was a great way to relax after sitting in class for a long time.
It made me feel good and gave me energy.
So, these were some of my favorite subjects when I was at school.
English, history, art, and PE were the classes I liked the most.
Each of these subjects taught me something new and gave me joy.
I think every student has subjects they enjoy and I was lucky to have some that made me happy and excited.
Learning was always fun for me and I will always remember these subjects with a smile.`,
    segments: [
      { start: 0, end: 6, text: "Hello and welcome to this slow English listening for beginners." },
      { start: 6, end: 13, text: "Today's topic is my favorite subjects." },
      { start: 13, end: 19, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 19, end: 24, text: "Don't worry if you don't understand everything." },
      { start: 24, end: 29, text: "Just focus on the key information." },
      { start: 29, end: 36, text: "Are you ready?" },
      { start: 36, end: 43, text: "Let's begin." },
      { start: 43, end: 50, text: "Today, I want to tell you about my favorite subjects." },
      { start: 50, end: 56, text: "When I was a student, I liked some subjects more than others." },
      { start: 56, end: 62, text: "Some subjects were very interesting and some were a little hard for me." },
      { start: 62, end: 69, text: "Let me tell you which ones I liked the most and why." },
      { start: 69, end: 74, text: "One of my favorite subject was English." },
      { start: 74, end: 81, text: "I always enjoyed learning new words and reading books in English." },
      { start: 81, end: 88, text: "I loved reading stories and poems." },
      { start: 88, end: 96, text: "My teacher was very nice and she helped me a lot." },
      { start: 96, end: 100, text: "I liked writing short stories and practicing speaking English with my classmates." },
      { start: 100, end: 107, text: "We also listened to songs in English and tried to understand the lyrics." },
      { start: 107, end: 112, text: "This was very fun for me." },
      { start: 112, end: 118, text: "I enjoyed speaking in English and learning about new cultures through language." },
      { start: 118, end: 123, text: "I always looked forward to English class because it was exciting and different every day." },
      { start: 123, end: 128, text: "Another subject I really liked was history." },
      { start: 128, end: 134, text: "I loved learning about the past." },
      { start: 134, end: 140, text: "My favorite part of history was learning about famous people and important events that happened long ago." },
      { start: 140, end: 146, text: "I enjoyed reading about kings, queens, and big wars." },
      { start: 146, end: 153, text: "My history teacher told many interesting stories about different countries." },
      { start: 153, end: 158, text: "It was exciting to learn how the world changed over time and how history affects our lives today." },
      { start: 158, end: 164, text: "History made me think a lot and I always wanted to learn more." },
      { start: 164, end: 171, text: "It was also fun to learn about ancient civilization like Egyptians, Greeks, and Romans." },
      { start: 171, end: 176, text: "They had amazing cultures and interesting stories." },
      { start: 176, end: 182, text: "I also enjoyed art." },
      { start: 182, end: 187, text: "In art class, I could be creative and use my imagination." },
      { start: 187, end: 192, text: "I liked drawing pictures with pencils and coloring them with paints." },
      { start: 192, end: 198, text: "Sometimes we made things with clay or other materials." },
      { start: 198, end: 204, text: "I enjoyed painting beautiful landscapes and creating colorful images." },
      { start: 204, end: 210, text: "Art class was a time when I could relax and express myself." },
      { start: 210, end: 217, text: "I wasn't the best artist, but I always had fun creating new things." },
      { start: 217, end: 224, text: "I loved the feeling of finishing artwork and showing it to my friends and teachers." },
      { start: 224, end: 231, text: "Art made me happy because it was a creative and peaceful subject." },
      { start: 231, end: 236, text: "Finally, I liked physical education." },
      { start: 236, end: 241, text: "PE was a class where I could be active and had fun." },
      { start: 241, end: 247, text: "I enjoyed playing sports with my friends." },
      { start: 247, end: 253, text: "We played football, basketball, and sometimes ran races." },
      { start: 253, end: 259, text: "PE was also a good way to stay healthy." },
      { start: 259, end: 264, text: "I liked being outside and moving around and it was fun to compete with my classmates." },
      { start: 264, end: 271, text: "Sometimes we also did exercise to make our bodies stronger." },
      { start: 271, end: 276, text: "PE was a great way to relax after sitting in class for a long time." },
      { start: 276, end: 282, text: "It made me feel good and gave me energy." },
      { start: 282, end: 287, text: "So, these were some of my favorite subjects when I was at school." },
      { start: 287, end: 294, text: "English, history, art, and PE were the classes I liked the most." },
      { start: 294, end: 301, text: "Each of these subjects taught me something new and gave me joy." },
      { start: 301, end: 306, text: "I think every student has subjects they enjoy and I was lucky to have some that made me happy and excited." },
      { start: 306, end: 313, text: "Learning was always fun for me and I will always remember these subjects with a smile." },
      { start: 313, end: 321, text: "" },
      { start: 321, end: 328, text: "" },
      { start: 328, end: 333, text: "" },
      { start: 333, end: 340, text: "" },
      { start: 340, end: 345, text: "" },
      { start: 345, end: 354, text: "" },
      { start: 354, end: 367, text: "" },
      { start: 367, end: 384, text: "" },
      { start: 384, end: 397, text: "" },
      { start: 397, end: 412, text: "" },
      { start: 412, end: 425, text: "" },
      { start: 425, end: 431, text: "" },
    ],
  },

  "8": {
    title: "Shopping",
    subtitle: "LESSON 8",
    videoSrc: "/videos/a1/Lesson 8.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners. Today's topic is shopping time.
After the story, I will ask you some questions to check on your understanding.
Don't worry if you don't understand everything. Just focus on the key information.
Are you ready? Let's begin.
I don't go shopping very often, but when I do, I enjoy it a lot.
Shopping is a great way to relax.
Last Saturday, I went to the mall to buy some new clothes and accessories.
I went to the clothing store.
I needed a new dress for a special occasion.
I looked at many red, blue, black, and even green dresses.
Finally, I chose a beautiful yellow dress.
It was soft and comfortable.
Then I looked at some skirts and blouses.
I found a white blouse with small buttons and a blue skirt.
They were perfect for work, so I decided to buy them.
Next, I looked for pants and jackets.
I found a pair of jeans that fit me.
They were dark blue and very comfortable.
I also tried on a black jacket.
It was stylish and warm, perfect for the cold weather.
I liked it a lot, so I bought it.
After that, I went to the shoe store.
I needed new shoes for my dress.
There were so many choices: high heels, sneakers, sandals, and boots.
I tried a pair of red high heels, but they were too tall for me.
Then I found a pair of black shoes with a small heel.
They were elegant and comfortable, so I bought them.
I also bought a pair of white sneakers for everyday use.
Then I visited the accessory shop.
I love accessories.
I looked at necklaces, bracelets, and earrings.
I bought a silver necklace and a pair of small earrings.
They were simple but beautiful.
I also needed a new handbag.
I found a lovely brown leather bag with small pockets inside.
It was just the right size for my things.
Finally, I went to the cashier to pay.
The cashier smiled and asked, "Did you find everything you needed?"
I said, "Yes, thank you."
I paid with a credit card and took my shopping bag.
I was very happy with my purchase.
Before going home, I stopped at a cafe.
I ordered a cup of coffee and a piece of chocolate cake.
It was a perfect way to end my shopping day.
I sat by the window and watched people walk with their shopping bags.
Everyone looked happy.
Shopping is fun, but it is also important to buy only what you need.
I had a great time at the mall, and now I have beautiful new clothes and accessories.`,
    segments: [
      { start: 0, end: 7, text: "Hello and welcome to this slow English listening for beginners." },
      { start: 7, end: 14, text: "Today's topic is shopping time." },
      { start: 14, end: 22, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 22, end: 27, text: "Don't worry if you don't understand everything." },
      { start: 27, end: 37, text: "Just focus on the key information." },
      { start: 37, end: 45, text: "Are you ready?" },
      { start: 45, end: 53, text: "Let's begin." },
      { start: 53, end: 62, text: "I don't go shopping very often, but when I do, I enjoy it a lot." },
      { start: 62, end: 69, text: "Shopping is a great way to relax." },
      { start: 69, end: 74, text: "Last Saturday, I went to the mall to buy some new clothes and accessories." },
      { start: 74, end: 81, text: "I went to the clothing store." },
      { start: 81, end: 90, text: "I needed a new dress for a special occasion." },
      { start: 90, end: 98, text: "I looked at many red, blue, black, and even green dresses." },
      { start: 98, end: 106, text: "Finally, I chose a beautiful yellow dress." },
      { start: 106, end: 111, text: "It was soft and comfortable." },
      { start: 111, end: 117, text: "Then I looked at some skirts and blouses." },
      { start: 117, end: 126, text: "I found a white blouse with small buttons and a blue skirt." },
      { start: 126, end: 132, text: "They were perfect for work, so I decided to buy them." },
      { start: 132, end: 141, text: "Next, I looked for pants and jackets." },
      { start: 141, end: 151, text: "I found a pair of jeans that fit me." },
      { start: 151, end: 161, text: "They were dark blue and very comfortable." },
      { start: 161, end: 170, text: "I also tried on a black jacket." },
      { start: 170, end: 176, text: "It was stylish and warm, perfect for the cold weather." },
      { start: 176, end: 186, text: "I liked it a lot, so I bought it." },
      { start: 186, end: 192, text: "After that, I went to the shoe store." },
      { start: 192, end: 201, text: "I needed new shoes for my dress." },
      { start: 201, end: 208, text: "There were so many choices: high heels, sneakers, sandals, and boots." },
      { start: 208, end: 217, text: "I tried a pair of red high heels, but they were too tall for me." },
      { start: 217, end: 225, text: "Then I found a pair of black shoes with a small heel." },
      { start: 225, end: 234, text: "They were elegant and comfortable, so I bought them." },
      { start: 234, end: 241, text: "I also bought a pair of white sneakers for everyday use." },
      { start: 241, end: 249, text: "Then I visited the accessory shop." },
      { start: 249, end: 256, text: "I love accessories." },
      { start: 256, end: 263, text: "I looked at necklaces, bracelets, and earrings." },
      { start: 263, end: 268, text: "I bought a silver necklace and a pair of small earrings." },
      { start: 268, end: 273, text: "They were simple but beautiful." },
      { start: 273, end: 280, text: "I also needed a new handbag." },
      { start: 280, end: 288, text: "I found a lovely brown leather bag with small pockets inside." },
      { start: 288, end: 296, text: "It was just the right size for my things." },
      { start: 296, end: 302, text: "Finally, I went to the cashier to pay." },
      { start: 302, end: 308, text: "I paid with a credit card and took my shopping bag." },
      { start: 308, end: 321, text: "I was very happy with my purchase." },
      { start: 321, end: 334, text: "Before going home, I stopped at a cafe." },
      { start: 334, end: 345, text: "I ordered a cup of coffee and a piece of chocolate cake." },
      { start: 345, end: 356, text: "It was a perfect way to end my shopping day." },
      { start: 356, end: 362, text: "I sat by the window and watched people walk with their shopping bags." },
      { start: 362, end: 370, text: "Everyone looked happy." },
      { start: 370, end: 381, text: "Shopping is fun, but it is also important to buy only what you need." },
      { start: 381, end: 392, text: "I had a great time at the mall, and now I have beautiful new clothes and accessories." },
      { start: 392, end: 400, text: "" },
      { start: 400, end: 408, text: "" },
      { start: 408, end: 414, text: "" },
      { start: 414, end: 422, text: "" },
    ],
  },

  "9": {
    title: "What's in my bag/backpack",
    subtitle: "LESSON 9",
    videoSrc: "/videos/a1/Lesson 9.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners. Today's topic is what's in my backpack.
After the story, I will ask you some questions to check on your understanding.
Don't worry if you don't understand everything. Just focus on the key information.
Are you ready? Let's begin.
I carry my backpack every single day.
It's not a very big bag, but it's strong and practical.
I use it for work, for shopping, and for many other things.
You know, it's like a small world that I carry with me everywhere.
Let's start with the most important item.
My laptop.
I always carry my laptop in my backpack.
It's small, so it fits perfectly.
I use it for work and personal things.
When I'm at work, I need to check emails, write documents, and attend online meetings.
I also use it for watching movies when I need a break.
It's a very useful tool and I don't like leaving home without it.
Sometimes if I have a free moment during lunch, I watch a few episodes of my favorite TV shows.
Next, I always carry a notebook.
I love writing by hand.
Even though I spend a lot of time on my computer, I still prefer to take notes on paper.
I have a lot of notebooks at home, but I carry one with me every day.
In my notebook, I write my thoughts, my ideas, and lists.
Sometimes I draw or make plans for the week.
It's a special place where I can organize my life and clear my mind.
I like to sit quietly at the park or in a cafe and write down my ideas.
Now, if I'm going to write, I need a pen, right?
I always carry a pen with me.
I like to keep it in a little pocket inside my bag so I can easily find it.
I actually have two pens in my backpack just in case I lose one.
I find it very frustrating when I need to write and don't have a pen.
I also have a small highlighter that I use for marking important things in my notebook or documents.
It's always good to have the right tools.
Another item I never leave home without is my water bottle.
I try to drink plenty of water during the day, so I carry my water bottle in my backpack all the time.
I think it's important to stay hydrated, especially if I'm busy.
I don't like buying plastic bottles, so I use reusable ones.
I fill it up in the morning before I leave home and it's always there when I need to drink.
I try to carry it everywhere I go, even when I'm not working.
Staying hydrated helps me feel better and more focused throughout the day.
I also keep my wallet in my backpack.
My wallet has my ID card, credit cards, and a little bit of cash.
I don't use cash very much, but I like to have it just in case.
My ID card is important because sometimes I need it for identification.
I also carry a bus pass in my wallet because I often take the bus to go to work.
It's easy and fast.
If I'm traveling for work or visiting family, my wallet is always with me.
I always carry snacks in my bag.
I like to have something healthy to eat if I get hungry during the day.
Sometimes I bring a banana or an apple because they are easy to carry.
Other times I bring a small pack of almonds or dried apricots.
I like to eat something light but healthy, especially when I'm working or walking around.
These snacks give me energy without making me feel tired.
I also like to carry a little chocolate bar or some biscuits.
I think it's nice to enjoy something sweet during the day.
In my backpack, I also keep a small umbrella.
I don't use it every day, but I like to carry it just in case it rains.
The weather is unpredictable and sometimes it starts raining without warning.
I hate getting wet, so my umbrella is my little safety net.
It's small, so it fits easily in my bag and it's not heavy.
I also carry a pair of sunglasses because when the sun is strong, I need them to protect my eyes.
I keep them in a small case so they don't get scratched.
Let's move on to something a little personal.
Hand sanitizers.
I carry a small bottle of hand sanitizer in my bag every day.
I use it many times, especially after touching things like door handles, phones, or public transportation seats.
It's very important to stay clean, especially when you're outside all day.
I feel safer and more comfortable when I have it with me.
Sometimes I carry a book in my backpack.
I love reading.
I always bring a book with me when I know I have some free time, like during lunch or when I'm waiting for someone.
Reading is one of my favorite activities, so I try to make time for it every day.
I usually read novels, but sometimes I read magazines or articles about topics I enjoy.
It helps me relax and I always feel happy when I discover a good book.
Lastly, I keep some tissues in my bag.
I like to be prepared for any situation and tissues are very useful whether it's for a runny nose, cleaning hands, or wiping something off my desk.
Tissues are always helpful.
I make sure to carry enough for the day so I never run out.
So, as you can see, my backpack is full of important things.
It's a little heavy, but I carry everything I need.
I believe in being prepared for the day, and my backpack helps me stay organized and ready for anything.
It's not just a bag.
It's a place where I keep everything that makes my day easier.`,
    segments: [
      { start: 0, end: 8, text: "Hello and welcome to this slow English listening for beginners." },
      { start: 8, end: 15, text: "Today's topic is what's in my backpack." },
      { start: 15, end: 21, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 21, end: 27, text: "Don't worry if you don't understand everything." },
      { start: 27, end: 37, text: "Just focus on the key information." },
      { start: 37, end: 44, text: "Are you ready?" },
      { start: 44, end: 51, text: "Let's begin." },
      { start: 51, end: 58, text: "I carry my backpack every single day." },
      { start: 58, end: 65, text: "It's not a very big bag, but it's strong and practical." },
      { start: 65, end: 75, text: "I use it for work, for shopping, and for many other things." },
      { start: 75, end: 85, text: "You know, it's like a small world that I carry with me everywhere." },
      { start: 85, end: 92, text: "Let's start with the most important item." },
      { start: 92, end: 99, text: "My laptop." },
      { start: 99, end: 106, text: "I always carry my laptop in my backpack." },
      { start: 106, end: 115, text: "It's small, so it fits perfectly." },
      { start: 115, end: 120, text: "I use it for work and personal things." },
      { start: 120, end: 126, text: "When I'm at work, I need to check emails, write documents, and attend online meetings." },
      { start: 126, end: 133, text: "I also use it for watching movies when I need a break." },
      { start: 133, end: 138, text: "It's a very useful tool and I don't like leaving home without it." },
      { start: 138, end: 147, text: "Sometimes if I have a free moment during lunch, I watch a few episodes of my favorite TV shows." },
      { start: 147, end: 156, text: "Next, I always carry a notebook." },
      { start: 156, end: 164, text: "I love writing by hand." },
      { start: 164, end: 173, text: "Even though I spend a lot of time on my computer, I still prefer to take notes on paper." },
      { start: 173, end: 183, text: "I have a lot of notebooks at home, but I carry one with me every day." },
      { start: 183, end: 192, text: "In my notebook, I write my thoughts, my ideas, and lists." },
      { start: 192, end: 201, text: "Sometimes I draw or make plans for the week." },
      { start: 201, end: 210, text: "It's a special place where I can organize my life and clear my mind." },
      { start: 210, end: 218, text: "I like to sit quietly at the park or in a cafe and write down my ideas." },
      { start: 218, end: 225, text: "Now, if I'm going to write, I need a pen, right?" },
      { start: 225, end: 232, text: "I always carry a pen with me." },
      { start: 232, end: 238, text: "I like to keep it in a little pocket inside my bag so I can easily find it." },
      { start: 238, end: 244, text: "I actually have two pens in my backpack just in case I lose one." },
      { start: 244, end: 252, text: "I find it very frustrating when I need to write and don't have a pen." },
      { start: 252, end: 257, text: "I also have a small highlighter that I use for marking important things in my notebook or documents." },
      { start: 257, end: 265, text: "It's always good to have the right tools." },
      { start: 265, end: 273, text: "Another item I never leave home without is my water bottle." },
      { start: 273, end: 279, text: "I try to drink plenty of water during the day, so I carry my water bottle in my backpack all the time." },
      { start: 279, end: 284, text: "I think it's important to stay hydrated, especially if I'm busy." },
      { start: 284, end: 291, text: "I don't like buying plastic bottles, so I use reusable ones." },
      { start: 291, end: 300, text: "I fill it up in the morning before I leave home and it's always there when I need to drink." },
      { start: 300, end: 306, text: "I try to carry it everywhere I go, even when I'm not working." },
      { start: 306, end: 313, text: "Staying hydrated helps me feel better and more focused throughout the day." },
      { start: 313, end: 318, text: "I also keep my wallet in my backpack." },
      { start: 318, end: 323, text: "My wallet has my ID card, credit cards, and a little bit of cash." },
      { start: 323, end: 329, text: "I don't use cash very much, but I like to have it just in case." },
      { start: 329, end: 336, text: "My ID card is important because sometimes I need it for identification." },
      { start: 336, end: 346, text: "I also carry a bus pass in my wallet because I often take the bus to go to work." },
      { start: 346, end: 354, text: "It's easy and fast." },
      { start: 354, end: 362, text: "If I'm traveling for work or visiting family, my wallet is always with me." },
      { start: 362, end: 370, text: "I always carry snacks in my bag." },
      { start: 370, end: 375, text: "I like to have something healthy to eat if I get hungry during the day." },
      { start: 375, end: 382, text: "Sometimes I bring a banana or an apple because they are easy to carry." },
      { start: 382, end: 389, text: "Other times I bring a small pack of almonds or dried apricots." },
      { start: 389, end: 395, text: "I like to eat something light but healthy, especially when I'm working or walking around." },
      { start: 395, end: 402, text: "These snacks give me energy without making me feel tired." },
      { start: 402, end: 410, text: "I also like to carry a little chocolate bar or some biscuits." },
      { start: 410, end: 418, text: "I think it's nice to enjoy something sweet during the day." },
      { start: 418, end: 423, text: "In my backpack, I also keep a small umbrella." },
      { start: 423, end: 431, text: "I don't use it every day, but I like to carry it just in case it rains." },
      { start: 431, end: 441, text: "The weather is unpredictable and sometimes it starts raining without warning." },
      { start: 441, end: 450, text: "I hate getting wet, so my umbrella is my little safety net." },
      { start: 450, end: 458, text: "It's small, so it fits easily in my bag and it's not heavy." },
      { start: 458, end: 466, text: "I also carry a pair of sunglasses because when the sun is strong, I need them to protect my eyes." },
      { start: 466, end: 472, text: "I keep them in a small case so they don't get scratched." },
      { start: 472, end: 480, text: "Let's move on to something a little personal." },
      { start: 480, end: 487, text: "Hand sanitizers." },
      { start: 487, end: 492, text: "I carry a small bottle of hand sanitizer in my bag every day." },
      { start: 492, end: 500, text: "I use it many times, especially after touching things like door handles, phones, or public transportation seats." },
      { start: 500, end: 509, text: "It's very important to stay clean, especially when you're outside all day." },
      { start: 509, end: 517, text: "I feel safer and more comfortable when I have it with me." },
      { start: 517, end: 523, text: "Sometimes I carry a book in my backpack." },
      { start: 523, end: 528, text: "I love reading." },
      { start: 528, end: 535, text: "I always bring a book with me when I know I have some free time, like during lunch or when I'm waiting for someone." },
      { start: 535, end: 544, text: "Reading is one of my favorite activities, so I try to make time for it every day." },
      { start: 544, end: 550, text: "I usually read novels, but sometimes I read magazines or articles about topics I enjoy." },
      { start: 550, end: 556, text: "It helps me relax and I always feel happy when I discover a good book." },
      { start: 556, end: 562, text: "Lastly, I keep some tissues in my bag." },
      { start: 562, end: 571, text: "I like to be prepared for any situation and tissues are very useful whether it's for a runny nose, cleaning hands, or wiping something off my desk." },
      { start: 571, end: 579, text: "Tissues are always helpful." },
      { start: 579, end: 585, text: "I make sure to carry enough for the day so I never run out." },
      { start: 585, end: 592, text: "So, as you can see, my backpack is full of important things." },
      { start: 592, end: 599, text: "It's a little heavy, but I carry everything I need." },
      { start: 599, end: 606, text: "I believe in being prepared for the day, and my backpack helps me stay organized and ready for anything." },
      { start: 606, end: 614, text: "It's not just a bag." },
      { start: 614, end: 620, text: "It's a place where I keep everything that makes my day easier." },
      { start: 620, end: 627, text: "" },
      { start: 627, end: 634, text: "" },
      { start: 634, end: 639, text: "" },
      { start: 639, end: 646, text: "" },
      { start: 646, end: 656, text: "" },
      { start: 656, end: 664, text: "" },
      { start: 664, end: 671, text: "" },
      { start: 671, end: 681, text: "" },
      { start: 681, end: 690, text: "" },
      { start: 690, end: 698, text: "" },
      { start: 698, end: 703, text: "" },
      { start: 703, end: 711, text: "" },
    ],
  },

  "10": {
    title: "My Roots",
    subtitle: "LESSON 10",
    videoSrc: "/videos/a1/Lesson 10.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners. Today's topic is my roots.
After the story, I will ask you some questions to check on your understanding.
Don't worry if you don't understand everything. Just focus on the key information.
Are you ready? Let's begin.
I was born in Chicago.
Chicago is a big city in America.
It is in the state of Illinois.
Chicago has many tall buildings and a beautiful lake called Lake Michigan.
My parents are from Sicily, a beautiful island in Italy.
It is in the south of the country.
When I was a child, my home was special.
My mother cooked Sicilian food.
We ate pasta, aranchchini, and canoli.
Aranchini are rice balls with cheese inside.
Canoli are sweet pastries with cream.
My father spoke Italian at home.
He wanted me to remember the language.
We had photos of Sicily on our walls.
I saw pictures of the blue sea, of the green mountains, and of the old buildings.
My mother woke up early every morning.
She made coffee in a small pot called mocha.
The smell of coffee filled our house.
My father read Italian newspapers.
He listened to Italian radio.
They wanted to keep our culture alive in America.
On weekends, we visited my grandparents.
They lived in a small apartment in an area of Chicago called Little Italy.
Many Italian families lived there.
My grandmother told me stories about Sicily.
She talked about her childhood in the small village.
She showed me how to make traditional food.
I learned to make pasta by hand.
My grandfather played old Sicilian songs on his guitar.
He sang with a deep, warm voice.
Sometimes other Italian families came to visit.
They brought food and wine.
They talked in Italian and laughed a lot.
At school, I had American friends.
I spoke English with them.
I ate hamburgers and pizza.
American pizza is different from Italian pizza.
I watched American shows.
I celebrated American holidays like Thanksgiving and Halloween.
I felt American when I was at school.
But at home, I felt Sicilian.
I learned Italian words.
I learned about Sicilian history.
Sicily has a long history with many different cultures.
My parents said, "Never forget where you come from."
This was very important to them.
In the summer, my family went to the beach in Chicago.
My parents always said, "The beaches in Sicily are more beautiful."
They showed me pictures of the clear blue water and white sand.
I dreamed of seeing these beaches one day.
When I was 10 years old, we visited Sicily for the first time.
We stayed for one month.
We visited my aunts, my uncles, and my cousins.
They were so happy to see us.
They gave us many gifts.
We ate big family dinners that lasted for hours.
The food was amazing.
Fresh vegetables, seafood, and delicious desserts.
In Sicily, I saw the places from my parents' stories.
I saw the village where my mother was born.
I saw the school where my father studied.
I saw the church where they got married.
Everything felt familiar, even though it was my first visit.
After that summer, we visit Sicily every few years.
Each time I felt more connected to the island.
I loved the warm weather, the friendly people, and the relaxed lifestyle.
When I was in high school, some friends asked me about my family.
They were interested in my Sicilian roots.
I felt proud to be different.
I brought Sicilian cookies to school parties.
I taught my friends Italian words.
They thought that it was cool that I had two cultures.
I went to university in Chicago.
I studied business.
During those years, I became more American.
I was very busy with my studies and work.
I visited my parents less often.
I spoke Italian less frequently, but I still loved Sicilian food and traditions.
When I was 30, my parents decided to go back to Sicily.
They missed their homeland.
They missed the warm weather, the food, and their old friends.
They bought a small house in their hometown.
I stayed in Chicago.
I had a good job there.
I visited them every summer.
I loved the beaches, the food, and the people.
Sicily felt like a second home to me.
I started to think about my own identity.
Was I American?
Was I Sicilian?
I felt connected to both places.
Five years ago, I made a big decision.
I moved to Sicily too.
It was not easy.
I had to find a new job.
I had to improve my Italian.
I had to make new friends.
But I felt that was the right choice for me.
Now I live in a small town near Polarmo.
Polarmo is the capital of Sicily.
I work as an English teacher.
Many people in Sicily want to learn English.
I speak Italian every day.
Sometimes I make mistakes, but people are patient with me.
I eat fresh local food.
Fruits and vegetables from local farms.
Fish from the Mediterranean Sea.
My apartment is small, but it has a beautiful view of the sea.
In the morning, I drink my coffee on my balcony.
I watch the fishermen bring in their boats.
In the evening, I walk along the beach.
I meet friends at local cafes.
Life is slower here than in Chicago, but I enjoy it.
I have made many friends in Sicily.
Some are locals who have lived here all their lives.
Others are people like me who moved here from different countries.
We share our experiences and help each other.
Sometimes I miss Chicago.
I miss the tall buildings.
I miss the snow in the winter.
I miss the busy streets and the energy of the city.
I miss my old friends and my favorite restaurants.
When I feel homesick, I call my friends in America or make American food at home.
But Sicily feels like home now.
The local people call me the American, but they accept me as part of their community.
I understand my roots better now.
I see why my parents and grandparents loved this island so much.
I appreciate the history, the traditions, and the values.
I am both American and Sicilian.
My two cultures make me who I am.
I speak two languages.
I know two different ways of life.
I can see the world from two perspectives.
This is a special gift.
In the future, I want to create a small business that connects America and Sicily.
Maybe a shop that sells Sicilian products in America or a service that helps America discover Sicily.
I want to be a bridge between my two homes.
Every morning I wake up grateful for my journey.
I am grateful for my parents who kept their traditions alive.
I am grateful for my two homes and my two cultures.
I am grateful for the chance to understand my roots and grow new ones.`,
    segments: [
      { start: 0, end: 7, text: "Hello and welcome to this slow English listening for beginners." },
      { start: 7, end: 14, text: "Today's topic is my roots." },
      { start: 14, end: 22, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 22, end: 28, text: "Don't worry if you don't understand everything." },
      { start: 28, end: 33, text: "Just focus on the key information." },
      { start: 33, end: 40, text: "Are you ready?" },
      { start: 40, end: 49, text: "Let's begin." },
      { start: 49, end: 54, text: "I was born in Chicago." },
      { start: 54, end: 61, text: "Chicago is a big city in America." },
      { start: 61, end: 66, text: "It is in the state of Illinois." },
      { start: 66, end: 71, text: "Chicago has many tall buildings and a beautiful lake called Lake Michigan." },
      { start: 71, end: 81, text: "My parents are from Sicily, a beautiful island in Italy." },
      { start: 81, end: 89, text: "It is in the south of the country." },
      { start: 89, end: 98, text: "When I was a child, my home was special." },
      { start: 98, end: 104, text: "My mother cooked Sicilian food." },
      { start: 104, end: 112, text: "We ate pasta, aranchchini, and canoli." },
      { start: 112, end: 119, text: "Aranchini are rice balls with cheese inside." },
      { start: 119, end: 126, text: "Canoli are sweet pastries with cream." },
      { start: 126, end: 131, text: "My father spoke Italian at home." },
      { start: 131, end: 140, text: "He wanted me to remember the language." },
      { start: 140, end: 147, text: "We had photos of Sicily on our walls." },
      { start: 147, end: 152, text: "I saw pictures of the blue sea, of the green mountains, and of the old buildings." },
      { start: 152, end: 162, text: "My mother woke up early every morning." },
      { start: 162, end: 171, text: "She made coffee in a small pot called mocha." },
      { start: 171, end: 177, text: "The smell of coffee filled our house." },
      { start: 177, end: 184, text: "My father read Italian newspapers." },
      { start: 184, end: 190, text: "He listened to Italian radio." },
      { start: 190, end: 198, text: "They wanted to keep our culture alive in America." },
      { start: 198, end: 203, text: "On weekends, we visited my grandparents." },
      { start: 203, end: 209, text: "They lived in a small apartment in an area of Chicago called Little Italy." },
      { start: 209, end: 218, text: "Many Italian families lived there." },
      { start: 218, end: 227, text: "My grandmother told me stories about Sicily." },
      { start: 227, end: 237, text: "She talked about her childhood in the small village." },
      { start: 237, end: 242, text: "She showed me how to make traditional food." },
      { start: 242, end: 249, text: "I learned to make pasta by hand." },
      { start: 249, end: 254, text: "My grandfather played old Sicilian songs on his guitar." },
      { start: 254, end: 260, text: "He sang with a deep, warm voice." },
      { start: 260, end: 266, text: "Sometimes other Italian families came to visit." },
      { start: 266, end: 273, text: "They brought food and wine." },
      { start: 273, end: 280, text: "They talked in Italian and laughed a lot." },
      { start: 280, end: 287, text: "At school, I had American friends." },
      { start: 287, end: 295, text: "I spoke English with them." },
      { start: 295, end: 301, text: "I ate hamburgers and pizza." },
      { start: 301, end: 309, text: "American pizza is different from Italian pizza." },
      { start: 309, end: 315, text: "I watched American shows." },
      { start: 315, end: 324, text: "I celebrated American holidays like Thanksgiving and Halloween." },
      { start: 324, end: 329, text: "I felt American when I was at school." },
      { start: 329, end: 335, text: "But at home, I felt Sicilian." },
      { start: 335, end: 343, text: "I learned Italian words." },
      { start: 343, end: 350, text: "I learned about Sicilian history." },
      { start: 350, end: 356, text: "Sicily has a long history with many different cultures." },
      { start: 356, end: 363, text: "This was very important to them." },
      { start: 363, end: 371, text: "In the summer, my family went to the beach in Chicago." },
      { start: 371, end: 378, text: "They showed me pictures of the clear blue water and white sand." },
      { start: 378, end: 385, text: "I dreamed of seeing these beaches one day." },
      { start: 385, end: 392, text: "When I was 10 years old, we visited Sicily for the first time." },
      { start: 392, end: 401, text: "We stayed for one month." },
      { start: 401, end: 407, text: "We visited my aunts, my uncles, and my cousins." },
      { start: 407, end: 414, text: "They were so happy to see us." },
      { start: 414, end: 422, text: "They gave us many gifts." },
      { start: 422, end: 432, text: "We ate big family dinners that lasted for hours." },
      { start: 432, end: 439, text: "The food was amazing." },
      { start: 439, end: 446, text: "Fresh vegetables, seafood, and delicious desserts." },
      { start: 446, end: 452, text: "In Sicily, I saw the places from my parents' stories." },
      { start: 452, end: 460, text: "I saw the village where my mother was born." },
      { start: 460, end: 470, text: "I saw the school where my father studied." },
      { start: 470, end: 477, text: "I saw the church where they got married." },
      { start: 477, end: 483, text: "Everything felt familiar, even though it was my first visit." },
      { start: 483, end: 490, text: "After that summer, we visit Sicily every few years." },
      { start: 490, end: 495, text: "Each time I felt more connected to the island." },
      { start: 495, end: 502, text: "I loved the warm weather, the friendly people, and the relaxed lifestyle." },
      { start: 502, end: 510, text: "When I was in high school, some friends asked me about my family." },
      { start: 510, end: 515, text: "They were interested in my Sicilian roots." },
      { start: 515, end: 521, text: "I felt proud to be different." },
      { start: 521, end: 527, text: "I brought Sicilian cookies to school parties." },
      { start: 527, end: 537, text: "I taught my friends Italian words." },
      { start: 537, end: 543, text: "They thought that it was cool that I had two cultures." },
      { start: 543, end: 549, text: "I went to university in Chicago." },
      { start: 549, end: 558, text: "I studied business." },
      { start: 558, end: 564, text: "During those years, I became more American." },
      { start: 564, end: 572, text: "I was very busy with my studies and work." },
      { start: 572, end: 582, text: "I visited my parents less often." },
      { start: 582, end: 592, text: "I spoke Italian less frequently, but I still loved Sicilian food and traditions." },
      { start: 592, end: 602, text: "When I was 30, my parents decided to go back to Sicily." },
      { start: 602, end: 608, text: "They missed their homeland." },
      { start: 608, end: 615, text: "They missed the warm weather, the food, and their old friends." },
      { start: 615, end: 621, text: "They bought a small house in their hometown." },
      { start: 621, end: 627, text: "I stayed in Chicago." },
      { start: 627, end: 638, text: "I had a good job there." },
      { start: 638, end: 645, text: "I visited them every summer." },
      { start: 645, end: 653, text: "I loved the beaches, the food, and the people." },
      { start: 653, end: 660, text: "Sicily felt like a second home to me." },
      { start: 660, end: 666, text: "I started to think about my own identity." },
      { start: 666, end: 673, text: "Was I American?" },
      { start: 673, end: 684, text: "Was I Sicilian?" },
      { start: 684, end: 690, text: "I felt connected to both places." },
      { start: 690, end: 697, text: "Five years ago, I made a big decision." },
      { start: 697, end: 703, text: "I moved to Sicily too." },
      { start: 703, end: 709, text: "It was not easy." },
      { start: 709, end: 718, text: "I had to find a new job." },
      { start: 718, end: 728, text: "I had to improve my Italian." },
      { start: 728, end: 734, text: "I had to make new friends." },
      { start: 734, end: 740, text: "But I felt that was the right choice for me." },
      { start: 740, end: 748, text: "Now I live in a small town near Polarmo." },
      { start: 748, end: 757, text: "Polarmo is the capital of Sicily." },
      { start: 757, end: 764, text: "I work as an English teacher." },
      { start: 764, end: 773, text: "Many people in Sicily want to learn English." },
      { start: 773, end: 781, text: "I speak Italian every day." },
      { start: 781, end: 788, text: "Sometimes I make mistakes, but people are patient with me." },
      { start: 788, end: 795, text: "I eat fresh local food." },
      { start: 795, end: 802, text: "Fruits and vegetables from local farms." },
      { start: 802, end: 808, text: "Fish from the Mediterranean Sea." },
      { start: 808, end: 813, text: "My apartment is small, but it has a beautiful view of the sea." },
      { start: 813, end: 819, text: "In the morning, I drink my coffee on my balcony." },
      { start: 819, end: 827, text: "I watch the fishermen bring in their boats." },
      { start: 827, end: 835, text: "In the evening, I walk along the beach." },
      { start: 835, end: 848, text: "I meet friends at local cafes." },
      { start: 848, end: 855, text: "Life is slower here than in Chicago, but I enjoy it." },
      { start: 855, end: 862, text: "I have made many friends in Sicily." },
      { start: 862, end: 877, text: "Some are locals who have lived here all their lives." },
      { start: 877, end: 883, text: "Others are people like me who moved here from different countries." },
      { start: 883, end: 895, text: "We share our experiences and help each other." },
      { start: 895, end: 902, text: "Sometimes I miss Chicago." },
      { start: 902, end: 911, text: "I miss the tall buildings." },
      { start: 911, end: 919, text: "I miss the snow in the winter." },
    ],
  },

  "11": {
    title: "My Favorite Dish",
    subtitle: "LESSON 11",
    videoSrc: "/videos/a1/Lesson 11.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners.
Today's topic is my favorite dish, Sicilian baked pasta.
After the story, I will ask you some questions to check on your understanding.
Don't worry if you don't understand everything. Just focus on the key information.
Are you ready? Let's begin.
I love this dish very much.
It brings back so many wonderful memories from my childhood.
And now I make it for my own family.
I first learned about this amazing dish when I was a girl.
My grandmother was from Sicily, a beautiful island in the south of Italy.
She moved to our city when she was young, but she always kept her Sicilian traditions, especially in the cooking.
Every Sunday, our whole family would go to her small house for lunch, and almost always she made her special baked pasta.
I remember waking up on Sunday mornings and feeling so excited.
I knew we would visit grandma that day.
My parents, my brother, and I would get dressed in our nice clothes.
Then we would drive to grandma's house.
Even before we opened the door, we could smell the wonderful aroma of her cooking.
Grandma's kitchen was not very big, but it was always warm and full of delicious smells.
She had an old wooden table in the middle of the room.
When we arrived, she was usually busy at the stove.
She wore a simple blue apron with small flowers on it.
Her face was always happy when she saw us.
"Come in," she would say with her special accent.
Then she would give us all big hugs and kisses on both cheeks.
My brother and I would run to look at the oven.
We wanted to see if the baked pasta was ready.
Now let me tell you about this wonderful dish.
Sicilian baked pasta, or pasta al forno Siciliana in Italian, is a very special and traditional dish.
It is not just a simple pasta with sauce.
It is more complex and rich.
The dish is actually quite simple to prepare, but very delicious.
First, you need pasta.
A short type of pasta is perfect because it holds the sauce well.
Then you need a good tomato sauce with meat.
I like to use beef in my sauce just like my grandmother did.
But some people also use pork or a mixture of different meats.
The sauce is very important.
My grandmother taught me to start with olive oil, garlic, and onions.
You cook them until they are soft and golden.
Then you add the meat and cook it well.
After that you add tomatoes, a little bit of sugar to reduce acidity, salt, pepper, and herbs like basil.
The sauce needs to cook slowly for at least one hour so all the flavors mix together perfectly.
But the most important part of Sicilian baked pasta is the cheese.
You need two types of cheese, mozzarella and parmesan.
The mozzarella becomes melted and stretchy.
The parmesan gives a strong salty flavor.
Some people also add a third cheese called caciocavallo, which is a traditional Sicilian cheese, but it can be hard to find in other countries.
Another special ingredient in my grandmother's recipe was eggplant.
She would cut eggplants into small cubes, fry them until golden, and add them to the pasta.
The eggplants give a sweet unique flavor that makes the dish truly Sicilian.
Some versions also include peas, hard-boiled eggs, ham, or salami.
My grandmother sometimes added these ingredients for special occasions like Easter or Christmas, but her everyday version was simpler.
To make this dish, I first cook the pasta in a large pot of salted water.
It is important not to cook it for too long because it will continue cooking in the oven.
We call this al dente in Italian, which means the pasta is cooked but still a bit firm.
After draining the pasta, I mix about half of the tomato sauce and some of the cheese in a large bowl.
Then I prepare a big baking pan.
I put a little sauce on the bottom so the pasta does not stick.
Then I add half of the pasta mixture.
On top of that I put a layer of sliced mozzarella and small spoonfuls of grated parmesan.
If I am using eggplants or other ingredients, I add them in this layer too.
After that I add the rest of the pasta and cover everything with the remaining sauce.
On top I put more mozzarella and parmesan cheese.
The top layer becomes golden and slightly crispy in the oven, which gives a wonderful contrast to the soft pasta underneath.
Then I put it in the oven at about 190°C for approximately 30 minutes.
I know it is ready when the top is golden brown and the edges are bubbling.
When the pasta comes out of the oven, it is important to let it rest for about 10 minutes.
This makes it easier to serve and not too hot to eat.
The smell that fills the house is absolutely amazing.
A mix of tomatoes, cheese, and herbs that makes everyone hungry.
The moment of cutting into the baked pasta is special.
You can see all the layers and the melted cheese stretching as you lift each piece.
The top is a little crispy and the inside is soft and warm.
Each bite has many flavors.
The tangy tomato sauce, the rich cheese, and the pasta that absorbed all the wonderful tastes.
Just like my grandmother, I usually make this dish on Sundays.
It has become a tradition in my family too.
My children love it as much as I did when I was their age.
They often help me prepare it.
My daughter likes to grate the cheese and my son helps mix the pasta with the sauce.
It is a nice way to spend time together and teach them about cooking.
When we sit down to eat, we always have a big green salad after the pasta.
We also have fresh bread to clean our plates after we finish.
We do not want to waste any delicious sauce.
My husband says I make the baked pasta almost as well as my grandmother did.
I take this as a big compliment because she was an amazing cook.
She never used recipes or measuring cups.
She knew exactly how much of each ingredient to use just by looking and feeling.
I have tried to teach my children the same way.
Cooking is not just about following a recipe.
It is about understanding the ingredients and cooking with love and patience.
My grandmother passed away ten years ago, but her recipes and traditions live on in our family.
Every time I make her baked pasta, I feel like she is with us.
Food has the power to connect us with our past and the people we love.
In Sicily, food is more than nutrition.
It is a way to show love and bring people together.
Meals are not rushed.
People take time to enjoy food and company.
This is something I try to keep in my family.
When friends visit our home, I often make Sicilian baked pasta for them.
People ask for the recipe and I happily share it.
But I always tell them the most important ingredient is love.
It is perfect for big gatherings because you can prepare it in advance.
It is also great as leftovers and sometimes tastes even better the next day.
In summer, I make a lighter version with fresh tomato, zucchini, and bell peppers.
In winter, I make a richer version with more meat and cheese.
Cooking traditional recipes like Sicilian baked pasta keeps our cultural heritage alive.
It connects me to my roots and to my grandmother’s homeland.
I hope my children will continue this tradition and maybe add their own touches.
Recipes evolve over time just like families do, but the love should remain the same.
So that is the story of my favorite dish, Sicilian baked pasta.
It is more than food to me.
It is a memory of my grandmother, a family tradition, and a way to show love.
Every time I eat it, I feel happy and at home.`,
    segments: [
      { start: 0, end: 7, text: "Hello and welcome to this slow English listening for beginners." },
      { start: 7, end: 15, text: "Today's topic is my favorite dish, Sicilian baked pasta." },
      { start: 15, end: 23, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 23, end: 30, text: "Don't worry if you don't understand everything." },
      { start: 30, end: 36, text: "Just focus on the key information." },
      { start: 36, end: 44, text: "Are you ready?" },
      { start: 44, end: 51, text: "Let's begin." },
      { start: 51, end: 56, text: "I love this dish very much." },
      { start: 56, end: 64, text: "It brings back so many wonderful memories from my childhood." },
      { start: 64, end: 71, text: "And now I make it for my own family." },
      { start: 71, end: 76, text: "I first learned about this amazing dish when I was a girl." },
      { start: 76, end: 82, text: "My grandmother was from Sicily, a beautiful island in the south of Italy." },
      { start: 82, end: 87, text: "She moved to our city when she was young, but she always kept her Sicilian traditions, especially in the cooking." },
      { start: 87, end: 92, text: "Every Sunday, our whole family would go to her small house for lunch, and almost always she made her special baked pasta." },
      { start: 92, end: 102, text: "I remember waking up on Sunday mornings and feeling so excited." },
      { start: 102, end: 109, text: "I knew we would visit grandma that day." },
      { start: 109, end: 118, text: "My parents, my brother, and I would get dressed in our nice clothes." },
      { start: 118, end: 124, text: "Then we would drive to grandma's house." },
      { start: 124, end: 132, text: "Even before we opened the door, we could smell the wonderful aroma of her cooking." },
      { start: 132, end: 139, text: "Grandma's kitchen was not very big, but it was always warm and full of delicious smells." },
      { start: 139, end: 145, text: "She had an old wooden table in the middle of the room." },
      { start: 145, end: 151, text: "When we arrived, she was usually busy at the stove." },
      { start: 151, end: 158, text: "She wore a simple blue apron with small flowers on it." },
      { start: 158, end: 164, text: "Her face was always happy when she saw us." },
      { start: 164, end: 170, text: "\"Come in,\" she would say with her special accent." },
      { start: 170, end: 176, text: "Then she would give us all big hugs and kisses on both cheeks." },
      { start: 176, end: 181, text: "My brother and I would run to look at the oven." },
      { start: 181, end: 188, text: "We wanted to see if the baked pasta was ready." },
      { start: 188, end: 196, text: "Now let me tell you about this wonderful dish." },
      { start: 196, end: 202, text: "Sicilian baked pasta, or pasta al forno Siciliana in Italian, is a very special and traditional dish." },
      { start: 202, end: 208, text: "It is not just a simple pasta with sauce." },
      { start: 208, end: 216, text: "It is more complex and rich." },
      { start: 216, end: 224, text: "The dish is actually quite simple to prepare, but very delicious." },
      { start: 224, end: 236, text: "First, you need pasta." },
      { start: 236, end: 243, text: "A short type of pasta is perfect because it holds the sauce well." },
      { start: 243, end: 251, text: "Then you need a good tomato sauce with meat." },
      { start: 251, end: 259, text: "I like to use beef in my sauce just like my grandmother did." },
      { start: 259, end: 264, text: "But some people also use pork or a mixture of different meats." },
      { start: 264, end: 271, text: "The sauce is very important." },
      { start: 271, end: 279, text: "My grandmother taught me to start with olive oil, garlic, and onions." },
      { start: 279, end: 287, text: "You cook them until they are soft and golden." },
      { start: 287, end: 297, text: "Then you add the meat and cook it well." },
      { start: 297, end: 302, text: "After that you add tomatoes, a little bit of sugar to reduce acidity, salt, pepper, and herbs like basil." },
      { start: 302, end: 309, text: "The sauce needs to cook slowly for at least one hour so all the flavors mix together perfectly." },
      { start: 309, end: 317, text: "But the most important part of Sicilian baked pasta is the cheese." },
      { start: 317, end: 323, text: "You need two types of cheese, mozzarella and parmesan." },
      { start: 323, end: 330, text: "The mozzarella becomes melted and stretchy." },
      { start: 330, end: 337, text: "The parmesan gives a strong salty flavor." },
      { start: 337, end: 346, text: "Some people also add a third cheese called caciocavallo, which is a traditional Sicilian cheese, but it can be hard to find in other countries." },
      { start: 346, end: 351, text: "Another special ingredient in my grandmother's recipe was eggplant." },
      { start: 351, end: 357, text: "She would cut eggplants into small cubes, fry them until golden, and add them to the pasta." },
      { start: 357, end: 362, text: "The eggplants give a sweet unique flavor that makes the dish truly Sicilian." },
      { start: 362, end: 369, text: "Some versions also include peas, hard-boiled eggs, ham, or salami." },
      { start: 369, end: 377, text: "My grandmother sometimes added these ingredients for special occasions like Easter or Christmas, but her everyday version was simpler." },
      { start: 377, end: 382, text: "To make this dish, I first cook the pasta in a large pot of salted water." },
      { start: 382, end: 391, text: "It is important not to cook it for too long because it will continue cooking in the oven." },
      { start: 391, end: 396, text: "We call this al dente in Italian, which means the pasta is cooked but still a bit firm." },
      { start: 396, end: 404, text: "After draining the pasta, I mix about half of the tomato sauce and some of the cheese in a large bowl." },
      { start: 404, end: 412, text: "Then I prepare a big baking pan." },
      { start: 412, end: 421, text: "I put a little sauce on the bottom so the pasta does not stick." },
      { start: 421, end: 428, text: "Then I add half of the pasta mixture." },
      { start: 428, end: 434, text: "On top of that I put a layer of sliced mozzarella and small spoonfuls of grated parmesan." },
      { start: 434, end: 442, text: "If I am using eggplants or other ingredients, I add them in this layer too." },
      { start: 442, end: 450, text: "After that I add the rest of the pasta and cover everything with the remaining sauce." },
      { start: 450, end: 459, text: "On top I put more mozzarella and parmesan cheese." },
      { start: 459, end: 468, text: "The top layer becomes golden and slightly crispy in the oven, which gives a wonderful contrast to the soft pasta underneath." },
      { start: 468, end: 476, text: "Then I put it in the oven at about 190°C for approximately 30 minutes." },
      { start: 476, end: 482, text: "I know it is ready when the top is golden brown and the edges are bubbling." },
      { start: 482, end: 489, text: "When the pasta comes out of the oven, it is important to let it rest for about 10 minutes." },
      { start: 489, end: 495, text: "This makes it easier to serve and not too hot to eat." },
      { start: 495, end: 502, text: "The smell that fills the house is absolutely amazing." },
      { start: 502, end: 509, text: "A mix of tomatoes, cheese, and herbs that makes everyone hungry." },
      { start: 509, end: 516, text: "The moment of cutting into the baked pasta is special." },
      { start: 516, end: 522, text: "You can see all the layers and the melted cheese stretching as you lift each piece." },
      { start: 522, end: 529, text: "The top is a little crispy and the inside is soft and warm." },
      { start: 529, end: 537, text: "Each bite has many flavors." },
      { start: 537, end: 546, text: "The tangy tomato sauce, the rich cheese, and the pasta that absorbed all the wonderful tastes." },
      { start: 546, end: 553, text: "Just like my grandmother, I usually make this dish on Sundays." },
      { start: 553, end: 558, text: "It has become a tradition in my family too." },
      { start: 558, end: 565, text: "My children love it as much as I did when I was their age." },
      { start: 565, end: 571, text: "They often help me prepare it." },
      { start: 571, end: 578, text: "My daughter likes to grate the cheese and my son helps mix the pasta with the sauce." },
      { start: 578, end: 586, text: "It is a nice way to spend time together and teach them about cooking." },
      { start: 586, end: 593, text: "When we sit down to eat, we always have a big green salad after the pasta." },
      { start: 593, end: 604, text: "We also have fresh bread to clean our plates after we finish." },
      { start: 604, end: 612, text: "We do not want to waste any delicious sauce." },
      { start: 612, end: 620, text: "My husband says I make the baked pasta almost as well as my grandmother did." },
      { start: 620, end: 629, text: "I take this as a big compliment because she was an amazing cook." },
      { start: 629, end: 636, text: "She never used recipes or measuring cups." },
      { start: 636, end: 642, text: "She knew exactly how much of each ingredient to use just by looking and feeling." },
      { start: 642, end: 651, text: "I have tried to teach my children the same way." },
      { start: 651, end: 657, text: "Cooking is not just about following a recipe." },
      { start: 657, end: 666, text: "It is about understanding the ingredients and cooking with love and patience." },
      { start: 666, end: 674, text: "My grandmother passed away ten years ago, but her recipes and traditions live on in our family." },
      { start: 674, end: 683, text: "Every time I make her baked pasta, I feel like she is with us." },
      { start: 683, end: 691, text: "Food has the power to connect us with our past and the people we love." },
      { start: 691, end: 696, text: "In Sicily, food is more than nutrition." },
      { start: 696, end: 704, text: "It is a way to show love and bring people together." },
      { start: 704, end: 711, text: "Meals are not rushed." },
      { start: 711, end: 718, text: "People take time to enjoy food and company." },
      { start: 718, end: 723, text: "This is something I try to keep in my family." },
      { start: 723, end: 731, text: "When friends visit our home, I often make Sicilian baked pasta for them." },
      { start: 731, end: 740, text: "People ask for the recipe and I happily share it." },
      { start: 740, end: 748, text: "But I always tell them the most important ingredient is love." },
      { start: 748, end: 755, text: "It is perfect for big gatherings because you can prepare it in advance." },
      { start: 755, end: 763, text: "It is also great as leftovers and sometimes tastes even better the next day." },
      { start: 763, end: 772, text: "In summer, I make a lighter version with fresh tomato, zucchini, and bell peppers." },
      { start: 772, end: 781, text: "In winter, I make a richer version with more meat and cheese." },
      { start: 781, end: 788, text: "Cooking traditional recipes like Sicilian baked pasta keeps our cultural heritage alive." },
      { start: 788, end: 794, text: "It connects me to my roots and to my grandmother’s homeland." },
      { start: 794, end: 803, text: "I hope my children will continue this tradition and maybe add their own touches." },
      { start: 803, end: 810, text: "Recipes evolve over time just like families do, but the love should remain the same." },
      { start: 810, end: 817, text: "So that is the story of my favorite dish, Sicilian baked pasta." },
      { start: 817, end: 825, text: "It is more than food to me." },
      { start: 825, end: 834, text: "It is a memory of my grandmother, a family tradition, and a way to show love." },
      { start: 834, end: 841, text: "Every time I eat it, I feel happy and at home." },
      { start: 841, end: 850, text: "" },
      { start: 850, end: 858, text: "" },
      { start: 858, end: 864, text: "" },
      { start: 864, end: 872, text: "" },
      { start: 872, end: 878, text: "" },
      { start: 878, end: 883, text: "" },
      { start: 883, end: 892, text: "" },
      { start: 892, end: 900, text: "" },
      { start: 900, end: 908, text: "" },
      { start: 908, end: 918, text: "" },
      { start: 918, end: 924, text: "" },
      { start: 924, end: 932, text: "" },
      { start: 932, end: 937, text: "" },
      { start: 937, end: 946, text: "" },
      { start: 946, end: 953, text: "" },
      { start: 953, end: 961, text: "" },
      { start: 961, end: 968, text: "" },
      { start: 968, end: 974, text: "" },
      { start: 974, end: 980, text: "" },
      { start: 980, end: 987, text: "" },
      { start: 987, end: 994, text: "" },
      { start: 994, end: 1002, text: "" },
      { start: 1002, end: 1007, text: "" },
      { start: 1007, end: 1016, text: "" },
      { start: 1016, end: 1023, text: "" },
      { start: 1023, end: 1029, text: "" },
      { start: 1029, end: 1038, text: "" },
      { start: 1038, end: 1047, text: "" },
      { start: 1047, end: 1056, text: "" },
      { start: 1056, end: 1064, text: "" },
      { start: 1064, end: 1071, text: "" },
      { start: 1071, end: 1079, text: "" },
      { start: 1079, end: 1086, text: "" },
      { start: 1086, end: 1093, text: "" },
      { start: 1093, end: 1103, text: "" },
      { start: 1103, end: 1109, text: "" },
      { start: 1109, end: 1123, text: "" },
      { start: 1123, end: 1140, text: "" },
      { start: 1140, end: 1147, text: "" },
      { start: 1147, end: 1156, text: "" },
      { start: 1156, end: 1163, text: "" },
      { start: 1163, end: 1173, text: "" },
      { start: 1173, end: 1179, text: "" },
      { start: 1179, end: 1189, text: "" },
      { start: 1189, end: 1194, text: "" },
      { start: 1194, end: 1201, text: "" },
    ],
  },

  "12": {
    title: "MY Favorite Song",
    subtitle: "LESSON 12",
    videoSrc: "/videos/a1/Lesson 12.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners.
Today's topic is my favorite song.
After the story, I will ask you some questions to check on your understanding.
Don't worry if you don't understand everything. Just focus on the key information.
I suggest you listen to this video carefully at least three times to improve your understanding skills.
Are you ready? Let's begin.
My favorite song is Perfect by Ed Sheeran.
Ed Sheeran is a singer from England. He is very famous.
I first heard this song when it came out.
I was in my car driving to school.
The song played on the radio. I liked it immediately.
The melody is so beautiful.
When I got home, I looked for the song on my computer.
I listened to it many times.
Perfect is from Sheeran's album called Divide.
This album came out in 2017.
The song is about love and Sheeran wrote this song for his girlfriend Cherry Seaborn.
They were childhood friends.
They went to school together.
Later they fell in love and got married.
Ed said he wrote the song at a party in James Blunt's house.
James Blunt is another English singer.
Ed was in the garden very early in the morning.
He was playing the guitar.
The song came to him quickly.
He said he knew this song was very special.
Perfect was one of the first songs Ed wrote for his Divide album.
He said this in an interview.
He knew it would be an important song on the album and he was right.
It became one of his biggest hits ever.
Ed Sheeran and Cherry Seaborn have known each other since they were 11 years old.
They went to the same school in England but they didn't start dating until 2015.
Ed invited Cherry to a party at Taylor Swift's house.
That's where their love story really began.
He proposed to Cherry in December 2017.
He asked her to marry him at their home.
Then they got married in a small ceremony in December 2018.
Only 40 close friends and family were there.
Now they have a daughter named Lyra born in 2020 and another daughter named Jupiter born in 2022.
In the song, Ed sings about dancing with his perfect love under the stars.
He says she looks beautiful in her dress.
He says he found a woman stronger than anyone he knows.
These words are very romantic.
The music video for Perfect is set in the snow at a ski resort in Austria.
They dance in the snow and go skiing.
The video is very beautiful.
When Perfect was released, it was very successful.
It reached number one in many countries including the United Kingdom and the United States.
Ed made new versions of the song with other famous singers.
He sang Perfect Duet with Beyoncé.
He sang Perfect Symphony with Andrea Bocelli.
The duet version changes some words to make a conversation between a man and a woman.
Beyoncé sings the second verse and then they sing together.
The symphony version includes Italian parts and a full orchestra.
It sounds very classical and elegant.
Ed Sheeran said Perfect was inspired by a romantic trip with Cherry to Ibiza in Spain.
They danced under the stars with no music.
That moment inspired the song.
The lyrics are simple but romantic.
He sings “I found a love for me.”
This means he found the perfect person to love.
He also sings about dancing barefoot on the grass listening to their favorite song.
This creates a romantic image.
Perfect has become a popular wedding song.
Many couples choose it for their first dance.
Before Perfect, Ed wrote another famous love song called Thinking Out Loud.
He wanted Perfect to be even better.
Ed plays many instruments including guitar, piano and percussion.
The song also uses violins and strings which make it emotional.
The Divide album won the Grammy Award for Best Pop Vocal Album in 2018.
Perfect was one of the biggest hits from this album.
When Ed performs live, he often uses a loop pedal.
It records and repeats the sound so he can sound like multiple musicians alone on stage.
Ed Sheeran was born on February 17, 1991 in Halifax, England.
He started playing guitar very young.
He moved to London as a teenager to pursue music.
Before fame, he performed in small venues and on the streets.
He released his first album Plus in 2011.
Since then he has become one of the most successful musicians in the world.
He also appeared in the TV show Game of Thrones in 2017 as a soldier.
Ed is known for being friendly and humble.
He usually wears simple clothes like t-shirts and jeans.
Perfect was certified diamond in the United States meaning over 10 million copies sold.
It was also multi-platinum in many countries.
The song became Christmas number one in the UK in 2017.
Many students learn to play Perfect on piano or guitar.
There are many tutorial videos online.
The music video location in Austria became popular with tourists.
Some couples visit to recreate romantic scenes.
Fans have created many cover versions in different languages.
Music teachers say the song is a good example of songwriting structure with verses, chorus and bridge.
Even years later, Perfect is still played on radio and used at weddings.
It may become a timeless love song.
Music is a wonderful way to express feelings.
Sometimes music can say everything when words are difficult.
That is why people love songs like Perfect.`,
    segments: [
      { start: 0, end: 7, text: "Hello and welcome to this slow English listening for beginners." },
      { start: 7, end: 15, text: "Today's topic is my favorite song." },
      { start: 15, end: 23, text: "After the story, I will ask you some questions to check on your understanding." },
      { start: 23, end: 29, text: "Don't worry if you don't understand everything." },
      { start: 29, end: 37, text: "Just focus on the key information." },
      { start: 37, end: 45, text: "I suggest you listen to this video carefully at least three times to improve your understanding skills." },
      { start: 45, end: 55, text: "Are you ready?" },
      { start: 55, end: 61, text: "Let's begin." },
      { start: 61, end: 67, text: "My favorite song is Perfect by Ed Sheeran." },
      { start: 67, end: 73, text: "Ed Sheeran is a singer from England." },
      { start: 73, end: 81, text: "He is very famous." },
      { start: 81, end: 87, text: "I first heard this song when it came out." },
      { start: 87, end: 93, text: "I was in my car driving to school." },
      { start: 93, end: 100, text: "The song played on the radio." },
      { start: 100, end: 109, text: "I liked it immediately." },
      { start: 109, end: 116, text: "The melody is so beautiful." },
      { start: 116, end: 125, text: "When I got home, I looked for the song on my computer." },
      { start: 125, end: 132, text: "I listened to it many times." },
      { start: 132, end: 141, text: "Perfect is from Sheeran's album called Divide." },
      { start: 141, end: 150, text: "This album came out in 2017." },
      { start: 150, end: 157, text: "The song is about love and Sheeran wrote this song for his girlfriend Cherry Seaborn." },
      { start: 157, end: 162, text: "They were childhood friends." },
      { start: 162, end: 168, text: "They went to school together." },
      { start: 168, end: 176, text: "Later they fell in love and got married." },
      { start: 176, end: 182, text: "Ed said he wrote the song at a party in James Blunt's house." },
      { start: 182, end: 187, text: "James Blunt is another English singer." },
      { start: 187, end: 196, text: "Ed was in the garden very early in the morning." },
      { start: 196, end: 205, text: "He was playing the guitar." },
      { start: 205, end: 211, text: "The song came to him quickly." },
      { start: 211, end: 218, text: "He said he knew this song was very special." },
      { start: 218, end: 224, text: "Perfect was one of the first songs Ed wrote for his Divide album." },
      { start: 224, end: 231, text: "He said this in an interview." },
      { start: 231, end: 237, text: "He knew it would be an important song on the album and he was right." },
      { start: 237, end: 245, text: "It became one of his biggest hits ever." },
      { start: 245, end: 251, text: "Ed Sheeran and Cherry Seaborn have known each other since they were 11 years old." },
      { start: 251, end: 258, text: "They went to the same school in England but they didn't start dating until 2015." },
      { start: 258, end: 264, text: "Ed invited Cherry to a party at Taylor Swift's house." },
      { start: 264, end: 273, text: "That's where their love story really began." },
      { start: 273, end: 282, text: "He proposed to Cherry in December 2017." },
      { start: 282, end: 288, text: "He asked her to marry him at their home." },
      { start: 288, end: 293, text: "Then they got married in a small ceremony in December 2018." },
      { start: 293, end: 299, text: "Only 40 close friends and family were there." },
      { start: 299, end: 306, text: "Now they have a daughter named Lyra born in 2020 and another daughter named Jupiter born in 2022." },
      { start: 306, end: 317, text: "In the song, Ed sings about dancing with his perfect love under the stars." },
      { start: 317, end: 322, text: "He says she looks beautiful in her dress." },
      { start: 322, end: 329, text: "He says he found a woman stronger than anyone he knows." },
      { start: 329, end: 338, text: "These words are very romantic." },
      { start: 338, end: 346, text: "The music video for Perfect is set in the snow at a ski resort in Austria." },
      { start: 346, end: 353, text: "They dance in the snow and go skiing." },
      { start: 353, end: 360, text: "The video is very beautiful." },
      { start: 360, end: 369, text: "When Perfect was released, it was very successful." },
      { start: 369, end: 378, text: "It reached number one in many countries including the United Kingdom and the United States." },
      { start: 378, end: 385, text: "Ed made new versions of the song with other famous singers." },
      { start: 385, end: 391, text: "He sang Perfect Duet with Beyoncé." },
      { start: 391, end: 398, text: "He sang Perfect Symphony with Andrea Bocelli." },
      { start: 398, end: 406, text: "The duet version changes some words to make a conversation between a man and a woman." },
      { start: 406, end: 416, text: "Beyoncé sings the second verse and then they sing together." },
      { start: 416, end: 421, text: "The symphony version includes Italian parts and a full orchestra." },
      { start: 421, end: 428, text: "It sounds very classical and elegant." },
      { start: 428, end: 433, text: "Ed Sheeran said Perfect was inspired by a romantic trip with Cherry to Ibiza in Spain." },
      { start: 433, end: 442, text: "They danced under the stars with no music." },
      { start: 442, end: 449, text: "That moment inspired the song." },
      { start: 449, end: 457, text: "The lyrics are simple but romantic." },
      { start: 457, end: 466, text: "This means he found the perfect person to love." },
      { start: 466, end: 475, text: "He also sings about dancing barefoot on the grass listening to their favorite song." },
      { start: 475, end: 481, text: "This creates a romantic image." },
      { start: 481, end: 487, text: "Perfect has become a popular wedding song." },
      { start: 487, end: 493, text: "Many couples choose it for their first dance." },
      { start: 493, end: 498, text: "Before Perfect, Ed wrote another famous love song called Thinking Out Loud." },
      { start: 498, end: 507, text: "He wanted Perfect to be even better." },
      { start: 507, end: 512, text: "Ed plays many instruments including guitar, piano and percussion." },
      { start: 512, end: 521, text: "The song also uses violins and strings which make it emotional." },
      { start: 521, end: 528, text: "The Divide album won the Grammy Award for Best Pop Vocal Album in 2018." },
      { start: 528, end: 535, text: "Perfect was one of the biggest hits from this album." },
      { start: 535, end: 540, text: "When Ed performs live, he often uses a loop pedal." },
      { start: 540, end: 549, text: "It records and repeats the sound so he can sound like multiple musicians alone on stage." },
      { start: 549, end: 557, text: "Ed Sheeran was born on February 17, 1991 in Halifax, England." },
      { start: 557, end: 562, text: "He started playing guitar very young." },
      { start: 562, end: 569, text: "He moved to London as a teenager to pursue music." },
      { start: 569, end: 578, text: "Before fame, he performed in small venues and on the streets." },
      { start: 578, end: 585, text: "He released his first album Plus in 2011." },
      { start: 585, end: 592, text: "Since then he has become one of the most successful musicians in the world." },
      { start: 592, end: 601, text: "He also appeared in the TV show Game of Thrones in 2017 as a soldier." },
      { start: 601, end: 607, text: "Ed is known for being friendly and humble." },
      { start: 607, end: 612, text: "He usually wears simple clothes like t-shirts and jeans." },
      { start: 612, end: 618, text: "Perfect was certified diamond in the United States meaning over 10 million copies sold." },
      { start: 618, end: 625, text: "It was also multi-platinum in many countries." },
      { start: 625, end: 632, text: "The song became Christmas number one in the UK in 2017." },
      { start: 632, end: 639, text: "Many students learn to play Perfect on piano or guitar." },
      { start: 639, end: 648, text: "There are many tutorial videos online." },
      { start: 648, end: 657, text: "The music video location in Austria became popular with tourists." },
      { start: 657, end: 665, text: "Some couples visit to recreate romantic scenes." },
      { start: 665, end: 674, text: "Fans have created many cover versions in different languages." },
      { start: 674, end: 680, text: "Music teachers say the song is a good example of songwriting structure with verses, chorus and bridge." },
      { start: 680, end: 688, text: "Even years later, Perfect is still played on radio and used at weddings." },
      { start: 688, end: 693, text: "It may become a timeless love song." },
      { start: 693, end: 699, text: "Music is a wonderful way to express feelings." },
      { start: 699, end: 704, text: "Sometimes music can say everything when words are difficult." },
      { start: 704, end: 714, text: "That is why people love songs like Perfect." },
      { start: 714, end: 721, text: "" },
      { start: 721, end: 727, text: "" },
      { start: 727, end: 736, text: "" },
      { start: 736, end: 745, text: "" },
      { start: 745, end: 753, text: "" },
      { start: 753, end: 758, text: "" },
      { start: 758, end: 767, text: "" },
      { start: 767, end: 775, text: "" },
      { start: 775, end: 783, text: "" },
      { start: 783, end: 792, text: "" },
      { start: 792, end: 797, text: "" },
      { start: 797, end: 803, text: "" },
      { start: 803, end: 811, text: "" },
      { start: 811, end: 818, text: "" },
      { start: 818, end: 826, text: "" },
      { start: 826, end: 832, text: "" },
      { start: 832, end: 837, text: "" },
      { start: 837, end: 843, text: "" },
      { start: 843, end: 850, text: "" },
      { start: 850, end: 857, text: "" },
      { start: 857, end: 865, text: "" },
      { start: 865, end: 872, text: "" },
      { start: 872, end: 878, text: "" },
      { start: 878, end: 887, text: "" },
      { start: 887, end: 893, text: "" },
      { start: 893, end: 898, text: "" },
      { start: 898, end: 905, text: "" },
      { start: 905, end: 911, text: "" },
      { start: 911, end: 921, text: "" },
      { start: 921, end: 930, text: "" },
      { start: 930, end: 935, text: "" },
      { start: 935, end: 941, text: "" },
      { start: 941, end: 947, text: "" },
      { start: 947, end: 953, text: "" },
      { start: 953, end: 959, text: "" },
      { start: 959, end: 966, text: "" },
      { start: 966, end: 974, text: "" },
      { start: 974, end: 979, text: "" },
      { start: 979, end: 985, text: "" },
      { start: 985, end: 992, text: "" },
      { start: 992, end: 1001, text: "" },
      { start: 1001, end: 1007, text: "" },
      { start: 1007, end: 1015, text: "" },
      { start: 1015, end: 1023, text: "" },
      { start: 1023, end: 1030, text: "" },
      { start: 1030, end: 1037, text: "" },
      { start: 1037, end: 1044, text: "" },
      { start: 1044, end: 1051, text: "" },
      { start: 1051, end: 1059, text: "" },
      { start: 1059, end: 1068, text: "" },
      { start: 1068, end: 1074, text: "" },
      { start: 1074, end: 1079, text: "" },
      { start: 1079, end: 1088, text: "" },
      { start: 1088, end: 1096, text: "" },
      { start: 1096, end: 1101, text: "" },
      { start: 1101, end: 1107, text: "" },
      { start: 1107, end: 1115, text: "" },
      { start: 1115, end: 1121, text: "" },
      { start: 1121, end: 1129, text: "" },
      { start: 1129, end: 1139, text: "" },
      { start: 1139, end: 1148, text: "" },
      { start: 1148, end: 1153, text: "" },
      { start: 1153, end: 1162, text: "" },
      { start: 1162, end: 1169, text: "" },
      { start: 1169, end: 1178, text: "" },
      { start: 1178, end: 1185, text: "" },
      { start: 1185, end: 1195, text: "" },
      { start: 1195, end: 1204, text: "" },
      { start: 1204, end: 1213, text: "" },
      { start: 1213, end: 1218, text: "" },
      { start: 1218, end: 1225, text: "" },
      { start: 1225, end: 1233, text: "" },
      { start: 1233, end: 1243, text: "" },
      { start: 1243, end: 1251, text: "" },
      { start: 1251, end: 1260, text: "" },
      { start: 1260, end: 1268, text: "" },
      { start: 1268, end: 1274, text: "" },
      { start: 1274, end: 1283, text: "" },
      { start: 1283, end: 1291, text: "" },
      { start: 1291, end: 1299, text: "" },
      { start: 1299, end: 1308, text: "" },
      { start: 1308, end: 1316, text: "" },
      { start: 1316, end: 1322, text: "" },
      { start: 1322, end: 1331, text: "" },
      { start: 1331, end: 1339, text: "" },
      { start: 1339, end: 1347, text: "" },
      { start: 1347, end: 1355, text: "" },
      { start: 1355, end: 1364, text: "" },
      { start: 1364, end: 1372, text: "" },
      { start: 1372, end: 1381, text: "" },
      { start: 1381, end: 1388, text: "" },
      { start: 1388, end: 1397, text: "" },
      { start: 1397, end: 1405, text: "" },
      { start: 1405, end: 1414, text: "" },
      { start: 1414, end: 1420, text: "" },
      { start: 1420, end: 1429, text: "" },
      { start: 1429, end: 1436, text: "" },
      { start: 1436, end: 1442, text: "" },
      { start: 1442, end: 1450, text: "" },
      { start: 1450, end: 1457, text: "" },
      { start: 1457, end: 1466, text: "" },
      { start: 1466, end: 1476, text: "" },
      { start: 1476, end: 1484, text: "" },
      { start: 1484, end: 1491, text: "" },
      { start: 1491, end: 1497, text: "" },
      { start: 1497, end: 1505, text: "" },
      { start: 1505, end: 1512, text: "" },
      { start: 1512, end: 1519, text: "" },
      { start: 1519, end: 1527, text: "" },
      { start: 1527, end: 1534, text: "" },
      { start: 1534, end: 1542, text: "" },
      { start: 1542, end: 1550, text: "" },
      { start: 1550, end: 1556, text: "" },
      { start: 1556, end: 1563, text: "" },
    ],
  },
};

export const A2_LESSONS: Record<string, LessonContent> = {
  "1": {
    title: "Daily Routine",
    subtitle: "LESSON 1",
    videoSrc: "/videos/a2/Lesson 1.mp4",
    transcript: "Hello! Welcome to Unit 1 of A2: Daily Routine...",
    segments: [],
  },
  "2": {
    title: "Travel & Transport",
    subtitle: "LESSON 2",
    videoSrc: "/videos/a2/Lesson 2.mp4",
    transcript: "Hello! Welcome to Unit 2 of A2: Travel & Transport...",
    segments: [],
  },
  "13": {
    title: "Lesson 13",
    subtitle: "LESSON 13",
    videoSrc: "/videos/a2/Lesson 13.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "14": {
    title: "Lesson 14",
    subtitle: "LESSON 14",
    videoSrc: "/videos/a2/Lesson 14.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "15": {
    title: "Lesson 15",
    subtitle: "LESSON 15",
    videoSrc: "/videos/a2/Lesson 15.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "16": {
    title: "Lesson 16",
    subtitle: "LESSON 16",
    videoSrc: "/videos/a2/Lesson 16.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "17": {
    title: "Lesson 17",
    subtitle: "LESSON 17",
    videoSrc: "/videos/a2/Lesson 17.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "18": {
    title: "Lesson 18",
    subtitle: "LESSON 18",
    videoSrc: "/videos/a2/Lesson 18.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "19": {
    title: "Lesson 19",
    subtitle: "LESSON 19",
    videoSrc: "/videos/a2/Lesson 19.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "20": {
    title: "Lesson 20",
    subtitle: "LESSON 20",
    videoSrc: "/videos/a2/Lesson 20.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "21": {
    title: "Lesson 21",
    subtitle: "LESSON 21",
    videoSrc: "/videos/a2/Lesson 21.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "22": {
    title: "Lesson 22",
    subtitle: "LESSON 22",
    videoSrc: "/videos/a2/Lesson 22.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "23": {
    title: "Lesson 23",
    subtitle: "LESSON 23",
    videoSrc: "/videos/a2/Lesson 23.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "24": {
    title: "Lesson 24",
    subtitle: "LESSON 24",
    videoSrc: "/videos/a2/Lesson 24.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "25": {
    title: "Lesson 25",
    subtitle: "LESSON 25",
    videoSrc: "/videos/a2/Lesson 25.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "26": {
    title: "Lesson 26",
    subtitle: "LESSON 26",
    videoSrc: "/videos/a2/Lesson 26.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "27": {
    title: "Lesson 27",
    subtitle: "LESSON 27",
    videoSrc: "/videos/a2/Lesson 27.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "28": {
    title: "Lesson 28",
    subtitle: "LESSON 28",
    videoSrc: "/videos/a2/Lesson 28.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "29": {
    title: "Lesson 29",
    subtitle: "LESSON 29",
    videoSrc: "/videos/a2/Lesson 29.mp4",
    transcript: "Transcript...",
    segments: [],
  },
  "30": {
    title: "Lesson 30",
    subtitle: "LESSON 30",
    videoSrc: "/videos/a2/Lesson 30.mp4",
    transcript: "Transcript...",
    segments: [],
  },
};

// ✅ map theo level (có thể thêm a2 sau)
export const LESSONS_BY_LEVEL: Record<string, Record<string, LessonContent>> = {
  a1: A1_LESSONS,
  a2: A2_LESSONS,
};
