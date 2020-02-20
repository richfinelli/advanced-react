import Link from 'next/link';
import UpdateItem from '../components/UpdateItem';


//FYI "{query}" is really props.query
//see more explicit approach commented below that doesn't use objection destructuring
const Update = ({query}) => (
    <UpdateItem id={query.id}/>
);
// const Sell = (props) => (
//     <UpdateItem id={props.query.id}/>
// );

export default Update;