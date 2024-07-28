"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
/*  ----------------------------------------------------
    This TypeScript replaces the manual addition of token
    configuration in 'settings.json'

    It uses the custom "invalid.character.prism" scope
    in prism.tmLanguage.json > invalid-character
    ----------------------------------------------------

    before:

    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": "invalid.character.prism",
                "settings": {
                    "foreground": "#ff0000",
                    "fontStyle": "bold underline"
                }
            }
        ]
    }

    after:

    "prism.invalidCharacterColor": "#ff0000",
*/
function activate(context) {
    // Function to update token color rules
    function updateTokenColorCustomization() {
        const config = vscode.workspace.getConfiguration('prism');
        const invalidCharColor = config.get('invalidCharacterColor') || '#ff0000';
        // Update token color rules
        const tokenColorCustomizations = {
            "textMateRules": [
                {
                    "scope": "invalid.character.prism",
                    "settings": {
                        "foreground": invalidCharColor,
                        "fontStyle": "bold"
                    }
                }
            ]
        };
        vscode.workspace.getConfiguration('editor').update('tokenColorCustomizations', tokenColorCustomizations, vscode.ConfigurationTarget.Global);
    }
    // Update the color whenever the configuration changes
    const configurationChangeDisposable = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('prism.invalidCharacterColor')) {
            updateTokenColorCustomization();
        }
    });
    context.subscriptions.push(configurationChangeDisposable);
    // Update color upon extension activation
    updateTokenColorCustomization();
}
function deactivate() { }
