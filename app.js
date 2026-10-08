const nav = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const title = document.getElementById('pageTitle');
const desc = document.getElementById('pageDesc');

const meta = {
  inbox:['收件箱处理','把邮件转换成“回复 / 忽略 / 写入日历”的可执行动作。'],
  calendar:['日历计划','把课程、学习、杂务、截止和生活安排放到同一套时间结构里。'],
  rules:['规则引擎','所有写入都先经过硬规则，防止“方便”破坏长期计划。'],
  meals:['饮食计划','库存、补货和真实饭量共同决定三餐，不把饮食当作附属事项。'],
  api:['API','把现有工作流抽象成可调用接口，供网页、插件或自动化服务使用。']
};
nav.forEach(btn => btn.onclick = () => {
  nav.forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  const v=btn.dataset.view;
  views.forEach(x=>x.classList.remove('active'));
  document.getElementById('view-'+v).classList.add('active');
  title.textContent=meta[v][0]; desc.textContent=meta[v][1];
});

const mails = [
  {subject:'CS1114 Quiz scheduling update',from:'Prof. Senger',snippet:'Both requested quiz times will be set up.',kind:'calendar',priority:'high'},
  {subject:'Undergraduate Research Weekly Newsletter',from:'Office of Undergraduate Research',snippet:'Fellowships, mixers, internships and rolling opportunities.',kind:'research',priority:'high'},
  {subject:'eBill generated',from:'Virginia Tech',snippet:'A new statement is available. Check balance and due date.',kind:'finance',priority:'high'},
  {subject:'Course announcement',from:'Canvas',snippet:'General announcement with no action required.',kind:'ignore',priority:'low'}
];
const mailList = document.getElementById('mailList');
mails.forEach((m,i)=>{
  const el=document.createElement('div');
  el.className='mail';
  el.innerHTML=`<div class="subject">${m.subject}</div><div class="meta">${m.from}</div><div class="snippet">${m.snippet}</div>`;
  el.onclick=()=>selectMail(i,el);
  mailList.appendChild(el);
});

function selectMail(i,el){
  document.querySelectorAll('.mail').forEach(x=>x.classList.remove('selected'));
  el.classList.add('selected');
  const m=mails[i], p=document.getElementById('actionPreview');
  const configs = {
    calendar:{
      title:'建议：写入正式/占位事件',
      why:'邮件包含明确时间安排，应先查重；已有占位则更新，不重复创建。',
      tags:['查重','时间确认','日历更新'],
      rows:['核对开始时间','核对地点/方式','未知时长保持“待确认”','次日早晨设置防漏确认']
    },
    research:{
      title:'建议：拆成申请链 + 红色截止',
      why:'研究申请属于高损失事项，应建立早期核对、中期进度和临截止确认。',
      tags:['申请','三段确认','硬截止'],
      rows:['筛项目/资格','核材料和流程','建立红色截止','截止前最终确认']
    },
    finance:{
      title:'建议：晚饭杂务 + 硬截止',
      why:'付款事项不得埋在普通提醒中；实际处理与截止标记分开。',
      tags:['付款','晚饭杂务','防漏'],
      rows:['登录系统查余额','提前付款或标记无需付款','保存凭证','截止日红色标记']
    },
    ignore:{
      title:'建议：不写入日历',
      why:'没有明确动作、截止或后续依赖，不应制造日历噪音。',
      tags:['忽略','无动作'],
      rows:['保留邮件即可']
    }
  };
  const c=configs[m.kind];
  p.className='action-card';
  p.innerHTML=`<h3>${c.title}</h3><div class="why">${c.why}</div><div class="action-tags">${c.tags.map(x=>`<span class="tag ${x==='硬截止'?'red':''}">${x}</span>`).join('')}</div><div class="action-list">${c.rows.map(x=>`<div class="action-row">${x}</div>`).join('')}</div>`;
}

document.getElementById('planBtn').onclick=()=>{
  const text=document.getElementById('naturalInput').value.trim();
  const out=document.getElementById('planResult');
  if(!text){out.innerHTML=''; return}
  const hasDeadline=/截止|due|deadline|考试|quiz|test|lab|申请/i.test(text);
  const important=/申请|房租|rent|fellowship|research/i.test(text);
  const unknownTime=/不.*时刻|未.*时刻|不知道.*时间|只.*日期/i.test(text);
  let items=[];
  if(hasDeadline) items.push('建立独立硬截止标记；实际处理安排在允许的杂务时段。');
  if(important) items.push('按重要事项规则加入至少 3 个提前确认节点。');
  if(unknownTime) items.push('截止具体时刻未知：使用全天截止，不擅自写 23:59。');
  items.push('周日不安排普通处理；如冲突，提前到周六或顺延到周一。');
  out.innerHTML=`<div class="result-box"><b>规则引擎建议</b><br>${items.map(x=>'• '+x).join('<br>')}</div>`;
};

document.getElementById('syncBtn').onclick=()=>{
  const b=document.getElementById('syncBtn');
  b.textContent='已模拟同步';
  setTimeout(()=>b.textContent='模拟同步 Gmail',1500);
};
