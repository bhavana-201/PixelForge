import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import StepConnector from '@mui/material/StepConnector';

function StepperStyle({ labels, qrCustom, setQrCustom}){

    //MUI's <Stepper> component expects a number
    //for its activeStep prop, not a string. 
    const activeStepIndex = labels.indexOf(qrCustom);
    return(
        <Box sx={{paddingTop:"2rem"}}>
            <Stepper activeStep={activeStepIndex} nonLinear alternativeLabel>
                {labels.map((label) => (
                    <Step key={label}>
                        <StepButton onClick={() =>  setQrCustom(label)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}

            </Stepper>
        </Box>
    );
}

export default StepperStyle;
