# VEXcode Information

## setup

1. run `npm i`
2. make sure you ar connected to the VEXcode package manager [setup guide](https://git.innovationfirst.net/vexcode/npm-packages/-/wikis/npm-registry-setup)

## build with no type changes

1. `npm run build`
2. `npm run package`

## build with type changes

1. `npm run build`
2. build types
    1. `npx gulp typings typingsUncompressed`
    2. update typings/blockly.d.ts
        1. update `interface BlockInfo` in typings/blockly.d.ts (see correct definition below)
        2. update `declare module Blockly.FieldMultilineInput` in typings/blockly.d.ts and typeings/core.d.ts (see correct definition below)
        3. update the Blockly definition for JavaScript and Blockly.JavaScript (bottom of file) (see correct definition below)
        4. update the Blockly definition for Python and Blockly.Python (bottom of file) (see correct definition below)
        5. update the Blockly definition for CPP and Blockly.CPP (bottom of file) (see correct definition below)
    3. update cpp.d.ts with the Blockly definition for CPP
    4. update javascript.d.ts with the Blockly definition for JavaScript
    5. update python.d.ts with the Blockly definition for Python
3. `npm run package`

## definitions

### interface BlockInfo

```
interface BlockInfo {
    kind: string;
    blockxml?: string|Node;
    type?: string;
    gap?: string|number;
    disabled?: string|boolean
}
```

### Blockly definition for multilineinput in blockly.d.ts and core.d.ts

```
declare module Blockly.FieldMultilineInput {
    ...
    /**
     * @param containerDiv the div that will contain the custom editor
     * @param currentValue the starting value to display in the editor
     * @param scale the current scale of the workspace
     * @param onChangeCallback a callback function that will get called any
     * time the value in the editor changes
     * @param onCancelCallback a callback function that will get called any
     * time editor detects that the escape button is pressed.
     * @param setDisposeFunction a function that gets called to tell Blockly
     * what function to call to handle disposing of the custom editor.
     * @returns a value (not undefined) if a custom editor was created
     */
    type CustomEditorFunction = (
      containerDiv: HTMLDivElement, 
      currentValue: string,
      scale: number,
      onChangeCallback: (newValue: string) => void,
      onCancelCallback: () => void,
      setDisposeFunction: (disposeFunction: () => void) => void) => any;

    /**
     * @param containerDiv the div that will contain the custom viewer
     * @param currentValue the starting value to display in the viewer
     * @returns true if the custom viewer was created
     */
    type CustomViewerFunction = (containerDiv: HTMLDivElement, currentValue: string) => boolean;

    /**
     * a function that can be set to override the default editor used by the multiline input
     * @type {Blockly.FieldMultilineInput.CustomEditorFunction}
     */
    var customEditor: Blockly.FieldMultilineInput.CustomEditorFunction;

    /**
     * a function that can be set to override the default viewer used by the multiline input
     * @type {Blockly.FieldMultilineInput.CustomViewerFunction}
     */
    var customViewer: Blockly.FieldMultilineInput.CustomViewerFunction;
}
```

### Blockly definition for JavaScript in blockly.d.ts

```
declare module Blockly {
    /**
     * JavaScript code generator.
     * @type {!Blockly.Generator}
     */
    var JavaScript: Blockly.Generator & BlocklyJavaScriptGeneratorExt;
}
```

### Blockly definition for Python in blockly.d.ts

```
declare module Blockly {
    /**
     * Python code generator.
     * @type {!Blockly.Generator}
     */
    var Python: Blockly.Generator & BlocklyPythonGeneratorExt;
}
```

### Blockly definition for CPP in blockly.d.ts

```
declare module Blockly {
    /**
     * CPP code generator.
     * @type {!Blockly.Generator}
     */
    var CPP: Blockly.Generator & BlocklyCPPGeneratorExt;
}
```

### Blockly definition for JavaScript in javascript.d.ts

```
declare module Blockly {
    /**
     * JavaScript code generator.
     * @type {!Blockly.Generator}
     */
    var JavaScript: any;
}
```

### Blockly definition for Python in python.d.ts

```
declare module Blockly {
    /**
     * Python code generator.
     * @type {!Blockly.Generator}
     */
    var Python: any;
}
```

### Blockly definition for CPP in cpp.d.ts

```
declare module Blockly {
    /**
     * CPP code generator.
     * @type {!Blockly.Generator}
     */
    var CPP: any;
}
```