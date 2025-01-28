import {CustomButton, CustomTextField, EmptyFieldsPopup, Sidebar, UserBar, WrongValuePopup} from "../components";
import React from "react";
import "../styles";
import {isAlpha, isNumeric, Titles} from "../utils";
import "../components";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../api/auth";
import {REST_API_URLS} from "../api/apiConstants";

export const RegistrationPage = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");

    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);
    const [wrongValuesTrigger, setWrongValuesTrigger] = React.useState(false);


    const handleRegister = async () => {
        if (!isAlpha(firstName) ||
            !isAlpha(lastName) ||
            !isNumeric(phoneNumber) ||
            password !== repeatPassword
        ) {
            setWrongValuesTrigger(true);
            return null;
        }

        if (firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === "" ||
            repeatPassword === "" ||
            phoneNumber === ""
        ) {
            setEmptyWarningTrigger(true);
            return null;
        }

        if (!firstName || firstName === "" ||
            !lastName || lastName === "" ||
            !email || email === "" ||
            !password || password === "" ||
            !repeatPassword || repeatPassword === "" ||
            !phoneNumber || phoneNumber === "" ||
            password !== repeatPassword
        ) {
            setEmptyWarningTrigger(true);
            return null;
        } else {
            const createdId = await registerUser(firstName, lastName, email, password, phoneNumber);
            console.log("Creaeted Id: ", createdId);
            if (createdId !== null && createdId !== undefined) {
                alert("Successfully registered!");

                navigate(REST_API_URLS.ONLY_LOGIN_URL);
            } else {
                setWrongValuesTrigger(true);
                return null;
            }
        }
    };

    return (
        <div className="app">
            <Sidebar withoutData={true}/>
            <div className="mainContainer">
                <div className="credentialsContainer">

                    <div className="credentialsHeader">
                        <h3 className="credentialsText">Welcome to Service Track</h3>
                        <h3 className="credentialsTitle">Sign up</h3>
                        <h3 className="credentialsDescription">
                            Already have account?
                            <a href={true}
                               className="link"
                               onClick={() => navigate(REST_API_URLS.ONLY_LOGIN_URL)}
                            >
                                Sign in
                            </a>
                        </h3>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Enter your first name</span>
                        <span className="textField">
                            <CustomTextField
                                label={"First name"}
                                setText={setFirstName}
                                maxLength={32}
                                alpha={true}
                            />
                        </span>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Enter your last name</span>
                        <span className="textField">
                            <CustomTextField
                                label={"Last name"}
                                setText={setLastName}
                                maxLength={32}
                                alpha={true}
                            />
                        </span>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Enter your email</span>
                        <span className="textField">
                            <CustomTextField
                                label={"Email"}
                                setText={setEmail}
                                maxLength={32}
                            />
                        </span>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Enter your phone number</span>
                        <span className="textField">
                            <CustomTextField
                                label={"Phone Number"}
                                setText={setPhoneNumber}
                                maxLength={10}
                                numeric={true}
                            />
                        </span>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Enter your password</span>
                        <span className="textField">
                            <CustomTextField
                                label={"Password"}
                                setText={setPassword}
                                maxLength={64}
                            />
                        </span>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Repeat your password</span>
                        <span className="textField">
                            <CustomTextField
                                label={"Repeat password"}
                                setText={setRepeatPassword}
                                maxLength={64}
                            />
                        </span>
                    </div>

                    <div className="but">
                        <CustomButton
                            className="logInButton"
                            credentials={handleRegister}
                            type={Titles.registerTitle}
                        >
                            Register
                        </CustomButton>
                    </div>
                </div>
            </div>
            <EmptyFieldsPopup
                triggerButton={emptyWarningTrigger}
                setTriggerButton={setEmptyWarningTrigger}
            />

            <WrongValuePopup
                triggerButton={wrongValuesTrigger}
                setTriggerButton={setWrongValuesTrigger}
            />
        </div>
    );
};

