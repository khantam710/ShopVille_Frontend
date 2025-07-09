import React, { useState } from 'react';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { mobile, tablet } from '../responsive';

const Container = styled.div`
    height: fit-content;
    background-color: #ffe8e8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px 10px;
`;

const Title = styled.h1`
    font-size: 45px;
    margin-bottom: 10px;
    ${mobile({ fontSize: '30px' })}
    ${tablet({ fontSize: '35px' })}
`;

const Desc = styled.h5`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({ textAlign: 'center', fontSize: '20px' })}
`;

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    display: flex;
    justify-content: center;
    ${mobile({ width: '80%' })}
`;

const Form = styled.form`
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    width: 100%;
    ${mobile({ width: '100%' })}
`;

const Input = styled.input`
    border: none;
    flex: 8;
    padding: 8px 0 0 20px;
    font-size: 16px;
    &:focus {
        outline: none;
    }
`;

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: #4c0a42;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Newsletter = () => {
    const [email, setEmail] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!email) return;

    //     // Fire CleverTap event
    //     if (window.clevertap) {
    //         window.clevertap.event.push("Newsletter Signup", {
    //             Email: email
    //         });
    //     }

    //     alert('Thanks for subscribing!');
    //     setEmail('');
    // };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    if (window.clevertap) {
        // Update user profile and enable email messaging
        window.clevertap.profile.push({
            "Email": email,
            "MSG-email": true
        });

        // Optional: Track a separate event for signup
        window.clevertap.event.push("Newsletter Signup", {
            Email: email
        });
    }

    alert('Thanks for subscribing!');
    setEmail('');
};


    return (
        <Container>
            <Title>NewsLetter</Title>
            <Desc>Get timely update from your favourite products.</Desc>
            <InputContainer>
                <Form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Your Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit">
                        <SendIcon />
                    </Button>
                </Form>
            </InputContainer>
        </Container>
    );
};

export default Newsletter;
