import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link as UILink,
  Tooltip,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill, BsInfoCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../config/api";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string()
        .required("Fullname is required")
        .min(3, "Fullname must be at least 3 characters")
        .max(20, "Fullname must not exeed 20 characters"),
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .required("Password is required")
        // the matches is user to ensure the password is strong
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const newUser = {
          fullname: values.fullname,
          email: values.email,
          username: values.username,
          password: values.password,
        };

        const registerNewUser = await axiosInstance.post(
          "/auth/register",
          newUser
        );

        toast({
          title: "Register Successful!",
          description: registerNewUser.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        navigate("/login");
      } catch (err) {
        console.log(err);
        toast({
          title: "Register Failed!",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  return (
    <Flex height={"calc(100vh - 65px)"} align="center" justify="center">
      <Box
        rounded="xl"
        boxShadow="lg"
        width="500px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Text fontSize="2xl" fontWeight={"bold"}>
          Register Account
        </Text>

        <Box width={"350px"}>
          <form>
            <FormControl isRequired pt={2} isInvalid={formik.errors.fullname}>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <InputGroup>
                <Input
                  id="name"
                  placeholder="Mike Son"
                  onChange={(e) =>
                    formik.setFieldValue("fullname", e.target.value)
                  }
                />
              </InputGroup>
              {formik.errors.fullname && formik.touched.fullname && (
                <FormErrorMessage>{formik.errors.fullname}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired pt={2} isInvalid={formik.errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <InputGroup>
                <Input
                  id="username"
                  placeholder="Mike22"
                  onChange={(e) =>
                    formik.setFieldValue("username", e.target.value)
                  }
                />
              </InputGroup>
              {formik.errors.username && formik.touched.username && (
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired pt={2} isInvalid={formik.errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <Input
                  id="email"
                  placeholder="mike@mail.com"
                  onChange={(e) =>
                    formik.setFieldValue("email", e.target.value)
                  }
                />
              </InputGroup>
              {formik.errors.email && formik.touched.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired pt={2} isInvalid={formik.errors.password}>
              <FormLabel htmlFor="password">
                Password
                <Tooltip
                  label="Passwords should contain at least 8 characters including an uppercase letter, a symbol, and a number"
                  fontSize="sm"
                >
                  <span>
                    <Icon ms={2} as={BsInfoCircle} />
                  </span>
                </Tooltip>
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Mike@123"
                  onChange={(e) =>
                    formik.setFieldValue("password", e.target.value)
                  }
                />
                <InputRightElement>
                  <Icon
                    as={showPass ? BsEyeSlashFill : BsEyeFill}
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                  />
                </InputRightElement>
              </InputGroup>
              {formik.errors.password && formik.touched.password && (
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              pt={2}
              isInvalid={formik.errors.confirmPassword}
            >
              <FormLabel htmlFor="confirmPassword">
                Confirm Password
                <Tooltip
                  label="Passwords should contain at least 8 characters including an uppercase letter, a symbol, and a number"
                  fontSize="sm"
                >
                  <span>
                    <Icon ms={2} as={BsInfoCircle} />
                  </span>
                </Tooltip>
              </FormLabel>
              <InputGroup>
                <Input
                  id="confirmPassword"
                  type={showPassConfirm ? "text" : "password"}
                  placeholder="Mike@123"
                  onChange={(e) =>
                    formik.setFieldValue("confirmPassword", e.target.value)
                  }
                />
                <InputRightElement>
                  <Icon
                    as={showPassConfirm ? BsEyeSlashFill : BsEyeFill}
                    onClick={() => {
                      setShowPassConfirm(!showPassConfirm);
                    }}
                  />
                </InputRightElement>
              </InputGroup>
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <FormErrorMessage>
                    {formik.errors.confirmPassword}
                  </FormErrorMessage>
                )}
            </FormControl>
            <Box mt={"10px"}>
              <Link to={"/login"}>
                <Text mt={1} color="#3b5cd4" fontSize="smaller">
                  <UILink>Already have an account?</UILink>
                </Text>
              </Link>
            </Box>
            <Button
              type="submit"
              mt={2}
              width={"full"}
              colorScheme="teal"
              onClick={formik.handleSubmit}
            >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
