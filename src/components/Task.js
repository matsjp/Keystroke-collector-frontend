import React, { useEffect, useState } from 'react';
import KeystrokeInput from './KeystrokeInput'

export default function Task(props){
    const [textLen, setTextLen] = useState(0);
    const minLen = 300;

    function updateTextLen(len){
        setTextLen(len);
        props.changeDisableButton(len <= minLen);
    }

    useEffect(() => {
        if (props.userData.tasks[props.userData.tasks.length - 1] === undefined ||
            props.userData.tasks[props.userData.tasks.length - 1].name !== props.task.name ||
            props.userData.tasks[props.userData.tasks.length - 1].freehand !== props.freehand){
                const userDataClone = JSON.parse(JSON.stringify(props.userData));
                userDataClone.tasks.push({
                    name: props.task.name,
                    freehand: props.freehand,
                    keyEvents: []
                });
                props.setUserData(userDataClone);
            
        }
    }, [props.name, props.freehand]);

    let instructions = null;
    if (props.freehand){
        instructions = <p>Yoir task is to type a description of the image using at least 300 characters</p>
    }
    else{
        instructions = <p>Your task is to copy the text shown above. Please type on your keyboard, do not use copy paste</p>
    }
    return (
        <div>
                {props.freehand && <img src={props.task.image} alt='Could not load' />}
                {props.task.description!=null && !props.freehand && <textarea disabled style={{height: '200px', width: '600px', fontSize: '18px'}} value={props.task.description} />}
                {instructions}
                <KeystrokeInput userData={props.userData} setUserData={props.setUserData} key={props.freehand && props.task.name} updateTextLen={updateTextLen}/>
                <p>{textLen}/{minLen} characters typed</p>
        </div>
    );
}