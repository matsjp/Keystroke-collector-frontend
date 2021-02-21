import React, { useState } from 'react';
import Task from './Task'
import {dollTask, freedomTask, runawayTask, stayTask} from '../tasks'
import { mobileAndTabletCheck, mobileCheck, shuffleArray } from '../utils';
import Button from '@material-ui/core/Button';
import Consent from './Consent';
require('dotenv').config();

export default function TaskWizard(props){
    const host = process.env.REACT_APP_API_HOST;
    const apiUrl = 'https://fierce-peak-35449.herokuapp.com/api/keystroke'

    const [taskArray] = useState(shuffleArray([dollTask, freedomTask, runawayTask, stayTask]));
    const [freehandArray] = useState(shuffleArray([true, true, false, false]));
    const [diasbleButton, setDisableButton] = useState(true);
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        age: null,
        gender: 'male',
        dateOfEntry: new Date().getTime(),
        tasks: []
    });

    function handleSubmit(e){
        e.preventDefault();
        console.log(userData);
        if (step === 5){
            (async () => {
                const rawResponse = await fetch(apiUrl, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(userData)
                });
                const content = await rawResponse.json();
              
                console.log(content);
              })();
        }

        setStep(step + 1);
        setDisableButton(true);
    }

    function changeDisableButton(disabled){
        setDisableButton(disabled);
    }

    let currentStep;
    let currentTaskDisplay = null;
    switch(step){
        case 1:
            if (mobileAndTabletCheck()){
                currentStep = <p>You are using a mobile device or a tablet. In order to participate in this study you need to use a laptop or desktop computer with a keyboard. 
                    Please return to this website from a desktop or laptop computer
                </p>
            }
            else{
                currentStep = <div style={{width: '600px', fontSize: '18px', margin: 'auto'}}>
                    <p>Thank you for participating in this study. 
                        The aim of this study is to analyze the differences between a persons typing patterns when they are free hand typing text, 
                        and when they are copying down text that they are reading. In this study you will be presented with 4 small typing tasks.
                        In 2 tasks you will be shown an image and your task is to type out a description of the image. In the other 2 tasks you will be 
                        presented with the textual description of an image, and your task is to copy the description. This should take approximately 10 
                        minutes</p>
                        <Consent changeDisableButton={changeDisableButton} setUserData={setUserData} userData={userData}/>
                </div>
            }
            currentTaskDisplay = null;
            break;
        case 2:
            currentStep = <Task task={taskArray[0]} freehand={freehandArray[0]} userData={userData} setUserData={setUserData} changeDisableButton={changeDisableButton} key={step}/>
            currentTaskDisplay = <p>Task 1 of 4</p>
            break;
        case 3:
            currentStep = <Task task={taskArray[1]} freehand={freehandArray[1]} userData={userData} setUserData={setUserData} changeDisableButton={changeDisableButton} key={step}/>
            currentTaskDisplay = <p>Task 2 of 4</p>
            break;
        case 4:
            currentStep = <Task task={taskArray[2]} freehand={freehandArray[2]} userData={userData} setUserData={setUserData} changeDisableButton={changeDisableButton} key={step}/>
            currentTaskDisplay = <p>Task 3 of 4</p>
            break;
        case 5:
            currentStep = <Task task={taskArray[3]} freehand={freehandArray[3]} userData={userData} setUserData={setUserData} changeDisableButton={changeDisableButton} key={step}/>
            currentTaskDisplay = <p>Task 4 of 4</p>
            break;
        case 6:
            currentStep = <p>This is the end of the study. Thank you for participating</p>
            currentTaskDisplay = null
            break;
        default:
            currentStep = <p>Error</p>

    }
    return (
        <div>
            {currentTaskDisplay}
            <form onSubmit={handleSubmit}>
            {currentStep}
            {step < 6 && <Button variant="contained" type='submit' value="Submit" disabled={diasbleButton}>Next</Button>}
            </form>
        </div>
    )
}