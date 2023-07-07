import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});


// https://www.notion.so/Getting-Started-0b27f9ab4bdf439ea0a18aa2fb7070d1?pvs=4

export const getPost = async () => {
    if(!notion) return;
  const posts = await notion.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`,
    // filter: {
    //   property: "Published",
    //   checkbox: {
    //     equals: true,
    //   },
    // },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const allPosts = posts.results;

//   return allPosts;

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
    //   slug: post.properties.Slug.rich_text[0].plain_text,
    };
  };

function getToday (datestring :string) {
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    let date = new Date();
  
    if (datestring) {
      date = new Date(datestring);
    }
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let today = `${month} ${day}, ${year}`;
  
    return today;
  };