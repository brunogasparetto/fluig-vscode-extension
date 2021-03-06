import * as vscode from "vscode";
import { posix } from "path";
import { readFileSync } from "fs";
import { ServerItem, ServerItemProvider } from "./providers/ServerItemProvider";
import { glob } from "glob";
import { DatasetService } from "./services/DatasetService";
import { FormService } from "./services/FormService";
import { GlobalEventService } from "./services/GlobalEventService";

interface ExtensionsPath {
    TEMPLATES: string,
    FORM_EVENTS: string,
    WORKFLOW_EVENTS: string,
    GLOBAL_EVENTS: string
}

interface EventsNames {
    FORM: string[],
    WORKFLOW: string[],
    GLOBAL: string[]
}

const EXTENSION_PATHS: ExtensionsPath = {
    TEMPLATES: '',
    FORM_EVENTS: '',
    WORKFLOW_EVENTS: '',
    GLOBAL_EVENTS: ''
};

const EVENTS_NAMES: EventsNames = {
    FORM: [],
    WORKFLOW: [],
    GLOBAL: []
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("fluig-vscode-extension.newDataset", createDataset)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("fluig-vscode-extension.newForm", createForm)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("fluig-vscode-extension.newFormEvent", createFormEvent)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("fluig-vscode-extension.newWorkflowEvent", createWorkflowEvent)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("fluig-vscode-extension.newGlobalEvent", createGlobalEvent)
    );

    EXTENSION_PATHS.TEMPLATES = getTemplateDirectoryPath();
    EXTENSION_PATHS.FORM_EVENTS = posix.join(EXTENSION_PATHS.TEMPLATES, 'formEvents')
    EXTENSION_PATHS.WORKFLOW_EVENTS = posix.join(EXTENSION_PATHS.TEMPLATES, 'workflowEvents')
    EXTENSION_PATHS.GLOBAL_EVENTS = posix.join(EXTENSION_PATHS.TEMPLATES, 'globalEvents')

    EVENTS_NAMES.FORM = getTemplatesNameFromPath(EXTENSION_PATHS.FORM_EVENTS);
    EVENTS_NAMES.WORKFLOW = getTemplatesNameFromPath(EXTENSION_PATHS.WORKFLOW_EVENTS);
    EVENTS_NAMES.GLOBAL = getTemplatesNameFromPath(EXTENSION_PATHS.GLOBAL_EVENTS);

    const serverItemProvider = new ServerItemProvider(context);
    vscode.window.registerTreeDataProvider("fluig-vscode-extension.servers", serverItemProvider);

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fluig-vscode-extension.addServer",
            () => serverItemProvider.add()
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fluig-vscode-extension.refreshServer",
            () => serverItemProvider.refresh()
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fluig-vscode-extension.importDataset",
            () => DatasetService.import()
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fluig-vscode-extension.importManyDataset",
            () => DatasetService.importMany()
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fluig-vscode-extension.exportDataset",
            (fileUri: vscode.Uri) => DatasetService.export(fileUri)
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fluig-vscode-extension.editServer",
            (serverItem: ServerItem) => serverItemProvider.update(serverItem)
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fluig-vscode-extension.deleteServer",
            (serverItem: ServerItem) => serverItemProvider.delete(serverItem)
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fluig-vscode-extension.importForm",
            () => FormService.import()
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
                  "fluig-vscode-extension.importManyForm",
            () => FormService.importMany()
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fluig-vscode-extension.importGlobalEvent",
            () => GlobalEventService.import()
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fluig-vscode-extension.importManyGlobalEvent",
            () => GlobalEventService.importMany()
        )
    );
}

export function deactivate() { }

/**
 * Cria um arquivo contendo um novo Dataset
 */
async function createDataset() {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage("Voc?? precisa estar em um diret??rio / workspace.");
        return;
    }

    let dataset: string = await vscode.window.showInputBox({
        prompt: "Qual o nome do Dataset (sem espa??os e sem caracteres especiais)?",
        placeHolder: "ds_nome_dataset"
    }) || "";

    if (!dataset) {
        return;
    }

    if (!dataset.endsWith(".js")) {
        dataset += ".js";
    }

    const workspaceFolderUri = vscode.workspace.workspaceFolders[0].uri;
    const datasetUri = workspaceFolderUri.with({ path: posix.join(workspaceFolderUri.path, "datasets", dataset) });

    try {
        await vscode.workspace.fs.stat(datasetUri);
        return vscode.window.showTextDocument(datasetUri);
    } catch (err) {

    }

    await vscode.workspace.fs.writeFile(
        datasetUri,
        readFileSync(posix.join(EXTENSION_PATHS.TEMPLATES, 'createDataset.txt'))
    );
    vscode.window.showTextDocument(datasetUri);
}

/**
 * Cria um novo formul??rio
 */
async function createForm() {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage("Voc?? precisa estar em um diret??rio / workspace.");
        return;
    }

    let formName: string = await vscode.window.showInputBox({
        prompt: "Qual o nome do Formul??rio (sem espa??os e sem caracteres especiais)?",
        placeHolder: "NomeFormulario"
    }) || "";

    if (!formName) {
        return;
    }

    const formFileName = formName + ".html";
    const workspaceFolderUri = vscode.workspace.workspaceFolders[0].uri;
    const formUri = workspaceFolderUri.with({
        path: posix.join(
            workspaceFolderUri.path,
            "forms",
            formName,
            formFileName
        )
    });

    try {
        await vscode.workspace.fs.stat(formUri);
        return vscode.window.showTextDocument(formUri);
    } catch (err) {

    }

    await vscode.workspace.fs.writeFile(formUri, readFileSync(posix.join(EXTENSION_PATHS.TEMPLATES, 'form.txt')));
    vscode.window.showTextDocument(formUri);
}

