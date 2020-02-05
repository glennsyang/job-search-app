import React from 'react';
import './App.css';

import Jobs from "./Jobs";

const JOB_API_URL = "/api/jobs";

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();

  console.log("JSON:", json, json.length);
  updateCb(json);
}

function App() {

  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, [])


  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
