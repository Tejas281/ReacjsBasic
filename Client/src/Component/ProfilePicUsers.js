import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import HideImageRoundedIcon from '@mui/icons-material/HideImageRounded';
import { useSelector } from "react-redux";
import { setUsers } from "../Store/Users";
export default function PopoverPopupState(props) {
  // let value = useSelector((state) => state?.users?.users.map((index => index.profilefile)));
  // console.log("valusss",value)
 
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button variant="contained" {...bindTrigger(popupState)}>
            <HideImageRoundedIcon />
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          ><Typography sx={{ width: '100%', height: '100%'  }}>
             <img
              sx={{ width: '100%', height: '100%' }}
                  src={`http://localhost:5000/uploads/${props.usersProfile}`}
                  class="avatar-md h-auto d-block rounded"
                  style={{ cursor: "pointer" }}
                />
            </Typography>
          </Popover>
         
        </div>
      )}
    </PopupState>
  );
}
