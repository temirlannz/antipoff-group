interface formDataI {
    name: "email" | "password"
    label: string
}

export const formData: formDataI[] = [
    {
        name: 'email',
        label: 'Email'
    },
    {
        name: 'password',
        label: 'Password',
    },
];