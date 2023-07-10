import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getPost = async () => {
    if(!notion) return;
  const posts = await notion.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post : any) => {
    const getTags = (tags :any) => {
      const allTags = tags.map((tag :any) => {
        return tag.name;
      });
  
      return allTags;
    };
  
    return {
      id: post.id,
      title: post.properties.Name.title[0].plain_text,
      tags: getTags(post.properties.Tags.multi_select),
      description: post.properties.Description.rich_text[0].plain_text,
      date: getToday(post.properties.Date.last_edited_time),
    };
  };

function getToday (dates :string) {
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    let date = new Date();
  
    if (dates) {
      date = new Date(dates);
    }
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let today = `${month} ${day}, ${year}`;
  
    return today;
  };