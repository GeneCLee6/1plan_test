import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  Input,
  IconButton,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { AiOutlineCamera } from 'react-icons/ai';
import { ChakraImage } from 'utils/images';
import { DEFAULT_BORDER_RADIUS } from '../config';
import { Formik, Form, Field } from 'formik';
import {
  updateData,
  addData,
  createDocReference,
  updateArrayData,
  getUser,
} from 'services/firestore';
import { uploadFile } from 'services/storage';
import { SnackbarContext } from 'contexts/SnackbarProvider';
import { UserContext } from 'contexts/UserProvider';
import { INDUSTRY_OPTIONS } from '../config';
import { useNavigate } from 'react-router-dom';

export default function CompanyInfo({ isCreate }) {
  const {
    contextValue: { styles },
    updateSnackbarStates,
  } = useContext(SnackbarContext);
  const {
    contextValue: { user },
    setUser,
  } = useContext(UserContext);
  const defaultLogo = require('assets/images/image-placeholder.jpg');
  const [logoUrl, setLogoUrl] = useState(defaultLogo);
  const [logoFile, setLogoFile] = useState();
  const [isChangedLogo, setIsChangedLogo] = useState(false);

  const emptyValues = {
    businessName: '',
    industryCode: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
  };
  const [initialValues, setInitialValues] = useState(emptyValues);
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      const theUser = await getUser(user._id);
      setUser(theUser);
    };
    if (user) {
      init();
    }
  }, []);
  useEffect(() => {
    if (isCreate) {
      setInitialValues(emptyValues);
      setLogoUrl(defaultLogo);
    } else {
      if (Object.keys(user).length) {
        const company = user.company;
        const { _id, ...rest } = company;
        setInitialValues({ ...initialValues, ...rest });

        const logoImage = company.logoUrl ?? defaultLogo;
        setLogoUrl(logoImage);
      }
    }
  }, [user.company, isCreate]);
  const handleUploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg, image/jpg, image/webp';
    input.onchange = (_this) => {
      const files = Array.from(input.files);
      const url = URL.createObjectURL(files[0]);
      setLogoUrl(url);
      setLogoFile(files[0]);
      setIsChangedLogo(true);
    };
    input.click();
  };
  return (
    <>
      <Box
        bg="white"
        borderRadius={DEFAULT_BORDER_RADIUS}
        px="40px"
        pt="30px"
        h="100vh"
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            const company = { ...values };
            let newLogoUrl = null;
            let actionStatus = null;

            if (isCreate) {
              const { docId } = await addData('companies', company);
              const newCompanyRef = createDocReference(`/companies/${docId}`);
              await updateArrayData(
                'users',
                user._id,
                'companyRefs',
                newCompanyRef
              );
              if (isChangedLogo) {
                newLogoUrl = await uploadFile(
                  logoFile,
                  `companies/logos/${docId}.jpg`
                );
              }
              if (newLogoUrl != null) company['logoUrl'] = newLogoUrl;
              const { status } = await updateData('companies', docId, company);
              setUser({
                ...user,
                companies: [...user.companies, { ...company, _id: docId }],
                companyRefs: [...user.companyRefs, newCompanyRef],
              });
              actionStatus = status;
            } else {
              const docId = user.company._id;
              if (isChangedLogo) {
                newLogoUrl = await uploadFile(
                  logoFile,
                  `companies/logos/${docId}.jpg`
                );
              }
              if (newLogoUrl != null) company['logoUrl'] = newLogoUrl;

              const { status } = await updateData('companies', docId, company);
              actionStatus = status;
              setUser({ ...user, company: { ...company, _id: docId } });
            }
            navigate('/home/dashboard');
            if (actionStatus) {
              updateSnackbarStates({
                show: true,
                message: isCreate ? 'Created' : 'Saved',
                styles: {
                  ...styles,
                  bgColor: '#60fb7a',
                },
              });
            } else {
              updateSnackbarStates({
                show: true,
                message: 'Something went wrong.',
                styles: {
                  ...styles,
                  bgColor: 'red',
                },
              });
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Grid
                h="200px"
                templateColumns="repeat(2, 1fr)"
                gap={8}
                px="50px"
              >
                <GridItem colSpan={2} display="flex" justifyContent={'center'}>
                  <Box position="relative" h="150px">
                    <ChakraImage
                      src={logoUrl}
                      alt="logo.png"
                      height="150px"
                      width="150px"
                      objectFit="contain"
                      shape-margin="100px"
                    />
                    <IconButton
                      position="absolute"
                      bottom="0"
                      right="-2"
                      borderRadius={'50%'}
                      color="#0273C2"
                      fontSize={'25px'}
                      size="sm"
                      icon={<AiOutlineCamera />}
                      onClick={handleUploadImage}
                    />
                  </Box>
                </GridItem>

                <GridItem colSpan={1}>
                  <Field name="businessName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.businessName && form.touched.businessName
                        }
                      >
                        <FormLabel
                          htmlFor="businessName"
                          color="gray"
                          fontSize={'14px'}
                        >
                          Business Name
                        </FormLabel>
                        <Input {...field} id="businessName" variant="filled" />
                        <FormErrorMessage>
                          {form.errors.businessName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>
                <GridItem colSpan={1}>
                  <Field name="industryCode">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.industryCode && form.touched.industryCode
                        }
                      >
                        <FormLabel
                          htmlFor="industryCode"
                          color="gray"
                          fontSize={'14px'}
                        >
                          Select Industry
                        </FormLabel>
                        <Select
                          {...field}
                          id="industryCode"
                          variant="filled"
                          placeholder="Select Industry"
                        >
                          {INDUSTRY_OPTIONS.map((o, i) => (
                            <option value={o} key={i}>
                              {o}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.industryCode}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>
                <GridItem colSpan={2}>
                  <Field name="address">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.address && form.touched.address}
                      >
                        <FormLabel
                          htmlFor="address"
                          color="gray"
                          fontSize={'14px'}
                        >
                          Address
                        </FormLabel>
                        <Input {...field} id="address" variant="filled" />
                        <FormErrorMessage>
                          {form.errors.address}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>
                <GridItem colSpan={1}>
                  <Field name="country">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.country && form.touched.country}
                      >
                        <FormLabel
                          htmlFor="country"
                          color="gray"
                          fontSize={'14px'}
                        >
                          Country
                        </FormLabel>
                        <Input {...field} id="country" variant="filled" />
                        <FormErrorMessage>
                          {form.errors.country}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>
                <GridItem colSpan={1}>
                  <Field name="state">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.state && form.touched.state}
                      >
                        <FormLabel
                          htmlFor="state"
                          color="gray"
                          fontSize={'14px'}
                        >
                          State
                        </FormLabel>
                        <Input {...field} id="state" variant="filled" />
                        <FormErrorMessage>{form.errors.state}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>
                <GridItem colSpan={1}>
                  <Field name="city">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.city && form.touched.city}
                      >
                        <FormLabel
                          htmlFor="city"
                          color="gray"
                          fontSize={'14px'}
                        >
                          City
                        </FormLabel>
                        <Input {...field} id="coty" variant="filled" />
                        <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>
                <GridItem colSpan={1}>
                  <Field name="zipCode">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.zipCode && form.touched.zipCode}
                      >
                        <FormLabel
                          htmlFor="zipCode"
                          color="gray"
                          fontSize={'14px'}
                        >
                          Post/Zip Code
                        </FormLabel>
                        <Input {...field} id="zipCode" variant="filled" />
                        <FormErrorMessage>
                          {form.errors.zipCode}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </GridItem>
                <GridItem colSpan={2} display="flex" justifyContent={'center'}>
                  <Button
                    borderRadius="15px"
                    w="60%"
                    h="57px"
                    bgColor={'#0273C2'}
                    color="white"
                    fontSize={'1.6rem'}
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    {isCreate ? 'Create' : 'Save'}
                  </Button>
                </GridItem>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
