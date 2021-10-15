// capitlize first name and last name
const capitalizer = function (name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// checks if email is legitimate email
const emailChecker = function (email) {
    if (email.length >= 5) {
        if (email.indexOf("@") > 0) {
            if (email.indexOf(".") > email.indexOf("@") && email.indexOf(".") < email.length) {
                return true
            }

        }
    }
    return false
}

// removes space from last name and first name
const spaceRemover = function (data) {
    return data.split(' ').join('')
}

module.exports = { capitalizer, emailChecker, spaceRemover }