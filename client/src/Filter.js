import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function Filter() {
    const classes = useStyles();
    const [value, setValue] = React.useState('all');

    const handleChange = event => {
        console.log(event.target.value);
        setValue(event.target.value);
    };

    return (
        <div>
            <Paper className='location'>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Location</FormLabel>
                    <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                        <FormControlLabel value="usa" control={<Radio />} label="U.S." />
                        <FormControlLabel value="international" control={<Radio />} label="International" />
                        <FormControlLabel value="remote" control={<Radio />} label="Remote" />
                    </RadioGroup>
                </FormControl>
            </Paper>
        </div>
    );
}
