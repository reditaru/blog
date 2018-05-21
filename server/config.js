/**
 * Created by reditaru on 2017/12/21.
 */

let config = {
    env:{
      current: 'dev'
    },
    database: {
        name: 'sqlite:blog',
        username: null,
        password: null,
        dialect: 'sqlite',
        storage: './blog.db',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    cors: {
        origin: function(ctx) {
            return 'http://localhost:8080';
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
            maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST','PUT','DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'X-Requested-With']
    },
    session: {

    },
    auth: {
        type:'jwt',
        secret:'test-secret',
        path:[/^\/api\/login/,/^\/api\/logout/],
        expiresIn:'1d'
    },
    admin: {
        // set admin for blog dashboard to use some api
        id:1,
        // admin name
        username:'SteinsKurisu'
    }
}
export default config;