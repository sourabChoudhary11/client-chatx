import { useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useLazyGetMessagesQuery } from "../../store/api/api.js";
import Message from "../shared/Message";
import { FaCircle } from 'react-icons/fa';

const ReverseWindowScrollDemo = ({ chatId, user, messages, setMessages, page, setPage, ref, userTyping, typingLoaderRef }) => {
  const [trigger, { data, isFetching }] = useLazyGetMessagesQuery();

  const totalPages = data?.totalPages || 1;
  const hasNextPage = page < totalPages;

  const fetchMore = () => {
    if (!isFetching && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage,
    onLoadMore: fetchMore,
  });

  useEffect(() => {
      if (chatId && page > 0) trigger({ chatId, page });
  }, [chatId, page]);

  useEffect(() => {
    if (data?.messages?.length) setMessages((prev) => [...data.messages, ...prev]);
  }, [data]);

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.scrollTop;
  }, [messages]);

  return (
    <div
      ref={ref}
      className="grow relative flex flex-col space-y-1 mb-2 overflow-y-auto"
    >
     {
      hasNextPage &&  <div ref={sentryRef} className="h-[2rem]">Loading ......</div>
     } 

      {messages.map((m) => (
        <Message key={m._id} message={m} user={user} />
      ))}

      {
        userTyping && <div  className='w-full flex  justify-center items-center animate-pulse space-x-1'>
          <FaCircle className='animate-bounce delay-1000 text-xs text-gray-400' />
          <FaCircle className='animate-bounce delay-[2s] text-xs text-gray-400' />
          <FaCircle className='animate-bounce delay-200 text-xs text-gray-400' />
        </div>
      }
      <div ref={typingLoaderRef} />
    </div>
  );
};

export default ReverseWindowScrollDemo;
