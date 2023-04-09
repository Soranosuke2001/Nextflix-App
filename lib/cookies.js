import cookie from 'cookie';

const expire = 7 * 24 * 60 * 60;

export const saveToken = (jwtToken, res) => {
    const jwtTokenCookie = cookie.serialize("token", jwtToken, {
        maxAge: expire,
        expires: new Date(Date.now() + expire * 1000),
        secure: process.env.APP_STATE === 'deploy',
        path: "/"
    });

    res.setHeader('Set-Cookie', jwtTokenCookie);
};