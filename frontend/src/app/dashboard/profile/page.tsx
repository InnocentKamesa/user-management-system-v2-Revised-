'use client';

import { UserPen } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

const API_URL = "http://127.0.0.1:5000"

export default function ProfilePage() {
    const [updating, setUpdating] = useState(false);
    const [phone, setPhone] = useState<string | undefined>('+265')
    const [formData, setFormData] = useState({ first: "", last: "" })

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!updating) {
            setUpdating(true)
        }
        else {
            
            const newForm = {
                ...formData, phone: `+${phone}`
            }
            try{
                const response = await fetch(`${API_URL}/user/profile/create/`, {
                    method:'POST',
                    headers:{
                        "Content-Type":"applicetion/json"
                    },
                    body:JSON.stringify(newForm)
                });
                if(!response.ok){
                    throw new Error("server did not retrun success")
                }
                setTimeout(() => {setUpdating(false);}, 1000)
            
        }

    }
    return (
        <div className="flex flex-col gap-4 justify-center align-center">
            <p className="mx-auto my-2 font-extrabold text-2xl">Profile</p>
            {/**Profile Photo */}
            <div className="flex items-center justify-center flex-col">

                <Image alt="profile" src="/sample_profile.jpg" width={100} height={80} className="rounded-full shadow-lg" />
                <div onClick={() => { alert("Under maintainance") }} className="flex text-orange-700 mt-3 flex-row gap-1 text-sm">
                    <p className="text-sm">change photo</p>
                    <UserPen className="h-4 w-4" />
                </div>
                <p className="my-1 text-lg">innocent</p>
            </div>

            {/**Profile info */}
            <form onSubmit={onSubmit}>
                <FieldGroup className="flex flex-col p-4 border border-gray-100 rounded-md shadow-md sm:max-w-sm mx-auto">

                    {/** first and last */}
                    <div className="flex flex-row gap-3">
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-name">First Name</FieldLabel>
                            <Input id="fieldgroup-name" name="first" placeholder="N/A" readOnly={!updating} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="fieldgroup-name">Last Name</FieldLabel>
                            <Input id="fieldgroup-name" name="last" placeholder="N/A" readOnly={!updating} />
                        </Field>

                    </div>

                    {/**Email */}
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                        <Input
                            id="fieldgroup-email"
                            type="email"
                            placeholder="name@example.com"
                            readOnly
                        />

                    </Field>

                    {/*Phone */}
                    
                    <Field className="">
                        <FieldLabel htmlFor="fieldgroup-email">Phone</FieldLabel>
                        <PhoneInput
                            id="fieldgroup-phone"
                            type="phone"
                            name="phone"
                            international
                            defaultCountry="MW"
                            buttonStyle={{
                                width: '48px',
                                height: '35px',
                                backgroundSize: '24px 18px' // Use this to force the flag sprite image to resize
                            }}
                            countryCallingCodeEditable={false}
                            value={phone}
                            onChange={setPhone}
                            placeholder={updating ? "Enter Phone" : '+265 XXX XXX XXX'}
                            inputProps={{
                                readOnly: !updating && true, // Sets the phone number field to read-only
                            }}
                            containerClass="w-full max-w-sm"
                        />

                    </Field>
            

                    {/**Created at */}
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-email">Date Joined</FieldLabel>
                        <Input
                            id="fieldgroup-email"
                            type="email"
                            placeholder="2026-07-06"
                            readOnly
                        />

                    </Field>

                    <Field orientation="horizontal">
                        <Button type='submit'>
                            {updating ? 'Save Changes' : 'Edit Profile'}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>


        </div>

    )
}
