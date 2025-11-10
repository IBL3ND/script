/*
#!name=打飞机提醒 (自我循环版)
#!desc=定时提醒并点击通知可跳转特定网址，在通用模式下可自动循环。
#!author=by iBL3ND
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

// 24小时的毫秒数
const ONE_DAY_MS = 24 * 3600000; 

// ========== 定时任务调度 ==========
function scheduleReminders() {
  const now = new Date();
  const nowMs = now.getHours() * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000;

  reminders.forEach(reminder => {
    const [hour, minute] = reminder.time.split(":").map(Number);
    const targetMs = hour * 3600000 + minute * 60000;
    let delay = targetMs - nowMs;

    if (delay < 0) delay += ONE_DAY_MS; // 已过时间推迟到明天

    setTimeout(() => sendReminder(reminder), delay);
    console.log(`已设定提醒：${reminder.message} -> ${reminder.time}`);
  });
}

function sendReminder(reminder) {
  $notify("打飞机提醒", reminder.message, "点我立即打开网址💦", { url: reminder.url });
  console.log(`提醒触发：${reminder.message}`);
  
  // === 关键修改：自我循环 ===
  // 触发后，立即安排 24 小时后的下一次提醒
  setTimeout(() => sendReminder(reminder), ONE_DAY_MS);
  console.log(`已重新安排 ${reminder.time} 的下一次提醒 (24小时后)`);
}

// 启动时安排提醒
scheduleReminders();

// === 关键修正 (依然需要) ===
// 告诉 Egern "初始配置已完成"，防止脚本被过早终止
// 但通过 setTimeout 注册的定时器在脚本 $done 后依然会在后台生效
setTimeout(() => {
  console.log("打飞机提醒脚本后台计时中……");
  $done();
}, 200);