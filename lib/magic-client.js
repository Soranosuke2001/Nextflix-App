import { Magic } from "magic-sdk";

const createMagic = () => {
    return (
        typeof window !== 'undefined' && new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY)
    );
};


export const magicLogin = async (email) => {
    const mClient = createMagic();

    try {
        const didToken = await mClient.auth.loginWithMagicLink({ email });
        console.log(didToken);
    } catch (error) {
        console.log('Login Failed: ', error);
    };  
};

