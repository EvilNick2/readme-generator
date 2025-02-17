import { Uri, workspace, RelativePattern } from "vscode";

export default async (currentUri: Uri) => {
	const pattern = new RelativePattern(currentUri.path, 'package.json');
  const rootFolder = workspace.workspaceFolders![0];

	const [packageCurrentUri] = await workspace.findFiles(pattern);

	if (!packageCurrentUri) { return rootFolder.name; }

  const contentInBytes = await workspace.fs.readFile(packageCurrentUri);
  const content = contentInBytes.toString();

  const packageFile = JSON.parse(content);

  return packageFile.name || rootFolder.name;
};
