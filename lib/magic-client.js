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
        return didToken;
    } catch (error) {
        console.log('Login Failed: ', error);
    };  
};

export const userInfo = async () => {
    const mClient = createMagic();

    try {
        const { email, publicAddress } = await mClient.user.getMetadata();
        return { email, publicAddress }
    } catch (error) {
        console.log('Error fetching user data: ', error);
    };
};

