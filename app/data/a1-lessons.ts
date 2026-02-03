export type Segment = { start: number; end: number };

export type LessonContent = {
  title: string;
  subtitle?: string;
  videoSrc: string; // /public/videos/...
  transcript: string;
  segments: Segment[];
};

// ✅ A1 LESSONS 1 -> 15
export const A1_LESSONS: Record<string, LessonContent> = {
  "1": {
    title: "Introducing Myself",
    subtitle: "LESSON 1",
    videoSrc: "/videos/a1/Lesson 1.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners. Today's topic is introducing myself. You will listen to a short story about a woman. She will introduce herself and will give us personal information about her family and her life. After the story, I will ask you some questions to check on your understanding. Don't worry if you don't understand everything. Just focus on the key information. Are you ready? Let's begin. Hello, my name is Emily. I'm 40 years old and I live in a small town in the United States. I want to tell you a little bit about myself. I was born in New York City, but now I live in a town called Greenfield. It's very quiet here and I love it. The weather is nice and there are many parks and trees. I live in a small house with my husband Tom and our two children, Lily and Ben. Tom is 42 years old and he works in a big office in the city. He is very busy, but he loves his job. Lily is 9 years old and Ben is six. Lily loves to draw and Ben loves to play with his toys. I work as a nurse. I help people when they are sick or hurt. I work in a hospital in the city. My job is very important to me because I like to help people feel better. Sometimes it's a hard job, but I enjoyed it a lot. In my free time, I like to read books. My favorite books are about history and travel. I also enjoy cooking. I like cooking Italian food, especially pasta. On weekends, my family and I go for walks in the park. We also visit my parents who live not far from us. I have two sisters and we like to spend time together. I think it's important to take care of our health. I try to stay active by walking and eating healthy food. I feel very lucky because I have a nice family and a lot of friends. That's a little bit about me. Thank you for listening.`,
    segments: [
      { start: 0, end: 6.2 },
      { start: 6.2, end: 9.7 },
      { start: 9.7, end: 14 },
      { start: 14, end: 22 },
      { start: 22, end: 28 },
      { start: 28, end: 30 },
      { start: 30, end: 33 },
      { start: 33, end: 35 },
      { start: 35, end: 41 },
      { start: 41, end: 44 },
      { start: 44, end: 49 },
      { start: 49, end: 55 },
      { start: 55, end: 60 },
      { start: 60, end: 62 },
      { start: 62, end: 68 },
      { start: 68, end: 76 },
      { start: 76, end: 83 },
      { start: 83, end: 88 },
      { start: 88, end: 97 },
      { start: 97, end: 103 },
      { start: 103, end: 107 },
      { start: 107, end: 110 },
      { start: 110, end: 114 },
      { start: 114, end: 121 },
      { start: 121, end: 128 },
      { start: 128, end: 131 },
      { start: 131, end: 135 },
      { start: 135, end: 142 },
      { start: 142, end: 145 },
      { start: 145, end: 152 },
      { start: 152, end: 158 },
      { start: 158, end: 166 },
      { start: 166, end: 170 },
      { start: 170, end: 176 },
      { start: 176, end: 183 },
      { start: 183, end: 186 },
    ],
  },

  "2": {
    title: "My Family",
    subtitle: "LESSON 2",
    videoSrc: "/videos/a1/Lesson 2.mp4",
    transcript: `In this video, I will talk about the topic my family. Listen carefully because later I will ask you some questions to see if you understood everything. Are you ready? Let's start. Hello everyone. My name is Anna. I'm very happy to share my family story with you today. I come from a small and loving family and I want to tell you all about them. I live with four people: my father, my mother, my older sister, and my younger brother. My father's name is Mark. He is a doctor. Every day he works in a busy hospital and helps many people feel better. I admire him because he is very kind and always takes care of others. My father loves his job and he often tells me stories about how he helps his patients. My mother's name is Linda. She is a teacher. She works in a local school where she teaches young children. My mother is very patient and friendly. She enjoys reading and writing and she always helps me with my homework when I study in the evening. I feel very lucky to have such a caring and smart mother. I also have an older sister. Her name is Emily. Emily is a high school student. She studies hard and loves art. In her free time, she likes to draw and paint. Sometimes she shows me her beautiful pictures and I feel very proud of her. Emily is very supportive and she always encourages me to try new things. My younger brother is Tom. He is 8 years old and full of energy. Tom loves playing with his toys and riding his bicycle in the park. He is always laughing and making everyone smile. Even though he is younger, he is very curious and loves to ask questions about everything he sees. Every morning, our family eats breakfast together. We sit at the table and talk about our plans for the day. After breakfast, my father leaves for the hospital. My mother goes to school and my sister and I get ready for our studies. In the afternoon, we sometimes meet at home and share our experiences. In the evening, we have dinner together and enjoy simple happy moments. On weekends, we like to spend time together outdoors. We go for walks in the park and visit local markets or sometimes watch a movie together at home. These moments make me feel very happy and connected with my family. Thank you for listening to my story about my family. I hope you enjoyed learning about each member and their daily lives. I love my family and I am grateful for every day we spend together.`,
    segments: [
      { start: 0, end: 5 },
      { start: 5, end: 12 },
      { start: 12, end: 14 },
      { start: 14, end: 18 },
      { start: 18, end: 20 },
      { start: 20, end: 22 },
      { start: 22, end: 28 },
      { start: 28, end: 36 },
      { start: 36, end: 39 },
      { start: 39, end: 45 },
      { start: 45, end: 48 },
      { start: 48, end: 51 },
      { start: 51, end: 57 },
      { start: 57, end: 64 },
      { start: 64, end: 72 },
      { start: 72, end: 75 },
      { start: 75, end: 78 },
      { start: 78, end: 85 },
      { start: 85, end: 89 },
      { start: 89, end: 98 },
      { start: 98, end: 104 },
      { start: 104, end: 107 },
      { start: 107, end: 110 },
      { start: 110, end: 114 },
      { start: 114, end: 119 },
      { start: 119, end: 125 },
      { start: 125, end: 132 },
      { start: 132, end: 139 },
      { start: 139, end: 142 },
      { start: 142, end: 147 },
      { start: 147, end: 154 },
      { start: 154, end: 160 },
      { start: 160, end: 170 },
      { start: 170, end: 175 },
      { start: 175, end: 181 },
      { start: 181, end: 186 },
      { start: 186, end: 194 },
      { start: 194, end: 201 },
      { start: 201, end: 210 },
      { start: 210, end: 215 },
      { start: 215, end: 225 },
      { start: 225, end: 232 },
      { start: 232, end: 237 },
      { start: 237, end: 244 },
    ],
  },

  "3": {
    title: "My Daily Routine",
    subtitle: "LESSON 3",
    videoSrc: "/videos/a1/Lesson 3.mp4",
    transcript: `Listening for beginners. Today's topic is my daily routine. After the story, I will ask you some questions to check on your understanding. Don't worry if you don't understand everything. Just focus on the key information. Are you ready? Let's begin. My name is Emma. I'm 40 years old. And today I'm going to tell you about a typical day in my life. I have a simple routine, but I like it. I wake up at 7 in the morning. I don't like waking up early, but I have to because I have a busy day. The first thing I do is turn off my alarm and get out of bed. I go to the bathroom. I wash my face and brush my teeth. After that, I get dressed. I usually wear comfortable clothes because I work from home. I work on my computer all day. At 7:30, I go downstairs to have breakfast. I like to eat something light and healthy. I usually have cereal with milk and a cup of coffee. Sometimes I eat toast with jam and sometimes I have an apple. Breakfast is very important to me. It gives me energy for the entire day. At 8, I start working. I check my emails and answer some messages from my colleagues. I work as a freelance writer, so I write articles for different companies. It's a nice job and I enjoy it. At 12, I have a break and have lunch. I don't eat a big lunch, just something small like a salad or a sandwich. After lunch, I like to take a short walk outside to get some fresh air. It helps me feel relaxed and ready for the afternoon. In the afternoon, I work until 4. After that, I spend time with my family. At 6, I start preparing dinner. I like to cook and try to make tasty meals for my family. Tonight, I'm making pasta with tomato sauce. After dinner, I clean the kitchen and then I try to relax. I usually read a book or watch TV. At 9, I help my children get ready for bed. I read a story to them and then they go to sleep. After that, I spend some time with my husband. We talk about our day or watch a movie together. I go to bed at 10:30. I need a good night's sleep because I have another busy day tomorrow.`,
    segments: [
      { start: 0, end: 3 },
      { start: 3, end: 7 },
      { start: 7, end: 12 },
      { start: 12, end: 16 },
      { start: 16, end: 20 },
      { start: 20, end: 22 },
      { start: 22, end: 24 },
      { start: 24, end: 26 },
      { start: 26, end: 28 },
      { start: 28, end: 34 },
      { start: 34, end: 38 },
      { start: 38, end: 42 },
      { start: 42, end: 48 },
      { start: 48, end: 54 },
      { start: 54, end: 56 },
      { start: 56, end: 60 },
      { start: 60, end: 63 },
      { start: 63, end: 69 },
      { start: 69, end: 74 },
      { start: 74, end: 79 },
      { start: 79, end: 82 },
      { start: 82, end: 87 },
      { start: 87, end: 93 },
      { start: 93, end: 96 },
      { start: 96, end: 101 },
      { start: 101, end: 104 },
      { start: 104, end: 110 },
      { start: 110, end: 117 },
      { start: 117, end: 122 },
      { start: 122, end: 127 },
      { start: 127, end: 134 },
      { start: 134, end: 141 },
      { start: 141, end: 146 },
      { start: 146, end: 151 },
      { start: 151, end: 155 },
      { start: 155, end: 159 },
      { start: 159, end: 165 },
      { start: 165, end: 170 },
      { start: 170, end: 176 },
      { start: 176, end: 181 },
      { start: 181, end: 186 },
      { start: 186, end: 192 },
      { start: 192, end: 200 },
      { start: 200, end: 204 },
    ],
  },

  "4": {
    title: "My Favorite Food",
    subtitle: "LESSON 4",
    videoSrc: "/videos/a1/Lesson 4.mp4",
    transcript: `Listening for beginners. Today's topic is food in Italy. After the story, I will ask you some questions to check on your understanding. Don't worry if you don't understand everything. Listen carefully and just focus on the key information. Are you ready? Let's begin. Hello, my name is Maria and I'm 40 years old. I'm from Italy, a country known all over the world for its food. Today I want to talk to you about the amazing food culture in my country. In Italy, food is very important. We don't just eat to stay alive. We eat to enjoy life. We take our time to prepare and eat our meals. Food brings people together. The most important meal of the day is lunch. It's usually around 1 or 2 in the afternoon. Many Italians like me like to eat with their families or friends. It's a moment to relax and talk about the day. For breakfast, we usually drink coffee. Most people love espresso or cappuccino. And we eat something sweet like cornetto, similar to a croissant. In the north of Italy, people sometimes eat a light breakfast with bread and jam. But in the south, it's more common to have pastries. Or salty food like pizza. A small pizza made with tomato and mozzarella. For lunch, Italians love pasta. There are many types of pasta. Spaghetti, penne, fusilli, ravioli, etc. We often eat pasta with tomato sauce or creamy sauce. My favorite pasta is pasta al pomodoro. Which is pasta with tomato sauce, basil, A little bit of olive oil and some grated Parmigiano cheese. It's simple but delicious. In Italy, we also have a tradition of eating antipasti. These are small dishes before the main meal. This can be olives, cheese, salami with fresh bread. After lunch, we usually eat a dessert. Like tiramisu or cannoli. And drink coffee. Of course, dinner in Italy is usually lighter. We usually have fish, meat, or chicken with salad. I love making a simple salad. But the most popular dish for dinner, especially with friends, is pizza. I love parmigiana pizza. It's pizza made with tomato, mozzarella, and fried eggplants. And also grated Parmigiano cheese. It's delicious. In my country, every region has its own special dishes. In the north, you can find a lot of rice dishes like risotto. In the south, they use more tomatoes, olives, and seafood. For example, in Sicily, you can eat pasta con le sarde. Which is pasta with sardines. And in the region of Emilia-Romagna, you can try lasagna or tortellini. Italian food is so diverse. And each region is proud of its recipes. Food is not just about eating. It's very important for us. Because it's part of our tradition and culture. We always cook with love. And we love sharing our meals with our family and friends. If you visit Italy, I recommend you try food in every region. Thank you for listening. I hope you feel inspired to try some Italian food.`,
    segments: [
      { start: 0, end: 3 },
      { start: 3, end: 8 },
      { start: 8, end: 14 },
      { start: 14, end: 18 },
      { start: 18, end: 24 },
      { start: 24, end: 26 },
      { start: 26, end: 30 },
      { start: 30, end: 35 },
      { start: 35, end: 42 },
      { start: 42, end: 49 },
      { start: 49, end: 53 },
      { start: 53, end: 57 },
      { start: 57, end: 61 },
      { start: 61, end: 68 },
      { start: 68, end: 73 },
      { start: 73, end: 78 },
      { start: 78, end: 85 },
      { start: 85, end: 91 },
      { start: 91, end: 96 },
      { start: 96, end: 101 },
      { start: 101, end: 108 },
      { start: 108, end: 116 },
      { start: 116, end: 129 },
      { start: 129, end: 134 },
      { start: 134, end: 140 },
      { start: 140, end: 148 },
      { start: 148, end: 161 },
      { start: 161, end: 165 },
      { start: 165, end: 177 },
      { start: 177, end: 185 },
      { start: 185, end: 196 },
      { start: 196, end: 202 },
      { start: 202, end: 210 },
      { start: 210, end: 224 },
      { start: 224, end: 227 },
      { start: 227, end: 238 },
      { start: 238, end: 242 },
      { start: 242, end: 249 },
      { start: 249, end: 255 },
      { start: 255, end: 261 },
      { start: 261, end: 271 },
      { start: 271, end: 280 },
      { start: 280, end: 289 },
      { start: 289, end: 293 },
      { start: 293, end: 300 },
      { start: 300, end: 310 },
      { start: 310, end: 318 },
      { start: 318, end: 321 },
    ],
  },

  "5": {
    title: "My Home",
    subtitle: "LESSON 5",
    videoSrc: "/videos/a1/Lesson 5.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners. Today's topic is my house. After the story, I will ask you some questions to check on your understanding. Don't worry if you don't understand everything. Just focus on the key information. Are you ready? Let's begin. Hello, my name is Linda. I'm 45 years old and I live in a small house in the city. It's not very big, but I love it because it feels like home. I have lived in this house for 10 years, and I'm very happy here. My house has four rooms, and each one is special to me. First, I'll tell you about the kitchen. The kitchen is very important in my house. I spend a lot of time cooking and eating with my family. It is not very big, but it's comfortable. I have a stove, a fridge, and a dishwasher. The kitchen is white, and the walls are painted light blue. There is a small window above the sink. I love looking outside when I'm doing the dishes. I also have a big table in the middle of the kitchen. My family eats together there. I cook dinner almost every night. I like making pasta, soups, and salads. My children like to help me with simple things. Like setting the table or stirring the soup. We always have fun in the kitchen. Next, let me tell you about the living room. The living room is very cozy. It's the place where my family relaxes after a long day. We have a big sofa, two armchairs, and a coffee table. There is a television on the wall. We watch movies together on weekends. I also have some plants in the living room. They make the space feel fresh and green. The walls are painted yellow. This makes the room feel warm and sunny. In the winter, I like to sit on the sofa. With a blanket, drink tea, and read a book. My children like to play board games in the living room. We spend a lot of time together there. Now, I'll tell you about my bedroom. It's a small room, but it's very peaceful. I sleep here, of course. I also like spending time reading and relaxing. I have a big bed with soft pillows and a warm blanket. There is a small desk. I can work on my computer or write there. I don't have many things in my bedroom. I like it to be simple and calm. The walls are light green. There is a small window next to the bed. I like to look outside at the trees and birds. When I wake up in the morning. My bedroom is the place where I rest and feel calm. It's my favorite room in the house. Finally, I want to talk to you about the bathroom. The bathroom is small but very functional. It has a shower, a toilet, and a sink. I have a mirror above the sink. I brush my teeth there every morning. The walls are white. There is a small shelf for towels and soap. There is a window in the bathroom too. I always open it when I take a shower. It makes the room feel fresh. I like to spend a little time in the bathroom in the morning. To get ready for the day. It's a quiet and private place. So, that's my house. I feel happy here. It's not big, but it's perfect for me and my family. Each room is important to me. And I love spending time in every room. I hope you enjoyed hearing about my home.`,
    segments: [
      { start: 0, end: 5 },
      { start: 5, end: 10 },
      { start: 10, end: 16 },
      { start: 16, end: 20 },
      { start: 20, end: 24 },
      { start: 24, end: 26 },
      { start: 26, end: 30 },
      { start: 30, end: 33 },
      { start: 33, end: 40 },
      { start: 40, end: 47 },
      { start: 47, end: 55 },
      { start: 55, end: 62 },
      { start: 62, end: 67 },
      { start: 67, end: 71 },
      { start: 71, end: 78 },
      { start: 78, end: 83 },
      { start: 83, end: 90 },
      { start: 90, end: 98 },
      { start: 98, end: 103 },
      { start: 103, end: 109 },
      { start: 109, end: 119 },
      { start: 119, end: 123 },
      { start: 123, end: 128 },
      { start: 128, end: 137 },
      { start: 137, end: 143 },
      { start: 143, end: 148 },
      { start: 148, end: 152 },
      { start: 152, end: 158 },
      { start: 158, end: 165 },
      { start: 165, end: 173 },
      { start: 173, end: 177 },
      { start: 177, end: 183 },
      { start: 183, end: 191 },
      { start: 191, end: 200 },
      { start: 200, end: 205 },
      { start: 205, end: 211 },
      { start: 211, end: 216 },
      { start: 216, end: 221 },
      { start: 221, end: 229 },
      { start: 229, end: 237 },
      { start: 237, end: 245 },
      { start: 245, end: 254 },
      { start: 254, end: 262 },
      { start: 262, end: 271 },
      { start: 271, end: 277 },
      { start: 277, end: 282 },
      { start: 282, end: 287 },
      { start: 287, end: 292 },
      { start: 292, end: 298 },
      { start: 298, end: 307 },
      { start: 307, end: 317 },
      { start: 317, end: 321 },
      { start: 321, end: 329 },
      { start: 329, end: 338 },
      { start: 338, end: 342 },
      { start: 342, end: 346 },
      { start: 346, end: 349 },
      { start: 349, end: 355 },
      { start: 355, end: 358 },
      { start: 358, end: 364 },
    ],
  },

  "6": {
    title: "Shopping",
    subtitle: "LESSON 6",
    videoSrc: "/videos/a1/Lesson 6.mp4",
    transcript: `On the weekend, I go shopping.
I buy fruit, vegetables, and bread.
I also buy shampoo and soap.
At the supermarket, I choose fresh food and check the price.
After shopping, I go home and put everything in the kitchen.`,
    segments: [
      { start: 0, end: 8.0 },
      { start: 8.0, end: 16.0 },
      { start: 16.0, end: 23.5 },
    ],
  },

  "7": {
    title: "My Hobbies",
    subtitle: "LESSON 7",
    videoSrc: "/videos/a1/Lesson 7.mp4",
    transcript: `In my free time, I have some hobbies.
I like listening to music and watching movies.
I also enjoy playing simple games.
Sometimes I go for a walk in the park.
On rainy days, I stay at home and read a book.`,
    segments: [
      { start: 0, end: 7.5 },
      { start: 7.5, end: 15.5 },
      { start: 15.5, end: 23.0 },
    ],
  },

  "8": {
    title: "Weather and Seasons",
    subtitle: "LESSON 8",
    videoSrc: "/videos/a1/Lesson 8.mp4",
    transcript: `Today, the weather is nice and sunny.
I like spring because it is warm and comfortable.
In summer, it is hot, and we can swim.
In autumn, the leaves fall and the air is cool.
In winter, it is cold and sometimes it snows.`,
    segments: [
      { start: 0, end: 8.0 },
      { start: 8.0, end: 16.5 },
      { start: 16.5, end: 25.0 },
    ],
  },

  "9": {
    title: "My House",
    subtitle: "LESSON 9",
    videoSrc: "/videos/a1/Lesson 9.mp4",
    transcript: `I live in a small house with my family.
There is a living room, a kitchen, and two bedrooms.
My favorite place is my bedroom because it is quiet.
In the living room, we watch TV together.
In the kitchen, my mother cooks delicious meals.`,
    segments: [
      { start: 0, end: 8.0 },
      { start: 8.0, end: 16.0 },
      { start: 16.0, end: 24.0 },
    ],
  },

  "10": {
    title: "My Best Friend",
    subtitle: "LESSON 10",
    videoSrc: "/videos/a1/Lesson 10.mp4",
    transcript: `I have a best friend named Tom.
He is friendly and helpful.
We study together after school.
Sometimes we play football in the park.
I feel happy when I talk with him because he makes me smile.`,
    segments: [
      { start: 0, end: 7.5 },
      { start: 7.5, end: 15.0 },
      { start: 15.0, end: 22.5 },
    ],
  },

  "11": {
    title: "Going to the Doctor",
    subtitle: "LESSON 11",
    videoSrc: "/videos/a1/Lesson 11.mp4",
    transcript: `Sometimes people feel sick.
When I have a fever, I go to the doctor.
The doctor asks me questions and checks my health.
He gives me medicine and tells me to rest.
After a few days, I feel better and go back to school.`,
    segments: [
      { start: 0, end: 8.5 },
      { start: 8.5, end: 17.0 },
      { start: 17.0, end: 25.0 },
    ],
  },

  "12": {
    title: "At the Restaurant",
    subtitle: "LESSON 12",
    videoSrc: "/videos/a1/Lesson 12.mp4",
    transcript: `Today, I go to a restaurant with my family.
We look at the menu and choose our food.
I order chicken soup and a salad.
The waiter brings the food and drinks.
After we finish, we pay the bill and say thank you.`,
    segments: [
      { start: 0, end: 8.0 },
      { start: 8.0, end: 16.0 },
      { start: 16.0, end: 24.0 },
    ],
  },

  "13": {
    title: "Transportation",
    subtitle: "LESSON 13",
    videoSrc: "/videos/a1/Lesson 13.mp4",
    transcript: `There are many ways to travel.
Some people go by bus, and some go by car.
I often ride my bicycle to school.
In big cities, many people use the subway.
Transportation is important because it helps us go to work and visit friends.`,
    segments: [
      { start: 0, end: 8.5 },
      { start: 8.5, end: 17.0 },
      { start: 17.0, end: 26.0 },
    ],
  },

  "14": {
    title: "My Weekend",
    subtitle: "LESSON 14",
    videoSrc: "/videos/a1/Lesson 14.mp4",
    transcript: `On Saturday, I wake up late and have breakfast.
Then I clean my room and do my homework.
In the afternoon, I meet my friends and drink coffee.
On Sunday, I stay at home and relax.
I feel happy because the weekend gives me time to rest.`,
    segments: [
      { start: 0, end: 8.0 },
      { start: 8.0, end: 16.5 },
      { start: 16.5, end: 25.0 },
    ],
  },

  "15": {
    title: "My Future Plans",
    subtitle: "LESSON 15",
    videoSrc: "/videos/a1/Lesson 15.mp4",
    transcript: `In the future, I want to improve my English.
I want to speak clearly and confidently.
I also want to learn new skills and get a good job.
Every day, I will practice listening and speaking.
I believe I can reach my goal if I try my best.`,
    segments: [
      { start: 0, end: 8.0 },
      { start: 8.0, end: 16.0 },
      { start: 16.0, end: 24.5 },
    ],
  },
};

// ✅ map theo level (có thể thêm a2 sau)
export const LESSONS_BY_LEVEL: Record<string, Record<string, LessonContent>> = {
  a1: A1_LESSONS,
  // a2: A2_LESSONS,
};
