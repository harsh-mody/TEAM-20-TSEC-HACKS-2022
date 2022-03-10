const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser =  async (name, password, done) => {
        const user = await getUserByEmail(name);
        if (user == null) {
            return done(null, false, { message: "No user with that Name" });
        }
        try {
            if (password === user.password) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Password Incorrect" })
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'name' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        const user = await getUserById(id);
        return done(null, user)
    })
}

module.exports = initialize;