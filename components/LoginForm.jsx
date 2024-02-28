'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

import styled from "styled-components";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/members/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                const { accessToken, refreshToken } = data;
                // accessToken을 localStorage에 저장
                localStorage.setItem("accessToken", accessToken);
                // refreshToken을 cookie에 저장 HttpOnly와 Secure 사용하여 보안 강화
                document.cookie = `refreshToken=${refreshToken}; Secure; HttpOnly`;
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignup = () => {
        router.push("/signup"); // 회원가입 페이지로 이동
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Login</Title>
            <label htmlFor="email">
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                />
            </label>
            <label htmlFor="password">
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
            </label>
            <Button type="submit">Submit</Button>
            <SignupButton type="button" onClick={handleSignup}>
                회원가입
            </SignupButton>
        </FormContainer>
    );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  padding: 20px;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 50px;
  width: 95%;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h1`
text-align: center;
color: black;
`;

const Input = styled.input`
font: inherit;
background-color: #f1e1fc;
color: #38015c;
border-radius: 4px;
border: 1px solid white;
width: 100%;
text-align: left;
padding: 0.25rem;
margin-top: 15px;
&::placeholder {
    text-align: center;
  }
`;

const Button = styled.button`
cursor: pointer;
font: inherit;
color: white;
background-color: green;
border: 1px solid white;
border-radius: 4px;
padding: 0.5rem 2.5rem;
margin-top: 30px;
`;

const SignupButton = styled.button`
cursor: pointer;
font: inherit;
color: white;
background-color: green;
border: 1px solid white;
border-radius: 4px;
padding: 0.5rem 2.5rem;
`;