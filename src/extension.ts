import * as vscode from 'vscode';
import { generateREADME } from "./commands/generateREADME";

let disposable: vscode.Disposable;

export function activate(context: vscode.ExtensionContext) {
	disposable = vscode.commands.registerCommand('readme-generator.generateREADME', generateREADME);

	context.subscriptions.push(disposable);
}

export function deactivate() {
	if (disposable) {
		disposable.dispose();
	}
}