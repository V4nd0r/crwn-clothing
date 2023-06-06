import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import {SignInContainer, 
        ButtonsContainer, 
        Question} 
        from './sign-in-form.styles.jsx';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
      dispatch(googleSignInStart());  
    }

    const handleSubmit = async (event) => {
        event.preventDeafult();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        }catch(error) {
            switch(error.code) {
                case "auth/wrong-password" :
                    alert("The e-mail and password does not match");
                    break;
                case "auth/user-not-found" :
                    alert("No existing user with the e-mail provided");
                    break;   
                default: 
                    console.log(error); 
            };
        }
    }


    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value });
    };

    return (
        <SignInContainer>
            <Question>Already have an account?</Question>
            <span>Sign in using your e-mail and password</span>
            <form onSubmit={handleSubmit}> 
                <FormInput label= "Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label= "Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <ButtonsContainer>
                    <Button buttonType={BUTTON_TYPE_CLASSES.base}>Log in</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick = {signInWithGoogle}>Log in with Google</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;