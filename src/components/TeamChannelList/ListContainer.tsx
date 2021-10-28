export default function ChannelListContainer(props: any) {
  const { loading, children } = props;

  if (loading)
    return (
      <div className="channel-list">
        <p className="channel-list__message">Channels are loading...</p>
      </div>
    );

  return <div className="channel-list">{children}</div>;
}
