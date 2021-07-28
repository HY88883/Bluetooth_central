import {useEffect, useLayoutEffect} from "react";

export default function usePageHeaderTitle(navigation,title,headerLeft:any=null,headerRight:any=null){
    useLayoutEffect(
        ()=>{
            navigation.setOptions({
                headerTitle: title,
            })
            !!headerLeft&&navigation.setOptions({
                headerLeft
            })
            !!headerRight&&navigation.setOptions({
                headerRight
            })
        },[navigation,title,headerLeft,headerRight]
    )
}
