import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const InputSection = ({children}: Props) => {
  return <div className='flex flex-col gap-y-1'>{children}</div>;
}
 
export default InputSection;