import moment from 'moment';
import { fileFormat } from '../../lib/features';
import { RenderAttachment } from './RenderAttachment';
import { motion } from 'framer-motion';

const Message = ({message, user}) => {

  const {sender, attachments=[], content, createdAt} = message;

  const sameSender = sender?._id===user?._id;
  const timeAgo = moment(createdAt).fromNow();

  return sender.name==="Admin" ? <div className='self-center p-2 text-sm text-gray-500'>
    {content}
  </div>  : (
    <motion.div
        initial={{
            x:"-100%"
          }}
        whileInView={{
            x:0
        }}
     className={`w-fit rounded-sm flex flex-col ${sameSender?'self-end items-end':'self-start items-start'} bg-white p-2`}>
      {!sameSender && <span className='text-xs text-teal-800'>{sender.name}</span>}

      {content && <span className='font-extralight'>{
      content
      }</span>}
      
      <div className='flex flex-col space-y-4'>
      {
        attachments.length>0 && attachments.map((attachment,index)=>{
          const url = attachment.url;
          const file = fileFormat(url);
          return <span key={index}>
              <a className='text-black' href={url} target='_blank' download>
                {RenderAttachment(file,url)}
              </a>
            </span>
        })
      }
      </div>
      <span className='text-xs text-gray-400'>{timeAgo}</span>
    </motion.div>
  )
}

export default Message