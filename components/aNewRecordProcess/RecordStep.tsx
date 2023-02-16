/* eslint-disable no-shadow */
import { styled, Typography, Box, CircularProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ErrorStatusIcon from './ErrorStatusIcon';
import SuccessStatusIcon from './SuccessStatusIcon';

enum StepNames {
  UPLOAD = 'UPLOAD',
  TRANSCODING = 'TRANSCODING',
  TRANSCRIPT = 'TRANSCRIPT',
  PDF = 'PDF'
}

interface IRecordStep {
  stepTitle: string
  errorText?: string
  stepName: StepNames
  recordProcessStatus: string
  setProgress: Function
  setShowProcessFailedIllustration: Function
}

const RecordStep: FC<IRecordStep> = (props) => {
  const { stepTitle, errorText = 'Something went wrong.', recordProcessStatus, stepName, setProgress, setShowProcessFailedIllustration } = props;

  const [iconName, setIconName] = useState<'success' | 'error' | 'processing' | null>(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [fontColor, setFontColor] = useState('#D8D8D8');

  const [completedStepName, setCompletedStepName] = useState<StepNames | null>(null);
  const [inprogressStepName, setInprogressStepName] = useState<StepNames | null>(null);
  const [blockedProcessStepName, setBlockedProcessStepName] = useState<StepNames | null>(null);

  useEffect(() => {
    switch (recordProcessStatus) {
      case 'UPLOAD_ERROR':
        setProgress(0);
        setBlockedProcessStepName(StepNames.UPLOAD);
        break;
      case 'UPLOAD_COMPLETE':
      case 'VIDEO_TRANSCODING_IN_PROGRESS':
      case 'VIDEO_2_AUDIO_TRANSCODING_IN_PROGRESS':
        setCompletedStepName(StepNames.UPLOAD);
        setInprogressStepName(StepNames.TRANSCODING);
        setProgress(25);
        break;
      case 'TRANSCODING_ERROR':
        setProgress(25);
        setCompletedStepName(StepNames.UPLOAD);
        setBlockedProcessStepName(StepNames.TRANSCODING);
        break;
      case 'TRANSCODING_COMPLETE':
      case 'TRANSCRIPT_IN_PROGRESS':
      case 'TRANSCRIPT_OPTIMIZATION_IN_PROGRESS':
        setCompletedStepName(StepNames.TRANSCODING);
        setInprogressStepName(StepNames.TRANSCRIPT);
        setProgress(50);
        break;
      case 'TRANSCRIPT_ERROR':
        setProgress(50);
        setCompletedStepName(StepNames.TRANSCODING);
        setBlockedProcessStepName(StepNames.TRANSCRIPT);
        break;
      case 'TRANSCRIPT_ASR_COMPLETE':
      case 'PDF_IN_PROGRESS':
        setCompletedStepName(StepNames.TRANSCRIPT);
        setInprogressStepName(StepNames.PDF);
        setProgress(75);
        break;
      case 'PDF_ERROR':
        setProgress(75);
        setCompletedStepName(StepNames.TRANSCRIPT);
        setBlockedProcessStepName(StepNames.PDF);
        break;
      case 'PDF_COMPLETE':
        setCompletedStepName(StepNames.PDF);
        setInprogressStepName(null);
        setBlockedProcessStepName(null);
        setProgress(100);
        break;
      default:
        setFontColor('#D8D8D8');
    }
  }, []);

  useEffect(() => {
    if (stepName === StepNames.UPLOAD) {
      if (completedStepName) {
        applyStyleForCompletedSteps();
      } else {
        applyStyleForBlockAndInProgressSteps(stepName);
      }
    }
    if (stepName === StepNames.TRANSCODING) {
      if (completedStepName && (completedStepName === StepNames.TRANSCODING || completedStepName === StepNames.TRANSCRIPT || completedStepName === StepNames.PDF)) {
        applyStyleForCompletedSteps();
      } else {
        applyStyleForBlockAndInProgressSteps(stepName);
      }
    }
    if (stepName === StepNames.TRANSCRIPT) {
      if (completedStepName && (completedStepName === StepNames.TRANSCRIPT || completedStepName === StepNames.PDF)) {
        applyStyleForCompletedSteps();
      } else {
        applyStyleForBlockAndInProgressSteps(stepName);
      }
    }
    if (stepName === StepNames.PDF) {
      if (completedStepName && completedStepName === StepNames.PDF) {
        applyStyleForCompletedSteps();
      } else {
        applyStyleForBlockAndInProgressSteps(stepName);
      }
    }
  }, [completedStepName, inprogressStepName, blockedProcessStepName]);

  const applyStyleForCompletedSteps = () => {
    setFontColor('#3F434A');
    setIconName('success');
  };

  const applyStyleForBlockAndInProgressSteps = (stepName: StepNames) => {
    switch (stepName) {
      case blockedProcessStepName: {
        setShowErrorMessage(true);
        setIconName('error');
        break;
      }
      case inprogressStepName: {
        setFontColor('#D8D8D8');
        setIconName('processing');
        break;
      }
      default: {
        // nothing
      }
    }
  };

  useEffect(() => {
    switch (iconName) {
      case 'error': {
        setShowProcessFailedIllustration(true);
        break;
      }
      case 'success':
      case 'processing': {
        setShowProcessFailedIllustration(false);
        break;
      } default: {
        // nothing
      }
    // No default
    }
  }, [iconName]);

  const IconWrapper = styled(Box)(() => ({
    'marginTop': '5px'
  }));

  const StepWrapper = styled(Box)(() => ({
    'display': 'flex',
    'flexDirection': 'row',
    'marginBottom': '22px'
  }));

  const StepText = styled(Typography)(() => ({
    'fontWeight': 400,
    'fontSize': '18px',
    'lineHeight': '27px',
    'color': fontColor
  }));

  const TextWrapper = styled(Box)(() => ({
    'display': 'flex',
    'flexDirection': 'column'
  }));

  const StepErrorText = styled(Typography)(() => ({
    'fontWeight': 400,
    'fontSize': '14px',
    'lineHeight': '21px',
    'color': '#EF4444'
  }));

  const TryAgainText = styled(Typography)(() => ({
    'fontWeight': 500,
    'fontSize': '14px',
    'lineHeight': '21px',
    'color': '#01090F',
    'textDecoration': 'underline',
    'cursor': 'pointer'
  }));

  return (
    <StepWrapper>
      <IconWrapper>
        {iconName === 'success' && <SuccessStatusIcon />}
        {iconName === 'error' && <ErrorStatusIcon />}
        {iconName === 'processing' && <CircularProgress size="19px"/>}
      </IconWrapper>
      <TextWrapper ml={!iconName ? '41px' : '22px'}>
        <StepText>{stepTitle}</StepText>
        {showErrorMessage && (
          <Box display="flex">
            <StepErrorText>{errorText}</StepErrorText>
            {/* <TryAgainText>Try again</TryAgainText> */}
          </Box>
        )}
      </TextWrapper>
    </StepWrapper>
  );
};

export default RecordStep;
