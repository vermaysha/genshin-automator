# Genshin Impact Automatic Web Helper

I made this simple application with the aim of making it easier to check-in daily on the hoyolab event page, while also making it easier to redeem the code provided automatically.

## System Requirements

1. `NodeJs v16` or above

## Environment Key

| Key             | Description                                                     | Required |
| --------------- | --------------------------------------------------------------- | -------- |
| MONGO_URI       | Connection URI from MongoDB.                                    | **Yes**  |
| COOKIES         | Contains cookies obtained directly from the hoyolab website.    | **Yes**  |
| TZ              | Default Timezone                                                | **No**   |
| USER_AGENT      | As a User Agent when making HTTP Requests.                      | **No**   |
| DISCORD_WEBHOOK | Used to notify when a successful check-in or redeem a new code. | **No**   |

## Installation

### Building from source

1. `git clone https://github.com/vermaysha/genshin-automator.git`
2. `cd genshin-automator`
3. `cp .env.example .env`
4. `npm ci`
5. `npm run build`

Now you can run script under `build` directory

### Run Script

1. In the `build` directory, run command below
2. `npm ci --omit=dev`
3. `npm run start` or `npm run prod`

## How to get cookies

1. To begin, login with your [HoYoLab](http://https://www.hoyolab.com/home) Account.
2. Type `java` in the address bar followed by the script down below.
3. `` script:check = document.cookie.includes('ltoken') && document.cookie.includes('ltuid') || alert('Please logout and log back in before trying again, cookie is currently expired/invalid!'); cookie = document.cookie; check && document.write(`<p>${cookie}</p><br><button onclick="navigator.clipboard.writeText('${cookie}')">Click here to copy!</button><br>`) ``
4. Once you've successfully ran the script, click the Click here to copy! button to copy the cookie.
5. Finally, copy your token to COOKIES environment variable.
6. **Optional**, You can add multiple cookie by add `#` as separator.
