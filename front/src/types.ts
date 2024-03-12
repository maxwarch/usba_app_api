export type APIResponse<T> = {
	success: boolean | string
	data: T
	status?: number
}

export interface ErrorInfoInput {
	errorText?     : string | string[],
	errorTextClass?: string
}

export default interface IErrorProps {
	hasError?       : boolean,
	errorInputClass?: string,
	errorInfo?      : ErrorInfoInput
}