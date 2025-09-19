export enum HttpResponse {
    SERVER_ERROR= "Internal server error",
    SUCCESS= "Success",
    PAGE_NOT_FOUND= "Route not found",

    INVALID_CREDENTIALS= "Invalid credentials",
    USER_CREATION_FAILED= "User creation failed",
    
    RESOURCE_FOUND= "Resource found.",

    TOO_MANY_REQUESTS= "Too many requests, please try again later.",
 
    REQUIRED_SESSION_ID= "SESSION ID is required",

    SESSION_CREATED="Session created",
    SESSION_EXIST="Session esist",
    INVALID_SESSION="Invalid session",
    
    NOT_FOUND="not found",
    FAILED_TO_UPDATE="Failed to update",
}; 