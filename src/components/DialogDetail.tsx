import React, { useEffect } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { shell } from "@codemirror/legacy-modes/mode/shell";

import { atomone } from "@uiw/codemirror-theme-atomone";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import type { Service } from "../models/Service";
import type { HistoryService } from "../models/HistoryService";
import {  toast } from "react-toastify";
interface Props {
  openModalDetail: boolean;
  setOpenModalDetail: React.Dispatch<React.SetStateAction<boolean>>;
  loadGetDeatilsService: boolean;
  logsValue: string;
  setLogsValue: React.Dispatch<React.SetStateAction<string>>;
  
  service: Service;
  copyToClipboard: Function;
  startService:Function;
  stopService:Function;
  getDetailsService: Function;
}

const formateService = (histories: HistoryService[]) => {
  if (!Array.isArray(histories) || histories.length === 0) {
    return [];
  }

  if (histories.length === 1) {
    return histories;
  }

  const first = histories[0];
  const restInverted = histories.slice(1).reverse();

  return [first, ...restInverted];
};

export function DialogDetail({
  openModalDetail,
  setOpenModalDetail,
  loadGetDeatilsService,
  getDetailsService,
  logsValue,
  setLogsValue,
  service,
  copyToClipboard,
  startService,
  stopService
}: Props) {
  return (
    <div
      style={{
        display: openModalDetail ? "block" : "none",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "2",
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
              <IconButton size="large" onClick={() => startService()}>
                <PlayArrowIcon  />
              </IconButton>
            </div>

            <div>
              <IconButton size="large" onClick={() => stopService()}>
                <StopIcon />
              </IconButton>
            </div>
            <div>
              <IconButton size="large" onClick={() => getDetailsService(service)}>
                <ReplayIcon />
              </IconButton>
            </div>

            <div>
              <IconButton
                size="large"
                onClick={() => copyToClipboard(logsValue)}
              >
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
          >
            <Box sx={{ mt: 2 }}>
              {formateService(service?.histories).map((history, index) => (
                <Box
                  key={history.id || index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 8px",
                    borderBottom: "1px solid",
                    borderColor: "divider", // Color suave automático de MUI
                    transition: "background-color 0.2s",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.02)", // Efecto sutil al pasar el mouse
                    },
                    "&:last-child": {
                      borderBottom: "none", // Quitamos el borde al último item
                    },
                  }}
                >
                  {/* Lado Izquierdo: Nombre */}
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color: "text.primary",
                      fontSize: "0.95rem",
                      // Aplicamos la limpieza de puntos aquí también si es necesario
                      textTransform: "capitalize",
                    }}
                  >
                    {history.name?.replace(/\./g, " ")}
                  </Typography>

                  {/* Lado Derecho: Fecha */}
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.85rem",
                      fontWeight: 400,
                      fontFamily: "Monospace", // Opcional: le da un toque técnico/moderno
                    }}
                  >
                    {/* Asumiendo que history.date es una fecha válida */}
                    {new Date(history.created_at).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Typography>
                </Box>
              ))}
            </Box>
          </div>
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
          <div
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "10%",
                display: "flex",
                justifyContent: "space-between",
                boxSizing: "border-box",
                padding: "0 20px",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  component="span"
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: service?.is_active ? "#10b981" : "#f43f5e",
                    display: "inline-block",
                    boxShadow: () =>
                      `0 0 0 4px ${
                        service?.is_active
                          ? "rgba(16, 185, 129, 0.15)"
                          : "rgba(244, 63, 94, 0.15)"
                      }`,
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontSize: "0.75rem",
                    color: service?.is_active ? "#10b981" : "#f43f5e",
                  }}
                >
                  {service?.is_active ? "Activo" : "Inactivo"}
                </Typography>
              </Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: "#37474f",
                  letterSpacing: "-0.02em",
                  mb: 1,
                }}
              >
                {service?.name
                  ? service.name.replace(/\./g, " ").charAt(0).toUpperCase() +
                    service.name.replace(/\./g, " ").slice(1)
                  : ""}
              </Typography>

              <div>
                <IconButton
                  size="medium"
                  onClick={() => setOpenModalDetail(false)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>

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
              <CodeMirror
                width="100%"
                minHeight="90%"
                style={{
                  height: "100%",
                }}
                value={logsValue}
                height="200px"
                extensions={[StreamLanguage.define(shell)]}
                //  theme="light"
                onChange={(value) => setLogsValue(value)}
                theme={atomone}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
