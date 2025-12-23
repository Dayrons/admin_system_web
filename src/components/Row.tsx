import { CircularProgress, Switch } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import type { Service } from "../models/Service";



interface props {
  managementService: Function;
  row: Service;

}


export function Row({row, managementService}:props) {

     const [serviceStanbay, setServiceStanbay] = useState(false);
  return (
    <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">
                    {serviceStanbay ? (
                      <CircularProgress size={30} />
                    ) : (
                      <Switch
                        checked={row.is_active}
                        onChange={async () =>{
                            setServiceStanbay(true)
                            await managementService(row)
                            setServiceStanbay(false)

                        }}
                        inputProps={{ "aria-label": `activar-${row.id}` }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {row.add_file ? "Sí" : "No"}
                  </TableCell>
                  <TableCell align="right">
                    {row.replay ? "Sí" : "No"}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(row.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(row.updated_at).toLocaleString()}
                  </TableCell>
                </TableRow>
  )
}
