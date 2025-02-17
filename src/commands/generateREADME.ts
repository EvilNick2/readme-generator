import { window, Uri, workspace } from "vscode";
import getCurrentUri from "../tools/getCurrentUri";
import getREADMEUri from '../tools/getREADMEUri';
import getData from '../tools/getData';
import getContent from '../tools/getContent';

const generateREADME = async (uri: Uri) => {
	try {
		const currentUri = await getCurrentUri(uri);
		const readmeUri = await getREADMEUri(currentUri);

		const data = await getData(currentUri);
		const content = await getContent(data);

		await workspace.fs.writeFile(readmeUri, Buffer.from(content));
	} catch (error) {
		if (error instanceof Error) {
			window.showErrorMessage(error.message);
		}

		window.showErrorMessage('README Generator: an unexpected error has occurred');
	};
};

export { generateREADME };