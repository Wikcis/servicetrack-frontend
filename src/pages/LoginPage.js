import {CustomButton, CustomTextField, EmptyFieldsPopup, Sidebar, WrongValuePopup} from "../components";
import React from "react";
import "../styles";
import {Titles} from "../utils";
import "../components";
import {loginUser} from "../api/auth";
import {useNavigate} from "react-router-dom";
import {REST_API_URLS} from "../api/apiConstants";

export const LoginPage = () => {

    const navigate = useNavigate();

    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);
    const [wrongValuesTrigger, setWrongValuesTrigger] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = async () => {

        if (email === "" || password === "") {
            setEmptyWarningTrigger(true);
            return null;
        }

        const res = await loginUser(email, password);

        if (res) {
            alert("Successful log in !");

            navigate(REST_API_URLS.ONLY_TECHNICIANS_URL);
        } else {
            setWrongValuesTrigger(true);
            return null;
        }
    };

    return (
        <div className="app">
            <Sidebar withoutData={true}/>
            <div className="mainContainer">

                <div className="logInCredentialsContainer">

                    <div className="credentialsHeader">
                        <h3 className="credentialsText">Welcome back to Service Track</h3>
                        <h3 className="credentialsTitle">Sign in</h3>
                        <h3 className="credentialsDescription">
                            Don't have account?
                            <a className="link"
                               href={true}
                               onClick={() => navigate(REST_API_URLS.ONLY_REGISTRATION_URL)}
                            >
                                Sign up
                            </a>
                        </h3>
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
                        <span className="labelField">Enter your password</span>
                        <span className="textField">
                            <CustomTextField
                                label={"Password"}
                                setText={setPassword}
                                maxLength={64}
                            />
                        </span>
                    </div>

                    <div className="but">
                        <CustomButton
                            className="logInButton"
                            type={Titles.loginTitle}
                            credentials={handleLogin}
                        >
                            Log in
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

