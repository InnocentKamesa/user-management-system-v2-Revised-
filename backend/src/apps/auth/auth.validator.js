import {z} from "zod";

const registrationSchema = z.object({
    username:z.string().min(8),
    email:z.email({message: "Invalid email"}),
    password:z.string().min(8).max(20),
    confirm:z.string().min(8).max(20)
});

export const registrationValidator = (req, res, next) => {
    const {username, email, password, confirm} = req.body;

    //all fields required
    if(!username || !email || !password || !confirm){
        const err = new Error("400: all fields are required");
        err.status = 400;
        throw err;
    }

    //zod validation
    const validation = registrationSchema.safeParse(req.body);
    if(!validation.success){
        return res,status(400).json({message:"Input validation failed", error:validation.error});
    }

    next();
}