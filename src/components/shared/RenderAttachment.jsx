import { MdFileOpen } from "react-icons/md";
import { transformImage } from "../../lib/features";

export const RenderAttachment = (file,url)=>{
  switch(file){
    case "video":
      return  <video src={url} className='w-[12rem] h-[9rem]' preload='none' controls />;
    case "image":
      return  <img className='w-[12rem] h-[9rem] object-contain' src={transformImage(url,200)} alt="Attachment" />;
    case "audio":
      return <audio src={url} preload='none' controls />;
    default:
      return <MdFileOpen className="text-[2rem]" />;
  }

}
