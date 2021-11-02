import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import AppContext from 'src/contexts/AppContext';
import AuthContext from 'src/contexts/AuthContext';
import { setStorageItem } from 'src/utils/storage';
import { replaceAll } from 'src/utils/string';
import { useChatContext } from 'stream-chat-react';
import styled from 'styled-components';

const Form = styled.form`
  border: 1px solid #999;
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;

  .input-group {
    margin-bottom: 20px;

    label {
      display: block;
      color: #ccc;
      margin-bottom: 10px;
      font-size: 15px;
    }
    input,
    textarea {
      padding: 15px;
      width: 100%;
      background: transparent;
      border: 1px solid #999;
      color: white;
      font-size: 17px;
    }
  }

  .submit {
    button {
      padding: 20px;
      text-align: center;
      background-color: black;
      color: white;
      width: 100%;
    }
  }
`;

type InputValues = {
  name: string;
  desc: string;
  image: string;
};

export default function CreateChannel() {
  const { client, setActiveChannel } = useChatContext();
  const { user } = useContext(AuthContext);
  const { setCreatingChannel } = useContext(AppContext);

  const { handleSubmit, register } = useForm<InputValues>();

  const createChannel = (values: InputValues) => {
    if (!user) return;

    const channel = client.channel(
      'team',
      replaceAll(values.name.toLowerCase().trim()),
      {
        name: values.name,
        description: values.desc,
        image: values.image,
        members: [user._id],
      }
    );

    setStorageItem('last_opened_channel', channel.id);

    setActiveChannel(channel);

    setCreatingChannel({ type: null, status: false });
  };

  return (
    <Form onSubmit={handleSubmit(createChannel)}>
      <div className="input-group">
        <label htmlFor="name">Channel Name</label>
        <input id="name" {...register('name', { required: true })} />
      </div>
      <div className="input-group">
        <label htmlFor="image">Channel Image URL</label>
        <input id="image" {...register('image', { required: true })} />
      </div>
      <div className="input-group">
        <label htmlFor="desc">Channel Description</label>
        <textarea id="desc" {...register('desc', { required: true })} />
      </div>
      <div className="submit">
        <button type="submit">Create channel</button>
      </div>
    </Form>
  );
}
