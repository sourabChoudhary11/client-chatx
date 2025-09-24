import moment from "moment"

export const fileFormat = (url) => {
    const fileExt = url.split(".").pop();

    if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") return "video";

    if (fileExt === "mp3" || fileExt === "wav") return "audio";

    if (fileExt === "png" || fileExt === "jpg" || fileExt === "jgeg" || fileExt === "gif") return "image";

    return "file";
}

export const transformImage = (url,width=100)=>url.replace("upload", `upload/c_scale,w_${width}`);


export const getLast7Days = ()=>{
    const currentDate = moment();
    let last7Days = [];

    for(let i=0; i<7; i++){
        const getDay = currentDate.clone().subtract(i, "days").format("dddd")
        last7Days.unshift(getDay);
    }

    return last7Days
}

export const saveOrGetFromLocalStorage = ({key,value,get})=>{
    if(get) return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
        else localStorage.setItem(key, JSON.stringify(value))
}