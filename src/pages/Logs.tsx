import  { useState, useCallback } from "react";
// import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { materialDark } from "@uiw/codemirror-theme-material";
import { atomone} from "@uiw/codemirror-theme-atomone";

function Logs() {
    const value = `
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159605 con Numero 2-13/2256 en Sesion POS/01193. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159606 con Numero 2-15/1144 en Sesion POS/01196. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159607 con Numero 2-12/2372 en Sesion POS/01192. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159608 con Numero 2-18/0845 en Sesion POS/01201. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159609 con Numero 2-16/5353 en Sesion POS/01197. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159610 con Numero 2-16/5354 en Sesion POS/01197. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159611 con Numero 2-12/2373 en Sesion POS/01192. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159612 con Numero 2-13/2257 en Sesion POS/01193. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159613 con Numero 2-12/2374 en Sesion POS/01192. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')

        journalctl stderr: 
        INFO:     127.0.0.1:45046 - "GET /api/v1/services/ HTTP/1.1" 200 OK
        CompletedProcess(args=['sudo', '/usr/bin/systemctl', 'is-active', 'albaranes.trinidad', '--no-pager'], returncode=0, stdout='active\n', stderr='')
        system_result.stdout: active

        system_result.stderr: 
        system_result.returncode: 0
        journalctl stdout: ene 05 12:46:54 userpc python3[460431]: ID 159604 con Numero 2-16/5352 en Sesion POS/01197. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159605 con Numero 2-13/2256 en Sesion POS/01193. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159606 con Numero 2-15/1144 en Sesion POS/01196. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159607 con Numero 2-12/2372 en Sesion POS/01192. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159608 con Numero 2-18/0845 en Sesion POS/01201. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159609 con Numero 2-16/5353 en Sesion POS/01197. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159610 con Numero 2-16/5354 en Sesion POS/01197. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159611 con Numero 2-12/2373 en Sesion POS/01192. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159612 con Numero 2-13/2257 en Sesion POS/01193. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')
        ene 05 12:46:54 userpc python3[460431]: ID 159613 con Numero 2-12/2374 en Sesion POS/01192. Aplicado: Si.
        ene 05 12:46:54 userpc python3[460431]: ConnectionRefusedError(111, 'Connection refused')

    `

  return (
   
    <CodeMirror 
    width="100%"
    minHeight="100vh"
    value={value}
     height="200px"
    extensions={[StreamLanguage.define(shell)]}
    //  theme="light" 
    theme={atomone}
     
     />
  );
}

export default Logs;
