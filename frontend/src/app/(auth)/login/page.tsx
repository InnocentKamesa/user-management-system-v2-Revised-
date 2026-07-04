"use client";

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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

import { Input } from "@/components/ui/input";

import React, {useState, ChangeEvent} from "react";
import {useRouter} from 'next/navigation';


const API_URL = "http://127.0.0.1:5000/auth/";

export default function SignInPage(){
    const [formData, setFormData] = useState({email:undefined, password:undefined});
    const [errors, setErrors] = useState({email:"", password:""});
    const router = useRouter();

    //handling input change
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        const newForm = {
            ...formData,
            [name]:value
        }
        setFormData(newForm);
    }

    const validateFields = (email:string, password:string) => {
      let isValid = true;

      //All fields erquired
      if (!email || !password) {
        isValid = false;
        throw new Error("All fields are required")
      }
 
      return isValid;
    }


    //calling api
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {email, password} = formData;

      try{
      const isValid = validateFields( email, password);
      if(!isValid){
        throw new Error("Validation failed");
      }
      const response = await fetch(`${API_URL}login/`, {
        method:'POST',
        credentials:'include',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      });

      //verifying response
      if(!response.ok){
        throw new Error("Server did not return success");
      }

      //redirecting user
      setTimeout( () => {
        router.push("/dashboard");
      }, 5000);
      
    } catch (error){
      console.log(error);
    }
  }

    return( 
    <div className="flex flex-col">    
    <p className="text-2xl mx-auto my-2 font-bold text-black">KAMESA UM</p>
    <form onSubmit={handleSubmit}>
    <FieldGroup className="p-3">
    <div className="flex flex-col my-2">
    <p className="mx-auto font-semibold text-xl">Welcome Back</p>
    <p className="text-sm mx-auto">Please fill in your login details</p>
    </div>
  
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
        <InputGroupInput name="password" type="password" onChange={onChange} id="input-group-url" placeholder="Enter password" required aria-invalid={errors.password && true}/>
        <InputGroupAddon align="inline-end">
          <p>i</p>
        </InputGroupAddon>
      </InputGroup>
      {errors.password && <FieldDescription>{errors.password}</FieldDescription>}
    </Field>

    
    <div className="flex gap-2 my-2">
        <input type="radio" className="p-1 rounded-md"/>
        <p>Remember me</p>

    </div>

    {/* submit button */}
      <Field orientation="horizontal">
        <Button type="submit">Sign In</Button>
      </Field>
    </FieldGroup>  
    </form>
    <div className="p-2 flex gap-2 mt-3 flex-row">
      <p className="text-sm">Dont have an Account</p>
      <Link className="text-sm text-blue-600 underline" href="/register">Register</Link>
    </div>       
    </div>
    )
  }