var Botkit = require('botkit');
var Holiday = require('holiday');
var CronJob = require('cron').CronJob;
var controller = Botkit.slackbot();
var dateInstance = new Date();
var month = ("0" + (dateInstance.getMonth()+1).toString(10)).slice(-2);
var day = ("0" + (dateInstance.getDate()).toString(10)).slice(-2);
var date = month + day;
var bot = controller.spawn({
      token: process.env.token
}).startRTM(function(err,bot,payload) {
    // 初期処理
    if (err) {
        throw new Error('Could not connect to Slack');
    }
    new CronJob({
        cronTime: '* * * * 1-5',
        onTick: function() {
            if(Holiday.isExist('date')){
                bot.say({
                        channel: 'team_test',
                        text: '祝日',
                        username: '祝日通知',
                        icon_url: ''
                });
            }
        },
        start: true,
        timeZone: 'Asia/Tokyo'
    });
});
