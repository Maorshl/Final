import React from "react";

function Tags(tags) {
  console.log(tags);
  return (
    <div>
      {tags &&
        tags.map(tag => {
          return <span>{tag}</span>;
        })}
    </div>
  );
}

export default Tags;
