const config = require("./config");
const request = require("request");
const urlencode = require("urlencode");
const name = config.name;
module.exports = (bot) => {
    return async function onMessage(msg){
        if(msg.type()===7 && msg.room()){
            const {room:{roomList=[]}} = config;
            // console.log('所有群聊消息', msg.payload)
            if(roomList.indexOf(msg.payload.roomId)!== -1){
                const room = msg.room();
                const text = msg.text();
                const fromTalker =msg.talker();
                if (await msg.mentionSelf()) {
                    console.log(11111)
                    let res = await requestRobot(text);
                    room.say(res);
                }
            }
        }
    }
}
/**
 * @description 机器人请求接口 处理函数
 * @param {String} info 发送文字
 * @return {Promise} 相应内容
 */
 function requestRobot(info) {
    return new Promise((resolve, reject) => {
      let url = `https://open.drea.cc/bbsapi/chat/get?keyWord=${urlencode(info)}`;
      request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let res = JSON.parse(body);
          if (res.isSuccess) {
            let send = res.data.reply;
            // 免费的接口，所以需要把机器人名字替换成为自己设置的机器人名字
            send = send.replace(/Smile/g, name);
            resolve(send);
          } else {
            if (res.code == 1010) {
              resolve("没事别老艾特我，我还以为爱情来了");
            } else {
              resolve("你在说什么，我听不懂");
            }
          }
        } else {
          resolve("你在说什么，我脑子有点短路诶！");
        }
      });
    });
  }