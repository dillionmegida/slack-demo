import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  h3 {
    color: #ccc;
  }
`;

export default function BrowseChannels() {
  const [loadingChannels, setLoadingChannels] = useState(true);

  return (
    <Container>
      <h3>Browse Channels</h3>
    </Container>
  );
}
