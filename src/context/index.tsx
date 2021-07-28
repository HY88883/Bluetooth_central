import {createContext} from "react";
import {InitialState} from "../reducer";

interface IDispatch{
    _dispatch:(data:any)=>void;
}

export const GlobalDataContext=createContext<InitialState>({})
export const DispatchContext=createContext<IDispatch>({})
