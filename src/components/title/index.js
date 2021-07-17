import Helmet from 'react-helmet';

const Title = (props) => {
  return <Helmet>{props.title}</Helmet>;
};

export default Title;
