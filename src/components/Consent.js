import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {isNumeric} from '../utils';

export default function Consent(props){
    const [checked, setChecked] = useState(false);
    const [gender, setGender] = useState('male');

    function handleChange(e){
        setChecked(e.target.checked);
        if (props.userData.age !== null){
            props.changeDisableButton(!e.target.checked);
        }
        else {
            props.changeDisableButton(true);
        }
    }

    function handleAgeChange(e){
        const age = e.target.value
        if (isNumeric(age)){
            const userDataClone = JSON.parse(JSON.stringify(props.userData));
            userDataClone.age=parseInt(age);
            props.setUserData(userDataClone);
            props.changeDisableButton(!checked);
        }
    }

    function handleGenderChange(e){
        setGender(e.target.value);
        const userDataClone = JSON.parse(JSON.stringify(props.userData));
        userDataClone.gender=e.target.value;
        props.setUserData(userDataClone);
    }

    const ageError=props.userData.age === null;

    return (<div>
        <p>During your participation in this study we will be recording your biometric 
          keystroke data(which key was pressed or released, and a timestamp of when this happened), gender and age. 
          Your data will be stored in a secure fashion. Your data is collected in an anonymous fashion to prevent any connection between 
          your keystroke data and your identity. Your data will be used for research purposes only</p>
        <FormControl>
        <InputLabel>Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          onChange={handleGenderChange}
        >
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
        </Select>
        </FormControl>
        <br/>
        <br/>
        <TextField
          error={ageError}
          label="Age"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleAgeChange}
        />
        <br/>
        <br/>
        I consent to participate in this study and have the data mentioned earlier collected
        <Checkbox
            checked={checked}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
    </div>)
}