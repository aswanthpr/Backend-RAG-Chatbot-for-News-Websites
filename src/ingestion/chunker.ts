import  {RecursiveCharacterTextSplitter} from "langchain/text_splitter";

export async function chunkText(text: string): Promise<string[]> {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,

    })
    
    return await splitter.splitText(text);
}