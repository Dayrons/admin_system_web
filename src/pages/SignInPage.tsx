import {
  Box,
  TextField,
  Button,
  Typography,
  // Checkbox,
  // FormControlLabel,
  CircularProgress,
} from "@mui/material";
import background from "../assets/background.jpg";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { managementApi } from "../apis/management.api";
import { Formik } from "formik";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

interface FormValues {
  name: string;
  password: string;
}

export function SignInPage() {
  const { addToken, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home-page");
    }
  }, []);

  const signin = async (values: FormValues) => {
    try {
      setSigninStanbay(true);
      const response = await managementApi.post("v1/auth/signin", values);
      addToken(response.data.access_token);
      setSigninStanbay(false);
      navigate("/home-page");
    } catch (error) {
      setSigninStanbay(false);
    }
  };

  // const authValidate = () => {};

  const [signinStanbay, setSigninStanbay] = useState(false);

  // const [rememberme, setrememberme] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "40%",
          height: "100%",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Formik
          initialValues={{
            name: "",
            password: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            
            signin(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  width: 400,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Bienvenido
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Por favor, ingresa tus credenciales para acceder.
                </Typography>

                <TextField
                  label="Usuario"
                  variant="outlined"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={rememberme}
                        onChange={(e) => setrememberme(e.target.checked)}
                      />
                    }
                    label={<Typography variant="body2">Recordarme</Typography>}
                  /> */}
                </Box>

                {!signinStanbay ? (
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      mt: 2,
                      backgroundColor: "#111827",
                      "&:hover": { backgroundColor: "#1f2937" },
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress sx={{ color: "#111827" }} />
                  </div>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </div>

      <div
        style={{
          width: "60%",
          height: "100%",
          position: "relative",
          backgroundImage: `url("${background}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(17, 24, 39, 0.7)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            Gestiona tus servicios
          </Typography>
          {(() => {
            const server = import.meta.env.VITE_NAME_SERVER ?? "DESCONOCIDO";
            const isProd = server.toLowerCase().includes("prod");
            const bg = isProd
              ? "linear-gradient(90deg, rgba(239,68,68,0.95) 0%, rgba(185,28,28,0.95) 100%)"
              : "linear-gradient(90deg, rgba(14,165,233,0.95) 0%, rgba(99,102,241,0.95) 100%)";
            const circleColor = isProd ? "#ef4444" : "#0ea5e9";
            return (
              <Box
                sx={{
                  mt: 2,
                  px: 2,
                  py: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.25,
                  bgcolor: bg,
                  color: "#fff",
                  borderRadius: 2,
                  boxShadow: "0 8px 24px rgba(2,6,23,0.35)",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: circleColor,
                    display: "inline-block",
                    boxShadow: `0 0 0 4px ${isProd ? "rgba(239,68,68,0.15)" : "rgba(14,165,233,0.15)"}`,
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    fontSize: 14,
                  }}
                >
                  {`SERVIDOR: ${server}`}
                </Typography>
              </Box>
            );
          })()}
          <div
            style={{
              background: "rgb(255, 255, 255, 0.7)",
              width: "300px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <img
              src={logo}
              alt="Logo Empresa"
              style={{
                maxWidth: "180px",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
