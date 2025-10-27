import { MyDiv } from "./input_output_utils";

export default function ContentBox({children, color, className}){
  return <MyDiv
    className={`md:py-20 py-10 md:px-30 px-5 md:min-h-[80vh] w-screen text-[18px] ${className}`}
    style={{
      backgroundColor: color ?? "white",
    }}
  >
    {children}
  </MyDiv>
}