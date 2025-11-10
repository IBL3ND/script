/*
#!name=打飞机提醒
#!desc=定时提醒并点击通知可跳转特定网址
#!author=iBL3ND
*/

const reminders = [
  { time: "06:30", message: "第一次打飞机：6:30(排毒又养颜)", url: "https://missav.ai/dm45" },
  { time: "08:30", message: "第二次打飞机：8:30(体贴又健康)", url: "https://missav.ai/dm45" },
  { time: "11:00", message: "第三次打飞机：11:00(解乏又放松)", url: "https://missav.ai/dm45" },
  { time: "12:50", message: "第四次打飞机：12:50(减负又减肥)", url: "https://missav.ai/dm45" },
  { time: "15:00", message: "第五次打飞机：15:00(提神又醒脑)", url: "https://missav.ai/dm45" },
  { time: "17:30", message: "第六次打飞机：17:30(消化又吸收)", url: "https://missav.ai/dm45" },
  { time: "19:00", message: "第七次打飞机：19:00(解毒又排泄)", url: "https://missav.ai/dm45" },
  { time: "21:00", message: "第八次打飞机：21:00(预防血稠)", url: "https://missav.ai/dm45" },
  { time: "22:30", message: "第九次打飞机：22:30(拜佛成仙睡好觉)", url: "https://missav.ai/dm45" }
];

// ========== 定时任务调度 ==========
function scheduleReminders() {
  const now = new Date();
  const nowMs = now.getHours() * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000;

  reminders.forEach(reminder => {
    const [hour, minute] = reminder.time.split(":").map(Number);
    const targetMs = hour * 3600000 + minute * 60000;
    let delay = targetMs - nowMs;

    if (delay < 0) delay += 24 * 3600000; // 已过时间推迟到明天

    setTimeout(() => sendReminder(reminder), delay);
    console.log(`已设定提醒：${reminder.message} -> ${reminder.time}`);
  });
}

function sendReminder(reminder) {
  $notify("打飞机提醒", reminder.message, "记得每天9次哟💦", { url: reminder.url });
  console.log(`提醒触发：${reminder.message}`);
}

// 启动时安排
scheduleReminders();
$done();