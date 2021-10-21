import Stack from "@mui/material/Stack";
import {TimePicker} from "@material-ui/pickers";
import * as common from "./common";
import Button from "@mui/material/Button";
import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from '@mui/icons-material/Clear';

export default function WorkUnit(props) {
    return (
        <Stack direction="row" spacing={2} >
            <TimePicker
                label={"Start working #"+props.index}
                clearable
                ampm={false}
                value={common.toDate(props.start)}
                onChange={time => props.onChange({...props, start: common.toMinutes(time)})}
            />
            {props.end ? <TimePicker
                label="End"
                clearable
                ampm={false}
                value={common.toDate(props.end)}
                onChange={time => props.onChange({...props, end: common.toMinutes(time)})}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <ClearIcon
                                className={'button'}
                                onClick={(event) => {
                                    event.preventDefault();
                                    props.onChange({...props, end: undefined})
                                }}
                            />
                        </InputAdornment>
                    ),
                }}
            /> : <Button onClick={()=> props.onChange({...props, end: common.toMinutes(new Date())})}>Add End</Button>}
            {props.showDelete && <Button onClick={props.onDelete}>Delete</Button>}
        </Stack>
    )
}
