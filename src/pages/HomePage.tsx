import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import {
  Box,
  Button,
  // CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Formik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import type { Service } from "../models/Service";
import { Row } from "../components/Row";
import { managementApi } from "../apis/management.api";
import { GoKebabHorizontal } from "react-icons/go";
interface FormValues {
  name: string;
  description: string;
  status: string;
  is_active: boolean;
  add_file: boolean;
  replay: boolean;
  file: File | null;
  user_exec: string;
}

export function HomePage() {
  const [rows, setRows] = useState<Service[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [open, setopen] = useState(false);
  const [openModalDelete, setopenModalDelete] = useState(false);

  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    const data = await managementApi.get("v1/services/");

    setRows(data.data);
  };

  const toggleActive = (id: number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_active: !r.is_active } : r))
    );
  };

  const managementService = async (item: Service) => {
    try {
      const response = await managementApi.post("v1/services/management", {
        action: item.is_active ? "stop" : "start",
        service: item.name,
      });

      const updatedIsActive = response.data?.service?.is_active;

      if (typeof updatedIsActive === "boolean") {
        setRows((prev) =>
          prev.map((r) => (r.id === item.id ? { ...r, is_active: updatedIsActive } : r))
        );
        if (updatedIsActive) {
          toast.success("Servicio activado");
        } else {
          toast.warning("Servicio detenido");
        }
      } else {
        // Fallback si la respuesta no trae el valor esperado
        toggleActive(item.id);
        toast.info("Estado del servicio actualizado");
      }
    } catch (error) {
      console.error("Error gestionando el servicio", error);
      toast.error("Error al gestionar el servicio");
    }
  };

  const registerService = async (values: FormValues) => {
    const formData = new FormData();

    const { file, ...restOfValues } = values;

    formData.append("service_in_json", JSON.stringify(restOfValues));

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await managementApi.post(
        "v1/services/deploy",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total ?? 100)
            );
            console.log(`Progreso: ${percentCompleted}%`);
          },
        }
      );
      const serviceCreated: Service = response.data;
      setRows((prev) => [...prev, serviceCreated]);
      setopen(false);
      return response;
    } catch (error) {
      console.error("Error subiendo el formulario", error);
      throw error;
    }
  };

  const removeService = async () => {
    if (!service) throw new Error("No service selected");

    try {
      const response = await managementApi.post("v1/services/remove", service);
      const { service_id } = response.data as { service_id: number };
      setRows((prev) => prev.filter((r) => r.id !== service_id));
      console.log(response.data);
      return response;
    } catch (error) {
      console.error("Error removing service", error);
      throw error;
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3F6F9",
      }}
    >
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Button
          size="medium"
          variant="contained"
          sx={{
            width: "250px",
            marginBottom: "20px",
            mt: 2,
            backgroundColor: "#111827",
            "&:hover": { backgroundColor: "#1f2937" },
          }}
          onClick={() => setopen(true)}
        >
          Registrar servicio
        </Button>

        <TableContainer component={Paper} sx={{ width: "90%", height: "90%" }}>
          <Table aria-label="files table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Descripción</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Activo</TableCell>
                <TableCell align="center">Añadir archivo</TableCell>
                <TableCell align="center">Replay</TableCell>
                <TableCell align="center">Creado</TableCell>
                <TableCell align="center">Actualizado</TableCell>
                <TableCell align="center">
                  <GoKebabHorizontal />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row
                  row={row}
                  managementService={managementService}
                  onOpenModalDelete={() => {
                    setService(row);
                    setopenModalDelete(true);
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => setopen(false)}
        onOpen={() => setopen(true)}
        PaperProps={{
          sx: { width: { xs: "100%", md: "30%" }, minWidth: "320px" },
        }}
      >
        <Box sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
          >
            Registrar Servicio
          </Typography>

          <Formik
            initialValues={{
              name: "",
              description: "",
              status: "activo",
              is_active: true,
              add_file: true,
              replay: true,
              file: null,
              user_exec: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              // const response = await registerService(values);

              toast.promise(registerService(values), {
                pending: "Cargando datos...",
                success: "¡Servicio registrado con éxito!",
                error: "Hubo un error al registrar .",
              });

              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stack spacing={3} alignItems="center">
                  <TextField
                    fullWidth
                    label="Nombre del servicio"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                  />

                   <TextField
                    fullWidth
                    label="Usuario de ejecución"
                    name="user_exec"
                    onChange={handleChange}
                    value={values.user_exec}
                  />

                  <TextField
                    fullWidth
                    select
                    label="Estado"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="activo">Activo</MenuItem>
                    <MenuItem value="inactivo">Inactivo</MenuItem>
                  </TextField>

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Descripción"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                  />

                  <Box sx={{ width: "100%" }}>
                    <Button
                      component="label"
                      variant="outlined"
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        py: 1.5,
                        borderStyle: "dashed",
                      }}
                    >
                      {fileName ? "Cambiar archivo" : "Subir archivo adjunto"}
                      <input
                        type="file"
                        hidden
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0];
                          if (file) {
                            setFieldValue("file", file);
                            setFileName(file.name);
                          }
                        }}
                      />
                    </Button>
                    {fileName && (
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          mt: 1,
                          textAlign: "center",
                          color: "primary.main",
                        }}
                      >
                        Archivo seleccionado: {fileName}
                      </Typography>
                    )}
                  </Box>
                  {/* ---------------------------------- */}

                  <Box sx={{ width: "100%", px: 1 }}>
                    <FormControlLabel
                      sx={{
                        width: "100%",
                        justifyContent: "space-between",
                        ml: 0,
                      }}
                      labelPlacement="start"
                      control={
                        <Switch
                          name="is_active"
                          checked={values.is_active}
                          onChange={handleChange}
                        />
                      }
                      label="Servicio habilitado"
                    />
                    <FormControlLabel
                      sx={{
                        width: "100%",
                        justifyContent: "space-between",
                        ml: 0,
                      }}
                      labelPlacement="start"
                      control={
                        <Switch
                          name="add_file"
                          checked={values.add_file}
                          onChange={handleChange}
                        />
                      }
                      label="Crear archivo service"
                    />
                    <FormControlLabel
                      sx={{
                        width: "100%",
                        justifyContent: "space-between",
                        ml: 0,
                      }}
                      labelPlacement="start"
                      control={
                        <Switch
                          name="replay"
                          checked={values.replay}
                          onChange={handleChange}
                        />
                      }
                      label="Mantener en ejecucion"
                    />
                  </Box>

                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      py: 1.5,
                      mt: 2,

                      backgroundColor: "#111827",
                      "&:hover": { backgroundColor: "#1f2937" },
                    }}
                  >
                    Registrar servicio
                  </Button>
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
      </SwipeableDrawer>

      <Dialog
        open={openModalDelete}
        onClose={() => {}}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const password = formJson.password;

              console.log("Password entered:", password);

              toast.promise(removeService(), {
                pending: "Eliminando servicio...",
                success: "¡Servicio eliminado con éxito!",
                error: "Hubo un error al eliminar el servicio.",
              });


              setopenModalDelete(false);
            },
          },
        }}
      >
        <DialogTitle>Confirmar eliminación del servicio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Al eliminar este servicio se detendrán todas las operaciones en
            curso y se eliminarán de forma permanente los datos asociados. Esta
            acción es irreversible. Si desea continuar, confirme ingresando su
            contraseña a continuación.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            variant="outlined"
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setopenModalDelete(false)}
            size="small"
            // variant="contained"
            color="info"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="small"
             sx={{
              backgroundColor: "#111827",
              "&:hover": { backgroundColor: "#1f2937" },
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
