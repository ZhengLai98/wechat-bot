const { Wechaty } = require("wechaty");
const { PuppetPadlocal } = require("wechaty-puppet-padlocal");
const QrcodeTerminal = require("qrcode-terminal");
const config = require("./config");
const onMessage = require('./onMessage')
const name = 'wechat-puppet-wechat';

const bot = new Wechaty({
  puppet: new PuppetPadlocal({
    token: config.token,
  }),
  name
});
bot
  // 扫码登录
  .on("scan", (qrcode, status) => {
    console.log(
      `Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        qrcode
      )}`
    );
    QrcodeTerminal.generate(qrcode);
  })
  // 登录监听
  .on("login", (user) => {
    console.log(user, "logined");
  })
  // 退出监听
  .on("logout", (user) => {
    console.log(user, "logout");
  })
  // 消息监听
  .on("message", onMessage(bot))
  .start();
