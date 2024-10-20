const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUUxV29IT2IyL0JvS2ZEdFlzQ1F5dlhWVW80THVoZlgzOW1xNlpPWE5FQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmFGcFZGTjJaVjczaDRVLzhqcUVsUE1XUDBYZWVNNnpENHQwYWtkZWNrUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SWtiU1plTUhhM0VLQlBSSUt2K3lvdzVlekhvNnFjMjBSUmYyREpONzNNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxSFY2NFpPT0pxSUVpcDM2YWNJTUI1cTg0cGlWRWhzUzg5UzViemhrWHpjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdHVmpBczhZV1pNbnlRa0tBVEhodHBrWlI3eEMraEE4dmY1bGdxS21RM3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inl2eW4vUGp3MURIYUNweTNTY0lVQXI3UUErQmNDOU9pV05BMmdwS2gyU3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU44cnQyY290REE0WjRpY3krdkxkWkNYQS9GT2E2L0ovVGNmNHFFU0syaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVM2REpzdTRpa3VyRGIySjFsOVFPYUVPcDIxOUoxaDFoYXpzekxWeVNsZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhsektRRVFsSGtud2RXbEc0WDIyRHhmcS9NY3BtSmZVZ2EreUlUM00vV3VKVHlHODVNSzl0VFNCZ0lXdDdtbm9uYWMzTS9XTDR3WWl4NVQ0OVo1ekJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJOZ2M3SWVzdno5MGwrWExxNjBwZVNMR1BJRUpCbEpEOTNRMXNUZTdLNXljPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3NjEzMTA2NjQ3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhBRDVBQjhCNERDM0NBNEY3M0Q2NTA4QkY3NDhGOUM0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjk0NDMyMTR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik02RS1qSUZzVG5hZksydVN1STZ5T0EiLCJwaG9uZUlkIjoiMjlhNThlMmUtZjcwNC00YzIxLWE4MDEtMDgyMDJkYmM4YmE4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjI4SWlBNVU1ZnQyL0J2SEh4STNCSCtQYzJvdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5TlExZllIMDl1R0pkVmUvb3E0K29oUkRuQzg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSEVFOVFWQVkiLCJtZSI6eyJpZCI6IjI3NjEzMTA2NjQ3OjlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01hcHpMa0RFUGZxMUxnR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImhQYlNPTm05U2k5RnhHZFZGUXNTbnNWalNOanZXd0huc3lvdEc3NmIrUUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikk4dDJ6bmVHY3BRdUdkWUpUN3J2eUZrQjV1YmNtUzErZ2VMTzdBQWQ1THF4V2VNTzNxWldkMjFKSXNibklEOERiL2R1QnIxVUlBQ051WXZCWUJoUkF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsZ2dDSFJxWURtWkJBKy83QU9YdThMeVpPbUFrd2F5ZlpXTFB0c0JaekNQb1YwTzNiVDljME5HbU9Cc1B0Y1NueFdWWmRmaWgvSk1SUFJ0K0E3Q2JCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NjEzMTA2NjQ3OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWVQyMGpqWnZVb3ZSY1JuVlJVTEVwN0ZZMGpZNzFzQjU3TXFMUnUrbS9rQSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTQ0MzIwNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJV1kifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Mr-JONES",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "27613106647", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FORÊIGNÊR-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'recording',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

