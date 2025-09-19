const Title = ({title="Chat App",description="simple and easy to use, chat with your close one's"}) => {
  return (
    <>
    <title>{title}</title>
    <meta name='description' content={description} />
    </>
  )
}

export default Title