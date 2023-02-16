/* eslint-disable max-len */
/* eslint-disable no-shadow */
import { styled, Box } from '@mui/material';
import { FC, useState } from 'react';
import LinearProgressbarWithLabel from './LinearProgressbarWithLabel';
import ProcessFailedIllustration from './ProcessFailedIllustration';
import ProcessInProgressIllustration from './ProcessInProgressIllustration';
import RecordStep from './RecordStep';

enum StepNames {
  UPLOAD = 'UPLOAD',
  TRANSCODING = 'TRANSCODING',
  TRANSCRIPT = 'TRANSCRIPT',
  PDF = 'PDF'
}

interface IRecordProcessSteps {
  recordProcessStatus?: any
}

const RecordProcessSteps: FC<IRecordProcessSteps> = ({ recordProcessStatus = 'UPLOAD_COMPLETE' }) => {
  const [progress, setProgress] = useState(0);
  const [showProcessFailedIllustration, setShowProcessFailedIllustration] = useState(false);

  const Wrapper = styled(Box)(({ theme }) => ({
    'border': '1px solid #D8D8D8',
    'background': '#fff',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'borderRadius': '5px',
    'padding': '80px 50px',
    'marginBottom': '20px',
    [theme.breakpoints.down('lg')]: {
      'flexDirection': 'column'
    }
  }));

  const ImageWrapper = styled(Box)(({ theme }) => ({
    'flex': 0.5,
    'display': 'flex',
    'justifyContent': 'flex-end',
    'alignItems': 'center',
    'margin': '50px',
    'boxSizing': 'border-box',
    [theme.breakpoints.down('md')]: {
      'display': 'none'
    }
  }));

  // UPLOAD_COMPLETE, UPLOAD_ERROR
  // TRANSCODING_COMPLETE, TRANSCODING_ERROR
  // TRANSCRIPT_ASR_COMPLETE, TRANSCRIPT_ERROR
  // PDF_COMPLETE, PDF_ERROR

  // VIDEO_TRANSCODING_IN_PROGRESS, VIDEO_2_AUDIO_TRANSCODING_IN_PROGRESS
  // TRANSCRIPT_IN_PROGRESS, TRANSCRIPT_OPTIMIZATION_IN_PROGRESS
  // PDF_IN_PROGRESS

  return (
    <Wrapper>
      <ImageWrapper>
        {showProcessFailedIllustration ? <ProcessFailedIllustration /> : <ProcessInProgressIllustration />}
      </ImageWrapper>
      <Box flex={1} display="flex" flexDirection="column">
        <RecordStep stepTitle='Uploading Video & Audio to AI Engine' recordProcessStatus={recordProcessStatus} stepName={StepNames.UPLOAD} setProgress={setProgress} setShowProcessFailedIllustration={setShowProcessFailedIllustration}/>
        <RecordStep stepTitle='AI Processing (while pondering world domination)' recordProcessStatus={recordProcessStatus} stepName={StepNames.TRANSCODING} setProgress={setProgress} setShowProcessFailedIllustration={setShowProcessFailedIllustration}/>
        <RecordStep stepTitle='Skribe is Producing Rough AI transcript files Assembling Exhibits' recordProcessStatus={recordProcessStatus} stepName={StepNames.TRANSCRIPT} setProgress={setProgress} setShowProcessFailedIllustration={setShowProcessFailedIllustration}/>
        <RecordStep stepTitle='Producing Synced Video + Audio clipping tool' recordProcessStatus={recordProcessStatus} stepName={StepNames.PDF} setProgress={setProgress} setShowProcessFailedIllustration={setShowProcessFailedIllustration}/>
        <LinearProgressbarWithLabel progress={progress}/>
      </Box>
    </Wrapper>
  );
};
export default RecordProcessSteps;
