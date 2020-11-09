import Unsplash from "unsplash-js";

export const unsplash = new Unsplash({
    accessKey: "NoZ3Xj6EmhgafvdAT6G5I_NXKAnO3xU3TkUTtV7vvtM",
    secret: "8lvyNjsXAVw-uSh8xohSxCwDDl_IThXhw-emg5xXJWk",
    callbackUrl: 'http://localhost:3000/'
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "read_user",
    "write_user",
    "read_photos",
    "write_photos",
    "write_likes"
]);

export const checkAuth = () => {
    if (window.location.search !== "") {
        let code = "";
        const query = new URLSearchParams(window.location.search);
        for (let param of query.entries()) {
            if (param[0] === "code") {
                code = param[1];
            }
        }
        return code;
    }
    else{
        return  false;
    }
}

export  const checkUrlToken = () => {
    const token = checkAuth();
    if (token) {
        return token
    } else {
        return false
    }
}

export const checkLocalToken = () => {
    let lsToken = localStorage.getItem('token');
    let expirationDate = localStorage.getItem('tokenExpiration');
    if (lsToken) {
        if (new Date().getTime() > +expirationDate) {
            localStorage.removeItem('token');
            localStorage.removeItem(('tokenExpiration'))
            lsToken = undefined;
            expirationDate = undefined;
            return false
        } else {
            return true
        }
    }
    if (!lsToken) {
        return false
    }
}
