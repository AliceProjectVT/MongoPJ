let authorization = roleArray => {
  return async (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ status: 'error', error: 'Unauthorized' })
      if (!roleArray.includes(req.user.role.toUpperCase())) return res.status(403).render('error', { status: 'error', error: 'No cuentas con permisos' })
      next()

    } catch (error) {
      next(error)
    }
  }
}

export default authorization