# LifeOps Assistant Contract

这是给“替换助手”直接接管用的行为契约，不是展示网页。

## 最快接管
1. 新助手先读 `PORTABLE_HANDOFF.md`。
2. 再载入 `STATE_SNAPSHOT.json`。
3. 连接同一 Gmail + Google Calendar。
4. 跑 `REGRESSION_TESTS.json`。
5. 当前状态必须重新查 live Gmail/Calendar，snapshot 只作启动上下文。

## 文件
- `PORTABLE_HANDOFF.md`：完整行为规则 + 工具使用 + 交接指令。
- `STATE_SNAPSHOT.json`：2026-10-08 的可迁移状态。
- `openapi.yaml`：机器/API/GPT Action 接口。
- `REGRESSION_TESTS.json`：换模型/换助手前必须通过的行为测试。

目标是锁定“决策规则 + 状态 + 工具语义”，让不同助手接手后尽量保持同一套行为。