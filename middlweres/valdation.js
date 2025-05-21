
export const valdate = (schema) =>{
    return (req, res, next) => {
        if(!req.body){
            return next(new Error("empty req body !"));
        }
        const { error } = schema.validate(req.body,{abortEarly: false});
        if (error) {
            return next({ status : 'fail',message: error.details.map( (msg)=> msg.message ) });
        }
        next();
    };
}
