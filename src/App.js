import './App.css';
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {TimePicker} from '@material-ui/pickers'
import Stack from '@mui/material/Stack';
import * as common from './common'
import WorkUnit from './WorkUnit';
import {toMinutes} from "./common";

export default function App() {

    const [workingDayLength, setWorkingDayLength] = React.useState(7 * 60 + 42);
    const [lunchBreakLength, setLunchBreakLength] = React.useState(30);
    const [estimatedEndTime, setEstimatedEndTime] = React.useState(0);

    const [workingUnits, setNumberOfWorkingUnits] = React.useState([{
        start: 7 * 60, end: undefined
    }]);

    React.useEffect(()=>{
        setEstimatedEndTime(common.getEstimatedEndTime(workingDayLength, lunchBreakLength, workingUnits));
    }, [
        workingDayLength,
        lunchBreakLength,
        workingUnits
    ]);

    return (
        <div className={'app'}>
            <Typography variant={'h3'}>Work timer</Typography>
            <br/>
            <br/>
            <Stack direction="row" spacing={2}>
                <TimePicker
                    label="Expected day length?"
                    clearable
                    ampm={false}
                    value={common.toDate(workingDayLength)}
                    onChange={date => setWorkingDayLength(common.toMinutes(date))}
                />
                <TimePicker
                    label="Lunch break length?"
                    clearable
                    ampm={false}
                    value={common.toDate(lunchBreakLength)}
                    onChange={date => setLunchBreakLength(common.toMinutes(date))}
                />
            </Stack>
            <br/>
            <br/>
            <Stack direction="column" spacing={2}>
                {workingUnits.map((workingUnit, index) => <WorkUnit
                    key={index}
                    index={index+1}
                    start={workingUnit.start}
                    end={workingUnit.end}
                    showDelete={index !== 0}
                    onChange={workingUnit => {
                        const wus = [...workingUnits];
                        wus[index] = workingUnit
                        setNumberOfWorkingUnits(wus);
                    }}
                    onDelete={() => {
                        const wus = workingUnits.filter((item, _index) => index !== _index)
                        setNumberOfWorkingUnits(wus);
                    }}
                />)}
            </Stack>
            <br/>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined"
                        color={'primary'}
                        onClick={() => {
                            const start = common.toMinutes(new Date());
                            const arr = [...workingUnits];
                            arr[arr.length-1].end = arr[arr.length-1].end || start;
                            arr.push({start,end: undefined});
                            setNumberOfWorkingUnits(arr);
                        }}
                >+</Button>
            </Stack>
            <br/>
            <br/>
            {
                workingUnits[workingUnits.length-1].end == null
                ?
                <Typography variant={'h5'} color={'primary'}>You reach your daily goal
                    at {common.toString(common.toDate(estimatedEndTime))}</Typography>
                :
                <Typography variant={'h5'} color={'primary'}>To reach your daily goal you need {common.toString(common.toDate(estimatedEndTime - toMinutes(new Date()))).replace(':', ' hours and ')} minutes.</Typography>
            }
        </div>
    );
}