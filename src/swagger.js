export default {
    openapi: "3.0.1",
    info: {
        version: "1.0.0",
        title: "APIs Document",
        description: "API Document Web Application",
        termsOfService: "",
        contact: {
            name: "MokaDEV",
            email: "tuhd4@fpt.edu.vn",
            url: "https://mokadev.asia",
        },
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
    },
    servers: [
        {
            url: "http://{ip}:{port}/{basePath}",
            description: "The production API server",
            variables: {
                ip: {
                    enum: ["api.topcode.asia", "localhost"],
                },
                port: {
                    enum: ["", "3000"],
                    default: "",
                },
                basePath: {
                    enum: ["", "admin", "user"],
                    default: "",
                },
            },
        },
    ],
    components: {
        securitySchemes: {
            jwt: {
                type: "http",
                scheme: "bearer",
                in: "header",
                bearerFormat: "JWT",
            },
        },
    },
    paths: {
        
    },
};
