// class ApiError extends Error{

//     constructor(statusCode , message="Something went wrong" , errors=[]){
//         super(message)
//         this.statusCode = statusCode
//         this.message = message
//         this.errors = errors
//         this.success = false
//         this.data = null
//     }
// }

class ApiError {

    constructor(statusCode , message="Something went wrong" , ){
        this.statusCode = statusCode 
        this.message = message 
        // this.errors = errors 
        this.success = false
        this.data = null 
    }
}


export {ApiError} ;