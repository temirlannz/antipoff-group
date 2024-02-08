interface formDataI {
    name: "first_name" | "last_name" | "email" | "password"
    label: string
}

export const formData: formDataI[] = [
    {
        name: 'first_name',
        label: 'First name'
    },
    {
        name: 'last_name',
        label: 'Last name'
    },
    {
        name: 'email',
        label: 'Email'
    },
    {
        name: 'password',
        label: 'Password',
    },
];