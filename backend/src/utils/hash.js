import bcrypt from "bcrypt";

//hash function
const hash = async (value) => {
    try{
        const SALT_COUNT = 10;
        const hash = await bcrypt.hash(value, SALT_COUNT);
        return hash;
    }
    catch (err) {
        throw new Error("500: Error during hashing")
    }
    
}

export default hash;