import { Uri, workspace } from 'vscode';
import * as path from 'path';
import * as Mustache from 'mustache';
import * as fs from 'fs';
import * as https from 'https';

type Datas = {
  app_name: string;
  repository: string;
  app_url: string;
  github: string;
  author: string;
};

type GetContentArgs = {
  lang: string;
  datas: Datas;
  templateType: string;
  customTemplatePath: string;
};

const fetchRemoteTemplate = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

export default async ({ datas, lang, templateType, customTemplatePath }: GetContentArgs) => {
  let templateContent = '';

  if (templateType === 'default' || templateType === 'full') {
    const templateFilePath = path.resolve(__dirname, '..', 'templates', `${lang}`, `${templateType}.md`);
    const templateUri = Uri.file(templateFilePath);
    const buffer = await workspace.fs.readFile(templateUri);
    templateContent = buffer.toString();
  } else if (templateType === 'custom') {
    if (customTemplatePath.startsWith('http')) {
      templateContent = await fetchRemoteTemplate(customTemplatePath);
    } else {
      const buffer = fs.readFileSync(customTemplatePath);
      templateContent = buffer.toString();
    }
  }

  const content = Mustache.render(templateContent, datas);
  return content;
};