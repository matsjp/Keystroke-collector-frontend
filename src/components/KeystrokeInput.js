import React, { useState } from 'react';

export default function KeystrokeInput(props){

    const [textAreaValue, setTextAreaValue] = useState("");

    function handleChange(e) {
        setTextAreaValue(e.target.value);
        props.updateTextLen(e.target.value.length);
      }


    function handleKeyDown(e){
        const keyEvent = {};
        keyEvent.keyCode = e.keyCode;
        keyEvent.timestamp = Date.now();
        keyEvent.eventType = 'keyDown';
        addKeyEvent(keyEvent)
    }

    function handleKeyUp(e){
        const keyEvent = {};
        keyEvent.keyCode = e.keyCode;
        keyEvent.timestamp = Date.now();
        keyEvent.eventType = 'keyUp';
        addKeyEvent(keyEvent)
    }

    function addKeyEvent(keyEvent){
        const userDataClone = JSON.parse(JSON.stringify(props.userData));
        userDataClone.tasks[props.userData.tasks.length -1].keyEvents.push(keyEvent);
        props.setUserData(userDataClone);
    }

    return (
        <div>
          <textarea style={{height: '150px', width: '600px', fontSize: '18px'}} value={textAreaValue} onChange={handleChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
      </div>
    )
}