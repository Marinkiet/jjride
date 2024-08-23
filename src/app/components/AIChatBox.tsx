import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react"
import { Bot, SendHorizontalIcon, Trash, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface AIChatBoxProps {
    open: boolean;
    onClose: () => void
}
export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        isLoading,
        error,

    } = useChat();


    //scroll to bottom and focus  on chat input
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        if (open) {
            inputRef.current?.focus()
        }
    }, [open])

    const lastMessageIsUser = messages[messages.length - 1]?.role == "user";

    //conditional styling
    return <div className={cn("bg-white rounded-lg bottom-0 right-0 z-50 w-full max-w-[600px] p-2 xl:right-20", open ? "fixed" : "hidden")}>

        <button onClick={onClose} className="mb-1 ms-auto block">
            <XCircle size={30} color="#a21a42" className="rounded-full bg-white cursor-pointer z-50" /></button>
        <div className="flex h-[600px] flex-col rounded border bg-background shadow-xl" >
            <div className="mt-3 h-full overflow-y-auto px-3 " ref={scrollRef}>
                {messages.map(message => (
                    <ChatMessage message={message} key={message.id} />
                ))}
                {isLoading && lastMessageIsUser && (
                    <ChatMessage
                        message={{
                            id: "loading",
                            role: "assistant",
                            content: "Thinking ...",
                        }} />
                )}
                {error && (

                    <ChatMessage
                        message={{
                            id: "error",
                            role: "assistant",
                            content: "Oops something went wrong. Please try again.",
                        }} />
                )}
                {!error && messages.length === 0 && (
                    <div className="flex flex-col h-full items-center justify-center gap-3 text-center mx-8">
                        <Bot color="#a21a42" size={24} />
                        <p className="text-lg font-medium text-black">
                            Sent a message to start the AI chat!
                        </p>
                        <p className="text-black text-sm">
                            Ask away, and let this LegalBot be your digital guide to understanding and asserting your labor rights.
                        </p>

                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="m-3 flex gap-1">
                <button
                    type="button"
                    className="flex items-center justify-center w-10 flex-none"
                    title="Clear chat"
                    onClick={() => setMessages([])}>
                    <Trash size={24} color="#a21a42"
                    />
                </button>

                <input value={input}
                    ref={inputRef}
                    onChange={handleInputChange}
                    placeholder="Ask me anything.."
                    className="grow border rounded bg-background px-3 py-2 text-sm border-#a21a42-500 text-black"
                />

                <button
                    type="submit"
                    title="Submit Message"
                    className="flex items-center justify-center w-10 flex-none  disabled:opacity-50"
                    disabled={input.length === 0}>
                    <SendHorizontalIcon size={24} color="#a21a42" />
                </button>
            </form>


        </div>
    </div>
}

interface ChatMessageProps {
    message: Message
}

function ChatMessage({ message: { role, content } }: ChatMessageProps) {
    const isAiMessage = role == "assistant"

    return (
        <div className={cn("mb-3 flex items-center  font-light", isAiMessage ? "me-5 justify-start" : "ms-5 justify-end")}>
            {isAiMessage && <Bot color="#00da6a" className="mr-2 flex-none" />}
            <div className={cn("rounded-md border px-3 py-2", isAiMessage ? "bg-background" : "bg-foreground text-black",)}>
                <ReactMarkdown components={{
                    a: ({ node, ref, ...props }) => (
                        <Link {...props}
                            href={props.href ?? ""}
                            className="text-#a21a42-500 hover:underline"
                        />),

                    p: ({ node, ...props }) => (
                        <p {...props} className="mt-3 first:mt-0 text-black text-start"
                        />),

                    ul: ({ node, ...props }) => (
                        <ul {...props} className="mt-3 list-inside list-disc first:mt-0"
                        />),

                    li: ({ node, ...props }) => (
                        <li {...props} className="mt-1 "
                        />)
                }}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}