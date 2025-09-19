import {parseFeed} from "@rowanmanning/feed-parser";
import axios from "axios";
import { IArticle } from "../types/types";

export async function fetchRSSFeed(url: string):Promise<IArticle[]> {
    const res = await axios.get(url, { responseType: "text" });

    const body = await res.data;

    const feed = parseFeed(body);

    return feed.items.map((item)=>({
        title: item.title ||"",
        link: item?.url || "",
        content: item?.description || item?.description ||""
    }))

}


