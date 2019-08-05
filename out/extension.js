"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const GetOffMessage = '已经下班啦~ 快回家啊~';
const NotificationMessage = 'O(∩_∩)O下班了!';
let isGetOff = false;
/** 获取提示消息 */
function getMessage() {
    const now = new Date();
    const toHomeDate = new Date();
    toHomeDate.setHours(vscode.workspace.getConfiguration().toHomeDate.hours);
    toHomeDate.setMinutes(vscode.workspace.getConfiguration().toHomeDate.minutes);
    toHomeDate.setSeconds(vscode.workspace.getConfiguration().toHomeDate.seconds);
    const duration = toHomeDate.getTime() - now.getTime();
    if (duration <= 0) {
        return GetOffMessage;
    }
    const hour = Math.floor(duration / 1000 / 60 / 60);
    const minute = Math.floor(duration / 1000 / 60 % 60);
    const second = Math.floor(duration / 1000 % 60);
    return `>> 距离下班还有 ${hour ? hour + '小时' : ''}${minute ? minute + '分钟' : ''}${second ? second + '秒' : ''}`;
}
function activate(context) {
    const myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    myStatusBarItem.text = getMessage(),
        myStatusBarItem.show();
    setInterval(() => {
        const newMessage = getMessage();
        myStatusBarItem.text = newMessage;
        if (newMessage === GetOffMessage) {
            if (!isGetOff) {
                vscode.window.showInformationMessage(NotificationMessage);
                isGetOff = true;
            }
        }
        else {
            isGetOff = false;
        }
    }, 1000);
    context.subscriptions.push(myStatusBarItem);
    let disposable = vscode.commands.registerCommand('extension.toHome', function () {
        vscode.window.showInformationMessage(getMessage());
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map