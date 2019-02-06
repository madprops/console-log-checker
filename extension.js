const vscode = require('vscode')
const cl_regex = new RegExp(/(^|\s)console\.log\s*\(/, "g")

function count_console_logs()
{
	let editor = vscode.window.activeTextEditor

	if(!editor)
	{
		return false
	}

	let num_matches = 0

	for(let i=0; i < editor.document.lineCount; i++)
	{
		if(editor.document.lineAt(i).text.match(cl_regex))
		{
			num_matches += 1
		}
	}

	editor.

	let s = "Console Logs were found."
	let s2 = "Remove Them"

	if(num_matches === 1)
	{
		s = "Console Log was found."
		s2 = "Remove It"
	}

	if(num_matches > 0)
	{
		vscode.window.showInformationMessage(`${num_matches} ${s}`, s2)

		.then(function(selection)
		{
			if(selection === s2)
			{
				remove_console_logs()
			}
		})
	}

	else
	{
		vscode.window.showInformationMessage(`${num_matches} ${s}`)
	}
}

function remove_console_logs()
{
	let editor = vscode.window.activeTextEditor

	if(!editor)
	{
		return false
	}

	let num_matches = 0

	editor.edit(function(builder)
	{
		for(let i=0; i < editor.document.lineCount; i++)
		{
			if(editor.document.lineAt(i).text.match(cl_regex))
			{
				num_matches += 1
				builder.replace(new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i + 1, 0)), "")
			}
		}
	})

	let s = "Console Logs were removed."

	if(num_matches === 1)
	{
		s = "Console Log was removed."
	}

	vscode.window.showInformationMessage(`${num_matches} ${s}`)
}

function activate(context) 
{
	let disposable
	
	disposable = vscode.commands.registerCommand('extension.count_console_logs', function() 
	{
		count_console_logs()
	})

	context.subscriptions.push(disposable)

	disposable = vscode.commands.registerCommand('extension.remove_console_logs', function() 
	{
		remove_console_logs()
	})

	context.subscriptions.push(disposable)
}

exports.activate = activate

function deactivate() {}

module.exports = 
{
	activate,
	deactivate
}
