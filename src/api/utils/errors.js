module.exports = {
    error: {
        e0: {
            http: 500,
            code: "InternalError",
            message: {
                eng: "Internal Error"
            },
            type: "error"
        },
        e1: {
            http: 400,
            code: "InvalidID",
            message: {
                eng: "Invalid ID."
            },
            type: "error"
        },
        e2: {
            http: 400,
            code: "UserAlreadyExists",
            message: {
                eng: "User already exists. Please login."
            },
            type: "error"
        },
        e3: {
            http: 400,
            code: "NoUserRecordsFound",
            message: {
                eng: "Users does not exist."
            },
            type: "error"
        },
        e5: {
            http: 401,
            code: "Unauthorized",
            message: {
                eng: "Unauthorized."
            },
            type: "error"
        },
        e6: {
            http: 401,
            code: "PasswordDoesNotMatch",
            message: {
                eng: "Password does not match."
            },
            type: "error"
        },
        e7: {
            http: 401,
            code: "InvalidToken",
            message: {
                eng: "The token that you provided is invalid."
            },
            type: "error"
        },
        e8: {
            http: 401,
            code: "InvalidCredentials",
            message: {
                eng: "Invalid Credentials"
            },
            type: "error"
        }
    },
    success: {
        s0: {
            http: 200,
            code: "RequestFulfilled",
            message: {
                pt: "OK!",
                eng: "OK!"
            }
        },
        s1: {
            http: 201,
            code: "UserCreated",
            message: {
                eng: "User created successfully."
            }
        },
        s2: {
            http: 201,
            code: "AuthenticationSuccess",
            message: {
                eng: "Authenticated successfully."
            }
        }
    }
}