export declare class ResponseDto<T> {
    success: boolean;
    message: string;
    data: T;
    constructor(success: boolean, message: string, data: T);
}
