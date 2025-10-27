import API from "../api/api";

export default function Contentheader({title}){
  return <div className="flex items-center gap-2 mb-10">
    <span className="h-6 w-[3px]"
      style={{
        backgroundColor: API.color1
      }}
    ></span>
    <span className="font-semibold text-xl md:text-[1.5rem]">{title}</span>
  </div>
}