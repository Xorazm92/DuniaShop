export const apiVersion = (version) => {
    return (req, res, next) => {
        req.apiVersion = version;
        next();
    };
};
