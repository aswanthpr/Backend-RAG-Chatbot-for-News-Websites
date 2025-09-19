import axios, { AxiosError } from 'axios';

export async function getEmbedding(text: string): Promise<number[]> {
    try {

        const resp = await axios.post(
         process.env["JINA_URL"]!,
          JSON.stringify({
            model: 'jina-embeddings-v3',
            task: 'text-matching',
            dimensions: 384,
            input: [text],
          }),
          {
            headers: {
              Authorization: `Bearer ${process.env["JINA_API_KEY"]}`,
              "Content-Type": "application/json",
            },
          }
        );
      
        return resp.data.data[0].embedding;
        
    } catch (err:unknown) {
        console.log(err instanceof AxiosError? err : String(err))
    }
    return [];
}