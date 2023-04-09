import { mAdmin } from "@/lib/magic-server";

export const Login = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const authHeader = req.headers.authorization;
            const didToken = authHeader ? authHeader.substr(7) : '';

            const mMetadata = await mAdmin.users.getMetadataByToken(didToken);
            res.json({ message: mMetadata });

        } catch (error) {
            res.status(500).json({ message: 'there was an error', error });
        }
    } else {
        res.status(400).send({ message: 'The request must be a POST method' });
    };
};

export default Login;