export interface IArticle {
    title: string;
    link: string;
    content: string;
}

export interface ISessionBody {
    sessionId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chatHistory?:any[]
}
export interface IChatMessage {
  id?: string;
  sender: "user" | "ai";
  text: string;
  timestamp: number;
};

export interface IFields {
  core: number;
  text: string;
  title?: string;
  link?: string;
}