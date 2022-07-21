// Dependencies



// Not Found Handler
function notFoundHandler(req, res) {
    try {
        res.render('common/notFound', {
            title: "404, Not Found!!", message: "Your page is not found!!"
        })
    } catch (error) {
        res.render('common/error', {
            title: "Error occured", error
        })
    }
}



// Error Handler
function errorHandler(error, req, res, next) {

    if (res.headerSent) {
        next(error)
    } else {
        res.render("common/error", {
            title: "Error occured", error
        })
    }
}



// Module Exports
module.exports = { notFoundHandler, errorHandler }