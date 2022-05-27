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
  Tooltip,
  Link as UILink,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill, BsInfoCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../config/api";
import user_types from "../redux/type/user";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authSelector = useSelector((state) => state.user);

  useEffect(() => {
    if (authSelector.id) {
      navigate("/");
    }
  }, [authSelector.id]);

  const formik = useFormik({
    initialValues: {
      credential: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      credential: Yup.string()
        .required()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters"),
      password: Yup.string()
        .required("Password is required")
        // the matches is user to ensure the password is strong
        .matches(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const loginData = {
          credential: values.credential,
          password: values.password,
        };

        const loginRequest = await axiosInstance.post("/auth/login", loginData);

        dispatch({
          type: user_types.LOGIN_USER,
          payload: loginRequest?.data?.result?.checkCredential,
        });

        Cookies.set("auth_token", loginRequest?.data?.result?.cookie);

        toast({
          title: "Login Successful!",
          description: loginRequest?.data?.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } catch (err) {
        console.log(err);
        toast({
          title: "Login Failed!",
          description: err?.response?.data?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  return (
    <Flex justify={"center"} align={"center"} height={"calc(100vh - 65px)"}>
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
          Login
        </Text>
        <Box width={"350px"}>
          <form>
            <FormControl isRequired pt={2} isInvalid={formik.errors.credential}>
              <FormLabel htmlFor="credential">Username or Email</FormLabel>
              <InputGroup>
                <Input
                  id="credential"
                  placeholder="Mike"
                  onChange={(e) =>
                    formik.setFieldValue("credential", e.target.value)
                  }
                />
              </InputGroup>
              {formik.errors.credential && formik.touched.credential && (
                <FormErrorMessage>{formik.errors.credential}</FormErrorMessage>
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
            <Box mt={"10px"}>
              <Link to={"/register"}>
                <Text mt={1} color="#3b5cd4" fontSize="smaller">
                  <UILink>Have not register?</UILink>
                </Text>
              </Link>
              <Link to={"#"}>
                <Text mt={1} color="#3b5cd4" fontSize="smaller">
                  <UILink>Forgot password</UILink>
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
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
