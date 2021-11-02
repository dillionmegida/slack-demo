import styled from 'styled-components';

const Container = styled.ul<{ size?: number }>`
  display: flex;
  .image {
    --size: ${props => props.size || 35}px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid transparent;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:not(:first-child) {
      margin-left: -10px;
    }
  }
`;

type Props = {
  sources: string[];
  size?: number;
};

export default function MultipleImages({ sources, size = 30 }: Props) {
  return (
    <Container size={size}>
      {sources.map(source => (
        <div key={source} className="image">
          <img src={source} alt="" />
        </div>
      ))}
    </Container>
  );
}
