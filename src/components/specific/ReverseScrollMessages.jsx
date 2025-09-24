import { useEffect, useRef } from "react";
import { FaCircle } from 'react-icons/fa';
import { useGetMessagesQuery } from "../../store/api/api.js";
import Message from "../shared/Message";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useErrors } from "../../hooks/hook.jsx";

const ReverseWindowScrollDemo = ({ chatId, user, messages, setMessages, page, setPage, ref, userTyping, typingLoaderRef }) => {
  
  const {data,isFetching, error, isError} = useGetMessagesQuery({chatId, page});
  const totalPages = data?.totalPages || 1;
  const hasNextPage = page < totalPages;
  const topRef = useRef(null);

  const erros =[{ isError, error }];
  useErrors(erros)

  useEffect(()=>{
    if (data?.messages && ref.current) {
      const container = ref.current;
      const prevScrollHeight = container.scrollHeight;

      setMessages((prev) => [...data.messages, ...prev]);

      requestAnimationFrame(() => {
        const newScrollHeight = container.scrollHeight;
        ref.current.scrollTop = newScrollHeight - prevScrollHeight;
      });
    }
  },[data])

   useEffect(() => {
    if (!topRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && hasNextPage) {
          setPage((prev) => prev + 1);
        }
      },
      { root: ref.current,
        threshold: 1 }
    );

    observer.observe(topRef.current)

    return () => {
      if (topRef.current) {
        observer.unobserve(topRef.current);
      }
    };
  }, [messages]);

  return (
    <div
      ref={ref}
      className="grow relative flex flex-col space-y-1 mb-2 overflow-y-auto scroll-[smooth]"
    >
      {hasNextPage && <div ref={topRef} className="w-full flex  justify-center items-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
      </div>
}

      {messages.map((m) => (
        <Message key={m._id} message={m} user={user} />
      ))}

      {
        userTyping &&  <div  className='w-full flex  justify-center items-center space-x-1'>
          <FaCircle className='animate-ping text-xs text-gray-400' />
        </div>
      }
      <div ref={typingLoaderRef} />
    </div>
  );
};

export default ReverseWindowScrollDemo;
