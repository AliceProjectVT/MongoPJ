import passport from "passport";

const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {

            if (err) return next(err)

            if (!user) {
                return res.status(401).render('error', { error: info.messagge ? info.message : info.toString() })
            }
            req.user = user.user
            next()
        })(req, res, next)

    }

}

export default passportCall