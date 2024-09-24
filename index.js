import TelegramBot from "node-telegram-bot-api";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_API;


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("🤖 ByteBot 3000 is running!");
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});

app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body); // Process incoming updates
  res.sendStatus(200);          // Respond to Telegram with status 200 (OK)
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `👋 Hi there, welcome to my Web Dev Portfolio Assistant! 
I'm here to guide you through my projects, skills, and experience.

Here are some commands to get you started:
- */projects*: Check out my completed projects.
- */skills*: Explore the web technologies I'm proficient in.
- */contact*: Find ways to get in touch with me.
- */hireme*: Get my CV or schedule a meeting.

Type any command to begin or let me know how I can assist you! 🚀`
  );
});

bot.onText(/\/projects/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `🚀 Here are some of my projects:
  1. 🌐 Portfolio Website: [Link](https://debayanmukherjee.vercel.app/)
  2. 🏋️ Gym Website: [Link](https://codeuxdebayan.github.io/FitGoals/)
  3. 🎶 Music Studio Platform: [Link](https://codeuxdebayan.github.io/Datstudio/)`
  );
});

bot.onText(/\/skills/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `💻 Here are the skills I specialize in:
  - 🌟 HTML, CSS, JavaScript
  - ⚛️ React, Node.js, Express
  - 🗄️ MongoDB, SQL
  - 🎨 Responsive Design, Web Animations`
  );
});

bot.onText(/\/contact/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `📞 You can contact me via:
  ✉️ Email: astrodebayan.18@gmail.com
  🔗 LinkedIn: [Profile](https://www.linkedin.com/in/debayan-mukherjee-web3090/)
  🐙 GitHub: [Profile](https://github.com/CodeUxDebayan)`
  );
});

bot.onText(/\/hireme/, (msg) => {
  const chatId = msg.chat.id;

  // Sending the CV link
  bot.sendMessage(
    chatId,
    `📄 Here's a link to my CV: [Download CV](https://debayanmukherjee.vercel.app/files/2024%20Cv.pdf)`
  );

  // Prompting the user to schedule a meeting
  bot.sendMessage(
    chatId,
    `📅 If you're interested in scheduling a meeting, feel free to reach out to me via email `
  );
});
