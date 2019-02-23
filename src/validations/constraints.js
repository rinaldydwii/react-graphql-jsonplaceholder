export const constraints = {
    title: {
        presence: {
            message: "Title is Required"
        }
    },
    body: {
        presence: {
            message: "Body is Required"
        }
    },
    url: {
        presence: {
            message: "Url is Required"
        }
    },
    thumbnailUrl: {
        presence: {
            message: "Thumbnail Url is Required"
        }
    },
    name: {
        presence: {
            message: "Name is Required"
        }
    },
    email: {
        presence: {
            message: "Email is Required"
        },
        email: {
            message: "Please input a valid email"
        }
    },
}