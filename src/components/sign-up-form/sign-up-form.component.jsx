import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import { SignUpContainer, Question } from './sign-up-form.styles.jsx';
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDeafult();

        if (password !== confirmPassword) {
            alert ("passwords do not match");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        }catch(error) {
            if(error.code === "auth/email-already-in use") {
                alert("There is a user already registered with this e-mail");
            } else {
            console.log('error while creating new user', error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value });
    };

    return (
        <SignUpContainer>
            <Question>Don't have an account?</Question>
            <span>Sign up using your e-mail and password</span>
            <form onSubmit={handleSubmit}> 
                <FormInput label= "Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label= "Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label= "Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <FormInput label= "Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Register</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;