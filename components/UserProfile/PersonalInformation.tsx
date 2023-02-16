import React, { useState } from 'react';
import { Avatar, Box, Button, Typography, Grid } from '@mui/material';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputBox from '../InputBox/InputBox';
import InputWithDropdown from '../InputWithDropdown/InputWithDropdown';
import SettingsNavBar from '../SettingsNavBar';

const BackGroundBox = styled(Box)`
  background-color: #fff;
  margin-bottom: 1rem;
  .MuiTextField-root {
    margin-bottom: 0.7rem;
  }
`;

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const validationSchema = yup.object({
  'fullName': yup.string().required('Full Name is required'),
  'userName': yup.string().required('User Name is required'),
  'email': yup.string().email('Invalid email').required('Email is required'),
  'dialCode': yup.string().required('Dial Code is required'),
  'phoneNumber': yup.string().matches(phoneRegex, 'Invalid phone').required('Phone Number is required')
});
const PersonalInformation = ({ setCurrentStepper }: { setCurrentStepper: (step: string) => void }) => {
  const formik = useFormik({
    'initialValues': {
      'thumbnail': null,
      'fullName': 'Michael Crane',
      'userName': 'mc_user',
      'email': 'mc_hhpllc@hhpllc.org',
      'dialCode': '+1',
      'phoneNumber': '1231231234',
      'country': 'America',
      'state': 'Michigan',
      'addressLine': ''
    },
    validationSchema,
    'onSubmit': (values) => {
      if (values.fullName && values.userName && values.email && values.dialCode && values.phoneNumber && values.phoneNumber.match(phoneRegex)) {
        // const savePersonalInformation = async () => {
        //   const service = await getUserService();
        //   const response = await service.savePersonalInformation(values);
        //   setToast({
        //     onOpen: true,
        //     type: "success",
        //     message: "Successfully updated",
        //   });
        //   console.log(response);
        // };
        // savePersonalInformation();
        // setTimeout(() => {
        //   setCurrentStepper("Organization");
        // }, 1000);
      }
    }
  });
  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const handelSelect = (name: string, value: string) => {
    formik.setFieldValue(name, value);
  };

  const handelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: FileList = event.target.files as FileList;
    if (file?.length !== 0) {
      formik.setFieldValue(event.target.name, URL.createObjectURL(file[0]));
    }
  };

  return (
    <Box>
      <Box py="2.5rem" px="24vw">
        <form onSubmit={formik.handleSubmit}>
          <Box mb="1rem" sx={{ 'display': 'flex', 'alignItems': 'center' }}>
            {formik.values.thumbnail ? (
              <Avatar alt="Remy Sharp" src={formik.values.thumbnail} variant="square" />
            ) : (
              <Avatar
                // children="M"
                variant="square"
                sx={{ 'color': '#7C8286', 'background': '#fff' }}
              />
            )}
            <Box>
              <label htmlFor="raised-button-file">
                <Typography ml="1rem" color="#3954E3">
                  Upload Thumbnail
                </Typography>
              </label>
              <input accept="image/*" style={{ 'display': 'none' }} id="raised-button-file" type="file" name="thumbnail" onChange={handelFileChange} />
            </Box>
          </Box>
          <BackGroundBox>
            <InputBox label="Full Name" type="text" name="fullName" onChange={handelInputChange} value={formik.values.fullName} error={formik.touched.fullName && Boolean(formik.errors.fullName)} helperText={formik.errors.fullName as string} />
          </BackGroundBox>
          <BackGroundBox>
            <InputBox label="User Name" type="text" name="userName" onChange={handelInputChange} value={formik.values.userName} error={formik.touched.userName && Boolean(formik.errors.userName)} helperText={formik.errors.userName as string} />
          </BackGroundBox>
          <BackGroundBox>
            <InputBox label="Email" type="email" name="email" onChange={handelInputChange} value={formik.values.email} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.errors.email as string} />
          </BackGroundBox>
          <Grid container spacing={2}>
            <Grid item xs={5} lg={4} xl={3}>
              <BackGroundBox>
                <InputWithDropdown
                  title="Dial Code"
                  name="dialCode"
                  onChange={(event: React.SyntheticEvent) => {
                    const input = event.target as HTMLElement;
                    handelSelect('dialCode', input.innerText);
                  }}
                  onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handelInputChange(event);
                  }}
                  value={formik.values.dialCode}
                  options={[{ 'label': '+1' }, { 'label': '+81' }, { 'label': '+776' }, { 'label': '+258' }, { 'label': '+274' }]}
                  error={formik.touched.dialCode && Boolean(formik.errors.dialCode)}
                  helperText={formik.errors.dialCode as string}
                />
              </BackGroundBox>
            </Grid>
            <Grid item xs={7} lg={8} xl={9}>
              <BackGroundBox>
                <InputBox label="Phone Number" type="number" name="phoneNumber" onChange={handelInputChange} value={formik.values.phoneNumber} error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)} helperText={formik.errors.phoneNumber as string} />
              </BackGroundBox>
            </Grid>
          </Grid>
          <BackGroundBox>
            <InputWithDropdown
              title="Country"
              name="country"
              onChange={(event: React.SyntheticEvent) => {
                const input = event.target as HTMLElement;
                handelSelect('country', input.innerText);
              }}
              onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handelInputChange(event);
              }}
              value={formik.values.country}
              options={[{ 'label': 'America' }, { 'label': 'Canada' }, { 'label': 'United Kingdom' }, { 'label': 'Germany' }, { 'label': 'Russia' }]}
            />
          </BackGroundBox>
          <BackGroundBox>
            <InputWithDropdown
              title="State"
              name="state"
              onChange={(event: React.SyntheticEvent) => {
                const input = event.target as HTMLElement;
                handelSelect('state', input.innerText);
              }}
              onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handelInputChange(event);
              }}
              value={formik.values.state}
              options={[{ 'label': 'Los' }, { 'label': 'Michigan' }, { 'label': 'Washington DC' }]}
            />
          </BackGroundBox>
          <BackGroundBox>
            <InputBox label="Address Line" type="text" name="addressLine" onChange={handelInputChange} value={formik.values.addressLine} />
          </BackGroundBox>
          <Box my="1rem">
            <Button
              // onClick={() => {
              //   setCurrentStepper("Organization");
              // }}
              variant="contained"
              color="success"
              style={{
                'backgroundColor': '#3954E3',
                'color': '#FFFFFF'
              }}
              type="submit"
            >
              Continue
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default PersonalInformation;
function setFieldValue (name: string, value: string) {
  throw new Error('Function not implemented.');
}
