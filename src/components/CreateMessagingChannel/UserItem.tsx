import { StreamUserInterface } from 'src/interfaces/UserInterface';
import { capitalize } from 'src/utils/string';
import styled from 'styled-components';

const Item = styled.li`
  padding: 10px 20px;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .name {
    flex: 1;
    margin-right: 10px;
    color: #ccc;
  }

  button {
    border: 1px solid #999;
    width: 80px;
    background: none;
    color: #ccc;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #ccc;
      color: #333;
    }
  }
`;

type Props = {
  user: StreamUserInterface;
  handleAdd: (user: StreamUserInterface) => void;
  added: boolean;
};

export default function UserItem({ user, handleAdd, added = false }: Props) {
  return (
    <Item>
      <div className="image">
        <img src={user.image} alt="" />
      </div>
      <span className="name">{capitalize(user.name)}</span>
      <button className={added ? 'added' : ''} onClick={() => handleAdd(user)}>
        {added ? 'Added' : 'Add'}
      </button>
    </Item>
  );
}
