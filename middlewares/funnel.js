const capitalizeName = (req, res, next) => {
    const name = req.body.name;
    if (name) {
        const newName = name.replace(
            name.charAt(0),
            name.charAt(0).toUpperCase()
        );
        req.body.name = newName;
        next();
    }
};

module.exports = {
    capitalizeName,
};
