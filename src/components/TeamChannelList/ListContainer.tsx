import styled from 'styled-components';

const Container = styled.div`
  .no-message-text {
    padding: 0 20px;
    color: #ccc;
    font-size: 15px;
  }
`;

export default function ChannelListContainer(props: any) {
  const { loading, children } = props;

  return (
    <Container>
      {loading ? (
        <div className="no-message-text">Channels are loading...</div>
      ) : (
        children
      )}
    </Container>
  );
}
