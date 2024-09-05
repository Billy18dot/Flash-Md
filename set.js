const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0tvVFdZNmdQRExvNGxieWcvTFVxazVoTjkwclJ1OXQyMUZ1aDhINTEwWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUJteHdzRDlxMk5wVTlDNmdvaEptTDNsaXpkeGp4RU0rcUJFTDl3dzdrWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjTDErY28xNGNGMnUzS1JlOEQyN0VvK2R1YlBIelJ0MExLNTZ0ZTUvSW1FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoQW5ieU1sYldwL0laREZnWU54RkYxZGFabjZuWk9zTVZQeFlueHZ1bVM0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJHTWJSM0xXWmsxV2dOSXdNbktyMCtJSnpqYW9lcXRmQzFKV2diNHJmVWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNTSFIrTDdidFFTbmNPVDBqclJPQmQvQVI0YUxSdFJMNmdobUhuWEJtaVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0tsdEFLN1hQTTNwVXlwSEV1T01PTFZtZFhiazRyL0NZQ0tVLzhuZlYwbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVNHUkc2WG1rQ2tLQTR3Wis4N2Y4K0xzZXdqUm05SU1hYzhOK21UZzd6UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlF6czFsWGl5SVk5eitYRDNiQXNVbFp5VFh2RTVDYWdpanErYjlGV3I5UFpwbE9lRkMyejRpTmszK0hVbUlzUHlOU0xkVkh6Rkl2WndGUEZNMENNUUR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgwLCJhZHZTZWNyZXRLZXkiOiIxQmlvMEtJOGxZTkFTcnFBMmV6enZZOW9TS3IxSlBvekVKamVqM2lkamVFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI3SWpjSEFvOVFWLWZ0azFWOExPVFRBIiwicGhvbmVJZCI6IjYyMjgyNGMxLTMxZjYtNDZjOC05NWM2LWUyZmFiMDM0NzA3MyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0cE9iemJ3dmhPS0ZxUXFVYVdPWXRhNVlkV2s9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVBwWUpibmlZbVNEdm52bkpHTk14SmNwWmRJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkFFNUpGRk1GIiwibWUiOnsiaWQiOiIyNjM3ODE1MjYxNDg6MzVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l5QWs4QUhFTHZ6NXJZR0dBd2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlVTYTYyYXpjSmFUdHJ6V1NXY2F5Ynl5MWxSSkMydUlra21sM1EwOWh0RDg9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImxhcHZlcTVwYk9HM2ZGMHc2ZVZrdVFEQXJkbmVaRlU4S1gzN2ZEd1gybmlzdENLSWhZM3E0K1BtNGdmdm5qOUFOekNqTWFQcHBTYVlVRnZxSjJVYkNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJPdC9NdkwwVTIwZWdxTW8vbDlqMUROSkVJeHlRTHlmNWZZM3JNajNtNjNsc3Y0WnE5SW16c01CL0VEYkRMQk4vMWk1MjByOXU0aENLcVhJaHRYWVhBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4MTUyNjE0ODozNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWRW11dG1zM0NXazdhODFrbG5Hc204c3RaVVNRdHJpSkpKcGQwTlBZYlEvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1NTQ0OTA1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU0rZCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Mr-JONES",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "27613106647", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
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

