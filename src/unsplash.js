import Unsplash, {toJson} from "unsplash-js";

export const unsplash = new Unsplash({
    accessKey: "NoZ3Xj6EmhgafvdAT6G5I_NXKAnO3xU3TkUTtV7vvtM",
    secret: "8lvyNjsXAVw-uSh8xohSxCwDDl_IThXhw-emg5xXJWk",
    callbackUrl: 'http://localhost:3000/'
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "write_likes"
]);

if (window.location.search !== "") {
    let code = "";
    const query = new URLSearchParams(window.location.search);
    for (let param of query.entries()) {
        if (param[0] === "code") {
            code = param[1];
        }
    }
    unsplash.auth.userAuthentication(code)
        .then(toJson)
        .then(json => {
            console.log(json.access_token)
            unsplash.auth.setBearerToken(json.access_token);
        })
}
