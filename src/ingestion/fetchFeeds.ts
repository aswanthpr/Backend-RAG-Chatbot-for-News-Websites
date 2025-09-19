import {parseFeed} from "@rowanmanning/feed-parser";
import axios from "axios";
import { IArticle } from "../types/types";

export async function fetchRSSFeed(url: string):Promise<IArticle[]> {
    const res = await axios.get(url, { responseType: "text" });

    const body = await res.data;

    console.log("RSS fetched, length:", body.length);

    const feed = parseFeed(body);

  console.log("Parsed feed items:", feed.items.length);

    return feed.items.map((item)=>({
        title: item.title ||"",
        link: item?.url || "",
        content: item?.description || item?.description ||""
    }))

}


