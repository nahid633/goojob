import {useEffect, useRef} from "react";
import styled from "styled-components";

export default function VideoPlayer({stream}){
    const videoRef = useRef();
    useEffect(()=>{
        if(videoRef.current){
            console.log(stream);
            // try {
            //     videoRef.current.srcObject = stream;
            // } catch (error) {
            //     videoRef.current.src = URL.createObjectURL(stream);
            // }
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
    }, [videoRef, stream]);
    return (
            <Video ref={videoRef} muted autoPlay/>
    )
}
const Video = styled.video`
width: 25vw;
height: fit-content;
border: 2px solid black`

