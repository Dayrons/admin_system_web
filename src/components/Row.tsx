import { IconButton, Switch } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { Service } from "../models/Service";
import { MdDelete } from "react-icons/md";
import VisibilityIcon from "@mui/icons-material/Visibility";
interface props {
  managementService: Function;
  removeService: Function;
  row: Service;
  getDetailsService: Function;
}

export function Row({
  row,
  managementService,
  removeService,
  getDetailsService,
}: props) {
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
      <TableCell align="center">
        <Switch
          checked={row.is_active}
          onChange={() => managementService()}
          inputProps={{ "aria-label": `activar-${row.id}` }}
        />
      </TableCell>
      <TableCell align="center">{row.add_file ? "Sí" : "No"}</TableCell>
      <TableCell align="center">{row.replay ? "Sí" : "No"}</TableCell>
      <TableCell align="center">
        {new Date(row.created_at).toLocaleString()}
      </TableCell>
      <TableCell align="center">
        {new Date(row.updated_at).toLocaleString()}
      </TableCell>

      <TableCell align="center" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

          <div style={{margin:"0 5px"}}>
            <IconButton
              size="medium"
              onClick={() => removeService()}
              aria-label={`eliminar-${row.id}`}
            >
              <MdDelete />
            </IconButton>
          </div>

          <div style={{margin:"0 5px"}}>
            <IconButton
              size="medium"
              onClick={()=>getDetailsService()}
              aria-label={`eliminar-${row.id}`}
            >
              <VisibilityIcon />
            </IconButton>
          </div>
        
      </TableCell>
    </TableRow>
  );
}
