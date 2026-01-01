import { CircularProgress, IconButton, Switch } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import type { Service } from "../models/Service";
import { MdDelete } from "react-icons/md";
interface props {
  managementService: Function;
  onOpenModalDelete: Function;
  row: Service;
}

export function Row({ row, managementService,  onOpenModalDelete }: props) {
  const [serviceStanbay, setServiceStanbay] = useState(false);
  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">{row.description}</TableCell>
      <TableCell align="center">{row.status}</TableCell>
      <TableCell align="center">
        {serviceStanbay ? (
          <CircularProgress size={30} />
        ) : (
          <Switch
            checked={row.is_active}
            onChange={async () => {
              setServiceStanbay(true);
              await managementService(row);
              setServiceStanbay(false);
            }}
            inputProps={{ "aria-label": `activar-${row.id}` }}
          />
        )}
      </TableCell>
      <TableCell align="center">{row.add_file ? "Sí" : "No"}</TableCell>
      <TableCell align="center">{row.replay ? "Sí" : "No"}</TableCell>
      <TableCell align="center">
        {new Date(row.created_at).toLocaleString()}
      </TableCell>
      <TableCell align="center">
        {new Date(row.updated_at).toLocaleString()}
      </TableCell>

      <TableCell align="center">
      <IconButton
        onClick={() => onOpenModalDelete(true)}
        aria-label={`eliminar-${row.id}`}
      >
      <MdDelete />
      </IconButton>
      </TableCell>
    </TableRow>
  );
}
