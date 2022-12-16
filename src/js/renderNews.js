import { FETCH_URL} from "./confing";

export async function data(){
    const response = await fetch(FETCH_URL)
    const data = await response.json()
 console.log(data);
}