/**
 * Cria um novo evento de formul??rio
 */
async function createFormEvent(folderUri: vscode.Uri) {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage("Voc?? precisa estar em um diret??rio / workspace.");
        return;
    }

    if (!folderUri.path.includes("/forms/")) {
        vscode.window.showErrorMessage("Necess??rio selecionar um formul??rio para criar o evento.");
        return;
    }

    const formName: string = folderUri.path.replace(/.*\/forms\/([^/]+).*/, "$1");

    const eventName: string = await vscode.window.showQuickPick(
        EVENTS_NAMES.FORM,
        {
            canPickMany: false,
            placeHolder: "Selecione o Evento"
        }
    ) || "";

    if (!eventName) {
        return;
    }

    const eventFilename = eventName + ".js";
    const workspaceFolderUri = vscode.workspace.workspaceFolders[0].uri;
    const eventUri = workspaceFolderUri.with({
        path: posix.join(
            workspaceFolderUri.path,
            "forms",
            formName,
            'events',
            eventFilename
        )
    });

    try {
        await vscode.workspace.fs.stat(eventUri);
        return vscode.window.showTextDocument(eventUri);
    } catch (err) {

    }

    await vscode.workspace.fs.writeFile(
        eventUri,
        readFileSync(posix.join(EXTENSION_PATHS.FORM_EVENTS, `${eventName}.txt`))
    );
    vscode.window.showTextDocument(eventUri);
}

/**
 * Cria um novo evento Global
 */
async function createGlobalEvent(folderUri: vscode.Uri) {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage("Voc?? precisa estar em um diret??rio / workspace.");
        return;
    }

    const eventName: string = await vscode.window.showQuickPick(
        EVENTS_NAMES.GLOBAL,
        {
            canPickMany: false,
            placeHolder: "Selecione o Evento"
        }
    ) || "";

    if (!eventName) {
        return;
    }

    const eventFilename = eventName + ".js";
    const workspaceFolderUri = vscode.workspace.workspaceFolders[0].uri;
    const eventUri = workspaceFolderUri.with({
        path: posix.join(
            workspaceFolderUri.path,
            "events",
            eventFilename
        )
    });

    try {
        await vscode.workspace.fs.stat(eventUri);
        return vscode.window.showTextDocument(eventUri);
    } catch (err) {

    }

    await vscode.workspace.fs.writeFile(
        eventUri,
        readFileSync(posix.join(EXTENSION_PATHS.GLOBAL_EVENTS, `${eventName}.txt`))
    );
    vscode.window.showTextDocument(eventUri);
}

/**
 * Cria um novo evento de Processo
 */
async function createWorkflowEvent(folderUri: vscode.Uri) {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage("Voc?? precisa estar em um diret??rio / workspace.");
        return;
    }

    if (!folderUri.path.endsWith(".process")) {
        vscode.window.showErrorMessage("Necess??rio selecionar um Processo para criar o evento.");
        return;
    }

    const newFunctionOption = 'Nova Fun????o';

    let eventName: string = await vscode.window.showQuickPick(
        EVENTS_NAMES.WORKFLOW.concat(newFunctionOption),
        {
            canPickMany: false,
            placeHolder: "Selecione o Evento"
        }
    ) || "";

    if (!eventName) {
        return;
    }

    let isNewFunction = false;

    if (eventName == newFunctionOption) {
        eventName = await vscode.window.showInputBox({
            prompt: "Qual o nome da Nova Fun????o (sem espa??os e sem caracteres especiais)?",
            placeHolder: "nomeFuncao"
        }) || "";

        if (!eventName) {
            return;
        }

        isNewFunction = true;
    }

    const processName: string = folderUri.path.replace(/.*\/(\w+)\.process$/, "$1");
    const eventFilename = `${processName}.${eventName}.js`;
    const workspaceFolderUri = vscode.workspace.workspaceFolders[0].uri;
    const eventUri = workspaceFolderUri.with({
        path: posix.join(
            workspaceFolderUri.path,
            "workflow",
            "scripts",
            eventFilename
        )
    });

    try {
        await vscode.workspace.fs.stat(eventUri);
        return vscode.window.showTextDocument(eventUri);
    } catch (err) {

    }

    await vscode.workspace.fs.writeFile(
        eventUri,
        isNewFunction
            ? Buffer.from(createEmptyFunction(eventName), "utf-8")
            : readFileSync(posix.join(EXTENSION_PATHS.WORKFLOW_EVENTS, `${eventName}.txt`))
    );
    vscode.window.showTextDocument(eventUri);
}

/**
 * Pega o diret??rio de templates da Extens??o
 *
 * @returns O caminho do diret??rio de templates da Extens??o
 */
function getTemplateDirectoryPath(): string {
    const path = vscode.extensions.getExtension("BrunoGasparetto.fluig-vscode-extension")?.extensionPath;

    if (!path) {
        throw "N??o foi poss??vel encontrar o diret??rio de templates.";
    }

    return posix.join(path, 'templates');
}

/**
 * Pega o nome dos templates de determinado diret??rio
 *
 * @param path Diret??rio onde est??o os templates
 * @returns Nome dos arquivos sem a extens??o
 */
function getTemplatesNameFromPath(path: string): string[] {
    return glob.sync(posix.join(path, '*.txt'))
        .map(filename => posix.basename(filename).replace(/([^.]+)\.txt/, '$1'));
}

/**
 * Cria o conte??do de fun????o compartilhada no processo
 *
 * @param functionName Nome da Fun????o
 * @returns Defini????o da fun????o
 */
function createEmptyFunction(functionName: string): string {
    return `/**
 *
 *
 */
function ${functionName}() {

}

`;
}
