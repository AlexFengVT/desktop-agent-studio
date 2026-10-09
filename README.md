# LifeOps 防漏日历助手

这是把现有个人工作流产品化后的公开演示版界面。

## 它解决什么

核心不是“帮你记一个提醒”，而是把以下动作变成一套规则系统：

1. Gmail 邮件 → 摘要 → 判断：回复 / 忽略 / 写入日历
2. 自然语言任务 → 规则解析 → 先预览再写入
3. 普通杂务只能进入允许时段
4. 作业、考试、实验、申请、付款等硬截止单独标红
5. 重要申请/房租等高损失事项增加多次提前确认
6. 周日保护，不让杂务侵占人格修炼
7. 课程、学习主块、三餐、杂务和截止共存
8. 未确认的地点、时间、截止分钟不伪造成事实

## 文件

- `index.html`：公开演示界面
- `style.css`：样式
- `app.js`：前端交互与规则演示
- `openapi.yaml`：后端 API 设计

## 本地预览

任何静态服务器都可以：

```bash
python -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 真正连接 Gmail / Google Calendar

公开站点不能把 OAuth token 放在浏览器里。建议架构：

```text
Browser UI
   |
   v
Backend API (FastAPI / Node)
   |--- Gmail OAuth
   |--- Google Calendar OAuth
   |--- Rule Engine
   |--- Audit Log
```

所有写操作都先：

1. 查重
2. 检查课程/睡眠/人格修炼冲突
3. 判断是否硬截止
4. 判断是否需要三次防漏确认
5. 保留信息来源与置信状态
6. 再执行 Calendar 写入

## 公开发布时要删掉什么

不要公开：

- 真实 Gmail 内容
- 真实课程私人预约信息
- OAuth token
- 私人住址、精确位置
- 个人医疗/住宿/财务敏感信息

公开版只保留规则、模拟数据和产品逻辑。

## 下一步

这个版本已经适合：

- GitHub Pages（静态演示）
- Vercel / Netlify（静态演示）
- 接 FastAPI/Node 后端后变成真正可用的 Gmail + Calendar 产品


## Portable assistant handoff

The repository now also contains `lifeops-assistant-contract/`, which is the portable behavior/state/API package for switching to another assistant without re-explaining the workflow.

Start with:
- `lifeops-assistant-contract/PORTABLE_HANDOFF.md`
- `lifeops-assistant-contract/STATE_SNAPSHOT.json`
- `lifeops-assistant-contract/REGRESSION_TESTS.json`
- `lifeops-assistant-contract/openapi.yaml`
