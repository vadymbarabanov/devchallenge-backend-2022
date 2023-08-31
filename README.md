## Start service

`cd` into project root directory and run following command

```sh
sudo docker-compose up
# or
npm run service:up
```

## Description

I've decided to create Express-ish app, where you have middleware architecture. Each request goes through middleware functions which can add additional functionality to the request and(or) response or send response to the client.

## Possible improvements

- Add typing with TypeScript
- Better validation system based on types
- Better dependency injection by using container approach
- Add pre-commits and pipelines for more controlled and reliable development
