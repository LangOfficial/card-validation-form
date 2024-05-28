import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const CardForm = ({children}: Props) => {
  return (
    <form className="mt-14 flex flex-col gap-5 p-6 halfxl:ml-96 halfxl:w-[30%]">
      {children}
    </form>
  );
}
 
export default CardForm;