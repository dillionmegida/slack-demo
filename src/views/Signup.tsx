import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import AuthContext from 'src/contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import createUser from 'src/queries/createUser';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  h1 {
    text-align: center;
  }

  p {
    text-align: center;

    a {
      color: black;
      text-decoration: underline;
    }
  }
`;

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;

  .input-group {
    margin-bottom: 30px;
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 10px;
    }
  }

  .submit-block {
    button {
      padding: 15px;
      width: 100%;
      background-color: black;
      color: white;
      border: none;
      cursor: pointer;
    }
  }
`;

type InputValues = {
  name: string;
  email: string;
  password: string;
  image: string;
};

export default function Login() {
  let { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      toast.success('You are logged in!');
      history.push('/');
    }
  }, [user, history]);

  const { handleSubmit, register } = useForm<InputValues>();

  const onSubmit = async (values: InputValues) => {
    const res = await createUser(values);

    if (res.status === 'error') return toast.error(res.message);

    toast.success('Account created successfully 🚀');

    setUser(res);
  };

  return (
    <Container>
      <h1>Signup</h1>
      <p>
        Or <Link to="/login">Login</Link>
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input id="name" {...register('name')} />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input id="password" {...register('password')} type="password" />
        </div>
        <div className="input-group">
          <label htmlFor="image">Image URL</label>
          <input id="image" {...register('image')} />
        </div>
        <div className="submit-block">
          <button type="submit">Login</button>
        </div>
      </Form>
    </Container>
  );
}
