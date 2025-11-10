/*
#!name=每日打飞机提醒（通用定时版）
#!desc=自动在固定时间触发提醒通知（无需Cron）
#!category=娱乐
*/

const reminders = [
  { time: "06:30", title: "第一次打飞机", message: "排毒又养颜" },
  { time: "08:30", title: "第二次打飞机", message: "体贴又健康" },
  { time: "11:00", title: "第三次打飞机", message: "解乏又放松" },
  { time: "12:50", title: "第四次打飞机", message: "减负又减肥" },
  { time: "15:00", title: "第五次打飞机", message: "提神又醒脑" },
  { time: "17:30", title: "第六次打飞机", message: "消化又吸收" },
  { time: "19:00", title: "第七次打飞机", message: "解毒排泄" },
  { time: "21:00", title: "第八次打飞机", message: "预防血稠" },
  { time: "22:30", title: "第九次打飞机", message: "拜佛成仙睡好觉" }
];

console.log("🕹️ 每日打飞机提醒脚本已启动！");

scheduleAllReminders();

function scheduleAllReminders() {
  const now = new Date();
  reminders.forEach(reminder => {
    const [h, m] = reminder.time.split(":").map(Number);
    const target = new Date();
    target.setHours(h, m, 0, 0);

    // 若该时间已过，则定到明天
    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    const delay = target - now;
    const hours = Math.floor(delay / 3600000);
    const minutes = Math.floor((delay % 3600000) / 60000);
    console.log(`⏳ 计划 ${reminder.time} (${hours}小时${minutes}分钟后)`);

    setTimeout(() => {
      triggerReminder(reminder);
      // 设置下一次（明天同一时间）
      setInterval(() => triggerReminder(reminder), 24 * 60 * 60 * 1000);
    }, delay);
  });
}

function triggerReminder(reminder) {
  const title = `每日打飞机提醒 · ${reminder.title}`;
  const body = `${reminder.message}\n\n记得每天打飞机9次哟，我是提醒打飞机小助手。`;

  if (typeof $notify === "function") {
    $notify(title, "", body);
  } else if (typeof $notification !== "undefined" && typeof $notification.post === "function") {
    $notification.post(title, "", body);
  } else {
    console.log(`[通知] ${title}: ${body}`);
  }

  console.log(`🔔 触发提醒：${reminder.time} - ${reminder.title}`);
}
