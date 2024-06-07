import { AxiosError } from "axios";

export function axiosErrHandler(err:AxiosError):string{
    if(err.response)
        {
            if(err.response.data)
                {
                    return JSON.parse(JSON.stringify(err.response.data))['value'];
                }
        }
        return err.message;
}