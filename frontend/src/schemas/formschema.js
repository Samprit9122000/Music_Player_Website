import * as Yup from 'yup'

const signupschema=Yup.object({
    username:Yup.string().min(2).max(25).required("Please enter your name"),
    email:Yup.string().email().required("Enter your email"),
    password:Yup.string().min(6).max(10).required("Enter your password"),
    confirm_pass:Yup.string().required().oneOf([Yup.ref('password'),null],'password must match'),
})

export default signupschema;