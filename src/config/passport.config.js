import passport from "passport"
import GithubStrategy from "passport-github2"
import pjwt from 'passport-jwt'
// utilizamos el userManagerMongo, para acceder a la Base de datos
import userManagerMongo from "../Daos/Mongo/userManager.js"

const userService = new userManagerMongo()
const JWTStrategy = pjwt.Strategy//tomar data de las cookies 
const ExtractJWT = pjwt.ExtractJwt



//Manejar configuracion de las estrategias


const initializePassport = () => {
    const cookieExtractor = req => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['auth_token'];
        }
        return token;
    };
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'palabrasecreta'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)

        } catch (error) {
            return done(error)

        }

    }))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userService.getUser({ _id: id })
        done(null, user)
    })
}



// const initializePassport = () => {
//     const cookieExtractor = req => { //extraer cookies  de req
//         let token = null
//         if (req && req.cookies) {

//             token = req.cookies['cookieToken']
//         }
//         return token
//     }

//     const objectStrategyJwt = {
//         jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
//         secretOrKey: 'aquivaunafirma'
//     }


//     //passport.use es el middleware
//     passport.use('jwt', new JWTStrategy(objectStrategyJwt, async (jwt_payload, done) => {

//         try {

//             return done(null, jwt_payload)
//         } catch (error) {
//             return done(error)


//         }

//     }))


//     passport.use('github', new GithubStrategy({
//         clientID: 'Iv1.53504297a2288e65',
//         clientSecret: '4f3ab9c7741a5ae2eb340c6776744a6af8f25e56',
//         callbackURL: 'http://localhost:4000/api/sessions/githubcallback'
//     }, async (accesToken, refreshToken, profile, done) => {
//         console.log('profile:', profile)
//         try {
//             let user = await userService.getUser({ email: profile._json.email })

//             if (!user) {
//                 let newUser = {
//                     first_name: profile.username,
//                     last_name: profile.username,
//                     email: profile._json.email,
//                     password: ''
//                 }
//                 let result = await userService.createUser(newUser)
//                 return done(null, result)
//             }
//             return done(null, user)
//         } catch (error) {
//             return done(error)
//         }

//     }))

//     

// }
export default initializePassport