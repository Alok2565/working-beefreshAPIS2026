const slugify = require("slugify");

const generateSlug = (name) => {
    return slugify(name, {
        lower: true,
        strict: true,
        trim: true,
    });
};

module.exports = generateSlug;