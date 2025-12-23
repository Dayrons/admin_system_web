import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
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
  useEffect(() => {}, []);
  
  const { addToken } = useAuth();
    const navigate = useNavigate();
  const signin = async (values: FormValues) => {
    try {
 
      setSigninStanbay(true);
      const response = await managementApi.post("v1/auth/signin", values);

 
      addToken(response.data.access_token)
      setSigninStanbay(false);
      navigate("/home-page")
      
    } catch (error) {

      setSigninStanbay(false);
    }
  };

  const authValidate = () => {};

  const [signinStanbay, setSigninStanbay] = useState(false);

  const [rememberme, setrememberme] = useState(false)


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
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  padding: 4,
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
                  <FormControlLabel
                    control={<Checkbox size="small"  checked={rememberme}  onChange={(e)=>setrememberme(e.target.checked)} />}
                    label={<Typography variant="body2">Recordarme</Typography>}
                  />
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
            padding: "0 10%",
            color: "white",
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            Gestiona tus servicios
          </Typography>
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
