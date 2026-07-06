import {z} from "zod";

const userProfileSchema = z.object({
    first:z.string().min(3).max(50),
    last:z.string().min(3).max(50),
    phone:z.e164({message:"Invalid phone"})
})

export const userProfileValidator = (req, res, next) => {
    const {first, last, phone} = req.body;

    //all fields required
    if(!first || !last || !phone){
        return res.status(400).json({message:"All fields required"});
    }

    //validate
    const validation = userProfileSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(400).json({message:"Validation failed", error:validation.error})
    }

    //next
    next();
}