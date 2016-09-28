//Botに必要なモジュール各種

var Botkit = require('botkit');
var Holiday = require('holiday');
var CronJob = require('cron').CronJob;
var controller = Botkit.slackbot();

//日付取得関数
var getDate = function(date){
    var month = ("0" + (date.getMonth()+1).toString(10)).slice(-2);
    var day = ("0" + (date.getDate()).toString(10)).slice(-2);
    return  month + day;
}
//担当者名リスト
var array = [ 'A' , 'B' , 'C'];

//循環させる形で添字を返す関数
var getCurrentIdx = (function(){
    var current = 0;
    return function(length){
        return current++ % length;
    }
})();

var bot = controller.spawn({
      token: 'token' 
}).startRTM(function(err,bot,payload) {
    // 初期処理
    if (err) {
        throw new Error('Could not connect to Slack');
    }
    //定期内容
    new CronJob({
        cronTime: '* * * * 1-5',
        onTick: function() {
            var date = getDate(new Date());
            if(!Holiday.isExist('date')){
                bot.say({
                        channel: 'team_test',
                        text: '当番は' + array[getCurrentIdx(array.length)] + 'です',
                        username: '当番通知',
                        icon_url: ''
                });
            }
        },
        start: true,
        timeZone: 'Asia/Tokyo'
    });
});
