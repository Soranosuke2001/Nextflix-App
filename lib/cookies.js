import cookie from 'cookie';
import cookieCutter from 'cookie-cutter';

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

export const removeToken = (res) => {
    // const jwtTokenCookie = cookie.serialize("token", "", {
    //     maxAge: -1,
    //     path: "/"
    // });

    // res.setHeader('Set-Cookie', jwtTokenCookie);
    cookieCutter.set('token', '', { expires: new Date(0) });
};