import {z} from "zod";

const registrationSchema = z.object({
    username:z.string().min(6),
    email:z.email({message: "Invalid email"}),
    password:z.string().min(8).max(20),
    confirm:z.string().min(8).max(20).optional()
});

const loginSchema = z.object({
    email:z.email({message:"Invalid email"}),
    password:z.string().min(8).max(20)
});

export const loginValidator = (req, res, next) => {
    const {email, password} = req.body;
    //const parsedBody = JSON.parse(req.body);
    console.log(req.body);
    

    //email, passsword required
    if(!email || !password){
        return res.status(400).json({message:"Email and password required"});
    }

    const validation = loginSchema.safeParse(req.body);
    //validation
    if(!validation.success){
        return res.status(400).json({message:"Validation failed", error:validation.error})
    }
    next();
}

export const registrationValidator = (req, res, next) => {
    console.log(req.body)
    const {username, email, password, confirm = null} = req.body;

    //all fields required
    if(!username || !email || !password){
        const err = new Error("400: all fields are required");
        err.status = 400;
        throw err;
    }

    //zod validation
    const validation = registrationSchema.safeParse(req.body);
    if(!validation.success){
        return res.status(400).json({message:"Input validation failed", error:validation.error});
    }
    next();
}