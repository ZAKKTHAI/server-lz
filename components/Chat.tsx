"use client";

import {useState} from "react";
import {sendChat} from "@/lib/api";


export default function Chat(){

    const [message,setMessage] = useState("");
    const [answer,setAnswer] = useState("");


    async function submit(){

        const result = await sendChat(message);

        setAnswer(result.answer);

    }


    return (

        <div>

            <input
                value={message}
                onChange={
                    e=>setMessage(e.target.value)
                }
            />

            <button onClick={submit}>
                送信
            </button>


            <div>
                {answer}
            </div>

        </div>

    );
}
