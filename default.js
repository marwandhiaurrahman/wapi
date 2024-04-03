const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
// const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "marwan" }),
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', }
});
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});
client.on('loading_screen', (percent, message) => {
    console.log('Loading screen ', percent, message);
});
client.on('authenticated', () => {
    console.log('Client is authenticated');
});
client.on('ready', () => {
    console.log('Client is ready');
});
client.on('message', async message => {
    console.log('Message from ' + message.from);
    buttons_reply = new Buttons('tes', 'buttonid1', 'tea', 'taet');
    await client.sendMessage(message.from, buttons_reply)
        .then(
            (response) => {
                return console.log('SEND BUTTON');
            }
        ).catch(
            (error) => {
                return console.log("Error : " + error);
            }
        );
});
// Change to false if you don't want to reject incoming calls
let rejectCalls = true;
client.on('call', async (call) => {
    console.log('Call received, rejecting. GOTO Line 261 to disable', call);
    if (rejectCalls) await call.reject();
    await client.sendMessage(call.from, `${call.fromMe ? 'Outgoing' : 'Incoming'} Phone call from ${call.from}, type ${call.isGroup ? 'group' : ''} ${call.isVideo ? 'video' : 'audio'} call. ${rejectCalls ? '\n\nNomor ini tidak menerima panggilan.\nPanggilan ini otomatis ditutup oleh sistem.' : ''}`);
});
client.on('disconnected', (reason) => {
    console.log('Client is disconnected ' + reason);
    client.destroy();
    client.initialize();
});
client.initialize();