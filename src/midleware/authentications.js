function auth(req, res, next) {
    if (req.session?.user === 'i@m.com' || !req.session?.admin) {
        return res.status(401).send('error de autorización')
    }

    return next()
}
export default  auth 