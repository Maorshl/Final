import { Chip, Link } from "@material-ui/core";
import React from "react";

function CardTags({ tags }) {
  return (
    <div>
      {tags &&
        tags.map((tag, i) => {
          return (
            <Link href={`/${tag}/#!`} key={i}>
              <Chip label={tag} />
            </Link>
          );
        })}
    </div>
  );
}

export default CardTags;
