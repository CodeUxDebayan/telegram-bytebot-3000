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

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `👋 <b>Hi there, welcome to my Web Dev Portfolio Assistant!</b> 
<i>I'm here to guide you through my projects, skills, and experience.</i>

<b>Here are some commands to get you started:</b>
- <b>*/projects*</b>: Check out my completed projects.
- <b>*/skills*</b>: Explore the web technologies I'm proficient in.
- <b>*/contact*</b>: Find ways to get in touch with me.
- <b>*/hireme*</b>: Get my CV or schedule a meeting.

<b>Type any command to begin</b> or let me know how I can assist you! 🚀`,
    { parse_mode: 'HTML' }
  );
});

// Projects command
bot.onText(/\/projects/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `🚀 <b>Here are some of my projects:</b>
  1. 🌐 <a href="https://debayanmukherjee.vercel.app/">Portfolio Website</a>
  2. 🏋️ <a href="https://codeuxdebayan.github.io/FitGoals/">Gym Website</a>
  3. 🎶 <a href="https://codeuxdebayan.github.io/Datstudio/">Music Studio Platform</a>`,
    { parse_mode: 'HTML' }
  );
});

// Skills command
bot.onText(/\/skills/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `💻 <b>Here are the skills I specialize in:</b>
  - 🌟 <b>HTML, CSS, JavaScript</b>
  - ⚛️ <b>React, Node.js, Express</b>
  - 🗄️ <b>MongoDB, SQL</b>
  - 🎨 <b>Responsive Design, Web Animations</b>`,
    { parse_mode: 'HTML' }
  );
});

// Contact command
bot.onText(/\/contact/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `📞 <b>You can contact me via:</b>
  ✉️ <b>Email:</b> <a href="mailto:astrodebayan.18@gmail.com">astrodebayan.18@gmail.com</a>
  🔗 <b>LinkedIn:</b> <a href="https://www.linkedin.com/in/debayan-mukherjee-web3090/">LinkedIn Profile</a>
  🐙 <b>GitHub:</b> <a href="https://github.com/CodeUxDebayan">GitHub Profile</a>`,
    { parse_mode: 'HTML' }
  );
});

// Hire me command
bot.onText(/\/hireme/, (msg) => {
  const chatId = msg.chat.id;

  // Sending the CV link
  bot.sendMessage(
    chatId,
    `📄 <b>Here's a link to my CV:</b> <a href="https://debayanmukherjee.vercel.app/files/2024%20Cv.pdf">Download CV</a>`,
    { parse_mode: 'HTML' }
  );

  // Prompting the user to schedule a meeting
  bot.sendMessage(
    chatId,
    `📅 <b>If you're interested in scheduling a meeting, feel free to reach out to me via email.</b>`,
    { parse_mode: 'HTML' }
  );
});

