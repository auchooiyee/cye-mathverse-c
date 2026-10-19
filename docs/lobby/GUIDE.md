# CYE-MathVerse 游戏大厅

2026-10-19 · 本机版

## 一次启动，选择三个游戏

1. 在项目文件夹中双击 **Play CYE-MathVerse.command**。
2. 浏览器会打开游戏大厅。保留启动时打开的窗口。
3. 选择 Cyber Code Breaker、GraphQuest 或 Variation Factory。可按 **Form 4 / Form 5** 筛选。
4. 游戏上方点击 **← Game lobby · 游戏大厅**，回来选择另一个游戏。首次欢迎画面内也有返回入口。

大厅：`http://127.0.0.1:4186/apps/lobby/`。如果浏览器没有自动打开，复制这个地址到浏览器中。请使用一直试玩的同一个浏览器，保留原来的进度。

原来的三个单独游戏启动文件仍然可用。完整切换三个游戏时，请使用新的统一启动文件。

## 进度仍在原来的位置

| 游戏 | 学习主题 | 原入口保留 |
|---|---|---|
| Cyber Code Breaker | Form 4 · Number Bases | 127.0.0.1:4186 |
| GraphQuest | Form 4 · Networks in Graph Theory | 127.0.0.1:4187 |
| Variation Factory | Form 5 · Variation | 127.0.0.1:4188 |

大厅不修改分数、不清除进度、不收集学生资料。每个游戏的备份、恢复和学习报告仍在原来的游戏中。更换浏览器、使用隐私窗口或清除浏览器资料后，原进度不会自动出现。此前若使用自定义地址/端口，请在那个原入口下载备份，再到对应游戏恢复。

## 遇到启动提示

- **端口正在使用**：先关闭之前的旧游戏启动窗口，再双击统一启动文件。不会删除存档。
- **复用已有游戏窗口**：新的启动文件会使用已兼容的游戏服务；这些已有窗口也需要保持打开。
- **页面打不开**：重新打开统一启动文件，并使用它显示的地址。
- **直接点开 HTML**：改为双击 `Play CYE-MathVerse.command`。
- **结束游戏**：在启动窗口按 Control-C。它只会停止自己启动的服务。

这是当前 Mac 的本机游戏入口；学生可以在这台电脑上选择游戏。目前还不能把此地址发送给学生，让他们在各自手机上访问。手机网页布局已做模拟测试，班级网络访问属于后续步骤。

## 这次可试玩的流程

从大厅进入三个游戏 → 各做一题/一个任务 → 返回大厅 → 换游戏 → 再进入原游戏检查进度。试试 Form 4 和 Form 5 筛选，以及缩小窗口后的排版。

## Developer notes

`npm run start:lobby` starts the source version; `node scripts/play-lobby.mjs --dist` starts the built version. Original individual commands remain unchanged. `npm run build`, `npm test`, and the five browser suites are documented in the root README. A separate preview on a nonstandard port uses same-origin relative links and therefore a separate browser save origin.
