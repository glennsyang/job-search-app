import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Job from './Job';
import JobModal from './JobModal';
import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
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

export default function Jobs({ jobs }) {

    React.useEffect(() => {
        const welcomeItem = document.querySelectorAll('.welcome-item');
        let delay = 0;
        welcomeItem.forEach(item => {
            setTimeout(() => item.style.opacity = 1, delay);
            delay += 500;
        })
    }, []);

    // modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});
    function handleClickOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }

    // pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 20);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 20, (activeStep * 20) + 20);

    function scrollToTop() {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    };

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        scrollToTop();
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        scrollToTop();
    }

    // filtering
    const classes = useStyles();
    const [value, setValue] = React.useState('all');
    const unfilteredJobs = jobs;

    const handleChange = event => {
        console.log(event.target.value);
        setValue(event.target.value);
        const filteredJobs = jobs.filter(e => e.location.includes("OH"));
        console.log("jobs:", filteredJobs.length);
    };

    return (
        <div className="jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose} />
            <Typography variant="h4" component="h1">
                Entry Level Software Jobs
            </Typography>
            <Typography variant="h6" component="h2">
                Found {numJobs} Jobs
            </Typography>
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
            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={() => {
                        console.log('clicked')
                        handleClickOpen();
                        selectJob(job)
                    }} />
                )
            }
            <div>
                Page {activeStep + 1} of {numPages}
            </div>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numJobs - 1}>
                        Next
                    <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        </div>
    );
}