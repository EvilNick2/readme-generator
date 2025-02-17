import { workspace, Uri, RelativePattern } from 'vscode';

export default async (uri: Uri): Promise<Uri> => {
  const filename = 'README.md';

  const fileUri = Uri.parse(`${uri.toString()}/${filename}`, true);

	const pattern = new RelativePattern(uri.path, filename);
	const filesFound = await workspace.findFiles(pattern);

  if (filesFound.length === 0) { return fileUri; }

  throw new Error(`A ${filename} file already exists in this workspace.`);
};