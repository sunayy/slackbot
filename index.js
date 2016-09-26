
var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
      token: process.env.token
}).startRTM(function(err,bot,payload) {
       // 初期処理
          if (err) {
              throw new Error('Could not connect to Slack');
                }
                });
                controller.hears(["進捗どうですか"],["direct_message","direct_mention","mention"],function(bot,message) {
                  // キーワードに反応した処理
                    bot.reply(message, '進捗ダメです');
                    });
