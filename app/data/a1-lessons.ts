export type Segment = { start: number; end: number };
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
    title: "My favorite food",
    subtitle: "LESSON 3",
    videoSrc: "/videos/a1/Lesson 3.mp4",
    transcript: `Listening for beginners. Today's topic is food in Italy. After the story, I will ask you some questions to check on your understanding. Don't worry if you don't understand everything. Listen carefully and just focus on the key information. Are you ready? Let's begin. Hello, my name is Maria and I'm 40 years old. I'm from Italy, a country known all over the world for its food. Today I want to talk to you about the amazing food culture in my country. In Italy, food is very important. We don't just eat to stay alive. We eat to enjoy life. We take our time to prepare and eat our meals. Food brings people together. The most important meal of the day is lunch. It's usually around 1 or 2 in the afternoon. Many Italians like me like to eat with their families or friends. It's a moment to relax and talk about the day. For breakfast, we usually drink coffee. Most people love espresso or cappuccino. And we eat something sweet like cornetto, similar to a croissant. In the north of Italy, people sometimes eat a light breakfast with bread and jam. But in the south, it's more common to have pastries. Or salty food like pizza. A small pizza made with tomato and mozzarella. For lunch, Italians love pasta. There are many types of pasta. Spaghetti, penne, fusilli, ravioli, etc. We often eat pasta with tomato sauce or creamy sauce. My favorite pasta is pasta al pomodoro. Which is pasta with tomato sauce, basil, A little bit of olive oil and some grated Parmigiano cheese. It's simple but delicious. In Italy, we also have a tradition of eating antipasti. These are small dishes before the main meal. This can be olives, cheese, salami with fresh bread. After lunch, we usually eat a dessert. Like tiramisu or cannoli. And drink coffee. Of course, dinner in Italy is usually lighter. We usually have fish, meat, or chicken with salad. I love making a simple salad. But the most popular dish for dinner, especially with friends, is pizza. I love parmigiana pizza. It's pizza made with tomato, mozzarella, and fried eggplants. And also grated Parmigiano cheese. It's delicious. In my country, every region has its own special dishes. In the north, you can find a lot of rice dishes like risotto. In the south, they use more tomatoes, olives, and seafood. For example, in Sicily, you can eat pasta con le sarde. Which is pasta with sardines. And in the region of Emilia-Romagna, you can try lasagna or tortellini. Italian food is so diverse. And each region is proud of its recipes. Food is not just about eating. It's very important for us. Because it's part of our tradition and culture. We always cook with love. And we love sharing our meals with our family and friends. If you visit Italy, I recommend you try food in every region. Thank you for listening. I hope you feel inspired to try some Italian food.`,
    segments: [
      { start: 0, end: 8 },
      { start: 8, end: 13 },
      { start: 13, end: 20 },
      { start: 20, end: 28 },
      { start: 28, end: 36 },
      { start: 36, end: 41 },
      { start: 41, end: 49 },
      { start: 49, end: 56 },
      { start: 56, end: 63 },
      { start: 63, end: 70 },
      { start: 70, end: 75 },
      { start: 75, end: 82 },
      { start: 82, end: 88 },
      { start: 88, end: 94 },
      { start: 94, end: 101 },
      { start: 101, end: 110 },
      { start: 110, end: 117 },
      { start: 117, end: 123 },
      { start: 123, end: 129 },
      { start: 129, end: 136 },
      { start: 136, end: 145 },
      { start: 145, end: 151 },
      { start: 151, end: 156 },
      { start: 156, end: 163 },
      { start: 163, end: 168 },
      { start: 168, end: 173 },
      { start: 173, end: 180 },
      { start: 180, end: 188 },
      { start: 188, end: 194 },
      { start: 194, end: 199 },
      { start: 199, end: 208 },
      { start: 208, end: 215 },
      { start: 215, end: 222 },
      { start: 222, end: 228 },
      { start: 228, end: 235 },
      { start: 235, end: 241 },
      { start: 241, end: 247 },
      { start: 247, end: 253 },
      { start: 253, end: 262 },
      { start: 262, end: 269 },
      { start: 269, end: 274 },
      { start: 274, end: 283 },
      { start: 283, end: 289 },
      { start: 289, end: 298 },
      { start: 298, end: 305 },
      { start: 305, end: 311 },
      { start: 311, end: 320 },
      { start: 320, end: 327 },
      { start: 327, end: 334 },
      { start: 334, end: 342 },
      { start: 342, end: 349 },
      { start: 349, end: 358 },
      { start: 358, end: 363 },
      { start: 363, end: 372 },
      { start: 372, end: 378 },
      { start: 378, end: 383 },
      { start: 383, end: 389 },
      { start: 389, end: 395 },
      { start: 395, end: 402 },
      { start: 402, end: 410 },
      { start: 410, end: 415 },
    ],
  },

  "4": {
    title: "My Home",
    subtitle: "LESSON 4",
    videoSrc: "/videos/a1/Lesson 4.mp4",
    transcript: `Hello and welcome to this slow English listening for beginners. Today's topic is my house. After the story, I will ask you some questions to check on your understanding. Don't worry if you don't understand everything. Just focus on the key information. Are you ready? Let's begin. Hello, my name is Linda. I'm 45 years old and I live in a small house in the city. It's not very big, but I love it because it feels like home. I have lived in this house for 10 years, and I'm very happy here. My house has four rooms, and each one is special to me. First, I'll tell you about the kitchen. The kitchen is very important in my house. I spend a lot of time cooking and eating with my family. It is not very big, but it's comfortable. I have a stove, a fridge, and a dishwasher. The kitchen is white, and the walls are painted light blue. There is a small window above the sink. I love looking outside when I'm doing the dishes. I also have a big table in the middle of the kitchen. My family eats together there. I cook dinner almost every night. I like making pasta, soups, and salads. My children like to help me with simple things. Like setting the table or stirring the soup. We always have fun in the kitchen. Next, let me tell you about the living room. The living room is very cozy. It's the place where my family relaxes after a long day. We have a big sofa, two armchairs, and a coffee table. There is a television on the wall. We watch movies together on weekends. I also have some plants in the living room. They make the space feel fresh and green. The walls are painted yellow. This makes the room feel warm and sunny. In the winter, I like to sit on the sofa. With a blanket, drink tea, and read a book. My children like to play board games in the living room. We spend a lot of time together there. Now, I'll tell you about my bedroom. It's a small room, but it's very peaceful. I sleep here, of course. I also like spending time reading and relaxing. I have a big bed with soft pillows and a warm blanket. There is a small desk. I can work on my computer or write there. I don't have many things in my bedroom. I like it to be simple and calm. The walls are light green. There is a small window next to the bed. I like to look outside at the trees and birds. When I wake up in the morning. My bedroom is the place where I rest and feel calm. It's my favorite room in the house. Finally, I want to talk to you about the bathroom. The bathroom is small but very functional. It has a shower, a toilet, and a sink. I have a mirror above the sink. I brush my teeth there every morning. The walls are white. There is a small shelf for towels and soap. There is a window in the bathroom too. I always open it when I take a shower. It makes the room feel fresh. I like to spend a little time in the bathroom in the morning. To get ready for the day. It's a quiet and private place. So, that's my house. I feel happy here. It's not big, but it's perfect for me and my family. Each room is important to me. And I love spending time in every room. I hope you enjoyed hearing about my home.`,
    segments: [
      { start: 0, end: 5 },
      { start: 5, end: 12 },
      { start: 12, end: 19 },
      { start: 19, end: 26 },
      { start: 26, end: 35 },
      { start: 35, end: 42 },
      { start: 42, end: 47 },
      { start: 47, end: 55 },
      { start: 55, end: 63 },
      { start: 63, end: 72 },
      { start: 72, end: 78 },
      { start: 78, end: 86 },
      { start: 86, end: 92 },
      { start: 92, end: 103 },
      { start: 103, end: 110 },
      { start: 110, end: 119 },
      { start: 119, end: 128 },
      { start: 128, end: 134 },
      { start: 134, end: 140 },
      { start: 140, end: 147 },
      { start: 147, end: 152 },
      { start: 152, end: 158 },
      { start: 158, end: 164 },
      { start: 164, end: 171 },
      { start: 171, end: 178 },
      { start: 178, end: 187 },
      { start: 187, end: 193 },
      { start: 193, end: 198 },
      { start: 198, end: 207 },
      { start: 207, end: 215 },
      { start: 215, end: 220 },
      { start: 220, end: 226 },
      { start: 226, end: 232 },
      { start: 232, end: 239 },
      { start: 239, end: 244 },
      { start: 244, end: 252 },
      { start: 252, end: 257 },
      { start: 257, end: 263 },
      { start: 263, end: 270 },
      { start: 270, end: 278 },
      { start: 278, end: 285 },
      { start: 285, end: 291 },
      { start: 291, end: 295 },
      { start: 295, end: 301 },
      { start: 301, end: 309 },
      { start: 309, end: 313 },
      { start: 313, end: 319 },
      { start: 319, end: 324 },
      { start: 324, end: 332 },
      { start: 332, end: 336 },
      { start: 336, end: 343 },
      { start: 343, end: 351 },
      { start: 351, end: 356 },
      { start: 356, end: 365 },
      { start: 365, end: 371 },
      { start: 371, end: 376 },
      { start: 376, end: 381 },
      { start: 381, end: 388 },
      { start: 388, end: 393 },
      { start: 393, end: 400 },
      { start: 400, end: 404 },
      { start: 404, end: 415 },
      { start: 415, end: 420 },
      { start: 420, end: 426 },
      { start: 426, end: 431 },
      { start: 431, end: 438 },
      { start: 438, end: 443 },
      { start: 443, end: 449 },
      { start: 449, end: 454 },
      { start: 454, end: 459 },
      { start: 459, end: 465 },
      { start: 465, end: 470 },
      { start: 470, end: 480 },
      { start: 480, end: 485 },
      { start: 485, end: 494 },
      { start: 494, end: 501 },
      { start: 501, end: 507 },
      { start: 507, end: 514 },
      { start: 514, end: 521 },
      { start: 521, end: 530 },
      { start: 530, end: 535 },
      { start: 535, end: 541 },
      { start: 541, end: 547 },
      { start: 547, end: 556 },
      { start: 556, end: 561 },
      { start: 561, end: 568 },
      { start: 568, end: 574 },
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
      { start: 0, end: 8 },
      { start: 8, end: 15 },
      { start: 15, end: 20 },
      { start: 20, end: 25 },
      { start: 25, end: 30 },
      { start: 30, end: 36 },
      { start: 36, end: 40 },
      { start: 40, end: 46 },
      { start: 46, end: 54 },
      { start: 54, end: 59 },
      { start: 59, end: 62 },
      { start: 62, end: 67 },
      { start: 67, end: 72 },
      { start: 72, end: 78 },
      { start: 78, end: 85 },
      { start: 85, end: 92 },
      { start: 92, end: 98 },
      { start: 98, end: 103 },
      { start: 103, end: 108 },
      { start: 108, end: 116 },
      { start: 116, end: 125 },
      { start: 125, end: 131 },
      { start: 131, end: 137 },
      { start: 137, end: 143 },
      { start: 143, end: 150 },
      { start: 150, end: 155 },
      { start: 155, end: 162 },
      { start: 162, end: 168 },
      { start: 168, end: 173 },
      { start: 173, end: 179 },
      { start: 179, end: 186 },
      { start: 186, end: 194 },
      { start: 194, end: 200 },
      { start: 200, end: 205 },
      { start: 205, end: 212 },
      { start: 212, end: 219 },
      { start: 219, end: 223 },
      { start: 223, end: 230 },
      { start: 230, end: 239 },
      { start: 239, end: 248 },
      { start: 248, end: 254 },
      { start: 254, end: 260 },
      { start: 260, end: 266 },
      { start: 266, end: 275 },
      { start: 275, end: 280 },
      { start: 280, end: 286 },
      { start: 286, end: 291 },
      { start: 291, end: 299 },
      { start: 299, end: 305 },
      { start: 305, end: 311 },
      { start: 311, end: 316 },
      { start: 316, end: 321 },
      { start: 321, end: 326 },
      { start: 326, end: 330 },
      { start: 330, end: 337 },
      { start: 337, end: 344 },
      { start: 344, end: 350 },
      { start: 350, end: 356 },
      { start: 356, end: 360 },
      { start: 360, end: 372 },
      { start: 372, end: 377 },
      { start: 377, end: 387 },
      { start: 387, end: 392 },
      { start: 392, end: 399 },
      { start: 399, end: 405 },
      { start: 405, end: 413 },
      { start: 413, end: 419 },
      { start: 419, end: 429 },
      { start: 429, end: 435 },
      { start: 435, end: 440 },
      { start: 440, end: 446 },
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
      { start: 0, end: 11 },
      { start: 11, end: 17 },
      { start: 17, end: 22 },
      { start: 22, end: 29 },
      { start: 29, end: 34 },
      { start: 34, end: 41 },
      { start: 41, end: 48 },
      { start: 48, end: 53 },
      { start: 53, end: 58 },
      { start: 58, end: 66 },
      { start: 66, end: 74 },
      { start: 74, end: 82 },
      { start: 82, end: 89 },
      { start: 89, end: 95 },
      { start: 95, end: 100 },
      { start: 100, end: 105 },
      { start: 105, end: 112 },
      { start: 112, end: 119 },
      { start: 119, end: 127 },
      { start: 127, end: 137 },
      { start: 137, end: 145 },
      { start: 145, end: 153 },
      { start: 153, end: 160 },
      { start: 160, end: 169 },
      { start: 169, end: 175 },
      { start: 175, end: 182 },
      { start: 182, end: 191 },
      { start: 191, end: 199 },
      { start: 199, end: 208 },
      { start: 208, end: 213 },
      { start: 213, end: 218 },
      { start: 218, end: 226 },
      { start: 226, end: 233 },
      { start: 233, end: 241 },
      { start: 241, end: 246 },
      { start: 246, end: 254 },
      { start: 254, end: 261 },
      { start: 261, end: 266 },
      { start: 266, end: 273 },
      { start: 273, end: 281 },
      { start: 281, end: 290 },
      { start: 290, end: 298 },
      { start: 298, end: 307 },
      { start: 307, end: 315 },
      { start: 315, end: 324 },
      { start: 324, end: 331 },
      { start: 331, end: 340 },
      { start: 340, end: 346 },
      { start: 346, end: 355 },
      { start: 355, end: 361 },
      { start: 361, end: 367 },
      { start: 367, end: 371 },
      { start: 371, end: 385 },
      { start: 385, end: 390 },
      { start: 390, end: 402 },
      { start: 402, end: 407 },
      { start: 407, end: 419 },
      { start: 419, end: 426 },
      { start: 426, end: 434 },
      { start: 434, end: 440 },
      { start: 440, end: 448 },
      { start: 448, end: 454 },
      { start: 454, end: 462 },
      { start: 462, end: 467 },
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
      { start: 0, end: 6 },
      { start: 6, end: 13 },
      { start: 13, end: 19 },
      { start: 19, end: 24 },
      { start: 24, end: 29 },
      { start: 29, end: 36 },
      { start: 36, end: 43 },
      { start: 43, end: 50 },
      { start: 50, end: 56 },
      { start: 56, end: 62 },
      { start: 62, end: 69 },
      { start: 69, end: 74 },
      { start: 74, end: 81 },
      { start: 81, end: 88 },
      { start: 88, end: 96 },
      { start: 96, end: 100 },
      { start: 100, end: 107 },
      { start: 107, end: 112 },
      { start: 112, end: 118 },
      { start: 118, end: 123 },
      { start: 123, end: 128 },
      { start: 128, end: 134 },
      { start: 134, end: 140 },
      { start: 140, end: 146 },
      { start: 146, end: 153 },
      { start: 153, end: 158 },
      { start: 158, end: 164 },
      { start: 164, end: 171 },
      { start: 171, end: 176 },
      { start: 176, end: 182 },
      { start: 182, end: 187 },
      { start: 187, end: 192 },
      { start: 192, end: 198 },
      { start: 198, end: 204 },
      { start: 204, end: 210 },
      { start: 210, end: 217 },
      { start: 217, end: 224 },
      { start: 224, end: 231 },
      { start: 231, end: 236 },
      { start: 236, end: 241 },
      { start: 241, end: 247 },
      { start: 247, end: 253 },
      { start: 253, end: 259 },
      { start: 259, end: 264 },
      { start: 264, end: 271 },
      { start: 271, end: 276 },
      { start: 276, end: 282 },
      { start: 282, end: 287 },
      { start: 287, end: 294 },
      { start: 294, end: 301 },
      { start: 301, end: 306 },
      { start: 306, end: 313 },
      { start: 313, end: 321 },
      { start: 321, end: 328 },
      { start: 328, end: 333 },
      { start: 333, end: 340 },
      { start: 340, end: 345 },
      { start: 345, end: 354 },
      { start: 354, end: 367 },
      { start: 367, end: 384 },
      { start: 384, end: 397 },
      { start: 397, end: 412 },
      { start: 412, end: 425 },
      { start: 425, end: 431 },
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
      { start: 0, end: 7 },
      { start: 7, end: 14 },
      { start: 14, end: 22 },
      { start: 22, end: 27 },
      { start: 27, end: 37 },
      { start: 37, end: 45 },
      { start: 45, end: 53 },
      { start: 53, end: 62 },
      { start: 62, end: 69 },
      { start: 69, end: 74 },
      { start: 74, end: 81 },
      { start: 81, end: 90 },
      { start: 90, end: 98 },
      { start: 98, end: 106 },
      { start: 106, end: 111 },
      { start: 111, end: 117 },
      { start: 117, end: 126 },
      { start: 126, end: 132 },
      { start: 132, end: 141 },
      { start: 141, end: 151 },
      { start: 151, end: 161 },
      { start: 161, end: 170 },
      { start: 170, end: 176 },
      { start: 176, end: 186 },
      { start: 186, end: 192 },
      { start: 192, end: 201 },
      { start: 201, end: 208 },
      { start: 208, end: 217 },
      { start: 217, end: 225 },
      { start: 225, end: 234 },
      { start: 234, end: 241 },
      { start: 241, end: 249 },
      { start: 249, end: 256 },
      { start: 256, end: 263 },
      { start: 263, end: 268 },
      { start: 268, end: 273 },
      { start: 273, end: 280 },
      { start: 280, end: 288 },
      { start: 288, end: 296 },
      { start: 296, end: 302 },
      { start: 302, end: 308 },
      { start: 308, end: 321 },
      { start: 321, end: 334 },
      { start: 334, end: 345 },
      { start: 345, end: 356 },
      { start: 356, end: 362 },
      { start: 362, end: 370 },
      { start: 370, end: 381 },
      { start: 381, end: 392 },
      { start: 392, end: 400 },
      { start: 400, end: 408 },
      { start: 408, end: 414 },
      { start: 414, end: 422 },
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
      { start: 0, end: 8 },
      { start: 8, end: 15 },
      { start: 15, end: 21 },
      { start: 21, end: 27 },
      { start: 27, end: 37 },
      { start: 37, end: 44 },
      { start: 44, end: 51 },
      { start: 51, end: 58 },
      { start: 58, end: 65 },
      { start: 65, end: 75 },
      { start: 75, end: 85 },
      { start: 85, end: 92 },
      { start: 92, end: 99 },
      { start: 99, end: 106 },
      { start: 106, end: 115 },
      { start: 115, end: 120 },
      { start: 120, end: 126 },
      { start: 126, end: 133 },
      { start: 133, end: 138 },
      { start: 138, end: 147 },
      { start: 147, end: 156 },
      { start: 156, end: 164 },
      { start: 164, end: 173 },
      { start: 173, end: 183 },
      { start: 183, end: 192 },
      { start: 192, end: 201 },
      { start: 201, end: 210 },
      { start: 210, end: 218 },
      { start: 218, end: 225 },
      { start: 225, end: 232 },
      { start: 232, end: 238 },
      { start: 238, end: 244 },
      { start: 244, end: 252 },
      { start: 252, end: 257 },
      { start: 257, end: 265 },
      { start: 265, end: 273 },
      { start: 273, end: 279 },
      { start: 279, end: 284 },
      { start: 284, end: 291 },
      { start: 291, end: 300 },
      { start: 300, end: 306 },
      { start: 306, end: 313 },
      { start: 313, end: 318 },
      { start: 318, end: 323 },
      { start: 323, end: 329 },
      { start: 329, end: 336 },
      { start: 336, end: 346 },
      { start: 346, end: 354 },
      { start: 354, end: 362 },
      { start: 362, end: 370 },
      { start: 370, end: 375 },
      { start: 375, end: 382 },
      { start: 382, end: 389 },
      { start: 389, end: 395 },
      { start: 395, end: 402 },
      { start: 402, end: 410 },
      { start: 410, end: 418 },
      { start: 418, end: 423 },
      { start: 423, end: 431 },
      { start: 431, end: 441 },
      { start: 441, end: 450 },
      { start: 450, end: 458 },
      { start: 458, end: 466 },
      { start: 466, end: 472 },
      { start: 472, end: 480 },
      { start: 480, end: 487 },
      { start: 487, end: 492 },
      { start: 492, end: 500 },
      { start: 500, end: 509 },
      { start: 509, end: 517 },
      { start: 517, end: 523 },
      { start: 523, end: 528 },
      { start: 528, end: 535 },
      { start: 535, end: 544 },
      { start: 544, end: 550 },
      { start: 550, end: 556 },
      { start: 556, end: 562 },
      { start: 562, end: 571 },
      { start: 571, end: 579 },
      { start: 579, end: 585 },
      { start: 585, end: 592 },
      { start: 592, end: 599 },
      { start: 599, end: 606 },
      { start: 606, end: 614 },
      { start: 614, end: 620 },
      { start: 620, end: 627 },
      { start: 627, end: 634 },
      { start: 634, end: 639 },
      { start: 639, end: 646 },
      { start: 646, end: 656 },
      { start: 656, end: 664 },
      { start: 664, end: 671 },
      { start: 671, end: 681 },
      { start: 681, end: 690 },
      { start: 690, end: 698 },
      { start: 698, end: 703 },
      { start: 703, end: 711 },
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
      { start: 0, end: 7 },
      { start: 7, end: 14 },
      { start: 14, end: 22 },
      { start: 22, end: 28 },
      { start: 28, end: 33 },
      { start: 33, end: 40 },
      { start: 40, end: 49 },
      { start: 49, end: 54 },
      { start: 54, end: 61 },
      { start: 61, end: 66 },
      { start: 66, end: 71 },
      { start: 71, end: 81 },
      { start: 81, end: 89 },
      { start: 89, end: 98 },
      { start: 98, end: 104 },
      { start: 104, end: 112 },
      { start: 112, end: 119 },
      { start: 119, end: 126 },
      { start: 126, end: 131 },
      { start: 131, end: 140 },
      { start: 140, end: 147 },
      { start: 147, end: 152 },
      { start: 152, end: 162 },
      { start: 162, end: 171 },
      { start: 171, end: 177 },
      { start: 177, end: 184 },
      { start: 184, end: 190 },
      { start: 190, end: 198 },
      { start: 198, end: 203 },
      { start: 203, end: 209 },
      { start: 209, end: 218 },
      { start: 218, end: 227 },
      { start: 227, end: 237 },
      { start: 237, end: 242 },
      { start: 242, end: 249 },
      { start: 249, end: 254 },
      { start: 254, end: 260 },
      { start: 260, end: 266 },
      { start: 266, end: 273 },
      { start: 273, end: 280 },
      { start: 280, end: 287 },
      { start: 287, end: 295 },
      { start: 295, end: 301 },
      { start: 301, end: 309 },
      { start: 309, end: 315 },
      { start: 315, end: 324 },
      { start: 324, end: 329 },
      { start: 329, end: 335 },
      { start: 335, end: 343 },
      { start: 343, end: 350 },
      { start: 350, end: 356 },
      { start: 356, end: 363 },
      { start: 363, end: 371 },
      { start: 371, end: 378 },
      { start: 378, end: 385 },
      { start: 385, end: 392 },
      { start: 392, end: 401 },
      { start: 401, end: 407 },
      { start: 407, end: 414 },
      { start: 414, end: 422 },
      { start: 422, end: 432 },
      { start: 432, end: 439 },
      { start: 439, end: 446 },
      { start: 446, end: 452 },
      { start: 452, end: 460 },
      { start: 460, end: 470 },
      { start: 470, end: 477 },
      { start: 477, end: 483 },
      { start: 483, end: 490 },
      { start: 490, end: 495 },
      { start: 495, end: 502 },
      { start: 502, end: 510 },
      { start: 510, end: 515 },
      { start: 515, end: 521 },
      { start: 521, end: 527 },
      { start: 527, end: 537 },
      { start: 537, end: 543 },
      { start: 543, end: 549 },
      { start: 549, end: 558 },
      { start: 558, end: 564 },
      { start: 564, end: 572 },
      { start: 572, end: 582 },
      { start: 582, end: 592 },
      { start: 592, end: 602 },
      { start: 602, end: 608 },
      { start: 608, end: 615 },
      { start: 615, end: 621 },
      { start: 621, end: 627 },
      { start: 627, end: 638 },
      { start: 638, end: 645 },
      { start: 645, end: 653 },
      { start: 653, end: 660 },
      { start: 660, end: 666 },
      { start: 666, end: 673 },
      { start: 673, end: 684 },
      { start: 684, end: 690 },
      { start: 690, end: 697 },
      { start: 697, end: 703 },
      { start: 703, end: 709 },
      { start: 709, end: 718 },
      { start: 718, end: 728 },
      { start: 728, end: 734 },
      { start: 734, end: 740 },
      { start: 740, end: 748 },
      { start: 748, end: 757 },
      { start: 757, end: 764 },
      { start: 764, end: 773 },
      { start: 773, end: 781 },
      { start: 781, end: 788 },
      { start: 788, end: 795 },
      { start: 795, end: 802 },
      { start: 802, end: 808 },
      { start: 808, end: 813 },
      { start: 813, end: 819 },
      { start: 819, end: 827 },
      { start: 827, end: 835 },
      { start: 835, end: 848 },
      { start: 848, end: 855 },
      { start: 855, end: 862 },
      { start: 862, end: 877 },
      { start: 877, end: 883 },
      { start: 883, end: 895 },
      { start: 895, end: 902 },
      { start: 902, end: 911 },
      { start: 911, end: 919 },
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
      { start: 0, end: 7 },
      { start: 7, end: 15 },
      { start: 15, end: 23 },
      { start: 23, end: 30 },
      { start: 30, end: 36 },
      { start: 36, end: 44 },
      { start: 44, end: 51 },
      { start: 51, end: 56 },
      { start: 56, end: 64 },
      { start: 64, end: 71 },
      { start: 71, end: 76 },
      { start: 76, end: 82 },
      { start: 82, end: 87 },
      { start: 87, end: 92 },
      { start: 92, end: 102 },
      { start: 102, end: 109 },
      { start: 109, end: 118 },
      { start: 118, end: 124 },
      { start: 124, end: 132 },
      { start: 132, end: 139 },
      { start: 139, end: 145 },
      { start: 145, end: 151 },
      { start: 151, end: 158 },
      { start: 158, end: 164 },
      { start: 164, end: 170 },
      { start: 170, end: 176 },
      { start: 176, end: 181 },
      { start: 181, end: 188 },
      { start: 188, end: 196 },
      { start: 196, end: 202 },
      { start: 202, end: 208 },
      { start: 208, end: 216 },
      { start: 216, end: 224 },
      { start: 224, end: 236 },
      { start: 236, end: 243 },
      { start: 243, end: 251 },
      { start: 251, end: 259 },
      { start: 259, end: 264 },
      { start: 264, end: 271 },
      { start: 271, end: 279 },
      { start: 279, end: 287 },
      { start: 287, end: 297 },
      { start: 297, end: 302 },
      { start: 302, end: 309 },
      { start: 309, end: 317 },
      { start: 317, end: 323 },
      { start: 323, end: 330 },
      { start: 330, end: 337 },
      { start: 337, end: 346 },
      { start: 346, end: 351 },
      { start: 351, end: 357 },
      { start: 357, end: 362 },
      { start: 362, end: 369 },
      { start: 369, end: 377 },
      { start: 377, end: 382 },
      { start: 382, end: 391 },
      { start: 391, end: 396 },
      { start: 396, end: 404 },
      { start: 404, end: 412 },
      { start: 412, end: 421 },
      { start: 421, end: 428 },
      { start: 428, end: 434 },
      { start: 434, end: 442 },
      { start: 442, end: 450 },
      { start: 450, end: 459 },
      { start: 459, end: 468 },
      { start: 468, end: 476 },
      { start: 476, end: 482 },
      { start: 482, end: 489 },
      { start: 489, end: 495 },
      { start: 495, end: 502 },
      { start: 502, end: 509 },
      { start: 509, end: 516 },
      { start: 516, end: 522 },
      { start: 522, end: 529 },
      { start: 529, end: 537 },
      { start: 537, end: 546 },
      { start: 546, end: 553 },
      { start: 553, end: 558 },
      { start: 558, end: 565 },
      { start: 565, end: 571 },
      { start: 571, end: 578 },
      { start: 578, end: 586 },
      { start: 586, end: 593 },
      { start: 593, end: 604 },
      { start: 604, end: 612 },
      { start: 612, end: 620 },
      { start: 620, end: 629 },
      { start: 629, end: 636 },
      { start: 636, end: 642 },
      { start: 642, end: 651 },
      { start: 651, end: 657 },
      { start: 657, end: 666 },
      { start: 666, end: 674 },
      { start: 674, end: 683 },
      { start: 683, end: 691 },
      { start: 691, end: 696 },
      { start: 696, end: 704 },
      { start: 704, end: 711 },
      { start: 711, end: 718 },
      { start: 718, end: 723 },
      { start: 723, end: 731 },
      { start: 731, end: 740 },
      { start: 740, end: 748 },
      { start: 748, end: 755 },
      { start: 755, end: 763 },
      { start: 763, end: 772 },
      { start: 772, end: 781 },
      { start: 781, end: 788 },
      { start: 788, end: 794 },
      { start: 794, end: 803 },
      { start: 803, end: 810 },
      { start: 810, end: 817 },
      { start: 817, end: 825 },
      { start: 825, end: 834 },
      { start: 834, end: 841 },
      { start: 841, end: 850 },
      { start: 850, end: 858 },
      { start: 858, end: 864 },
      { start: 864, end: 872 },
      { start: 872, end: 878 },
      { start: 878, end: 883 },
      { start: 883, end: 892 },
      { start: 892, end: 900 },
      { start: 900, end: 908 },
      { start: 908, end: 918 },
      { start: 918, end: 924 },
      { start: 924, end: 932 },
      { start: 932, end: 937 },
      { start: 937, end: 946 },
      { start: 946, end: 953 },
      { start: 953, end: 961 },
      { start: 961, end: 968 },
      { start: 968, end: 974 },
      { start: 974, end: 980 },
      { start: 980, end: 987 },
      { start: 987, end: 994 },
      { start: 994, end: 1002 },
      { start: 1002, end: 1007 },
      { start: 1007, end: 1016 },
      { start: 1016, end: 1023 },
      { start: 1023, end: 1029 },
      { start: 1029, end: 1038 },
      { start: 1038, end: 1047 },
      { start: 1047, end: 1056 },
      { start: 1056, end: 1064 },
      { start: 1064, end: 1071 },
      { start: 1071, end: 1079 },
      { start: 1079, end: 1086 },
      { start: 1086, end: 1093 },
      { start: 1093, end: 1103 },
      { start: 1103, end: 1109 },
      { start: 1109, end: 1123 },
      { start: 1123, end: 1140 },
      { start: 1140, end: 1147 },
      { start: 1147, end: 1156 },
      { start: 1156, end: 1163 },
      { start: 1163, end: 1173 },
      { start: 1173, end: 1179 },
      { start: 1179, end: 1189 },
      { start: 1189, end: 1194 },
      { start: 1194, end: 1201 },
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
      { start: 0, end: 7 },
      { start: 7, end: 15 },
      { start: 15, end: 23 },
      { start: 23, end: 29 },
      { start: 29, end: 37 },
      { start: 37, end: 45 },
      { start: 45, end: 55 },
      { start: 55, end: 61 },
      { start: 61, end: 67 },
      { start: 67, end: 73 },
      { start: 73, end: 81 },
      { start: 81, end: 87 },
      { start: 87, end: 93 },
      { start: 93, end: 100 },
      { start: 100, end: 109 },
      { start: 109, end: 116 },
      { start: 116, end: 125 },
      { start: 125, end: 132 },
      { start: 132, end: 141 },
      { start: 141, end: 150 },
      { start: 150, end: 157 },
      { start: 157, end: 162 },
      { start: 162, end: 168 },
      { start: 168, end: 176 },
      { start: 176, end: 182 },
      { start: 182, end: 187 },
      { start: 187, end: 196 },
      { start: 196, end: 205 },
      { start: 205, end: 211 },
      { start: 211, end: 218 },
      { start: 218, end: 224 },
      { start: 224, end: 231 },
      { start: 231, end: 237 },
      { start: 237, end: 245 },
      { start: 245, end: 251 },
      { start: 251, end: 258 },
      { start: 258, end: 264 },
      { start: 264, end: 273 },
      { start: 273, end: 282 },
      { start: 282, end: 288 },
      { start: 288, end: 293 },
      { start: 293, end: 299 },
      { start: 299, end: 306 },
      { start: 306, end: 317 },
      { start: 317, end: 322 },
      { start: 322, end: 329 },
      { start: 329, end: 338 },
      { start: 338, end: 346 },
      { start: 346, end: 353 },
      { start: 353, end: 360 },
      { start: 360, end: 369 },
      { start: 369, end: 378 },
      { start: 378, end: 385 },
      { start: 385, end: 391 },
      { start: 391, end: 398 },
      { start: 398, end: 406 },
      { start: 406, end: 416 },
      { start: 416, end: 421 },
      { start: 421, end: 428 },
      { start: 428, end: 433 },
      { start: 433, end: 442 },
      { start: 442, end: 449 },
      { start: 449, end: 457 },
      { start: 457, end: 466 },
      { start: 466, end: 475 },
      { start: 475, end: 481 },
      { start: 481, end: 487 },
      { start: 487, end: 493 },
      { start: 493, end: 498 },
      { start: 498, end: 507 },
      { start: 507, end: 512 },
      { start: 512, end: 521 },
      { start: 521, end: 528 },
      { start: 528, end: 535 },
      { start: 535, end: 540 },
      { start: 540, end: 549 },
      { start: 549, end: 557 },
      { start: 557, end: 562 },
      { start: 562, end: 569 },
      { start: 569, end: 578 },
      { start: 578, end: 585 },
      { start: 585, end: 592 },
      { start: 592, end: 601 },
      { start: 601, end: 607 },
      { start: 607, end: 612 },
      { start: 612, end: 618 },
      { start: 618, end: 625 },
      { start: 625, end: 632 },
      { start: 632, end: 639 },
      { start: 639, end: 648 },
      { start: 648, end: 657 },
      { start: 657, end: 665 },
      { start: 665, end: 674 },
      { start: 674, end: 680 },
      { start: 680, end: 688 },
      { start: 688, end: 693 },
      { start: 693, end: 699 },
      { start: 699, end: 704 },
      { start: 704, end: 714 },
      { start: 714, end: 721 },
      { start: 721, end: 727 },
      { start: 727, end: 736 },
      { start: 736, end: 745 },
      { start: 745, end: 753 },
      { start: 753, end: 758 },
      { start: 758, end: 767 },
      { start: 767, end: 775 },
      { start: 775, end: 783 },
      { start: 783, end: 792 },
      { start: 792, end: 797 },
      { start: 797, end: 803 },
      { start: 803, end: 811 },
      { start: 811, end: 818 },
      { start: 818, end: 826 },
      { start: 826, end: 832 },
      { start: 832, end: 837 },
      { start: 837, end: 843 },
      { start: 843, end: 850 },
      { start: 850, end: 857 },
      { start: 857, end: 865 },
      { start: 865, end: 872 },
      { start: 872, end: 878 },
      { start: 878, end: 887 },
      { start: 887, end: 893 },
      { start: 893, end: 898 },
      { start: 898, end: 905 },
      { start: 905, end: 911 },
      { start: 911, end: 921 },
      { start: 921, end: 930 },
      { start: 930, end: 935 },
      { start: 935, end: 941 },
      { start: 941, end: 947 },
      { start: 947, end: 953 },
      { start: 953, end: 959 },
      { start: 959, end: 966 },
      { start: 966, end: 974 },
      { start: 974, end: 979 },
      { start: 979, end: 985 },
      { start: 985, end: 992 },
      { start: 992, end: 1001 },
      { start: 1001, end: 1007 },
      { start: 1007, end: 1015 },
      { start: 1015, end: 1023 },
      { start: 1023, end: 1030 },
      { start: 1030, end: 1037 },
      { start: 1037, end: 1044 },
      { start: 1044, end: 1051 },
      { start: 1051, end: 1059 },
      { start: 1059, end: 1068 },
      { start: 1068, end: 1074 },
      { start: 1074, end: 1079 },
      { start: 1079, end: 1088 },
      { start: 1088, end: 1096 },
      { start: 1096, end: 1101 },
      { start: 1101, end: 1107 },
      { start: 1107, end: 1115 },
      { start: 1115, end: 1121 },
      { start: 1121, end: 1129 },
      { start: 1129, end: 1139 },
      { start: 1139, end: 1148 },
      { start: 1148, end: 1153 },
      { start: 1153, end: 1162 },
      { start: 1162, end: 1169 },
      { start: 1169, end: 1178 },
      { start: 1178, end: 1185 },
      { start: 1185, end: 1195 },
      { start: 1195, end: 1204 },
      { start: 1204, end: 1213 },
      { start: 1213, end: 1218 },
      { start: 1218, end: 1225 },
      { start: 1225, end: 1233 },
      { start: 1233, end: 1243 },
      { start: 1243, end: 1251 },
      { start: 1251, end: 1260 },
      { start: 1260, end: 1268 },
      { start: 1268, end: 1274 },
      { start: 1274, end: 1283 },
      { start: 1283, end: 1291 },
      { start: 1291, end: 1299 },
      { start: 1299, end: 1308 },
      { start: 1308, end: 1316 },
      { start: 1316, end: 1322 },
      { start: 1322, end: 1331 },
      { start: 1331, end: 1339 },
      { start: 1339, end: 1347 },
      { start: 1347, end: 1355 },
      { start: 1355, end: 1364 },
      { start: 1364, end: 1372 },
      { start: 1372, end: 1381 },
      { start: 1381, end: 1388 },
      { start: 1388, end: 1397 },
      { start: 1397, end: 1405 },
      { start: 1405, end: 1414 },
      { start: 1414, end: 1420 },
      { start: 1420, end: 1429 },
      { start: 1429, end: 1436 },
      { start: 1436, end: 1442 },
      { start: 1442, end: 1450 },
      { start: 1450, end: 1457 },
      { start: 1457, end: 1466 },
      { start: 1466, end: 1476 },
      { start: 1476, end: 1484 },
      { start: 1484, end: 1491 },
      { start: 1491, end: 1497 },
      { start: 1497, end: 1505 },
      { start: 1505, end: 1512 },
      { start: 1512, end: 1519 },
      { start: 1519, end: 1527 },
      { start: 1527, end: 1534 },
      { start: 1534, end: 1542 },
      { start: 1542, end: 1550 },
      { start: 1550, end: 1556 },
      { start: 1556, end: 1563 },
    ],
  },
};

// ✅ map theo level (có thể thêm a2 sau)
export const LESSONS_BY_LEVEL: Record<string, Record<string, LessonContent>> = {
  a1: A1_LESSONS,
  // a2: A2_LESSONS,
};
