import React from 'react'
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Logo from './Logo';
import JSLogo from './logos/js-logo.png';
import PYLogo from './logos/py-logo.gif';
import JavaLogo from './logos/java-logo.png';
import RubyLogo from './logos/ruby-logo.png';
import phpLogo from './logos/php-logo.png';
import CplusLogo from './logos/cplusplus-logo.png';

// todo factor these into constants file
const ONE_DAY_MS = 24 * 3600 * 1000;

// returns a date like Fri Jun 14
function getMDY(ts) {
    return ts.toDateString().split(' ').slice(0, 3).join(' ')
}

// makeDate takes a TS and returns a date like Fri Jun 14
// if it's today or yesterday, it returns that instead
function makeDate(timestamp) {
    const date = new Date(timestamp);
    const dateStr = getMDY(date);
    const todayStr = getMDY(new Date());
    const yesterdayStr = getMDY(new Date(Date.now() - ONE_DAY_MS));
    if (dateStr === todayStr) {
        return 'today';
    } else if (dateStr === yesterdayStr) {
        return 'yesterday';
    } else {
        return dateStr;
    }
}

function makeLogoArray(job) {
    const logos = [];
    if (job.description.toLowerCase().includes('c++')) { logos.push(CplusLogo) }
    if (job.description.toLowerCase().includes('ruby')) { logos.push(RubyLogo) }
    if (job.description.toLowerCase().includes('php')) { logos.push(phpLogo) }
    if (job.description.toLowerCase().includes('java')) { logos.push(JavaLogo) }
    if (job.description.toLowerCase().includes('javascript')) { logos.push(JSLogo) }
    if (job.description.toLowerCase().includes('python')) { logos.push(PYLogo) }
    return logos;
}

export default function Job({ job, onClick }) {
    return (
        <Paper onClick={onClick} className='job'>
            <div className="flex-align-mid">
                <div className="logo-container">
                    {makeLogoArray(job).map((logo, i) => (
                        <Logo key={i} logo={logo} />
                    ))}
                </div>
                <div className="job-title-location">
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="h5">{job.company}</Typography>
                    <Typography>{job.location}</Typography>
                </div>
            </div>
            <div className="flex-align-mid">
                <Typography>{makeDate(job.created_at)}</Typography>
            </div>
        </Paper>
    );
}