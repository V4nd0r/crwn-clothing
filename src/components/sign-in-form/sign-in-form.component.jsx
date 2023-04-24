import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import { signInWithGooglePopup, 
        createUserDocumentFromAuth, 
        signInAuthUserWithEmailAndPassword } 
        from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';
import Button from '../button/button.component';
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    console.log(formFields);

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDeafult();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
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
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in using your e-mail and password</span>
            <form onSubmit={handleSubmit}> 
                <FormInput label= "Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label= "Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Log in</Button>
                    <Button type="button" buttonType="google" onClick = {signInWithGoogle}>Log in with Google</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;