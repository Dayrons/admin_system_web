import React, { useEffect } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { shell } from "@codemirror/legacy-modes/mode/shell";

import { atomone } from "@uiw/codemirror-theme-atomone";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CircularProgress, IconButton } from "@mui/material";
import type { Service } from "../models/Service";

interface Props {
  openModalDetail: boolean;
  setOpenModalDetail: React.Dispatch<React.SetStateAction<boolean>>;
  loadGetDeatilsService: boolean;
  setLoadGetDeatilsService: React.Dispatch<React.SetStateAction<boolean>>;
   logsValue: string;
  setLogsValue: React.Dispatch<React.SetStateAction<string>>;

  service:Service
}

export function DialogDetail({
  openModalDetail,
  setOpenModalDetail,
  loadGetDeatilsService,
  setLoadGetDeatilsService,
  logsValue,
  setLogsValue,
  service

}: Props) {
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

    `;

  return (
    <div
      style={{
        display: openModalDetail ? "block" : "none",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "1000",
      }}
      // onClick={() => setOpenModalDetail(false)}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "80%",
          height: "80%",
          overflow: "hidden",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          position: "absolute",
          borderRadius: "5px",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "20%",
            height: "100%",
            borderRight: "1px solid #ecf0f1",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "10%",
              // background: "red",
              padding: "0 10px",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
              borderBottom: "1px solid #ecf0f1",
            }}
          >
            <div>
              <IconButton size="large" onClick={() => {}}>
                <PlayArrowIcon />
              </IconButton>
            </div>

            <div>
              <IconButton size="large" onClick={() => {}}>
                <StopIcon />
              </IconButton>
            </div>
            <div>
              <IconButton size="large" onClick={() => {}}>
                <ReplayIcon />
              </IconButton>
            </div>

            <div>
              <IconButton size="large" onClick={() => {}}>
                <ContentCopyIcon />
              </IconButton>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "90%",
              overflow: "auto",
            }}
          ></div>
        </div>

        <div
          style={{
            width: "80%",
            height: "100%",
            position: "relative",
            // display:"flex",
            // justifyContent:"center",
            // alignItems:"center",
            // alignContent:"center"
          }}
        >
          {loadGetDeatilsService ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              <CodeMirror
                width="100%"
                minHeight="100%"
                style={{
                  height: "100%",
                }}
                value={logsValue}
                height="200px"
                extensions={[StreamLanguage.define(shell)]}
                //  theme="light"
                onChange={(value)=> setLogsValue(value)}
                theme={atomone}
              />

              <div
                style={{
                  position: "absolute",
                  right: "30px",
                  top: "10px",
                  zIndex: "140000000",
                  // background:"red"
                }}
              >
                <IconButton
                  size="medium"
                  onClick={() => setOpenModalDetail(false)}
                >
                  <CloseIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
