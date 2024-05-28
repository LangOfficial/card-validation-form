interface Props {
  text: string;
}

const Error = ({text}: Props) => {
  return (
    <p className="text-red-400 text-sm">{text}</p>
  );
}
 
export default Error;