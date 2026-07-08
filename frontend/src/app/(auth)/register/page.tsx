'use client';

import "../../globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';
import { Spinner } from "@/components/ui/spinner";
import {PageWrapper} from "../../../components/page-wrapper";

const API_URL = "http://127.0.0.1:5000/auth/";

export default function SignUpPage() {
  const [formData, setFormData] = useState({ username: "username is too short", email: undefined, password: undefined, confirm: "" });
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //handling input change
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newForm = {
      ...formData,
      [name]: value
    }
    setFormData(newForm);
  }

  const validateFields = (username: string, email: string, password: string, confirm: string) => {
    let isValid = true;

    if (!username || !email || !password || !confirm) {
      isValid = false;
      throw new Error("All fields are required")
    }
    //password must match
    if (password !== confirm) {
      isValid = false;
      setErrors({ ...errors, password: "password does not match" })
    }
    return isValid;
  }

  //calling api
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    console.log(formData);
    const { username, email, password, confirm } = formData;

    try {
      const isValid = validateFields(username, email, password, confirm);
      if (!isValid) {
        throw new Error("Validation failed");
      }
      const response = await fetch(`${API_URL}register/`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const { message, error } = await response.json();

        console.log(error)

        //handling 400
        if (response.status === 400) {
          console.log(`400: ${message}`)
        }
        throw new Error("Server did not return success");
      }

      //redirecting user
      setTimeout(() => {
        router.push("/dashboard");
      }, 5000);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PageWrapper>
    <div className="flex flex-col">
      <p className="text-2xl mx-auto my-4 font-bold text-black">KAMESA UM</p>
      <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Fill in your details below to create your account
          </CardDescription>
          <CardAction>
            <Button variant="link"><Link href="/login">Sign In</Link></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
 
            <FieldGroup className="p-3">
              {/* Username */}
              <Field data-invalid={errors.email && true} >
                <FieldLabel htmlFor="fieldgroup-name">Username</FieldLabel>
                <Input onChange={onChange} id="fieldgroup-name" name="username" placeholder="Jordan Lee" required aria-invalid={errors.username && true} />
                {errors.username && <FieldDescription>{errors.username}</FieldDescription>}
              </Field>

              {/* email */}
              <Field data-invalid={errors.email && true}>
                <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                <Input
                  onChange={onChange}
                  id="fieldgroup-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  aria-invalid={errors.email && true}
                />
                <FieldDescription>
                  {errors.email ? errors.email : 'We will verify, send updates to this address.'}
                </FieldDescription>
              </Field>

              {/*password*/}
              <Field data-invalid={errors.password && true}>
                <FieldLabel htmlFor="input-group-url">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput name="password" type="password" onChange={onChange} id="input-group-url" placeholder="Enter password" required aria-invalid={errors.password && true} />
                  <InputGroupAddon align="inline-end">
                    <p>i</p>
                  </InputGroupAddon>
                </InputGroup>
                {errors.password && <FieldDescription>{errors.password}</FieldDescription>}
              </Field>

              {/*confirm password*/}
              <Field>

                <FieldLabel htmlFor="input-group-url">Confirm</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    onChange={onChange}
                    name="confirm"
                    type="password"
                    id="input-group-url" placeholder="Re-enter password" required />
                  <InputGroupAddon align="inline-end">
                    <p>i</p>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <div className="flex gap-2">
                <input type="radio" className="p-1 rounded-md" />
                <p>I have read all terms and conditions</p>
              </div>
            </FieldGroup>
    
        </CardContent>
        {/* submit button */}
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
                  {loading ? <Spinner className="w-4 h-4 text-white" /> :
             'Sign In'}
          </Button>
          <Button variant="outline" className="w-full">
            Sign Up with Google
          </Button>
        </CardFooter>
      </Card>
      </form>
    </div>
    </PageWrapper>
  )
}
