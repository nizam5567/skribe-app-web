import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import InputWithDropdown from '../InputWithDropdown/InputWithDropdown';
import InputBox from '../InputBox/InputBox';

const BackGroundBox = styled(Box)`
  background-color: #fff;
  margin-bottom: 1rem;
  .MuiTextField-root {
    margin-bottom: 0.7rem;
  }
`;

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const validationSchema = yup.object({
  'organizationName': yup.string().required('Organization Name is required'),
  'organizationSize': yup.string().required('Organization Size is required'),
  'organizationType': yup.string().required('Organization Type is required'),
  'dialCode': yup.string().required('Dial Code is required'),
  'phoneNumber': yup
    .string()
    .matches(phoneRegex, 'Invalid phone')
    .required('Phone Number is required')
});

const Organization = ({
  setCurrentStepper
}: {
  setCurrentStepper: (step: string) => void
}) => {
  const router = useRouter();
  const formik = useFormik({
    'initialValues': {
      'organizationName': 'Herrman & Herrman P.L.L.C',
      'organizationSize': '1-10',
      'organizationType': 'Privately Held',
      'dialCode': '+1',
      'phoneNumber': '1231231234',
      'country': 'America',
      'state': 'Michigan',
      'addressLine': ''
    },
    validationSchema,
    'onSubmit': (values) => {
      if (
        values.organizationName &&
        values.organizationSize &&
        values.organizationType &&
        values.dialCode &&
        values.phoneNumber &&
        values.phoneNumber.match(phoneRegex)
      ) {
        // const saveOrganizationInformation = async () => {
        //   const service = await getUserService();
        //   const response = await service.saveOrganizationInformation(values);
        //   setToast({
        //     onOpen: true,
        //     type: "success",
        //     message: "Successfully updated",
        //   });
        //   console.log(response);
        // };
        // saveOrganizationInformation();
        // setTimeout(() => {
        //   //setCurrentStepper("Packages");
        //   router.push('/events');
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

  return (
    <Box>
      <Box py="2.5rem" px="24vw">
        <form onSubmit={formik.handleSubmit}>
          <BackGroundBox>
            <InputBox
              label="Organization Name"
              type="text"
              name="organizationName"
              onChange={handelInputChange}
              value={formik.values.organizationName}
              error={
                formik.touched.organizationName &&
                Boolean(formik.errors.organizationName)
              }
              helperText={formik.errors.organizationName as string}
            />
          </BackGroundBox>
          <BackGroundBox>
            <InputWithDropdown
              title="Organization Size"
              name="organizationSize"
              onChange={(event: React.SyntheticEvent) => {
                const input = event.target as HTMLElement;
                handelSelect('organizationSize', input.innerText);
              }}
              onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handelInputChange(event);
              }}
              options={[
                { 'label': '1-10' },
                { 'label': '10-50' },
                { 'label': '50-500' }
              ]}
              value={formik.values.organizationSize}
              error={
                formik.touched.organizationSize &&
                Boolean(formik.errors.organizationSize)
              }
              helperText={formik.errors.organizationSize as string}
            />
          </BackGroundBox>
          <BackGroundBox>
            <InputWithDropdown
              title="Organization Type"
              name="organizationType"
              onChange={(event: React.SyntheticEvent) => {
                const input = event.target as HTMLElement;
                handelSelect('organizationType', input.innerText);
              }}
              options={[
                { 'label': 'Privately Held' },
                { 'label': 'Publicly Held' }
              ]}
              onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handelInputChange(event);
              }}
              value={formik.values.organizationType}
              error={
                formik.touched.organizationType &&
                Boolean(formik.errors.organizationType)
              }
              helperText={formik.errors.organizationType as string}
            />
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
                  options={[
                    { 'label': '+1' },
                    { 'label': '+81' },
                    { 'label': '+776' },
                    { 'label': '+258' },
                    { 'label': '+274' }
                  ]}
                  error={
                    formik.touched.dialCode && Boolean(formik.errors.dialCode)
                  }
                  helperText={formik.errors.dialCode as string}
                />
              </BackGroundBox>
            </Grid>
            <Grid item xs={7} lg={8} xl={9}>
              <BackGroundBox>
                <InputBox
                  label="Phone Number"
                  type="number"
                  name="phoneNumber"
                  onChange={handelInputChange}
                  value={formik.values.phoneNumber}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={formik.errors.phoneNumber as string}
                />
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
              options={[
                { 'label': 'America' },
                { 'label': 'Canada' },
                { 'label': 'United Kingdom' },
                { 'label': 'Germany' },
                { 'label': 'Russia' }
              ]}
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
              options={[
                { 'label': 'Los' },
                { 'label': 'Michigan' },
                { 'label': 'Washington DC' }
              ]}
            />
          </BackGroundBox>

          <BackGroundBox>
            <InputBox
              label="Address Line"
              type="text"
              name="addressLine"
              onChange={handelInputChange}
              value={formik.values.addressLine}
            />
          </BackGroundBox>
          <Box my="1rem">
            <Button
              variant="contained"
              color="success"
              style={{
                'backgroundColor': '#3954e3',
                'color': '#ffffff'
              }}
              type="submit"
            >
              Continue
            </Button>
            <Button
              onClick={() => {
                setCurrentStepper('Personal Information');
              }}
              variant="outlined"
              color="neutral"
              sx={{ 'ml': 1.5 }}
            >
              Back
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Organization;
