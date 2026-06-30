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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

import { Input } from "@/components/ui/input";

import React, {useState, ChangeEvent} from "react";
import {useRouter} from 'next/navigation';


const API_URL = "http://127.0.0.1:5000/auth/";

export default function SIgnUpPage(){
    const [formData, setFormData] = useState({username:"username is too short", email:undefined, password:undefined, confirm:""});
    const [errors, setErrors] = useState({username:"", email:"", password:""});
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

    const validateFields = (username:string, email:string, password:string, confirm:string) => {
      let isValid = true;

      if (!username || !email || !password || !confirm) {
        isValid = false;
        throw new Error("All fields are required")
      }
      //password must match
      if (password !== confirm) {
        isValid = false;
        setErrors({...errors, password:"password does not match"})
      }
      return isValid;
    }


    //calling api
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        alert("Submitting form");
        const {username, email, password, confirm} = formData;

        try{
      const isValid = validateFields(username, email, password, confirm);
      if(!isValid){
        throw new Error("Validation failed");
      }
      const response = await fetch(`${API_URL}register/`, {
        method:'POST',
        headers:{
          "Content-type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(formData)
      });
      if(!response.ok){
        throw new Error("Server did not return success");
      }
      /*router.push("/dashboard"); */
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
    <p className="mx-auto font-semibold text-xl">Welcome</p>
    <p className="text-sm mx-auto">Please fill in the details to register</p>
    </div>
    {}
    {/* Username */}
      <Field data-invalid={errors.email && true} >
        <FieldLabel htmlFor="fieldgroup-name">Username</FieldLabel>
        <Input onChange={onChange} id="fieldgroup-name" name="username" placeholder="Jordan Lee" required aria-invalid={errors.username && true}/>
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
        <InputGroupInput name="password" type="password" onChange={onChange} id="input-group-url" placeholder="Enter password" required aria-invalid={errors.password && true}/>
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
            id="input-group-url" placeholder="Re-enter password" required/>
        <InputGroupAddon align="inline-end">
          <p>i</p>
        </InputGroupAddon>
      </InputGroup>
    </Field>

    <div className="flex gap-2 my-2">
        <input type="radio" className="p-1 rounded-md"/>
        <p>I have read all terms and conditions</p>

    </div>

    {/* submit button */}
      <Field orientation="horizontal">
        <Button type="submit">Submit</Button>
      </Field>
    </FieldGroup>  
    </form>
    <div className="p-2 flex gap-2 mt-3 flex-row">
      <p className="text-sm">Already have an Account</p>
      <Link className="text-sm text-blue-600 underline" href="/login">Login</Link>
    </div>       
    </div>
    )
  }